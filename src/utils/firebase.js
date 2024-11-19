// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVFgpyhuWKrxw71STyuQgVSlEzsT9RGKc",
  authDomain: "netflixgpt-37173.firebaseapp.com",
  projectId: "netflixgpt-37173",
  storageBucket: "netflixgpt-37173.appspot.com",
  messagingSenderId: "452007205189",
  appId: "1:452007205189:web:57869d51c17f63fa99862c",
  measurementId: "G-1LGSXTP46R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);
export const auth = getAuth();