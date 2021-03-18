import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../api/api";

const Profile = () => {
    const dispatch = useDispatch()

    function uploadAvaHandler(e) {

        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
        return undefined;
    }

    return (
        <div>
            <button onClick={()=>dispatch(deleteAvatar())}>  удалити аватар</button>
            <input accept='image/*' type="file" placeholder='загрузити аву' onChange={(e)=>uploadAvaHandler(e)}/>
        </div>
    );
};

export default Profile;