import axios from "axios";

class TaskService {
  BASE_URL = `http://asd-g7-backend.australiaeast.cloudapp.azure.com/`;

  getTasksByUser(userId) {
    return axios.get(`${this.BASE_URL}tasks/users/${userId}/tasks/`);  
  }

  getTasksByProject(projectID) { 
    return axios.get(`${this.BASE_URL}tasks/projects/${projectID}/tasks/`);  
  }

  getTaskFilesByTask(taskID) { 
    return axios.get(`${this.BASE_URL}tasks/${taskID}/files/`);  
  }

  deleteTask(taskId) {
    return axios.delete(`${this.BASE_URL}tasks/${taskId}/`);
  }

  createTask(newTask) {
    return axios.post(`${this.BASE_URL}tasks/create/`, newTask);
  }

  updateTask(taskId, updatedTask) {
    return axios.patch(`${this.BASE_URL}tasks/${taskId}/`, updatedTask);
  }

  getArchivedTasksByUser(userId) {
    return axios.get(`${this.BASE_URL}tasks/users/${userId}/tasks/archived/`);
  }

  archiveTask(taskId) {
    return axios.post(`${this.BASE_URL}tasks/archive/`, { task_id: taskId });
  }  
}

const taskService = new TaskService();

export default taskService;
