import React from 'react';
import './file.css'

import dirLogo from './../../../../accets/img/dir.svg'
import fileLogo from './../../../../accets/img/file.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../redux/fileReducer";
import {deleteFile, downloadFile} from "../../../../api/file";
import sizeFormat from "../../../../utils/sizeFormat";


const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state=>state.files.view)
    function openDirHandler() {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {

        e.stopPropagation()
        dispatch(deleteFile(file))

    }
if(fileView ==='list'){
    return (
        <div className='file' onClick={() => openDirHandler()}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className='file__img'/>
            <div className="file__name">{file.name}</div>
            {file.date && <div className="file__date">{file.date.slice(0, 10)}</div>}
            <div className="file__size">{sizeFormat(file.size)}</div>
            {file.type !== 'dir' &&
            <button onClick={(event) => downloadHandler(event)}
                    className='file__btn file__download'> скачати</button>}

            <button onClick={(e) => {
                deleteClickHandler(e)
            }} className='file__btn file__delete'> delete
            </button>
        </div>
    );
}
    if(fileView ==='plate'){
        return (
            <div className='file-plate' onClick={() => openDirHandler()}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className='file-plate__img'/>
                <div className="file-plate__name">{file.name}</div>
                {file.type !== 'dir' &&
                <button onClick={(event) => downloadHandler(event)}
                        className='file-plate__btn file-plate__download'> скачати</button>}

                <button onClick={(e) => {
                    deleteClickHandler(e)
                }} className='file-plate__btn file-plate__delete'> delete
                </button>
            </div>
        );
    }

};

export default File;