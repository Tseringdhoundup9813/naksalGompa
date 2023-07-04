
import {useState} from 'react'
import { useAuthContext } from "./useAuthContext"
import axios from 'axios'
import { redirect } from 'react-router-dom'

export const useLogin = ()=>{

    const[error,setError] = useState(null)
    const[isLoading,setLoading] = useState(null)
    const{dispatch} = useAuthContext()

    const login =async(username,password)=>{
        setLoading(true)
        setError(null)
        try{
            const response = await axios.post("http://localhost:8001/api/user/login",{username,password})
            setLoading(false)
            // save the user to local storage
            console.log(response)
            localStorage.setItem("user",JSON.stringify(response.data))

            dispatch({type:"LOGIN",payload:response.data})
            if(response.data){
                console.log("login successfull")
                // return redirect("/admin/banner");
                window.location.replace("http://localhost:3000/admin/uploadbanner")
                
            }
           
           
         
        }
        catch(err){
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }

    }
    return {login,isLoading,error}
}