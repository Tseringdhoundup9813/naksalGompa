import { useState } from "react"
import { useLogin } from "../Hooks/useLogin"
import { NavLink } from "react-router-dom";
const AdminLogin =()=>{


    const[user,set_user] = useState({username:"",password:""})
    const{login,isloading,error} = useLogin()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        await login(user.username,user.password)
    }
    return(
        <div>
            
        {/* <form className="login" onSubmit={handleSubmit}>
            <h3>Login admin</h3>
            <input type="text" placeholder="username"  onChange={(e)=>set_user({...user,username:e.target.value})}/>
            <input type="text" placeholder="password"  onChange={(e)=>set_user({...user,password:e.target.value})} />
            {error&&<div>{error}</div>}

            <button disabled={isloading}>Login</button>
        </form> */}
        <div id="adminlogin">
          {error&&<div className="bg-danger p-1 text-center mb-4 text-white"> Warning : {error}</div>}
        <div className="row w-50 mx-auto">
          <div className="admin-title text-center my-2 text-primary">
            <h3>Admin Dashboard Login</h3>
          </div>
          <form className="login" onSubmit={handleSubmit}>

          <div className="border border-primary p-3 rounded">
            <label htmlFor="username" className="text-capitalize mt-2">
              username
            </label>
            <input type="text" id="username" placeholder="username" onChange={(e)=>set_user({...user,username:e.target.value})} className="form-control mt-2" />
  
            <label htmlFor="password" className="text-capitalize mt-3">
              Password
            </label>
            <input type="password" id="password"  placeholder="password" onChange={(e)=>set_user({...user,password:e.target.value})}  className="form-control mt-2" />
  
            <button className="btn btn-login btn-primary mt-3" disabled={isloading}>Login</button>
          </div>
          </form>
          <div className="mt-3">
            <NavLink to="/" className="text-decoration-none text-success">
              <i class="fa-solid fa-arrow-left"></i> Naksa chhuling Gomba
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    )
}
export default AdminLogin