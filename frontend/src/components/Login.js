import React, { useState } from 'react';
import './Login.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';

const Login = ({ setLogin,setCurrentUser }) => {
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState("Error")
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {email, password}
        try {
            const res = await axios.post("http://localhost:8800/server/auth/login", user);
            if(res.data.message=="Invalid credentials"){
                setErrMsg("Invalid credentials");
                setError(true);
            }
            else if(res.data.message=="Login Successful"){
                console.log(res.data.userFind);
                localStorage.setItem("user",JSON.stringify(res.data.userFind));
                setCurrentUser(res.data.userFind)
                setLogin(false);
                setError(false);
            }
        } catch (err) {
            setErrMsg("Something went Wrong");
            setError(true)
        }
    }

    return <div>
        <div className="loginContainer">
            <div className="logo">
                <LocationOnIcon className="logoIcon" />
                <span>A Great Place</span>
            </div>
            <div>LOGIN</div>
            <form onSubmit={handleLogin}>
                <input autoFocus placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password"min="6"placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="loginBtn" type="submit">Login</button>
                {error && (<span className="failure">{errMsg}</span>)}
            </form>
            <CancelIcon className="loginCancel" onClick={() => setLogin(false)} />
        </div>
    </div>;
};

export default Login;
