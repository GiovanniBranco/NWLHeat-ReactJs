import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({} as AuthContextData);

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
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
    avatar_url: string;
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

  const getUserProfile = () => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api
        .get<User>("/user")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          alert(
            "Não foi possível obter as informações de usuário, favor verifique o log para mais detalhes"
          );
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getCode();
    getUserProfile();
  }, []);

  async function login(githubCode: string) {
    await api
      .post<AuthResponse>("/authenticate", {
        code: githubCode,
      })
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user);
      })
      .catch((error) => {
        alert(
          "Não foi possível realizar o login, favor verifique o log para mais detalhes"
        );
        console.log(error);
      });
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, signInUrl, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
