import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getFiles, searchFiles, uploadFile} from "../../api/file";
import "./Disk.css"
import FileList from "./fileList/fileList";
import Popup from "./Popup";
import {setCurrentDir, setPopupDisplay, setView} from "../../redux/fileReducer";
import {useState} from "react";
import Uploader from "./uploader/uploader";
import {hideLoader} from "../../redux/appUtils";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)

    const [dragEnter, setDragenter] = useState(false)
    const [sort, setSort] = useState('date')
    const isLoading = useSelector(state => state.utils.isLoader)
    const [searchInput, changeSearchInput] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)


    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function closeDirHandler() {
        dispatch(setPopupDisplay('none'))
    }

    function backClickHandler() {
        /* pop() бере останій елемент масиву */
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))

    }

    function fileUploadHandler(event) {
        /* files  це всі файли*/
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))

    }

    function dragEnterHandler(event) {
        /* превент дефолд просто  щоб не файл не просто відкривався*/
        event.preventDefault()
        /* щоб не розповсюджувалось на інші файли*/
        event.stopPropagation()
        setDragenter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragenter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragenter(false)

    }

    function searchChangeHandler(e) {
        changeSearchInput(e.target.value);
        e.target.focus()

        if (searchTimeout !== false) {
                changeSearchInput(e.target.value);
                clearTimeout(searchTimeout)
            }
        if (e.target.value !== '') {
                setSearchTimeout(setTimeout((value) => {
                    dispatch(searchFiles(value))
                    dispatch(hideLoader())
                }, 200, e.target.value))
        }
        else {
                console.log(e.target.value)
            dispatch(hideLoader())
            dispatch(getFiles(currentDir, sort))

        }
    }

    if (isLoading) {
        /* loader*/
        return <div className='loader'>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    }


    return (!dragEnter ?
            <div className='disk'
                 onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}
            >
                <div className="disk__btns">
                    <button className="disk__back" onClick={() => backClickHandler()}> вернутися назад</button>
                    <button className="disk__create" onClick={() => showPopupHandler()}> створити папкут</button>
                    <div className='disk__upload'>
                        <label htmlFor="disk__upload-input" className='disk__upload-label'> загрузити файл
                            {/* multiple={true} означає можна вибрати багато файлів */}
                            <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file"
                                   id='disk__upload-input' className='disk__upload-input'/>
                        </label>
                    </div>
                    <div>
                        {/* select how to sorting*/}

                        <select className='disk__select'
                                onChange={(e) => setSort(e.target.value)}
                                value={sort}
                        >
                            <option value="name"> по імені</option>
                            <option value="type"> по типу</option>
                            <option value="date">по даті</option>

                        </select>
                    </div>
                    <div>
                        {/* select how to wisualizate files */}
                        <button className='disk__plate' onClick={() => dispatch(setView('plate'))}></button>
                        <button className='disk__list' onClick={() => dispatch(setView('list'))}></button>
                    </div>
                    <input className='inputFilesSearch'
                           type='text'
                           onChange={(e) => searchChangeHandler(e)}
                           value={searchInput}
                           placeholder='введіть назву для пошуку'/>

                </div>
                <FileList/>
                <Popup closeDirHandler={closeDirHandler}/>
                <Uploader/>
            </div>
            :
            <div className='drop-area'
                 onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler}
                 onDrop={dropHandler}
                 onDragOver={dragEnterHandler}
            >
                перетягніть файли сюди

            </div>
    );
};

export default Disk;
