<template>
    <div class="manage">
        <el-dialog
            title="新增用户"
            :before-close="handleClose"
            :visible.sync="dialogVisible"
            width="50%">
            <el-form :rules="rules" :inline="true" ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-col>
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
        <div  class="manage-header">
            <el-button @click="handleAdd()" type="primary">
                + 新增
            </el-button>
            <el-form :inline="true" :model="searchForm">
                <el-form-item >
                    <el-input  v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div> 
        <div class="table-container">
            <el-table
                stripe
                :data="tableData"
                border
                size="small"
                style="width: 100% height:90%">
                <el-table-column
                fixed
                prop="name"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="addr"
                label="地址">
                </el-table-column>
                <el-table-column
                prop="age"
                label="年龄">
                </el-table-column>
                <el-table-column
                prop="birth"
                label="出生日期">
                </el-table-column>
                <el-table-column
                prop="sex"
                label="性别">
                <template slot-scope="scope">
                    <span>{{ scope.row.sex == 1 ? '男':'女' }}</span>
                </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="pageNum">
                <el-pagination
                layout="prev, pager, next"
                :total="totalNum"
                @current-change="clickPage">
            </el-pagination>
            </div>
    </div>
        </div>
</template>


<script>
import { getUser, addUser,updateUser,deleteUser } from '../api'
export default {
    data(){
        return {
           dialogVisible:false,
           form:{
               name:'',
               age:'',
               sex:'',
               birth:'',
               addr:''
           },
           rules:{
            name:[
                { required: true, message: '请输入姓名' },
            ],
            age:[
                {required: true, message: '请输入年龄' }
                ],
            sex:[
                { required: true, message: '请选择性别' },
            ],
            birth:[
                { required: true, message: '请选择日期' },
            ],
            addr:[
                { required: true, message: '请输入地址' },
            ],  
           },
           tableData:[],
           modalType : 0,
           totalNum:0,//table一共有多少条数据
           pageData:{
            page:1,
            limit:10
           },
           searchForm:{
            name:''
           }
        }
    },
    methods: {
        submit(){
            this.$refs.form.validate((valid)=>{
                //如果表单都按要求填好了
                if(valid){
                    if( this.modalType === 0){
                        //先调用新增接口
                        addUser(this.form).then(()=>{
                            //再调用获取数据的接口
                            console.log(this.form,'form')
                            this.getList()  
                        })
                  }else{
                        updateUser(this.form).then(()=>{
                            //再调用获取数据的接口
                            this.getList()  
                        })
                  }
                //   //清空表单的数据
                // this.$refs.form.resetFields();
                //     //关闭弹窗
                this.dialogVisible = false
                }
            })
        },
        
        handleClose(){
            //关闭弹窗
            this.$refs.form.resetFields();
            this.dialogVisible = false
        },
        cancel(){
            this.handleClose()
        },
        handleDelete(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.tableData = this.tableData.filter(u => u.id !== row.id)
                deleteUser(row.id)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                //重新获取列表数据
                this.getList()
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        handleEdit(row){
            this.modalType=1;
            //打开弹框
            this.dialogVisible = true;
            //获取需要编辑的当前行数据，需要用深拷贝(要注意),直接赋值会改变this.form整个值
            this.form=JSON.parse(JSON.stringify(row))
        },
        handleAdd(){
            this.modalType=0;
            this.dialogVisible = true;
        },
        getList(){
            getUser({params:{...this.searchForm,...this.pageData}}).then(({data})=>{
                console.log('data',data);
                this.tableData=data.list;
                this.totalNum=data.count||0
                console.log(this.totalNum);
        })
        },
        //选择页码的回调函数
        clickPage(val){
            console.log(val,'val');
            console.log(11111);
            this.pageData.page=val;
            this.getList() 
        },
        onSubmit(){
            console.log('222222');
            this.getList()
        }
    },
    mounted() {
         this.getList()   
    }

}
</script>
<style lang="less" scoped>
.manage {
    height: 600px;
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .table-container {
        position: relative;
        height: calc(100%-62px);
        .pageNum {
            position: absolute;
            right: 20px;
        }
    }
}
</style>

