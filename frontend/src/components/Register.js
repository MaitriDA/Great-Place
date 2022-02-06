import React,{useState} from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CancelIcon from '@material-ui/icons/Cancel';
import './Register.css';
import axios from "axios";

export default function Register ({setRegister,setCurrentUser}) {
    const [error,setError]=useState(false);
    const [errMsg,setErrMsg]=useState("Error")
    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [cpassword,setCPassword]=useState();

    const handleRegister=async(e)=>{
        e.preventDefault();
        if(password!==cpassword){
            setError(true);
            setErrMsg("Password and ConfirmPassword not matching")
        }
        else{
            const user={
                username,email,password
            }
            try{
                const res=await axios.post("http://localhost:8800/server/auth/register",user);
                if(res.data==='User already exist'){
                    setErrMsg(res.data);
                    setError(true);
                }
                else{
                    setError(false);
                    console.log(res.data);
                    localStorage.setItem("user",JSON.stringify(res.data.user));
                    setCurrentUser(localStorage.getItem("user"))
                    setRegister(false);
                }
            }catch(err){
                setErrMsg("Something went Wrong");
                setError(true)
            }
        }

    }
  return <div>
  <div className="registerContainer">
      <div className="logo">
          <LocationOnIcon className="logoIcon" />
          <span>A Great Place</span>
      </div>
      <div>REGISTER</div>
      <form onSubmit={handleRegister}>
          <input autoFocus placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
          <input autoFocus placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" min="6" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
          <input type="password" min="6" placeholder="confirm password" onChange={(e)=>setCPassword(e.target.value)}/>
          <button className="registerBtn" type="submit"> Register </button>
          {error && (<span className="failure">{errMsg}</span>)}
      </form>
      <CancelIcon className="registerCancel" onClick={()=>setRegister(false)}/>
  </div>
</div>;;
};

