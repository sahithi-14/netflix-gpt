import Header from "./Header";
import { useState, useRef } from "react";
import { validateEmail } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";  
const Login = () => {
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const toogleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const handleSignIn = () => {
        const message = validateEmail(email.current.value, password.current.value);
        setErrorMsg(message);
        if (message) return;
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://uxwing.com/default-profile-picture-female-icon/&ved=2ahUKEwi3tYzvutmIAxUTXGwGHSGmAnwQh-wKegQIGRAC&usg=AOvVaw37ZdwN3JApMHMM-7YvJn9Y"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL,
                            })
                        );
                        nagivate('/browser');
                    }).catch((error) => {
                        setErrorMsg(error);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + " " + errorMessage);
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    nagivate('/browser');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + " " + errorMessage);
                });
        }

    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="logo" />
            </div>
            <div className="w-3/12 absolute p-12 bg-black mx-auto my-10 right-0 left-0 text-white rounded-lg bg-opacity-90">
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1 className="text-bold text-2xl py-4">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                    {
                        !isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="py-2 px-4 m-4 w-full bg-gray-700" />
                    }
                    <input type="text" ref={email} placeholder="Email Address" className="py-2 px-4 m-4 w-full bg-gray-700" />
                    <input type="text" ref={password} placeholder="Password" className="py-2 px-4 m-4 w-full bg-gray-700" />
                    <p className="text-red-500 text-bold py-2">{errorMsg}</p>
                    <button className="py-2 px-4 m-4 bg-red-700 w-full rounded-lg " onClick={handleSignIn}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                    <p className="py-4 cusor-pointer" onClick={toogleSignInForm}>{isSignInForm ? 'Already User ? Sign In Now' : 'New to Netflix?Sign Up Now'}</p>
                </form></div>
        </div>
    )
}
export default Login;
