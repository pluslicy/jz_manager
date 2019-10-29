<template>
  <div class="waiter">
		<!-- 按钮 -->
		<div>
			<el-button @click="batchCheckHandler"  size="small" type="danger">批量审核</el-button>
		</div>
		<!-- 表格 -->
		<div v-loading="loading">
      <el-table :data="waiters" size="mini"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="telephone" label="手机号"></el-table-column>
        <el-table-column prop="idCard" label="身份证号"></el-table-column>
        <el-table-column prop="bankCard" label="银行卡号"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间"></el-table-column>
        <el-table-column prop="status" label="状态" ></el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template #default="record">
              <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
		</div>
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return {
      waiter:{},
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
    ...mapState("waiter",["waiters","visible","title","loading"])
  },
  created(){
    this.findAllWaiters();
  },
  methods:{
    ...mapMutations("waiter",["showModal","closeModal","setTitle"]),
    ...mapActions("waiter",["findAllWaiters","saveOrUpdateWaiter","deleteWaiterById","batchDeleteWaiter"]),
    // 普通方法
    toDetailsHandler(waiter){
      //跳转到详情页面
      // this.$router.push("/waiterDetails")
      this.$router.push({
        path:"/waiter/details",
        query:{id:waiter.id}
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item=>item.id);
    },
    
    batchCheckHandler(){
      // this.batchDeleteWaiter(this.ids)
      // .then((response)=>{
      //   this.$message({type:"success",message:response.statusText});
      // })
    }

  }

}
</script>
<style scoped>

</style>