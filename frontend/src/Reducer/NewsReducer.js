
export const INITIAL_STATE ={
    loading:false,
    success:false,
    error:false,
    data:[]
}

export const postReducer =(state,action)=>{


    switch(action.type){
        case "FETCH_START":
            return{
                loading:true,
                success:false,
                error:false,
                data:[]
          
            }
        case "FETCH_SUCCESS":
            return{
                loading:false,
                success:action.payload,
                error:false,
                data:[],
               
                
            }
    
       
        case "FETCH_ERROR":
            return{
                error:true,
                loading:false,
                success:false,
                data:[],
               

            }
        default:
            return state
    }
}