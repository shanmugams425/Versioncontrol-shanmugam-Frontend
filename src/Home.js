import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Home() {
  let navigate = useNavigate();
  const [students, setStudents] = useState([]);
  
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
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="ms-2  fa-brands fa-github-alt" />
            <span className="ms-2 fs-3">Version Control</span>
          </a>
          <ul className="nav justify-content-end">
            <li  className="nav-item me-3">
              <Link to={"/newrepo"}>
                Create a new repository
              </Link>
            </li>
            <li className="nav-item">
              <a href= "#"onClick={handleLogout} >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>



      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
          <table className="table table-striped">
            <thead>
              <tr className="text-center">
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                return (
                  <tr className="text-center">
                    <td className="h5 text-dark">{student.name}</td>
                    <td>
                      <Link to={`/viewrepo/${student._id}`}
                        className="btn btn-primary btn-sm ms-2">
                        view
                      </Link>
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
