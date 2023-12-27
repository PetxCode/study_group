import { useState } from "react";
import Button from "../../components/reUse/Button";
import Input from "../../components/reUse/Input";
import { MdFacebook } from "react-icons/md";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { signInAPI, userCookieAPI } from "../../api/userAPI";
import { useDispatch } from "react-redux";
import { loginUser, userCookie, userID } from "../../global/reduxState";

import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const val = { email: state, password };

    signInAPI(val)
      .then((res) => {
        dispatch(loginUser(res.data));
        const token: any = jwtDecode(res.data);
        dispatch(userID(token.id));

        userCookieAPI().then((res) => {
          dispatch(userCookie(res.data));
        });

        navigate("/");
      })
      .then(() => {});
  };

  return (
    <div className=" w-full h-[100vh] flex flex-col justify-center items-center ">
      <div className="mb-10 text-center flex items-center w-full flex-col">
        <div className="mb-5 w-20 h-20 rounded-full border" />
        <div className="text-[26px] font-bold mb-3">Welcome Back</div>
        <div>Sign in now to continue your Experience.</div>
      </div>

      <form
        className="rounded-md bg-white min-h-[300px] w-[80%] md:w-[500px] border p-4"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Email"
          className="w-[97%]"
          type="email"
          required
          value={state}
          onChange={(e: any) => {
            setState(e.target.value);
            console.log(state);
          }}
        />
        <Input
          placeholder="password"
          className="w-[97%]"
          show
          //   errorText="Password has to be passed"
          errorText={password && "Email has to be passed"}
          required
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />

        <div>
          <Button
            name="Login"
            className="w-[97%] bg-red-500 text-white h-14 hover:bg-red-600 transition-all duration-300"
            type="submit"
            // onClick={handleSubmit}
          />
        </div>
        <div className="mt-10 mb-3 ml-2">Sign in with social network</div>
        <div className="flex flex-col">
          <Button
            name="Continue with Google"
            className="h-14 hover:bg-red-500 hover:text-white  transition-all duration-300 font-medium text-[#ababab]"
            icon={<FaGoogle />}
          />
          <Button
            name="Continue with Facebook"
            className="h-14 hover:bg-blue-500 hover:text-white  transition-all duration-300 font-medium text-[#ababab]"
            icon={<MdFacebook />}
          />
        </div>
      </form>
      <div className="mt-5 text-[13px]">
        Don’t have an account yet?{" "}
        <span className="font-bold text-red-500">
          <Link to="/register">Register here</Link>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
