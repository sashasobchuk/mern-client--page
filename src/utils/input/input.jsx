import React from 'react';
import "./input.css"
const Input = ({...props}) => {
    return (
        <div >
            <input
                type = {props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e)=>{props.setValue(e.target.value)}}
            />
        </div>
    );
};

export default Input;
