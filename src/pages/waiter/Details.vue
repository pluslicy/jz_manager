<template>
  <div class="waiterDetails">
    <el-button size="small" type="text" @click="backHandler">返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
          基本信息...
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orders">
        订单信息...
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      activeName:"info"
    }
  },
  created(){
    console.log(this.$route);
    let id = this.$route.query.id;
    
  },
  computed:{
  },
  methods:{
    backHandler(){
      // this.$router.push("/waiter")
      this.$router.go(-1)
    }
  }

}
</script>
<style scoped>


</style>