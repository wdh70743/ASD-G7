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
    
    getProjectByProjectId(projectID) {
        return axios.get(`${this.BASE_URL}${projectID}`);  
    }

    updateProject(id, updatedProject) {
        return axios.put(`${this.BASE_URL}${id}/`, updatedProject);  
    }

    deleteProject(projectID) {
        return axios.delete(`${this.BASE_URL}${projectID}/`);  
    }




}

const projectService = new ProjectService();

export default projectService; 
