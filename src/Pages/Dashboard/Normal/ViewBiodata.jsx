import React, { use, useEffect, useState } from "react";
import getSecureAxios from "../../Shared/secureAxios";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";

export default function ViewBiodata() {
  const axiosSecure = getSecureAxios();
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [datas, setThearData] = useState({});
  const [person, setPerson] = useState([]);

  const handlePremium = () => {
     axiosSecure
    .post(`/request-premium/${datas?.user}`, {
      name: datas?.name,
      email: datas?.user,
      id: datas?.addid,
    })
    .then((res) => {
      if (res.data.success) {
        Swal.fire("Success", "Premium request sent!", "success");
      } else {
        Swal.fire("Notice", res.data.message || "Already requested!", "info");
      }
    })
    .catch((err) => {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    });
  };

  useEffect(() => {
    axiosSecure.get(`/stutas/${user?.email}`).then((res) => {
      setPerson(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`/thearData/${user.email}`)
      .then((res) => {
        setThearData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg text-purple-600"></span>
      </div>
    );
  }
  console.log(datas);
  return (
    <>
      {datas?.message === "No biodata found" ? (
        <p>Your not Added Data</p>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {/* Profile Image */}
          <div className="col-span-1">
            <img
              data-aos="fade-down"
              className="w-full rounded-xl object-contain max-h-96"
              src={datas?.profileImage}
              alt={datas?.name}
            />
          </div>

          {/* Biodata Details */}
          <div
            data-aos="fade-up"
            className="col-span-2 bg-white rounded-xl shadow-lg border border-yellow-400 p-6 flex flex-col gap-3"
          >
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">
              {datas?.name}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-semibold text-gray-700">Age:</span>{" "}
                  {datas?.yourAge} years
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Date of Birth:
                  </span>{" "}
                  {datas?.dob}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Height:</span>{" "}
                  {datas?.height}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Weight:</span>{" "}
                  {datas?.weight}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Race:</span>{" "}
                  {datas?.race}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Occupation:
                  </span>{" "}
                  {datas?.occupation}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Division (Present):
                  </span>{" "}
                  {datas?.presentDivision}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Division (Permanent):
                  </span>{" "}
                  {datas?.permanentDivision}
                </p>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-semibold text-gray-700">
                    Father's Name:
                  </span>{" "}
                  {datas?.fathersName}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Mother's Name:
                  </span>{" "}
                  {datas?.mothersName}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Mobile:</span>{" "}
                  {datas?.mobile}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  {datas?.user || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Expected Partner Age:
                  </span>{" "}
                  {datas?.expectedPartnerAge} years
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Expected Partner Height:
                  </span>{" "}
                  {datas?.expectedPartnerHeight}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Expected Partner Weight:
                  </span>{" "}
                  {datas?.expectedPartnerWeight}
                </p>
                <button
                  onClick={handlePremium}
                  disabled={person?.person === "premium"}
                  className={`px-4 py-2 rounded-md font-semibold text-white transition
    ${
      person?.person === "premium"
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }`}
                >
                  {person?.person === "premium"
                    ? "Already Premium"
                    : "Make Premium"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
