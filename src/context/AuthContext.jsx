import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  onAuthStateChanged(auth, (loggedInUser) => {
    setUser(loggedInUser);
  });

  return (
    <AuthContext.Provider value={{ user, setUser, dropdownOpen, setDropdownOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
    return useContext(AuthContext);
}

export default AuthProvider;
