import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../../models/AuthContextType";
import { jwtDecode } from "jwt-decode";

interface UserProfile {
    name: string;
    email: string;
    membership?: string; // Optional field if your backend supports it
}

// 3. Match this with your file in "../../models/AuthContextType"
interface ExtendedAuthContextType {
    isAuthenticated: boolean;
    user: UserProfile | null; // Added user property
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<ExtendedAuthContextType | undefined>(undefined)

export const AuthProvider = ({children} : {children: ReactNode}) =>{
     const [isAuthenticated, setIsAuthenticated] = useState(false)
       const [user, setUser] = useState<UserProfile | null>(null);
    //  Get token from localstorage
       const decodeAndSetUser = (token: string) => {
        try {
            const decoded = jwtDecode<UserProfile>(token);
            setUser({
                name: decoded.name || "Movie Goer",
                email: decoded.email || "",
                membership: decoded.membership || "Standard Member"
            });
        } catch (error) {
            console.error("Failed to decode token:", error);
            logout(); // Clear malicious or corrupt tokens
        }
    };
    useEffect(()=>{
        const token = localStorage.getItem("movie-ticket-booking")
        if(token){
            setIsAuthenticated(true);
              decodeAndSetUser(token);
                decodeAndSetUser(token);
        }
    },[])

    const login = (token: string) =>{
        localStorage.setItem("movie-ticket-booking",token)
        setIsAuthenticated(true);
         decodeAndSetUser(token);
    }
    const logout = () => {
        localStorage.removeItem("movie-ticket-booking")
        setIsAuthenticated(false);
         setUser(null); 

    }

    return(
        <AuthContext.Provider value={{isAuthenticated,user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("Should use useAuth within the AuthProvider")
    }
    return context
}