import { createContext, ReactNode, useContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { LoginRequest } from "@/app/settings/login";
import { useRouter } from "expo-router";

type SessionContextData = {
  token: string | null;
  login: (request: LoginRequest) => void;
  removeToken: () => void;
}

const initState: SessionContextData = {
  token: null,
  login: () => undefined,
  removeToken: () => undefined,
}

const SessionContext = createContext<SessionContextData>(initState);
export const useSessionContext = () => useContext(SessionContext);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(SecureStore.getItem("token"));
  const router = useRouter();

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const login = async (request: LoginRequest) => {
    try {
      const { data } = await axios.post("/login", request)
      await SecureStore.setItemAsync("token", data.token)
      setToken(data.token)
      // @ts-ignore
      router.replace("(tabs)")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }
  }

  const removeToken = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
    // @ts-ignore
    router.replace("(tabs)")
  }

  const contextData: SessionContextData = {
    token,
    login,
    removeToken
  }

  return (
    <SessionContext.Provider value={contextData}>
      {children}
    </SessionContext.Provider>
  )
}
