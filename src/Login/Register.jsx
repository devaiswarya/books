import React, { useState } from 'react'
import model from './Register.module.css'
import { wait } from '@testing-library/user-event/dist/utils'
import axios from 'axios'

const Register = () => {
   
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [number,setnumber] = useState('')
    const [password,setpassword] = useState('')
    const [confirm,setconfirm] = useState('')
    const [error,seterror] = useState([])
 
    const validate = () => {
        const newError = {}
        if(!name.trim()){
            console.log("Name is required")
            newError.name="Name is required"
        }
        if(!email.trim()){
            console.log("Email is required")
            newError.email="Email is Required"
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log("Enter the correct email")
            newError.email="Enter the correct email"
        }
        if(!number.trim()){
            console.log("PhoneNumber is required")
            newError.number="PhoneNumber is required"
        }
        else if(!/^[6-9]\d{9}$/.test(number)){
            console.log("Enter the correct phone number")
            newError.number="Enter the correct phone number"
        }
        if(!password.trim()){
            console.log("Password is required")
            newError.password="password is required"
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
            console.log("Enter the correct password")
            newError.password="Enter the correct password"
        }
        if(!confirm.trim()){
            console.log("Confirm password is required")
            newError.confirm="confirm password is required"
        }
         else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(confirm)){
            console.log("Enter the correct password")
            newError.confirm="Enter the correct password"
        }
        seterror(newError)

        return Object.keys(newError).length === 0
    }

    const handlesubmit = async(e) => {
        e.preventDefault();
        if (!validate){
            return ;
        }
        console.log("Resgiter successfully")
        const newdata={
            name:name,
            email:email,
            phone:number,
            password:password,
            confirm:confirm
        }
        try{
            const res = await axios.post(`http://127.0.0.1:8000/api/user/create`,newdata)
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
    }


  return (
    <div className={model.wholeclass}>
      <div className={model.firstclass}>
          <form className={model.superclass}>
            <input type="text" placeholder='Enter your name' value={name} onChange={(e)=>setname(e.target.value)}/>
            {error.name ? <p>{error.name}</p> : ''}
            <input type="text" placeholder='Enter your email' value={email} onChange={(e)=>setemail(e.target.value)}/>
            {error.email ? <p>{error.email}</p> : ''}
            <input type="text" placeholder='Enter your phone number' value={number} onChange={(e)=>setnumber(e.target.value)}/>
            {error.number ? <p>{error.number}</p> : ''}
            <input type="password" placeholder='Enter the password' value={password} onChange={(e) => setpassword(e.target.value)}/>
            {error.password ? <p>{error.password}</p> : ''}
            <input type="password" placeholder='Enter the confirm password' value={confirm} onChange={(e) => setconfirm(e.target.value)}/>
            {error.confirm ? <p>{error.confirm}</p> : ''}
            <div className={model.buttonclass}>
            <button type='submit' onClick={handlesubmit}>Register</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Register