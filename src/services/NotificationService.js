import axios from "axios";

class NotificationService {
    BASE_URL = `http://asd-g7-backend.australiaeast.cloudapp.azure.com/`;

    getNotifications(user_id) {
        return axios.get(`${this.BASE_URL}notifications/`, { params: { user_id } });
    }

    getNotificationPreferences(user_id) {
        return axios.get(`${this.BASE_URL}notifications/get-preferences/`, { params: { user_id } });
    }

    markNotificationAsRead(notification_id, user_id) {
        return axios.put(`${this.BASE_URL}notifications/mark-as-read/${notification_id}/`, null, { params: { user_id } });
    }

    updateNotificationPreferences(user_id, data) {
        return axios.post(`${this.BASE_URL}notifications/update-preferences/`, data, { params: { user_id } });
    }
}

const notificationService = new NotificationService();

export default notificationService;
