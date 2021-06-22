import api from '~/services/api'


interface createProjectProps{
    name: string
}

interface registerUserProps{
    name:string
    password:string
    email:string
}

interface projectData{
  name: string
  active: boolean
}

interface hoursProps{
    hours: number
    day:string
    project:string
    user:string
}

export const signUp = async (data: registerUserProps) =>{
    const response = await api.post('register',data);
    return response;
};
  

export const getProject = async () =>{
    const response = await api.get('project');
    return response;
};

export const getUser = async () =>{
    const response = await api.get('user');
    return response;
};


export const createProject = async (data: createProjectProps) =>{
    const response = await api.post('project',data);
    return response;
};

export const deleteProject = async (id:string) =>{
    const response = await api.delete(`project/${id}`);
    return response;
};

export const activeProject = async (id: string ,data: projectData) =>{
    const response = await api.patch(`project/${id}`,data);
    return response;
};

export const getHours = async (id: string) =>{
    const response = await api.get(`hours/${id}`);
    return response;
};


export const AllHours = async () =>{
    const response = await api.get(`hours`);
    return response;
};

export const addHour = async (data: hoursProps) =>{
    const response = await api.post('hours',data);
    return response;
};


