import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userCookieAPI } from "../api/userAPI";
import { userCookie, userID } from "../global/reduxState";
const PrivateRouter: FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector((state: any) => state.user);
  const userCookie = useSelector((state: any) => state.cookie);
  const userID = useSelector((state: any) => state.id);

  const dispatch = useDispatch();

  const [state, setState] = useState<string>("");
  const [stateCookie, setStateCookie] = useState<string>("");

  useEffect(() => {
    const token: any = jwtDecode(user);
    setState(token.id);

    userCookieAPI().then((res) => {
      setStateCookie(res.data);
      dispatch(userCookie(stateCookie));
      dispatch(userID(state));
    });
  }, []);

  console.log("cookie: ", stateCookie, userCookie);
  console.log("state: ", state);

  console.log("check: ", state === stateCookie);

  const checked: boolean = state! === stateCookie!;

  // peterotunuya2@gmail.com

  //   && state !== "" && stateCookie !== "" user && state !== "" && stateCookie !== " "

  return <div>{user ? <div>{children}</div> : <Navigate to="login" />}</div>;
};

export default PrivateRouter;
