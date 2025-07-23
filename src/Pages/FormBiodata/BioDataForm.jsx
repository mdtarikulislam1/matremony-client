import React, { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
// import { FaUser, FaVenusMars, FaPhone, FaEnvelope } from "react-icons/fa";
import getSecureAxios from"../Shared/secureAxios"


const BiodataForm = () => {
  const {user}=use(AuthContext)
  const axiosSecure = getSecureAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
   axiosSecure 
      .post("/addBioData", {
        ...data,
        user: user?.email, 
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          
         Swal.fire({
                   icon: "success",
                   title: "Data successfully Submited",
                   toast: true,
                   position: "top-end",
                   showConfirmButton: false,
                   timer: 2000,
                   timerProgressBar: true,
          });
        } else {
         Swal.fire({
         icon: "error",
         title: "Something went wrong!",
         
        });
        }
      })
      .catch((error) => {
       Swal.fire({
        icon:'error',
        title: error?.message
       })
      })}

  const divisions = [
    "Dhaka",
    "Chattogram",
    "Rangpur",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Sylhet",
  ];

  const heights = [
    "4'5\"",
    "4'6\"",
    "4'7\"",
    "4'8\"",
    "4'9\"",
    "5'0\"",
    "5'2\"",
    "5'5\"",
    "5'7\"",
    "6'0\"",
  ];

  const weights = ["40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg+"];
  const occupations = [
    "Student",
    "Engineer",
    "Doctor",
    "Teacher",
    "Businessman",
    "Other",
  ];
  const races = ["Fair", "Medium", "Dark"];

  return (
    <div className="bg-white rounded-3xl shadow-xl my-10 p-6 max-w-5xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Create Your Biodata
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Biodata Type */}
      <div  className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
          <label className="block font-medium mb-1">
            Biodata Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("biodataType", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Type</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.biodataType && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block font-medium mb-1">
            Profile Image Link
          </label>
          <input
            type="text"
            {...register("profileImage")}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-medium mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("dob", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Height */}
        <div>
          <label className="block font-medium mb-1">
            Height <span className="text-red-500">*</span>
          </label>
          <select
            {...register("height", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Height</option>
            {heights.map((h, idx) => (
              <option key={idx} value={h}>
                {h}
              </option>
            ))}
          </select>
          {errors.height && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="block font-medium mb-1">
            Weight <span className="text-red-500">*</span>
          </label>
          <select
            {...register("weight", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Weight</option>
            {weights.map((w, idx) => (
              <option key={idx} value={w}>
                {w}
              </option>
            ))}
          </select>
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

         <div>
          <label className="block font-medium mb-1">Your Age</label>
          <input
            type="number"
            {...register("yourAge")}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter age"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block font-medium mb-1">
            Occupation <span className="text-red-500">*</span>
          </label>
          <select
            {...register("occupation", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Occupation</option>
            {occupations.map((o, idx) => (
              <option key={idx} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.occupation && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Race */}
        <div>
          <label className="block font-medium mb-1">
            Race (Skin Color) <span className="text-red-500">*</span>
          </label>
          <select
            {...register("race", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Skin Color</option>
            {races.map((r, idx) => (
              <option key={idx} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.race && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Father's Name */}
        <div>
          <label className="block font-medium mb-1">Father's Name</label>
          <input
            type="text"
            {...register("fathersName")}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block font-medium mb-1">Mother's Name</label>
          <input
            type="text"
            {...register("mothersName")}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Permanent Division */}
        <div>
          <label className="block font-medium mb-1">
            Permanent Division <span className="text-red-500">*</span>
          </label>
          <select
            {...register("permanentDivision", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Division</option>
            {divisions.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.permanentDivision && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Present Division */}
        <div>
          <label className="block font-medium mb-1">
            Present Division <span className="text-red-500">*</span>
          </label>
          <select
            {...register("presentDivision", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Division</option>
            {divisions.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.presentDivision && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Expected Partner Age */}
        <div>
          <label className="block font-medium mb-1">Expected Partner Age</label>
          <input
            type="number"
            {...register("expectedPartnerAge")}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter age"
          />
        </div>

        {/* Expected Partner Height */}
        <div>
          <label className="block font-medium mb-1">
            Expected Partner Height <span className="text-red-500">*</span>
          </label>
          <select
            {...register("expectedPartnerHeight", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Height</option>
            {heights.map((h, idx) => (
              <option key={idx} value={h}>
                {h}
              </option>
            ))}
          </select>
          {errors.expectedPartnerHeight && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Expected Partner Weight */}
        <div>
          <label className="block font-medium mb-1">
            Expected Partner Weight <span className="text-red-500">*</span>
          </label>
          <select
            {...register("expectedPartnerWeight", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Weight</option>
            {weights.map((w, idx) => (
              <option key={idx} value={w}>
                {w}
              </option>
            ))}
          </select>
          {errors.expectedPartnerWeight && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Contact Email */}
        <div>
          <label className="block font-medium mb-1">
            Contact Email (Readonly)
          </label>
          <input
            type="email"
            {...register("contactEmail")}
           defaultValue={user?.email}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-medium mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register("mobile", { required: true })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter mobile number"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>
      </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full my-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors duration-300"
        >
          Submit Biodata
        </button>
      </form>
    </div>
  );
};

export default BiodataForm;
