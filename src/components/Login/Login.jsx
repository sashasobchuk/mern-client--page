import React,{useState} from 'react';
import "./Login.css"
import Input from "../../utils/input/input";
import {useDispatch} from "react-redux";
import {login} from "../../api/api";

const Login  = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    return (
        <div className="registration">
            <div className="registration__header"> авторизація</div>
            <Input value={email} setValue={setEmail} type='text' placeholder = 'login  '/>
            <Input value={password } setValue={setPassword} type='password' placeholder = 'password'/>
            <button className="registration__btn" onClick={()=>dispatch(login(email,password))}>увійти</button>

        </div>
    );
};

export default Login ;
