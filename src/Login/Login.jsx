import React, { useState } from 'react'
import models from '../Login/Login.module.css'
import { wait } from '@testing-library/user-event/dist/utils'
import axios from 'axios'

const Login = () => {
    
    const [username,setusername] = useState('')
    const [passwords,setpasswords] = useState('')
    const [error,seterror] = useState([])

    const validate = () => {
        const newError = {}
        if(!username.trim()){
            console.log("username is required")
            newError.username="username is required"
        }
        if(!passwords.trim()){
            console.log("Password is required")
            newError.passwords="Password is required"
        }
        // else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwords)){
        //     console.log("Enter the correct password")
        //     newError.passwords="Enter the correct password"
        // }
        seterror(newError)

        return Object.keys(newError).length === 0
    }
    const handlesubmit = async(e) => {
        e.preventDefault();

        if(!validate()){
            return;
        }
        const newdata = {
            email:username,
            password:passwords
        }
        console.log("Login Successfully")
        try{
             const res = await axios.post(`http://127.0.0.1:8000/api/user/gets`,newdata)
             console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div className={models.wholeclass}>
      <div className={models.firstclass}>
          <form className={models.superclass}>
            <input type="text" placeholder='Enter your name' value={username} onChange={(e)=>setusername(e.target.value)}/>
            {error.username ? <p>{error.username}</p> : ''}
            <input type="password" placeholder='Enter the password' value={passwords} onChange={(e)=>setpasswords(e.target.value)}/>
            {error.passwords ? <p>{error.passwords}</p> : ''}
            <div className={models.buttonclass}>
            <button onClick={handlesubmit}>Login</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Login
