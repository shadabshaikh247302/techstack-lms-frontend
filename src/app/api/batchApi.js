import { API } from "@/utils/Utils";
//-----------------------------------------------------------------------------------------
export const createBatches = async (state,body)=>{
    try {
      console.log(body)  
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state.token}`
            return req;
          })
          const response = await API.post('/batch/createBatch',body)
          // console.log("body")
          return response
    } catch (error) {
        console.log(error)
    }
}
//-----------------------------------------------------------------------------------------
export const GetAllBatches = async(state)=>{
  try {
    // console.log(state.token)  
      API.interceptors.request.use((req)=>{
          req.headers.authorization=`bearer ${state.token}`
          return req;
        })
        const response = await API.get('/batch/getAllBatches')
      console.log(response)
      return response
  } catch (error) {
      console.log(error)
  }
}