<template>
  <div class="customer">
		<!-- 按钮 -->
		<div>
			<el-button @click="toAddHandler" size="small" type="primary">添加</el-button>
			<el-button @click="batchDeleteHandler"  size="small" type="danger">批量删除</el-button>
		</div>
		<!-- 表格 -->
		<div v-loading="loading">
      <el-table :data="customers" size="mini"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="telephone" label="手机号"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template #default="record">
              <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)"></i> &nbsp;
							<i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)"></i> &nbsp;
              <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
		</div>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form :model="customer" :rules="rules" ref="customerForm">
        <el-form-item label="姓名" label-width="100px"  prop="realname">
          <el-input v-model="customer.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px" prop="telephone">
          <el-input v-model="customer.telephone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return {
      customer:{},
      ids:[],
      rules:{
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
    ...mapState("customer",["customers","visible","title","loading"]),
    ...mapGetters("customer",["orderCustomer","customerSize"])
  },
  created(){
    this.findAllCustomers();
  },
  methods:{
    ...mapMutations("customer",["showModal","closeModal","setTitle"]),
    ...mapActions("customer",["findAllCustomers","saveOrUpdateCustomer","deleteCustomerById","batchDeleteCustomer"]),
    // 普通方法
    toDetailsHandler(customer){
      //跳转到详情页面
      // this.$router.push("/customerDetails")
      this.$router.push({
        path:"/customer/details",
        query:{id:customer.id}
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item=>item.id);
    },
    toAddHandler(){
      // 1. 重置表单
      this.customer = {};
      this.setTitle("添加顾客信息");
      // 2. 显示模态框
      this.showModal();
    },
    submitHandler(){
      // 校验
      this.$refs.customerForm.validate((valid)=>{
        // 如果校验通过
        if(valid){
          let promise = this.saveOrUpdateCustomer(this.customer)
          promise.then((response)=>{
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({type:"success",message:response.statusText});
          })
        } else {
          return false;
        }
      })
    },
    dialogCloseHandler(){
      this.$refs.customerForm.resetFields();
    },
    editHandler(row){
      this.customer = row;
      this.setTitle("修改顾客信息");
      this.showModal();
    },
    deleteHandler(id){
      this.deleteCustomerById(id)
      .then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    batchDeleteHandler(){
      this.batchDeleteCustomer(this.ids)
      .then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    }

  }

}
</script>
<style scoped>

</style>