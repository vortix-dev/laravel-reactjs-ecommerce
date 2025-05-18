import { createContext, useState } from "react";

export const AdminAuthContext = createContext();
export const AdminAuthProvider = ({children}) => {
    const adminInfo = localStorage.getItem('adminInfo')
    const [user, setUser] = useState(adminInfo);

    const login = (user) => {
        setUser(user)

    }
    
    const logout = () => {
        localStorage.removeItem('adminInfo');
        setUser(null)
      }
      return <AdminAuthContext.Provider value={{
        user,
        login,
        logout

      }}>
        {children}

        </AdminAuthContext.Provider>
}
