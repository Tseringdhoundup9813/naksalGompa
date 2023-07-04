
import { useAuthContext } from "./useAuthContext"

export const useLogout =()=>{

    const{dispatch} = useAuthContext()

    const logout  = ()=>{
        // remove form user
        localStorage.removeItem("user")

        dispatch({type:"LOGOUT"})
        window.location.replace("http://localhost:3000/admin/login")

    }
    return {logout}
}