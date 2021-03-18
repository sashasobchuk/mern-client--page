import React from 'react';
import {useState} from "react";
import "./Disk.css"
import {useDispatch, useSelector} from "react-redux";
import {createDir} from "../../api/file";
import Input from "../../utils/input/input";

const Popup = (props) => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const closeDirHandler = props.closeDirHandler
    const dispatch = useDispatch()

    function uploadRir() {
        dispatch(createDir(currentDir, dirName))
        setDirName('')
        closeDirHandler()
    }

    return (
        <div className="popup" onClick={() => {
            closeDirHandler()
        }} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={(event) => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button className="popup__close" onClick={() => {
                        closeDirHandler()
                    }}>X
                    </button>
                </div>
                <Input type="text" placeholder="Введите название папки..."
                       value={dirName} setValue={setDirName}/>
                <button className="popup__create" onClick={() => uploadRir()}>Создать</button>
            </div>
        </div>
    );
};

export default Popup;