import api from '~/services/api'



export const signIn = async (data: any) =>{
    const response = await api.post('login',data);
    return response;
  };
  
export const signUp = async (data: any) =>{
    const response = await api.post('register',data);
    return response;
  };
  