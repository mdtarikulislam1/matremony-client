import getSecureAxios from "../../Shared/secureAxios";
import Swal from "sweetalert2";

export default function ContactTable({ data, setData }) {
  const axiosSecure = getSecureAxios();
  const id = data?.parcelId;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This data will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/deleteBuyData/${id}`)
          .then((res) => {
            if (res.data.success) {
              // Filter the deleted item from list
              setData((prevData) =>
                prevData.filter((item) => item.parcelId !== id)
              );

              Swal.fire("Deleted!", "Your data has been deleted.", "success");
            } else {
              Swal.fire("Error!", res.data.message || "Delete failed", "error");
            }
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{data?.parcelId}</td>
      <td className="p-3">
        {data?.pending === false ? "Approved" : "Pending..."}
      </td>
      <td className="p-3">
        {data?.pending === false ? <p>{data?.mobile}</p> : "Pending..."}
      </td>
      <td className="p-3">
        {data?.pending === false ? <p>{data?.buyuser}</p> : "Pending..."}
      </td>
      <td className="p-3">
        <button
          onClick={handleDelete}
          disabled={data?.pending === true}
          className={`px-2 py-1 text-white text-xs rounded transition 
      ${
        data?.pending === true
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600 cursor-pointer"
      }`}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
