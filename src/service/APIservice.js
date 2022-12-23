import axios from "axios";

const API_URL = "http://marcduch.pythonanywhere.com/api/";
//const API_URL = 'http://127.0.0.1:8000/api/'
// var token = 'Api-Key F3H5Jp7x.Jgp0de4aTKOp6n1S4bENIFYeaW7myi7l';

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
    renameKey ( obj, oldKey, newKey ) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }
    setContentType(){
        this.renameKey(this.headers,"Accept","Content-Type")
    }
    setAccept(){
        this.renameKey(this.headers,"Content-Type","Accept")
    }
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