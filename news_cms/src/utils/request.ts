import axios from 'axios'
import { store } from '@/redux'
import Cookie from "js-cookie";
const request  = axios.create({
    // baseURL:'http://47.92.160.213:8087',
    // baseURL:'http://127.0.0.1:8087',
    baseURL:'http://localhost:3005',
    timeout:5000,
    headers: { 'Content-Type': 'application/json' }
})
request.interceptors.request.use((config)=>{
    store.dispatch({
        type: 'CHANGE_LOADING',
        payload: true
    })
    if (config.url?.includes("/login")){
        return config;
    }
    const token = Cookie.get("token")
    console.log(token)
    if (token && typeof config.headers !== 'undefined') {
        config.headers.Authorization = token;
    }
    return config;
})

request.interceptors.response.use((res)=>{
    store.dispatch({
        type: 'CHANGE_LOADING',
        payload: false
    })
    return res.data;

},(err)=>{
    console.log(err)
    store.dispatch({
        type: 'CHANGE_LOADING',
        payload: false
    })
    return Promise.reject(new Error('fail'))
})

export default request;
