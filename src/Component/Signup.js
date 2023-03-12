import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
 
    let navigate = useNavigate();
    const [cred , setCred]=useState({email:"",password:""})
    const onChange=(e)=>{
        
        setCred({...cred ,[e.target.name]: e.target.value})
      }
      const handleSignup=async()=>{
        console.log("clicked on signup")
         const config = {
                headers:{
                    "Content-Type": "application/json",
                    
                }
              };
              const url = "http://localhost:5000/restapi/user/createuser";
              const data ={
                email:cred.email,                            
                password: cred.password
              }
             
              console.log(data)  
         let res = await  axios.post(url,data,config)
         console.log(res)
      if(res.data.userToken){
        localStorage.setItem('token',res.data.userToken)
        navigate('/home')
      } 
        }
      
    return (
        <div>
            <div className='container'>
                <h2>Signup to Continue</h2>
                <div className="margin-3">
                    <label htmlFor="email" className="email_label">Email</label><br />
                    <input type="email" className="email_input" id="email" row="2" onChange={onChange} name="email" value={cred.email} />
                </div>

                <div className="margin-3">
                    <label htmlFor="description" className="description_label">Password</label><br />
                    <textarea className="description_input" id="description" rows="2" onChange={onChange} name="password" value={cred.password}></textarea>
                </div>
                <button className="btn btn-dark" onClick={handleSignup}>Signup</button>
            </div>
        </div>
    )
}


export default Signup
