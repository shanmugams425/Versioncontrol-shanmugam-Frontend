import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate : ( values ) => {
      const errors = {};

      if (!values.name) {
        errors.name  = 'This field cannot be empty';
      } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less';
      }
      

      if (!values.email) {
        errors.email  = 'This field cannot be empty';
      }
   
      if (!values.password) {
        errors.password = 'This field cannot be empty';
      } else if ( values.password.length > 15 ) {
        errors.password = 'Must be below 15 characters';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.post('https://versioncontrol-12.herokuapp.com/register', values);
        navigate('/');
      } catch (error) {
        console.log(error);
        alert('Something went wrong');
      }
    },
  });
  return (
    <div className="container">
       <div className="row mt-5 p-2">
        <div className="col-4"></div>
        <div className="card shadow bg-white col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
      <form onSubmit={formik.handleSubmit}>
      <h3 className="mt-3 text-center">Register</h3>

        <div className="row">
          <div className="col-lg-12 mt-2">
            <label>Name</label>
            <input
              type={'text'}
              name="name"
              id="name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
            /> {formik.errors.name ? <div style={{color : "red"}}>{formik.errors.name}</div> : null }
          </div>
          <div className="col-lg-12 mt-2">
            <label>Email</label>
            <input
              type={'email'}
              name="email"
              id="email"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
            />  {formik.errors.email ? <div style={{color : "red"}}>{formik.errors.email}</div> : null }
          </div>
          <div className="col-lg-12 mt-2">
            <label>Password</label>
            <input
              type={'password'}
              name="password"
              id="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
            />{formik.errors.password ? <div style={{color : "red"}}>{formik.errors.password}</div> : null }
          </div>
          <div className="col-lg-12 m-2">
            <input type={'submit'} className="btn btn-primary" value="Submit" />
          </div>
        </div>
      </form>
     </div>  
     </div> 
    </div>
  );
}

export default Register;
