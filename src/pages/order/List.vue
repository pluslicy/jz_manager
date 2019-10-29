<template>
  <div id="order">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="all">
        <el-table :data="orders" size="small">
          <el-table-column label="订单编号" prop="id" width="80" align="center"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
          <el-table-column label="操作" width="80px">
            <template v-slot="slot">
              <a href="" @click.prevent="toOrderDetailsHandler">详情</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="待支付">
        <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id" width="80" align="center"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待派单" name="待派单">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id" width="80" align="center"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
          <el-table-column label="操作" width="80px">
            <template v-slot="slot">
              <a href="" @click.prevent="paidanHandler(slot.row.id)">派单</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待接单" name="待接单">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id" width="80" align="center"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
          <el-table-column label="操作" width="80px">
            <template v-slot="slot">
              <a href="" @click.prevent="cancelHandler(slot.row.id)">取消</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待服务" name="待服务">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id" width="80" align="center"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
          <el-table-column label="员工id" prop="waiterId"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待确认" name="待确认">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id" width="80" align="center"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
          <el-table-column label="员工id" prop="waiterId"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="已完成">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id" width="80" align="center"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
          <el-table-column label="员工id" prop="waiterId"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 模态框 -->
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="40%"
      :before-close="handleClose">
     <div class="dialog-content">
        <el-radio-group v-model="params.waiterId">
          <div v-for="w in waiters" :key="w.id" >
            <el-radio style="line-height:3em" :label="w.id" >{{w.realname}}</el-radio>
          </div>
        </el-radio-group>
     </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="sendOrderHandler">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  data(){
    return {
      title:"派单",
      visible:false,
      activeName:"all",
      params:{
        waiterId:0,
        orderId:0
      }
    }
  },
  created(){
    // 查询所有订单
    this.findAllOrders();
    // 查询所有服务员
    this.findAllWaiters();
  },
  computed:{
    ...mapState("order",["orders","message"]),
    ...mapState("waiter",["waiters"]),
    ...mapGetters("order",["filterOrdersByStatus"])
  },
  methods:{
    ...mapActions("order",["findAllOrders","sendOrder","cancelSendOrder"]),
    ...mapActions("waiter",["findAllWaiters"]),
    handleClick(tab){
      this.activeName = tab.name;
    },
    handleClose(){
      this.visible = false;
    },
    // 打开模态框设置派单对象
    paidanHandler(orderId){
      this.params.orderId = orderId;
      this.visible = true;
    },
    // 派单
    sendOrderHandler(){
      if(this.params.orderId!== 0 && this.params.waiterId !== 0){
        this.sendOrder(this.params).then(()=>{
          this.visible = false;
          this.$notify({ title: '成功', message: this.message, type: 'success' });
        })
      }
    },
    // 取消派单处理函数
    cancelHandler(orderId){
      this.cancelSendOrder(orderId).then(()=>{
        this.$notify({ title: '成功', message: this.message, type: 'success' });
      })
    },
    //查看详情
    toOrderDetailsHandler(){

    }
  }
}
</script>
<style scoped>
.dialog-content {
  height: 300px;
  padding: 0 1em;
  overflow: scroll;
}
</style>