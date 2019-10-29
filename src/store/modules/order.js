import {get} from '@/utils/request'
import moment from 'moment'

export default {
  namespaced:true,
  state:{
    orders:[],
    message:''
  },
  getters:{
    filterOrdersByStatus(state){
      return (status)=>{
        return state.orders.filter((item)=>{
          return item.status === status;
        })
      }
    }
  },
  mutations:{
    resetOrders(state,orders){
      state.orders = orders;
    },
    resetMessage(state,message){
      state.message = message;
    }
  },
  actions:{
    // 取消派单
    async cancelSendOrder({commit,dispatch},orderId){
      let response = await get("/order/cancelSendOrder",{orderId});
      dispatch("findAllOrders");
      return response;
    },
    // 派单
    async sendOrder({commit,dispatch},params){
      let response = await get("/order/sendOrder",params);
      dispatch("findAllOrders");
      return response;
    },
    // 查询所有订单
    async findAllOrders({commit}){
      let response = await get("/order/findAll");
      response.data.forEach((item)=>{
        item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss') 
      })
      commit("resetOrders",response.data);
    }
  }
}