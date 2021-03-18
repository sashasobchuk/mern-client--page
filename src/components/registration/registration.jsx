import React,{useState} from 'react';
import "./registration.css"
import Input from "../../utils/input/input";
import {registration} from "../../api/api";
import {useDispatch} from "react-redux";
const Registration  = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
        <div className="registration">
            <div className="registration__header"> регістрація</div>
            <Input value={email} setValue={setEmail} type='text' placeholder = 'login  '/>
            <Input value={password } setValue={setPassword} type='password' placeholder = 'password'/>

            <button className="registration__btn" onClick={()=> dispatch(registration(email, password))}>увійти</button>
        {/*  <button className="registration__btn" onClick={()=>dispatch(login(email,password))}>увійти</button>
*/}
        </div>
    );
};

export default Registration ;
