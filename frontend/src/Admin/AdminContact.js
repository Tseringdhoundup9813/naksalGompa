import React,{useState,useReducer, useEffect, useRef} from 'react'

import "../AdminStyle/admincontact.css"
import AdminSideBar from './AdminSideBar'

import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"
import formatDistanceToNow from "date-fns/formatDistanceToNow"



function AdminContact() {
  const[contact_state,contact_dispatch] =useReducer(postReducer,INITIAL_STATE)
  const[singleMessage,singleMessage_dispatch] = useReducer(postReducer,INITIAL_STATE)
  const[seen,set_seen] = useState(false);

useEffect(()=>{
  async function GetTeam(){
    contact_dispatch({type:"FETCH_START"})
    try{
        const response = await axios.get("/getcontact")
        // console.log(response)
        if(response.data.success){
            
            const all_data = response.data.data
            console.log(all_data)
            contact_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
    
        }
    }
    catch(err){
      
        console.log(err)
        if(err.message!=="Network Error"){
            contact_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
            console.log(err.response.data.emptyfield)
        }
    }
}

// 
GetTeam()
},[])








async function GetSingleMessage(id,index){
  const select_customer = document.querySelectorAll(".select-cutomer");
  select_customer.forEach((active)=>{
      active.classList.remove("active");
  })
  select_customer[index].classList.add("active");




  singleMessage_dispatch({type:"FETCH_START"})
  try{
      const response = await axios.get(`/getcontact/${id}`)
      // console.log(response)
      if(response.data.success){
          
          const all_data = response.data.data
          console.log(all_data)
          singleMessage_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
          contact_dispatch({type:"FETCH_SUCCESS",payload:[true,response.data.all]})

  
      }
  }
  catch(err){
    
      console.log(err)
      if(err.message!=="Network Error"){
          singleMessage_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
          console.log(err.response.data.emptyfield)
      }
  }
}
function updateSeen(seen){
  set_seen(seen);
}




  return (
    <div className="admin-contact-container">
        <AdminSideBar></AdminSideBar>
        <div className="admin-contact-message-container">
           
           <div className="admin-message-list">
                <div className="admin-message-title">
                    <h1>Message list</h1>
                </div>
                <div className="message-new-old">
                    <ul>    
                        <li onClick={()=>updateSeen(false)}>not seen </li>
                        <li onClick={()=>updateSeen(true)}>seen</li>
                        <li>important</li>

                        
                    </ul>
                </div>
                <div className="admin-message-name-list">
                  {
                    contact_state.data&&contact_state.data.map((customer,index)=>{
                      return(
                        <div key={customer._id} className='admin-message-customer-list' onClick={()=>GetSingleMessage(customer._id,index)}>
                            <div>
                              <img src="/image/avatar1.png" alt="" />
                            </div>
                            <div className='select-cutomer'>
                               {
                                 
                               }
                                <p>{customer.name}</p>
                                <p> {formatDistanceToNow(new Date((customer.createdAt)))} ago</p>
                            </div>
                        </div>
                      )
                    })
                  }
                  
                  
                </div>
           </div>
           
           {
            
            <>
              
              <div className="admin-message-container" style={{visibility:`${singleMessage.data&&singleMessage.data.length<1?"hidden":"visible"}`}}>
                {
                   
                 
                    <> 
                        {singleMessage.loading?
                          <span class="loader"></span>:""
                        }
                        <h1>{singleMessage.data[0]&&singleMessage.data[0].subject}</h1>
                        <div>
                        <p>{singleMessage.data[0]&&singleMessage.data[0].message}</p>
                        </div>
                    </>
                   
                  
                 
                }
               
                <button>important</button>
                </div>
                <div className="admin-customer-detail-container"  style={{visibility:`${singleMessage.data&&singleMessage.data.length<1?"hidden":"visible"}`}}>
                  <div className="cutomer-email">
                      <li><i class="fa-regular fa-envelope"></i></li>
                      <li>
                       {singleMessage.data[0]&&singleMessage.data[0].email}
                      </li>
                  </div>
                  <div className="cutomer-contact">
                    <li> <i class="fa-regular fa-address-book"></i></li>
                    <li>{singleMessage.data[0]&&singleMessage.data[0].phone}</li>

                </div>
                </div>
            </>
          

           }
         


        </div>
    </div>
  )
}

export default AdminContact