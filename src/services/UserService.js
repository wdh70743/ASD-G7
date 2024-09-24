import axios from "axios";

class UserService {
    BASE_URL = `/users/`;

    register(user){
        return axios.post(this.BASE_URL + 'create/', user)
    }

    login(email, password){
        return axios.post(this.BASE_URL + 'login/', { email, password })
    }
}

const userService = new UserService()

export default userService;