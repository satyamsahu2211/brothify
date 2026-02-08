import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  email: string;
  role?: string;
  [key: string]: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    try {
      const user = storedUser ? JSON.parse(storedUser) : null;
      const token = storedToken ? JSON.parse(storedToken) : null;

      setAuthState({
        user,
        token,
        isLoading: false,
        isAuthenticated: !!user && !!token,
      });
    } catch (error) {
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
    router.push("/login");
  };

  const setAuth = (user: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    setAuthState({
      user,
      token,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  return {
    ...authState,
    logout,
    setAuth,
  };
}
