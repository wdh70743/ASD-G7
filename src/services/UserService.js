import axios from 'axios';

class UserService {
  BASE_URL = `/users/`;

  register(user) {
    return axios.post(this.BASE_URL + 'create/', user);  // Create a new user
  }

  login(email, password) {
    return axios.post(this.BASE_URL + 'login/', { email, password });  // User login
  }
}

const userService = new UserService();

export default userService;
