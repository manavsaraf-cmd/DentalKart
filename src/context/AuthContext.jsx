import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged ,
    updateProfile
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const AuthContext = createContext(null);

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            }
        );

        return unsubscribe;

    }, []);


    async function signup(email, password, name) {
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
    
        await updateProfile(credential.user, {
            displayName: name
        });
    
        return credential;
    }


    async function login(email, password) {
        return signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    }


    async function logout() {
        return signOut(auth);
        setUser(null);
    }


    const value = {
        user,
        loading,
        signup,
        login,
        logout
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}


export default AuthProvider;