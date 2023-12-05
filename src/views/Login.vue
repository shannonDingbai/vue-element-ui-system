<template>
    <div class="login">
        <div class="login-form">
            <el-form :inline="true" :model="form" :rules="rules">
            <h3 class="login-title">系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" type="text"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passwords">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
        </div> 
    </div>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
export default({
    data() {
        return{
            form:{
                username:'',
                passwords:''
            },
            rules:{
                username:[ {required : true,message:'请输入用户名',trigger: 'blur'}],
                passwords:[ {required : true,message:'请输入密码',trigger: 'blur'}],
            }
        }
    },
    methods:{
        submit(){
            const token =Mock.Random.guid();
            Cookie.set('token',token)
            this.$router.push('/home')
        }
    }
})
</script>
<style lang="less" scoped>
.login{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
    width: 350px;
    height: 220px;
    .el-form {
        padding: 35px 35px 15px 35px;
        border: 1px solid #eaeaea;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        box-sizing: border-box;
        .el-input {
            width: 180px;
        }
        .login-title {
            text-align: center;
            margin-bottom: 45px;
            color: #454545;
        }
        .el-button{
            margin-left: 100px;
        }
    }
}
}

</style>
