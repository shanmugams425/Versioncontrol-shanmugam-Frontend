import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

function Viewrepo() {

    let params = useParams()
    const [users, setusers] = useState("_")

    
    let formik = useFormik({
        initialValues: {
          name:"",
          commit:""
    
    
        }})   
    
    
    useEffect( async () => {
        try {
            let repoData = await axios.get(`https://versioncontrol-12.herokuapp.com/repo/${params.id}`, {
                headers: {
                  Authorization: window.localStorage.getItem("myapptoken"),
                },
              });
              formik.setValues({
                      name: repoData.data.name,
                      commit: repoData.data.commit,
                      code:repoData.data.code
                    });
                    setusers(repoData.data)
            } catch (error) {
              alert("Something went wrong");
        }         
     }, [])

  return (
    <div className="container card-body ">
    <div>
      <p>{`Name : ${users.name}`}</p>
      <p>{`Message : ${users.commit}`}</p>
      <p>{`Code : ${users.code}`}</p>

    </div>
 </div>
);
}

export default Viewrepo