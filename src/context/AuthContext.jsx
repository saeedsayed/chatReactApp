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
import {
  doc,
  setDoc,
} from "firebase/firestore";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ***********
  // signUp func
  // ***********
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
    await setDoc(doc(db, "userChats", res.user.uid), {});
  };

  // ********
  // singIN func
  // ********
  const signIn = async (email, password) => {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
  };

  // ***********
  // signOut func
  // ***********
  const signOutHandler = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch {}
    setLoading(false);
  };
  // *************
  // reset password func
  // *************
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // *************
  // change current user state
  // *************
  useEffect(() => {
    const updateLogStatus = onAuthStateChanged(auth, (user) => {
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
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
