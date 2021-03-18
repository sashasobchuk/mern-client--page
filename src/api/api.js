import axios from "axios";
import {setUser} from "../redux/userReducer";
import {API_URL} from "../accets/config";

export const registration =  (email, password) => {

    return async  dispatch =>{
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            email,
            password
        })
        await console.log(response)
        await console.log(response)
        if (response.status === 200) {
             await  dispatch(login(email,password))
            console.log("registrotion file",response.data.message)

        }

    } catch (error) {

        console.log(error)
        alert("error in createing user",error)

    }}

}
export const login = (email, password) => {

    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
            if (response.status === 200){
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
                console.log('response data from login ',response.data)
            }
            else {
                console.log('problem in login')
            }


        } catch (error) {

            alert(error)
             localStorage.removeItem('token')


        }
    }

}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (error) {
            console.log(error.response)
            localStorage.removeItem('token')

        }
    }
}
export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file',file)
            const response = await axios.post(`${API_URL}api/files/avatar`,formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
            localStorage.setItem('token', response.data)
        } catch (error) {
            alert("error in upload avatar ", error.response)

        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (error) {
            alert("error in delete avatar ", error.response)

        }
    }
}

