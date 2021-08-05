import React, {useEffect} from 'react'
import axiosInstance from '../Context/Axios'

const CheckToken = (props) => {

    const get_token = ()=>{
        axiosInstance.get('/api/user/auth/check').then(
            data => {
                console.log(data)
                props.navigation.push('Home')
            }
        )
    }

    useEffect(()=>{
        get_token()
    },[])


    return (<></>)
}

export default CheckToken;