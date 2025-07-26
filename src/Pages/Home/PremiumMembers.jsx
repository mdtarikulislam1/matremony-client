import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getSecureAxios from "../Shared/secureAxios";

export default function PremiumMembers() {
  const axiosSecure = getSecureAxios();
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axiosSecure
      .get(`/premium-members?order=${sortOrder}`)
      .then((res) => setMembers(res.data))
      .catch((err) => console.error("Error loading premium members:", err));
  }, [sortOrder]);

  const handleViewProfile = (id) => {
    navigate(`/details/${id}`);
  };
  console.log(members);
  return (
    <section className="max-w-6xl mx-auto p-4 my-8">
      <h2 className="text-3xl font-bold text-center">Premium Members</h2>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border border-gray-300 p-2 rounded my-4"
      >
        <option value="asc">Age: Low to High</option>
        <option value="desc">Age: High to Low</option>
      </select>

      <div className="grid md:grid-cols-3 gap-6">
        {members.map((user) => (
          <div
            key={user._id}
            className="border border-gray-400 rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-60 object-cover object-top rounded-md mb-4"
            />
            <p>
              <strong>Biodata ID:</strong> {user.addid}
            </p>
            <p>
              <strong>Type:</strong> {user.biodataType}
            </p>
            <p>
              <strong>Division:</strong> {user.permanentDivision}
            </p>
            <p>
              <strong>Age:</strong> {user.yourAge}
            </p>
            <p>
              <strong>Occupation:</strong> {user.occupation}
            </p>
            <button
              onClick={() => handleViewProfile(user._id)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
