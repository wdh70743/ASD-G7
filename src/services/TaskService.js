import axios from "axios";

class TaskService {
  BASE_URL = `http://asd-g7-backend.australiaeast.cloudapp.azure.com/`;

  getTasksByUser(userId) {
    return axios.get(`${this.BASE_URL}tasks/users/${userId}/tasks/`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  getTasksByProject(projectID) {
    return axios.get(`${this.BASE_URL}tasks/projects/${projectID}/tasks/`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  deleteTask(taskId) {
    return axios.delete(`${this.BASE_URL}tasks/${taskId}/`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  createTask(newTask, taskFile) {
    const formData = new FormData();

    // Append all properties of newTask to formData
    for (const key in newTask) {
      if (newTask.hasOwnProperty(key)) {
        formData.append(key, newTask[key]);
      }
    }

    // Append the file if it exists
    if (taskFile) {
      formData.append('uploaded_files', taskFile); // Use a specific key for the file
    }
    console.log(taskFile)

    return axios.post(`${this.BASE_URL}tasks/create/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateTask(taskId, updatedTask, taskFile, archivedAt = null) {
    const formData = new FormData();

    // Set archived_at to the passed timestamp, if provided
    if (archivedAt) {
      updatedTask.archived_at = archivedAt;
    }

    // Append all properties of updatedTask to formData
    for (const key in updatedTask) {
      if (updatedTask.hasOwnProperty(key)) {
        formData.append(key, updatedTask[key]);
      }
    }

    // Append the file if it exists
    if (taskFile) {
      formData.append('uploaded_files', taskFile);
    }

    return axios.patch(`${this.BASE_URL}tasks/${taskId}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getArchivedTasksByUser(userId) {
    return axios.get(`${this.BASE_URL}tasks/users/${userId}/tasks/archived/`);
  }

  archiveTask(taskId) {
    return axios.post(`${this.BASE_URL}tasks/archive/`, { task_id: taskId });
  }

  assignTask(assignedBy, taskId, userIds) {
    const data = {
      assigned_by: assignedBy,
      task_id: taskId,
      user_ids: Array.isArray(userIds) ? userIds : [userIds], // Ensure it's an array
    };

    console.log("Assign Task Payload:", data); // Debugging line

    return axios.post(`${this.BASE_URL}tasks/assign/`, data, {
      headers: {
        "Content-Type": "application/json", // Use JSON content type
      },
    });
  }

  // Get tasks assigned to a user within a specific project
  getAssignedTasksByProject(projectId, userId) {
    return axios.get(`${this.BASE_URL}tasks/projects/${projectId}/users/${userId}/assigned/`);
  }

  // Update users assigned to a task
  updateAssignedUsers(assignedBy, taskId, userIds) {
    const data = {
      assigned_by: assignedBy,
      task_id: taskId,
      user_ids: Array.isArray(userIds) ? userIds : [userIds], // Ensure it's an array
    };

    console.log("Update Assigned Users Payload:", data); // Debugging line

    return axios.post(`${this.BASE_URL}tasks/update-assigned-users/`, data, {
      headers: {
        "Content-Type": "application/json", // Use JSON content type
      },
    });
  }
}

const taskService = new TaskService();

export default taskService;
