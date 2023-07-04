import { useState } from "react"
import { useLogin } from "../Hooks/useLogin"
const AdminLogin =()=>{


    const[user,set_user] = useState({username:"",password:""})
    const{login,isloading,error} = useLogin()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        await login(user.username,user.password)
    }
    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login admin</h3>
            <input type="text" placeholder="username"  onChange={(e)=>set_user({...user,username:e.target.value})}/>
            <input type="text" placeholder="password"  onChange={(e)=>set_user({...user,password:e.target.value})} />
            {error&&<div>{error}</div>}

            <button disabled={isloading}>Login</button>

        </form>
    )
}
export default AdminLogin