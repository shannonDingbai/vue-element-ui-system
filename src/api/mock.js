import Mock from 'mockjs'
import homeApi from './mockSeverData/home'
import user from './mockSeverData/user'

//定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

//用户列表的数据
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/update', 'post', user.updateUser)
Mock.mock('/api/user/delete', 'post', user.deleteUser)
    // eslint-disable-line
Mock.mock(/api\/user\/get/, user.getUserList)