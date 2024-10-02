import axios from "axios";

class ProjectService {
    BASE_URL = `/projects/`;

    getWholeProjectList() { 
        return axios.get(`${this.BASE_URL}/projects/`);
    }

    createProject(newProject) {
        return axios.post(`${this.BASE_URL}/create/`, newProject);
    }

    getProjectsByUser(userId) {
        return axios.get(`${this.BASE_URL}user/${userId}`);  
    }
    
    getProjectsByProjectId(projectID) {
        return axios.get(`${this.BASE_URL}${projectID}`);  
    }

    updateProjectsByProjectId(projectID) {
        return axios.put(`${this.BASE_URL}${projectID}`);  
    }

    deleteProjectsByProjectId(projectID) {
        return axios.delete(`${this.BASE_URL}${projectID}`);  
    }



}

const projectService = new ProjectService();

export default projectService; 
