import React, { useEffect, useState } from "react";
import getSecureAxios from "../Shared/secureAxios";
import BiodataCard from "./BiodataCard";

export default function Biodatas() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [maxPageButtons, setMaxPageButtons] = useState(5);
  const itemsPerPage = 3;
  // const maxPageButtons = 5;
  const axiosSecure = getSecureAxios();

  const [ageRange, setAgeRange] = useState([18, 60]);
  const [biodataType, setBiodataType] = useState("");
  const [division, setDivision] = useState("");

  useEffect(() => {
    const updateMaxButtons = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setMaxPageButtons(3);
      } else if (width < 768) {
        setMaxPageButtons(4);
      } else if (width < 1024) {
        setMaxPageButtons(5);
      } else {
        setMaxPageButtons(7);
      }
    };

    updateMaxButtons(); // initial set
    window.addEventListener("resize", updateMaxButtons); // listen to resize

    return () => window.removeEventListener("resize", updateMaxButtons);
  }, []);

  useEffect(() => {
    axiosSecure
      .get("/matremony/allData")
      .then((response) => {
        setServices(response.data);
        setFiltered(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const handleFilter = () => {
    let result = services;

    result = result.filter(
      (item) =>
        parseInt(item.yourAge) >= ageRange[0] &&
        parseInt(item.yourAge) <= ageRange[1]
    );

    if (biodataType) {
      result = result.filter((item) => item.biodataType === biodataType);
    }

    if (division) {
      result = result.filter((item) => item.permanentDivision === division);
    }

    setFiltered(result);
    setCurrentPage(1);
    setStartIndex(0);
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setPageLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageLoading(false);
    }, 300);
  };

  const handleNextSet = () => {
    if (startIndex + maxPageButtons < totalPages) {
      setStartIndex(startIndex + maxPageButtons);
    }
  };

  const handlePrevSet = () => {
    if (startIndex - maxPageButtons >= 0) {
      setStartIndex(startIndex - maxPageButtons);
    }
  };

  const visiblePages = Array.from(
    { length: Math.min(maxPageButtons, totalPages - startIndex) },
    (_, i) => startIndex + i + 1
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="my-10 lg:max-w-11/12 xl:w-full mx-auto px-4">
      <h2 className="py-4 text-2xl font-semibold text-center">
        Choose Your Partner
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4 w-full bg-white border rounded p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Filter</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Age Range</label>
            <input
              type="range"
              min={18}
              max={60}
              value={ageRange[1]}
              onChange={(e) => setAgeRange([18, parseInt(e.target.value)])}
              className="range"
            />
            <p className="text-xs text-gray-600">18 to {ageRange[1]} years</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Biodata Type
            </label>
            <select
              value={biodataType}
              onChange={(e) => setBiodataType(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Division</label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">All</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>

          <button
            onClick={handleFilter}
            className="btn btn-primary w-full mt-2"
          >
            Apply Filters
          </button>
        </div>

        <div className="lg:w-3/4 w-full">
          {pageLoading ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
              {currentItems.length > 0 ? (
                currentItems.map((service) => (
                  <BiodataCard key={service._id} service={service} />
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-600">
                  No biodata found.
                </p>
              )}
            </div>
          )}

          {/* Updated Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8 overflow-x-auto">
            <button
              onClick={handlePrevSet}
              disabled={startIndex === 0}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 text-nowrap"
            >
              Prev
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm border rounded transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-blue-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNextSet}
              disabled={startIndex + maxPageButtons >= totalPages}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 text-nowrap"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
