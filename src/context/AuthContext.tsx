// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// interface AuthContextType {
//   user: any;
//   loading: boolean;
//   setUser: (user: any) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const checkAuth = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:8080/auth/check-auth", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUser(JSON.parse(atob(token.split(".")[1]))); // Decodificar token
//     } catch (err) {
//       console.error("Error de autenticación:", err);
//       setUser(null);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext)!;

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextType {
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Si no hay token o role, no estás logueado
    if (!token || !role) {
      setLoading(false);
      return;
    }

    // Opcional: Verifica el token con el backend (solo si tu endpoint /check-auth es útil)
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8080/auth/check-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Si pasa, carga los datos del usuario desde localStorage
        setUser({
          token,
          role,
          userId: localStorage.getItem("userId"),
          companyId: localStorage.getItem("companyId"),
          kitchenId: localStorage.getItem("kitchenId"),
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
        });

        
      } catch (err) {
        console.error("Token inválido");
        localStorage.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
