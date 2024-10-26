import axios from 'axios';

class UserService {
  BASE_URL = `http://asd-g7-backend.australiaeast.cloudapp.azure.com/`;

  register(user) {
    return axios.post(this.BASE_URL +'users/'+'create/', user);  // Create a new user
  }

  login(email, password) {
    return axios.post(this.BASE_URL + 'users/'+'login/', { email, password });  // User login
  }

  getUserData(userId) {
    return axios.get(`${this.BASE_URL}users/${userId}`);  
  }

  deleteUser(userId) {
    return axios.delete(`${this.BASE_URL}users/${userId}/`);  
  }

  updateUser(userId, updatedUser) {
    return axios.patch(`${this.BASE_URL}users/${userId}/`, updatedUser);
  }
  
  searchUsers() {
    return axios.get(`${this.BASE_URL}users/search/?email=@`);
  }
  
}

const userService = new UserService();

export default userService;
