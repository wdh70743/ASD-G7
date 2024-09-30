import axios from "axios";

class TaskService {
    BASE_URL = `/tasks/`;

    getTasksByUser(userId) {
        return axios.get(`${this.BASE_URL}users/${userId}/tasks/`);  
    }

    getTasksByProject(projectID) { 
        return axios.get(`${this.BASE_URL}users/${projectID}/tasks/`);  
    }

    deleteTask(taskId) {
        return axios.delete(`${this.BASE_URL}${taskId}/`);
    }


}

const taskService = new TaskService();

export default taskService; 
