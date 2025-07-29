import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import getSecureAxios from "../Shared/secureAxios";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import BiodataCard from "./BiodataCard";
import PurchaseModal from "../Payment/PurchaseModal";
import useRole from "../../Hooks/useRole";

export default function Details() {
  const { id } = useParams();
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = getSecureAxios();
  const { user } = use(AuthContext);
  const [stutas, setStutas] = useState([]);
  // const [disabled, setDisabled] = useState([]);
  const [gender, setGender] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role] = useRole();

  // const disable = disabled([0])

  useEffect(() => {
    if (datas?.biodataType) {
      axiosSecure
        .get(`/biodataByGender?gender=${datas.biodataType}`)
        .then((res) => setGender(res.data))
        .catch((err) => console.log(err));
    }
  }, [datas]);

  useEffect(() => {
    axiosSecure
      .get(`/details/${id}`)
      .then((response) => {
        setDatas(response.data);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);


  useEffect(() => {
    axiosSecure.get(`/stutas/${user?.email}`).then((res) => {
      setStutas(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  const handleAddFavorite = async () => {
    await axiosSecure
      .post("/favourites", {
        userEmail: user?.email,
        biodataId: id,
        name: datas?.name,
        permanentDivision: datas?.permanentDivision,
        addid: datas?.addid,
        Occupation: datas?.occupation,
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Add to Favorites",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Allready Added",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }
      })
      .catch((err) => {
        console.error("ফেভারিটে সমস্যা:", err);
        alert("ফেভারিট করতে সমস্যা হয়েছে।");
      });
  };

  console.log(datas);

  return (
    <div className="min-h-[calc(100vh-400px)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {/* Profile Image */}
        <div className="col-span-1">
          <img
            data-aos="fade-right"
            className="w-full h-full rounded-xl object-contain shadow-lg"
            src={datas?.profileImage}
            alt={datas?.name}
          />
        </div>

        {/* Biodata Details */}
        <div
          data-aos="fade-left"
          className="col-span-2 bg-white rounded-xl shadow-lg border border-yellow-400 p-6 flex flex-col gap-3"
        >
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">
            {datas?.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <span className="font-semibold text-gray-700">Occupation:</span>{" "}
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
              {stutas?.status === "premium" || stutas?.role === "admin" ? (
                <div>
                  <p>
                    <span className="font-semibold text-gray-700">Mobile:</span>{" "}
                    {datas?.mobile}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Email:</span>{" "}
                    {datas?.user || "N/A"}
                  </p>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn bg-amber-400"
                  >
                    Purchase information
                  </button>
                  <PurchaseModal
                    id={datas?.addid}
                    email={user?.email}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
                </>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            {role === "admin" ? (
              ""
            ) : (
              <button
                // disabled={disabled ? "cursor-not-allow" : ""}
                onClick={handleAddFavorite}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-all"
              >
                Add Favorite
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 space-y-3 max-w-7xl mx-auto my-4">
        {gender.map((service) => (
          <BiodataCard service={service} key={service?._id}></BiodataCard>
        ))}
      </div>
    </div>
  );
}
