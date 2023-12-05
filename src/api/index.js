import http from "../utils/request";

//请求一个数据方法
export const getData = () => {
        //返回的是一个promise的对象
        return http.get('/home/getData')
    }
    //请求用户列表数据
export const getUser = (params) => {
    //返回的是一个promise的对象
    console.log(params, 'params');
    return http.get('/user/get', params)
}
export const addUser = (data) => {
    //返回的是一个promise的对象
    return http.post('/user/add', data)
}
export const updateUser = (data) => {
    //返回的是一个promise的对象
    return http.post('/user/update', data)
}
export const deleteUser = (data) => {
    //返回的是一个promise的对象
    return http.post('/user/delete', data)
}