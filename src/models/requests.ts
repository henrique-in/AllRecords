import api from '~/services/api'




export const signUp = async (data: any) =>{
    const response = await api.post('register',data);
    return response;
  };
  
  export const project = async () =>{
    const response = await api.get('project');
    return response;
  };
  