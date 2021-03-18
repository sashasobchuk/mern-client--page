import axios from "axios";
import {addFiles, deleteFileAction, setFiles} from "../redux/fileReducer";
import {addUploadFile, changeUploudFile, showeUpLoader} from "../redux/uploudReducer";
import {hideLoader, showeLoader} from "../redux/appUtils";
import {API_URL} from "../accets/config";


export function getFiles(dirId,sort) {
    return async dispatch => {
        dispatch(showeLoader());
        try {
            let url = `${API_URL}api/files`;
            if(dirId){
                url = `${API_URL}api/files?parent=${dirId}`
            }
            if(sort){
                url =`${API_URL}api/files?sort=${sort}`
            }
            if(sort && dirId){
                url = `${API_URL}api/files?sort=${sort}&parent=${dirId}`
            }



            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(setFiles(response.data));
            console.log(response.data)
        } catch (e) {
            console.log(" eroro in getFiles", e)
        }
        /** finnaly  бо воно ж ше може помилку вибити*/
        finally {
            dispatch(hideLoader())
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {

            const response = await axios.post(`${API_URL}api/files`, {
                name: name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(addFiles(response.data))

        } catch (e) {
            console.log(" eroro in createDir", e)

        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId)
            }

            const uploadFile = {name:file.name, progress:0,id:Date.now()};
            dispatch(showeUpLoader());
            dispatch(addUploadFile(uploadFile));
            const response = await axios.post(`${API_URL}api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress:
                    progressEvent => {
                        const totalLength =
                            progressEvent.lengthComputable
                                ?
                                progressEvent.total : progressEvent.target.getResponseHeader('content-length')
                                ||
                                progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        console.log('total', totalLength);
                        if (totalLength) {
                            console.log(process)
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            dispatch(changeUploudFile(uploadFile))
                        }
                    }
            });
            dispatch(addFiles(response.data))
        } catch (e) {
            console.log(" eroro in uploadFile", e)

        }
    }
}


export async function downloadFile(file) {
    const response = await fetch(`${API_URL}api/files?id=${file._id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    try {
        if (response.status === 200) {
            /* блоб подібний фізичному файлу обєкт*/
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.appendChild(link);
            link.click()
            link.remove()
        }
    }catch (e) {
        console.log(" eroro in downloadFile", e)

    }

}


export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files?id=${file._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
           await dispatch(deleteFileAction(file._id))
        } catch (e) {
            console.log("eoror deleteFile",e)
        }
    }
}


export function searchFiles(search) {
    return async dispatch => {
        if( search !=='' ){
        try {
            const response = await axios.get(`${API_URL}api/files/search?search=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            // console.log(response.data)
            dispatch(setFiles(response.data))
        } catch (e) {
        console.log(e?.response?.data?.message)
            dispatch(hideLoader())

        } finally {
            dispatch(hideLoader())
        }}

    }
}






