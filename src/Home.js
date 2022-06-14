import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Home() {
  let navigate = useNavigate();
  const [students, setStudents] = useState([]);
  let formik = useFormik({
    initialValues: {
      name: "",
      commit: "",
    },
  });

  async function fetchAll() {
    try {
      let studentsData = await axios.get("https://versioncontrol-12.herokuapp.com/viewrepo", {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setStudents(studentsData.data);
    } catch (error) {
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

 

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this student?"
      );
      if (ask) {
        await axios.delete(`https://versioncontrol-12.herokuapp.com/deleterepo/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        });
        fetchAll();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  let handleLogout = () => {
    window.localStorage.removeItem("myapptoken");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <nav class="navbar bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <i class="ms-2  fa-brands fa-github-alt" />
            <span className="ms-2 fs-3">Version Control</span>
          </a>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <Link to={"/newrepo"}>
                <li className="me-5">Create a new repository</li>
              </Link>
            </li>
            <li>
              <a onClick={handleLogout} className=" ">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="row">
        <div className="col-lg-4">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                return (
                  <tr>
                    <td>{student.name}</td>
                    <td>
                      <button className="btn btn-primary btn-sm ms-2">
                        view
                      </button>
                      <Link to={`/editrepo/${student._id}`} 
                        className="btn btn-warning btn-sm ms-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="btn btn-danger btn-sm ms-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
