import React, { useEffect } from "react";
import { userCookieAPI, userLogOutAPI } from "../../api/userAPI";
import Button from "../../components/reUse/Button";
import { useDispatch } from "react-redux";
import { logOutUser, userCookie, userID } from "../../global/reduxState";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    userCookieAPI().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <div>This is Home</div>

      <div className="mt-20" />

      <Button
        name="Log Out"
        onClick={() => {
          userLogOutAPI();
          dispatch(userCookie(null));
          dispatch(userID(""));
          dispatch(logOutUser());
        }}
      />
    </div>
  );
};

export default HomeScreen;
