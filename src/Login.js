import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [password,setpassword] = useState("")
  
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        let loginData = await axios.post("https://versioncontrol-12.herokuapp.com/login", values);
        window.localStorage.setItem("myapptoken", loginData.data.token);
        navigate("/home");
      } catch (error) {
        console.log(error);
       setpassword("Invaild email or password")
      
      }
    },
  });
  return (
    <div className="container">
      <div className="row mt-5 p-2 ">
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
          <h1 className="text-center text-primary p-1">
            Version Control System
          </h1>
          <p className="text-center">
            Version control, also known as source control, is the practice of
            tracking and managing changes to software code. Version control
            systems are software tools that help software teams manage changes
            to source code over time. As development environments have
            accelerated, version control systems help software teams work faster
            and smarter. Version control software keeps track of every
            modification to the code in a special kind of database. If a mistake
            is made, developers can turn back the clock and compare earlier
            versions of the code to help fix the mistake while minimizing
            disruption to all team members.
          </p>
        </div>
        <div className="col-1"></div>
        <div className="card shadow  bg-white col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
          <form class onSubmit={formik.handleSubmit}>
            <h4 className="mt-3 text-center">Login</h4>

            <div className="m-3 fw-2">
              <label>Email</label>
              <input
                type={"email"}
                className="form-control"
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="m-3">
              <label>Password</label>
              <input
                type={"password"}
                className="form-control"
                name="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                
              /><span className="text-start text-danger">{password}</span>
            </div>
            <p></p>
            <div className="ms-3 m-3">
              <input
                type={"submit"}
                className="btn btn-primary"
                value={"Login"}
              />
              <Link to={"/register"} className="link-primary ms-3">
                Register
              </Link>

              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
