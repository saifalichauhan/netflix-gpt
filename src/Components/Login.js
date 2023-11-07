import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../Utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { auth} from '../Utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';



const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;
    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth,
        email.current.value, 
        password.current.value
        )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL:"https://avatars.githubusercontent.com/u/139101644?s=96&v=4",
          })
          .then(()=>{
            const { uid, email, displayName,photoURL } =auth.currentUser;
            dispatch(
              addUser({ 
                uid: uid, 
                email: email, 
                displayName: displayName,
                photoURL:photoURL 
              })
              );
            navigate("/browse")
          })
          .catch((error)=>{
         setErrorMessage(error.message)
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/f5b52435-458f-498f-9d1d-ccd4f1af9913/IN-en-20231023-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()} 
        className="w-3/12 absolute p-8 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-500 border-none"
            ref={name}
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-500 "
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-500 "
          ref={password}
        />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
          type='button' 
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p
          className="py-4 cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm ? 'New to Netflix? Sign Up Now' : 'Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
