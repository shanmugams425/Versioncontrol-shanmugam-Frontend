import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRespo() {
  let a = Date();
  console.log(a);
  let navigate = useNavigate();
  const [wait, setwait] = useState("");

  let formik = useFormik({
    initialValues: {
      name: "",
      commit: "",
      code: "",
    },
    onSubmit: async (values) => {
      setwait("Wait for a moment");
      try {
        await axios.post(
          "https://versioncontrol-12.herokuapp.com/newrepo",
          values,
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );
      } catch (error) {
        alert("Something went wrong");
      }
      navigate("/home");
    },
  });

  return (
    <div className="container card-body ">
      <form onSubmit={formik.handleSubmit}>
        <div className="card">
          <h5 className="card-header fs-3"> Version Control system </h5>
          <div className="container row mt-3 mb-3">
            <div className="col-6">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Create a new repository
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Repository name"
              />
            </div>
            <div className="col-6">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Commit new file
              </label>
              <input
                type="text"
                className="form-control"
                id="commit"
                onChange={formik.handleChange}
                value={formik.values.commit}
                placeholder="Commit"
              />
            </div>
            <div className="mt-5">
              <div className="form-group">
                <textarea
                  className="form-control text-info bg-dark "
                  placeholder="Enter your code here"
                  value={formik.values.code}
                  id="code"
                  rows="15"
                  onChange={formik.handleChange}
                ></textarea>
              </div>
            </div>
            <span className="text-center text-danger">{wait}</span>
            <div className="d-grid mt-3 col-1 mx-auto">
              <button
                className="btn btn-success"
                type={"submit"}
                value="Submit"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateRespo;
