import { useEffect, useMemo, useState } from "react";

import {
  clearStoredToken,
  getCurrentUser,
  getStoredToken,
  loginUser,
  registerUser,
  setStoredAuth,
} from "../api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    clearStoredToken();
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    getCurrentUser(token)
      .then((currentUser) => {
        if (active) {
          setUser(currentUser);
        }
      })
      .catch(() => {
        if (active) {
          logout();
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener("geovision:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener(
        "geovision:unauthorized",
        handleUnauthorized
      );
  }, []);

  const authenticate = (response) => {
    setStoredAuth(response);
    setToken(response.access_token);
    setUser(response.user);
    return response.user;
  };

  const login = async (credentials) => authenticate(await loginUser(credentials));
  const register = async (details) =>
    authenticate(await registerUser(details));

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

