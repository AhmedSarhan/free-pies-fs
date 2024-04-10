import { getData, storeData } from "@/shared/helpers/storage";
import { createContext, useContext, useEffect, useReducer } from "react";
import { User } from "./types";
import { useRouter } from "expo-router";

type AuthContextType = {
  state: {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  };
  dispatch: any;
};

export const AuthContext = createContext<
  | {
      user: User | null;
      token: string | null;
      isAuthenticated: boolean;
      loginAction: (user: User, token: string) => void;
      logoutAction: () => void;
    }
  | undefined
>(undefined);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authReducer = (
  state: AuthContextType["state"],
  action:
    | { type: "LOGIN"; payload: { user: User; token: string } }
    | { type: "LOGOUT" }
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const getLocalData = async () => {
      const authUser = await getData("authUser");
      if (authUser) {
        dispatch({
          type: "LOGIN",
          payload: { user: authUser.user, token: authUser.token },
        });
      }
    };
    getLocalData();
  }, []);

  const loginAction = async (user: User, token: string) => {
    dispatch({ type: "LOGIN", payload: { user, token } });
    await storeData("authUser", { user, token });
    router.push("/");
  };

  const logoutAction = async () => {
    dispatch({ type: "LOGOUT" });
    await storeData("authUser", null);
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{ ...state, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
