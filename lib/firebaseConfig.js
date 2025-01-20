import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDONzNw8LxSo_bPNzhzT2PdfTJxpotcWTk",
  authDomain: "wallet-app-11637.firebaseapp.com",
  projectId: "wallet-app-11637",
  storageBucket: "wallet-app-11637.firebasestorage.app",
  messagingSenderId: "749344817787",
  appId: "1:749344817787:web:25c686c421501d319d58de",
  measurementId: "G-XG57ER4PZX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
