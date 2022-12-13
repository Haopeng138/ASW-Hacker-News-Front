import axios from "axios";

const API_URL = "http://haopeng138.pythonanywhere.com/api/";
const token = 'Api-Key kk6BAyRE.PNCeVkyh1GTsPBuqKl0HYz2qVfQZ5Mmj';
const headers = {
    Accept: 'application/json',
    Authorization: token,
}

var list = {};

function doSomething(data){
    list = data;
    console.log(list)
}

    
axios.get(API_URL + "users", { headers: headers }).then(function (result) {
    doSomething(result.data);
});

