import axios from "axios";

const URL: string = "http://localhost:2233/api";
export const registerAPI = async (data: {}) => {
  try {
    return await axios.post(`${URL}/register`, data);
  } catch (error) {
    return error;
  }
};

export const signInAPI = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/sign-in`, data, { withCredentials: true })
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};

export const oneUserAPI = async (userID: string) => {
  try {
    return await axios.get(`${URL}/read-one-user/${userID}`);
  } catch (error) {
    return error;
  }
};

export const verifyUserAPI = async (userID: string) => {
  try {
    return await axios.patch(`${URL}/verify-user/${userID}`);
  } catch (error) {
    return error;
  }
};

export const userCookieAPI = async () => {
  try {
    return await axios
      .get(`${URL}/user-cookie`, { withCredentials: true })
      .then((res: any) => {
        return res.data.data;
      });
  } catch (error) {
    return error;
  }
};

export const userLogOutAPI = async () => {
  try {
    return await axios.delete(`${URL}/logout`, { withCredentials: true });
  } catch (error) {
    return error;
  }
};
