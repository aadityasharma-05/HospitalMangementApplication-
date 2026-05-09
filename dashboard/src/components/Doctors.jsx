import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/user/doctors",
          {
            withCredentials: true,
          }
        );

        setDoctors(data.doctors || []);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch doctors"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // 🔐 Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // ⏳ Loading state
  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>

      <div className="banner">
        {doctors.length > 0 ? (
          doctors.map((element) => (
            <div className="card" key={element._id}>
              <img
                src={element?.docAvatar?.url || "/default.png"}
                alt="doctor avatar"
              />

              <h4>
                {element.firstName} {element.lastName}
              </h4>

              <div className="details">
                <p>
                  Email: <span>{element.email || "N/A"}</span>
                </p>

                <p>
                  Phone: <span>{element.phone || "N/A"}</span>
                </p>

                <p>
                  DOB:{" "}
                  <span>
                    {element.dob
                      ? element.dob.substring(0, 10)
                      : "N/A"}
                  </span>
                </p>

                <p>
                  Department:{" "}
                  <span>{element.doctorDepartment || "N/A"}</span>
                </p>

                <p>
                  NIC: <span>{element.nic || "N/A"}</span>
                </p>

                <p>
                  Gender: <span>{element.gender || "N/A"}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h2 style={{ textAlign: "center" }}>
            No Registered Doctors Found!
          </h2>
        )}
      </div>
    </section>
  );
};

export default Doctors;