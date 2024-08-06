import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const registerUser = useCallback(async () => {
    setRegisterLoading(true);
    setRegisterError(null);
    const response = await postRequest(
      `${baseUrl}/user/register`,
      JSON.stringify(registerInfo)
    );
    setRegisterLoading(false);
    if (response.error) {
      return setRegisterError(response);
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  const loginUser = useCallback(async () => {
    setLoginLoading(true);
    setLoginError(null);
    const response = await postRequest(
      `${baseUrl}/user/login`,
      JSON.stringify(loginInfo)
    );
    setLoginLoading(false);
    if (response.error) {
      return setLoginError(response);
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [loginInfo]);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        registerLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        loginLoading,
        updateLoginInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
