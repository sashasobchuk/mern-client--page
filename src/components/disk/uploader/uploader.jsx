import React from 'react';
import UploadFile from "./UploadFile";
import './uploader.css'
import {useDispatch, useSelector} from "react-redux";
import {hideLoader} from "../../../redux/uploudReducer";

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    // const files = [{id: 1, name: 'file', progress: 100}, {id: 1, name: 'file', progress: 50}]
    const  isVisible = useSelector(state => state.upload.isVisible)
    const dispatch=useDispatch()

    return (
        isVisible ===true?
        <div className='uploader'>
            <div className='uploader__header'>
                <div className='uploader__title'>загрузки</div>
                <button className='uploader__close' onClick={()=>dispatch(hideLoader())}>X</button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file} />


            )}

        </div>
            :
            <div>
            </div>
    );
};

export default Uploader;