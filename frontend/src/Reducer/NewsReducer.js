
export const INITIAL_STATE ={
    loading:false,
    success:false,
    error:false,
    error_message:"",
    empty_field:[],
    data:[]
}

export const postReducer =(state,action)=>{


    switch(action.type){
        case "FETCH_START":
            return{
                loading:true,
                success:false,
                error:false,
                data:[],
                error_message:"",
                empty_field:[],
          
            }
        case "FETCH_SUCCESS":
            return{
                loading:false,
                success:action.payload,
                error:false,
                data:action.payloadnews,
                error_message:"",
                empty_field:[],
               
                
            }
    
       
        case "FETCH_ERROR":
            return{
                error:true,
                loading:false,
                success:false,
                data:[],
                error_message:action.payload[0],
                empty_field:action.payload[1],
            }
        case "DELETE_SUCCESS":
            return{
                error:true,
                loading:false,
                success:false,
                data:state.data.filter((data) =>data._id!==action.payload._id),
                error_message:"",
                empty_field:[]
            }
       
       
        default:
            return state
    }
}