import axios from "axios";

const API_URL = "http://haopeng138.pythonanywhere.com/api/";
const token = 'Api-Key 1GvUruu9.PxcxczPdF8kABAEdj27jdMapvj3U7p53';
const headers = {
    Accept: 'application/json',
    Authorization: token,
}

class APIService {
    get(route) {
        console.log(API_URL + route, { headers: headers })
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