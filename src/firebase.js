import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBSjYxDQxU2pyArpBtfQBmN7c8y4D1dtpI",
  authDomain: "netflix-clone-af958.firebaseapp.com",
  projectId: "netflix-clone-af958",
  storageBucket: "netflix-clone-af958.appspot.com",
  messagingSenderId: "784108848215",
  appId: "1:784108848215:web:f306004039470976070f12"
};

const app = initializeApp(firebaseConfig);

let auth = getAuth(app)
let db = getFirestore(app)

let signUp = async (name, email, password) => {
    try {
        let res = await createUserWithEmailAndPassword(auth, email, password)
        let user = res.user
        await addDoc(collection(db, 'user'), {
            uid : user.uid,
            name,
            authProvider : 'local',
            email
        })
    } catch (err) {
        console.log(err);
        toast.error(err.code.split('/')[1].split('_').join(' '));
    }
}

let login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.log(err);
        toast.error(err.code.split('/')[1].split('_').join(' '));
    }
}

let logout = () => {
    signOut(auth)
}

export {auth, db, login, signUp, logout}