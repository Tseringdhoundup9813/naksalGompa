import React,{useState,useReducer, useEffect} from 'react'

import "../AdminStyle/admincontact.css"
import AdminSideBar from './AdminSideBar'

import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"
import formatDistanceToNow from "date-fns/formatDistanceToNow"



function AdminContact() {
  const[contact_state,contact_dispatch] =useReducer(postReducer,INITIAL_STATE)
  const[important_dispatch] =useReducer(postReducer,INITIAL_STATE)

  const[singleMessage,singleMessage_dispatch] = useReducer(postReducer,INITIAL_STATE)
  const[filter_category,set_filter_category] = useState({"all":true});
  const[set_filterCutomerlist ] = useState([]);

useEffect(()=>{
  async function GetTeam(){
    contact_dispatch({type:"FETCH_START"})
    try{
        const response = await axios.get("/getcontact")
        // console.log(response)
        if(response.data.success){
            
            const all_data = response.data.data
            contact_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
            set_filterCutomerlist(all_data)
    
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


function updateFilter(update,index){

  const message_new_old = document.querySelectorAll(".message-new-old ul li");
  message_new_old.forEach((data)=>{
    data.classList.remove("active");
  })
  message_new_old[index].classList.add("active")
 
  set_filter_category(update)
  console.log(update)
  
 
}

function filterMessage(messagelist,category){

  if(category.seen===false){
    let filterCutomerlist = messagelist.filter((product)=>{
      if(category.seen===product.seen){
        return product;
  
      }
     })
     return filterCutomerlist
  }
  else{

    if(category.all===true){
      return messagelist;
  
    }
    let filterCutomerlist = messagelist.filter((product)=>{
      if(category.important===product.important){
        return product;
  
      }
     
     })
     return filterCutomerlist
    
   
  }


 
}



async function handleImportant(id){
     console.log(id);
     
  important_dispatch({type:"FETCH_START"})
  try{
      const response = await axios.get(`important/${id}`)
      // console.log(response)
      if(response.data.success){
          
          const all_data = response.data.data
     
          contact_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
          important_dispatch({type:"FETCH_SUCCESS",payload:[true,response.data.all]})
          console.log(response.data.singledata)
          singleMessage_dispatch({type:"FETCH_SUCCESS",payload:[true,response.data.singledata]})
        


  
      }
  }
  catch(err){
    
      console.log(err)
      if(err.message!=="Network Error"){
          important_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
          console.log(err.response.data.emptyfield)
      }
  }
}

function GenerateRandomImage(){
    let random = Math.floor(1+ Math.random() * 5);
    return random;
}



  return (
    <div className="admin-contact-container">
        <AdminSideBar></AdminSideBar>
        <div className="admin-contact-message-container">
           
        
           <div className="admin-message-list">
               {/* bell */}
               <div className="bell">
                {
                  filterMessage(contact_state.data,{seen:false}).length >0?<span>{filterMessage(contact_state.data,{seen:false}).length}</span>:""
                  
                }
             
                 <i class="fa-solid fa-bell"></i>
               </div>
          
              {/* ////// */}
                <div className="admin-message-title">
                    <h1>Message list</h1>
                </div>
                <div className="message-new-old">
                    <ul>    
                        
                        <li onClick={()=>updateFilter({"all":true},0)}>seen</li>
                        <li onClick={()=>updateFilter({"important":true},1)}>important</li>

                        
                    </ul>
                </div>
                <div className="admin-message-name-list">
                  {
                    filterMessage(contact_state.data,filter_category)&&filterMessage(contact_state.data,filter_category).map((customer,index)=>{
                      return(
                        <div key={customer._id} className='admin-message-customer-list' onClick={()=>GetSingleMessage(customer._id,index)}>
                            <div>
                              <img src={`/image/avatar${GenerateRandomImage()}.png`} alt="" />
                            </div>
                            <div className={ customer.seen?"select-cutomer":"notseen select-cutomer"}  >
                          
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
              
                  <button onClick={()=>handleImportant(singleMessage.data[0]&&singleMessage.data[0]._id)}   style={{backgroundColor:`${singleMessage.data[0]&&singleMessage.data[0].important?"tomato":""}`}}>{singleMessage.data[0]&&singleMessage.data[0].important?"not important":"important"}</button>

                
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