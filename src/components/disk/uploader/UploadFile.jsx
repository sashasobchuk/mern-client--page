import React from 'react';
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../redux/uploudReducer";

const UploadFile = ({file}) => {
    const dispatch=useDispatch()
    return (
        <div className='uploader-file'>

            <div className='uploader-file__header'>
                <div className='uploader-file__name'> {file.name}</div>
                <button className='uploader-file__remove'onClick={()=>dispatch(removeUploadFile(file.id))} >X</button>
            </div>

            <div className='uploader-file__propress-bar'>
                <div className='uploader-file__upload-bar' style={{width:file.progress +'%'}}/>
                <div className='uploader-file__percent'>{file.progress}%</div>
            </div>

        </div>
    );
};

export default UploadFile;