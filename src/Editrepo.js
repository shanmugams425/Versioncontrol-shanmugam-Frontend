import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function CreateRespo() {
  let navigate = useNavigate();
  let params = useParams();
  const [currentStudent, setCurrentStudet] = useState("");

  let formik = useFormik({
    initialValues: {
      name: "",
      commit: "",
      code: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://versioncontrol-shanmugam-backend-5a7s7wf0x-shanmugams425.vercel.app/editrepo/${currentStudent}`,
          values,
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );
        navigate("/home");
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    },
  });

  useEffect(async () => {
    try {
      let studetData = await axios.get(
        `https://versioncontrol-shanmugam-backend-5a7s7wf0x-shanmugams425.vercel.app/repo/${params.id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      formik.setValues({
        name: studetData.data.name,
        commit: studetData.data.commit,
        code: studetData.data.code,
      });
      setCurrentStudet(studetData.data._id);
    } catch (error) {
      alert("Something went wrong1");
    }
  }, []);

  return (
    <div className="container card-body ">
      <form onSubmit={formik.handleSubmit}>
        <div className="card">
          <h5 className="card-header fs-3"> Version Control system </h5>
          <div className="container row mt-3 mb-3">
            <div className="">
              <h3 className="link-primary">{formik.values.name}</h3>
            </div>
            <div className="mt-2">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                {" "}
                Commit
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
            <span className="text-center text-danger"></span>
            <div className="d-grid mt-3 col-1 mx-auto">
              <button
                className="btn btn-success"
                type={"submit"}
                value="Submit"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateRespo;
