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
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
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
    await setDoc(doc(db, "userChats", res.user.uid),{})
  };

  // ********
  // singIN func
  // ********
  const signIn = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // ***********
  // signOut func
  // ***********
  const signOutHandler = () => signOut(auth);
  // *************
  // reset password func
  // *************
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // ***********
  // search func
  // ***********
  const search = async (userName) => {
    try {
      let user;
      const q = query(
        collection(db, "users"),
        where("displayName", "==", userName),
        where("displayName", "!=", currentUser.displayName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((element) => {
        user = element.data();
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  // *************
  // change current user stet
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
        search,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
