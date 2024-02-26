import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signUp = async (email, password, file, displayName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    setLoading(true);
    const storageRef = ref(storage, `usersAvatar/${res.user.uid} Avatar`);
    await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateProfile(res.user, {
      displayName,
      photoURL: url,
    });
    const docRef = doc(db, "users", res.user.email);
    await setDoc(docRef, {
      displayName,
      photoURL: url,
      email,
      uid: res.user.uid,
    });
  };
  const signIn = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutHandler = () => signOut(auth);

  useEffect(() => {
    const updateLogStatus = onAuthStateChanged(auth, (user) => {
      console.log("user: ", user);
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      updateLogStatus();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        signIn,
        signOutHandler,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
