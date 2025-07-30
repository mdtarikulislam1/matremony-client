import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import getSecureAxios from "../../Shared/secureAxios";

export default function ApprovedContactRequest() {
  const axiosSecure = getSecureAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/parcels/allData").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleApproved = (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this contact request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/updateParcel/${id}`, { email })
          .then((res) => {
            if (res?.data) {
              Swal.fire("Approved!", "The contact request has been approved.", "success");

              // ডাটা আপডেট করে বোতামের টেক্সট চেঞ্জ করা
              setData((prevData) =>
                prevData.map((item) =>
                  item.parcelId === id ? { ...item, pending: false } : item
                )
              );
            } else {
              Swal.fire("Error!", res.data.message || "Approval failed", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto text-nowrap">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <td className="border p-2">Email</td>
            <td className="border p-2">Biodata Id</td>
            <td className="border p-2">Approved contact request</td>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d?.parcelId}>
              <td className="border p-2">{d?.email}</td>
              <td className="border p-2">{d?.parcelId}</td>
              <td className="p-3 border">
                <button
                  onClick={() => handleApproved(d?.parcelId, d?.email)}
                  disabled={d?.pending === false}
                  className={`px-2 py-1 text-white text-xs rounded ${
                    d?.pending === false
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {d?.pending === false ? "Already Approved" : "Approve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
