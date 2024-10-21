import axios from "axios";

class ProjectService {
    BASE_URL = `http://asd-g7-backend.australiaeast.cloudapp.azure.com/`;

    getWholeProjectList() { 
        return axios.get(`${this.BASE_URL}/projects/`);
    }

    createProject(newProject) {
        return axios.post(`${this.BASE_URL}projects/create/`, newProject);
    }

    getProjectsByUser(userId) {
        return axios.get(`${this.BASE_URL}projects/user/${userId}`);  
    }
    
    getProjectByProjectId(projectID) {
        return axios.get(`${this.BASE_URL}projects/${projectID}`);  
    }

    updateProject(id, updatedProject) {
        return axios.put(`${this.BASE_URL}projects/${id}/`, updatedProject);  
    }

    deleteProject(projectID) {
        return axios.delete(`${this.BASE_URL}projects/${projectID}/`);  
    }




}

const projectService = new ProjectService();

export default projectService; 
