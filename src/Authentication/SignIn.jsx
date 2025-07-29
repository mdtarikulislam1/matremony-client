import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; // <-- FIXED
import Swal from "sweetalert2";
import { saveUserDb } from "../Pages/Shared/role";
import { AuthContext } from "../Context/AuthContext";
import useRole from "../Hooks/useRole";

export default function SignIn() {
  const { signInWithGoogle, SignInUser } = use(AuthContext); // <-- FIXED
  const navigate = useNavigate();
  const [role] = useRole(); 
  const [loading, setLoading] = useState(false);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    if(role){
      navigate(`/dashboard/${role}`)
    }
  },[role])

  const onSubmit = async (data) => {
   setLoading(true)
  
    try {
      const result = await SignInUser(data.email, data.password);
      console.log(result);

      const userData = {
        name: result?.user?.displayName,
        image: result?.user?.photoURL,
        email: result?.user?.email,
      };
      await saveUserDb(userData);
      Swal.fire({
        title: "Success!",
        text: "You have successfully signed in.",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      }).then(() => {
       
      });
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const userData = {
        name: result?.user?.displayName,
        image: result?.user?.photoURL,
        email: result?.user?.email,
      };
      await saveUserDb(userData);

      Swal.fire({
        title: "Success!",
        text: "Signed in with Google.",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      })
    } catch (error) {
      console.error("Google SignIn error:", error);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 px-4 rounded-md transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Google Sign-In Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className={`w-full text-white py-2 px-4 rounded-md transition ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>
        </form>

        {/* Registration Link */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
