import React, { useState, use, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router'; 
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../Context/AuthContext';
import { saveUserDb } from '../Pages/Shared/role';
import Swal from 'sweetalert2';
import useRole from '../Hooks/useRole';

export default function SignUp() {
  const { createUser, signInWithGoogle } = use(AuthContext); 
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [role] = useRole();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const userData = {
        name: result?.user?.displayName,
        image: result?.user?.photoURL,
        email: result?.user?.email,
      };

      const res = await saveUserDb(userData); 

      Swal.fire({
        title: "Success!",
        text: "Signed in with Google.",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      })
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e11d48",
      });
    } finally {
      setLoading(false);
    }
  };

   useEffect(()=>{
    if(role){
      navigate(`/dashboard/${role}`)
    }
  },[role])

  const submit = async (data) => {
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      const user = result.user;

      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.image,
      });

      const userData = {
        name: data.name,
        image: data.image,
        email: data.email,
      };
      const res = await saveUserDb(userData); 

      Swal.fire({
        title: "Success!",
        text: "Account created successfully.",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      })
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e11d48",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-400px)] my-20'>
      <form onSubmit={handleSubmit(submit)}>
        <h1 className="text-4xl font-bold">Register now!</h1>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            className="input w-80"
            placeholder="Name"
          />
          {errors.name && <p className='text-red-500'>Name is required</p>}

          <label className="label">Image URL</label>
          <input
            {...register('image', { required: true })}
            type="text"
            className="input w-80"
            placeholder="Image URL"
          />
          {errors.image && <p className='text-red-500'>Image URL is required</p>}

          <label className="label">Email</label>
          <input
            {...register('email', { required: true })}
            type="email"
            className="input w-80"
            placeholder="Email"
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}

          <label className="label">Password</label>
          <input
            {...register('password', { required: true, minLength: 6 })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
          {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>}

          <div><a className="link link-hover">Forgot password?</a></div>
          <button
            disabled={loading} // ✅ loading disable
            className={`btn btn-neutral mt-4 ${loading && 'opacity-50 cursor-not-allowed'}`}
          >
            {loading ? "Processing..." : "Register now"}
          </button>
        </fieldset>
        <p>
          <small>Already have an account? <Link to='/signin' className='btn btn-link'>Login</Link></small>
        </p>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading} // ✅ loading disable
          className="btn w-full bg-white text-black border-[#e5e5e5]"
        >
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#4285f4" d="M496 208H272v96h129c-11 55-60 96-129 96-74 0-134-60-134-134s60-134 134-134c34 0 65 13 88 34l68-68C400 70 342 48 272 48 121 48 0 169 0 320s121 272 272 272c136 0 248-112 248-248 0-16-2-32-6-48z"/>
          </svg>
          {loading ? "Please wait..." : "Login with Google"}
        </button>
      </form>
    </div>
  );
}
