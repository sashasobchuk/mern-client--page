import React from 'react';
import {useSelector} from "react-redux";
import File from "./file/file";
import "./fileList.css"
import {CSSTransition, TransitionGroup} from "react-transition-group";

const FileList = () => {

    const files = useSelector(state => state.files.files)
    const fileView = useSelector(state => state.files.view)
/*    if (files.length === 0) {
        return (
            <div className='loader'>
                папка пуста
            </div>
        )
    }*/
    if (fileView === 'list') {
        return (
            <div className='filelist'>
                <div className='filelist__header'>
                    <div className='filelist__name'> назва</div>
                    <div className='filelist__date'>дата</div>
                    <div className='filelist__size'>розмір</div>
                </div>
                <TransitionGroup>
                    {files.map(file =>
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames={'file'}
                            exit={false}

                        >
                            <File file={file}/>

                        </CSSTransition>
                    )}

                </TransitionGroup>
            </div>
        );
    }
     if(fileView ==='plate' ){
         return (
             <div className='filePlate'>
                 {files.map(file=>
                 <File key={file._id} file={file}/>)}
             </div>
         )
}
}
export default FileList;