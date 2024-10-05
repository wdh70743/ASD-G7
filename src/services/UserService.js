import axios from 'axios';

class UserService {
  BASE_URL = `/users/`;

  register(user) {
    return axios.post(this.BASE_URL + 'create/', user);  // Create a new user
  }

  login(email, password) {
    return axios.post(this.BASE_URL + 'login/', { email, password });  // User login
  }

  getUserData(userId) {
    return axios.get(`${this.BASE_URL}${userId}`);  
  }

  deleteUser(userId) {
    return axios.delete(`${this.BASE_URL}${userId}/`);  
  }

  updateUser(userId, updatedUser) {
    return axios.patch(`${this.BASE_URL}${userId}/`, updatedUser);
  }
}

const userService = new UserService();

export default userService;
