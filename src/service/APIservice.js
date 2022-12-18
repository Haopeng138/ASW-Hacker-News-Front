import axios from "axios";

const API_URL = "http://marcduch.pythonanywhere.com/api/";
const token = 'Api-Key SD7s1ikX.43gI6JPM9AEuL4HfZqjqsniGPBW7HIXf';
const headers = {
    Accept: 'application/json',
    Authorization: token,
}


class APIService {
    get(route) {
        return axios.get(API_URL + route, { headers: headers });
    }
    
    post(route, body) {
        return axios.post(API_URL + route, body, { headers: headers });
    }

    put(route, body) {
        return axios.put(API_URL + route, body, { headers: headers });
    }

    delete(route) {
        return axios.delete(API_URL + route, { headers: headers });
    }
}

export default new APIService();