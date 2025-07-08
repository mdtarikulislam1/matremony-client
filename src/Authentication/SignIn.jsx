import React, { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function SignIn() {
  const { signInWithGoogle, signInWithEmail } = use(AuthContext);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Email/Password Sign In
    signInWithEmail(data.email, data.password)
      .then((result) => {

        // Success Alert
        Swal.fire({
          title: "Success!",
          text: "You have successfully signed in.",
          icon: "success",
          confirmButtonColor: "#4f46e5",})
          // .then(() => {
        //   navigate("/dashboard"); // Redirect after alert
        // });
      })
      .catch((error) => {
        console.error("Login error:", error);

        // Error Alert
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#e11d48",
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google SignIn:", result.user);

        // Success Alert
        Swal.fire({
          title: "Success!",
          text: "Signed in with Google.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
        })
        // .then(() => {
        //   navigate("/dashboard"); // Redirect after alert
        // });
      })
      .catch((error) => {
        console.error("Google SignIn error:", error);

        // Error Alert
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#e11d48",
        });
      });
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            Sign in with Google
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
