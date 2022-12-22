import axios from "axios";

//const API_URL = "http://marcduch.pythonanywhere.com/api/";
const API_URL = 'http://127.0.0.1:8000/api/'
// var token = 'Api-Key SD7s1ikX.43gI6JPM9AEuL4HfZqjqsniGPBW7HIXf';

// var headers = {
//     Accept: 'application/json',
//     Authorization: token,
// }


class APIService {

    constructor(token){ 
      this.headers = {
        Accept: 'application/json',
        Authorization: '',
      }
    }

    setToken(newT){ console.log('Setting new Token: ' + newT); this.headers.Authorization = 'Api-Key '+ newT }

    get(route) {
        return axios.get(API_URL + route, { headers: this.headers });
    }
    
    post(route, body) {
        return axios.post(API_URL + route, body, { headers: this.headers });
    }

    put(route, body) {
      //console.log('PUT ' + route + ' ' + this.headers.Authorization + ' ' + body)
        return axios.put(API_URL + route, body, { headers: this.headers });
    }

    delete(route) {
        return axios.delete(API_URL + route, { headers: this.headers });
    }
}

export default new APIService();