import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({} as AuthContextData);

type User = {
  id: string;
  name: string;
  login: string;
  avatar: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
};

type AuthProvider = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    login: string;
    avatar: string;
  };
};

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize/?scope=user&client_id=3b0c7129bd7843d0c1ad`;

  const getCode = () => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithOutCode, githubCode] = url.split("?code=");
      window.history.pushState({}, "", urlWithOutCode);
      login(githubCode);
    }
  };

  useEffect(() => {
    getCode();
  }, []);

  async function login(githubCode: string) {
    await api
      .post<AuthResponse>("/authenticate", {
        code: githubCode,
      })
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        setUser(user);
      });
  }

  return (
    <AuthContext.Provider value={{ user, signInUrl }}>
      {props.children}
    </AuthContext.Provider>
  );
}
