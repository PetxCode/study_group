import React, { useState } from "react";
import Button from "../../components/reUse/Button";
import Input from "../../components/reUse/Input";
import { MdFacebook } from "react-icons/md";
import { FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const [state, setState] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const val = { state, password, confirm };
    if (password === confirm) {
      console.log(val);
    } else {
      console.log("password and confirm doesn't match");
    }
  };

  return (
    <div className=" w-full h-[100vh] flex flex-col justify-center items-center ">
      <div className="mb-10 text-center flex items-center w-full flex-col">
        <div className="mb-5 w-20 h-20 rounded-full border" />
        <div className="text-[26px] font-bold mb-3">Create an Account</div>
        <div>Sign up now and get free account instant.</div>
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
        <Input
          placeholder="confirm password"
          className="w-[97%]"
          show
          required
          errorText="Password has to be passed"
          value={confirm}
          onChange={(e: any) => {
            setConfirm(e.target.value);
          }}
        />
        <div>
          <Button
            name="Register"
            className="w-[97%] bg-red-500 text-white h-14 hover:bg-red-600 transition-all duration-300"
            type="submit"
            // onClick={handleSubmit}
          />
        </div>
        <div className="mt-10 mb-3 ml-2">Sign up with social network</div>
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
        Already have an Account?{" "}
        <span className="font-bold text-red-500">
          <Link to="/login">Login here</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
