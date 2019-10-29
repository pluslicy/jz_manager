import {get,post} from '@/utils/request'
export default {
  namespaced:true,
  state:{
    waiters:[],
    list:{},
    visible:false,
    title:"添加顾客信息",
    loading:false,
  },
  getters:{
    
  },
  mutations:{
    showModal(state){
      state.visible = true;
    },
    closeModal(state){
      state.visible = false;
    },
    setTitle(state,title){
      state.title = title;
    },
    beginLoading(state){
      state.loading = true;
    },
    endLoading(state){
      state.loading = false;
    },
    resetWaiters(state,waiters){
      state.waiters = waiters;
    },
    resetList(state,list){
      state.list = list;
    }
  },
  actions:{
    async findAllWaiters({commit}){
      let response = await get("/waiter/findAll");
      commit("resetWaiters",response.data);

    },
    async pageQueryWaiters({commit},params){
      let response = await post("/waiter/query",params);
      commit("resetList",response.data);
    },
    async batchDeleteWaiter(context,ids){
      // 1. 批量删除
      let response = await post_array("/waiter/batchDelete",{ids})
      // 2. 分发
      context.dispatch("findAllWaiters");
      // 3. 返回结果
      return response;
    },
    async deleteWaiterById(context,id){
      let response = await get("/waiter/deleteById?id="+id);
      context.dispatch("findAllWaiters");
      return response;
    },
    // payload 顾客信息
    async saveOrUpdateWaiter({commit,dispatch},payload){
      // 1. 保存或更新
      let response = await post("/waiter/saveOrUpdate",payload)
      // 2. 刷新页面
      dispatch("findAllWaiters");
      // 3. 关闭模态框
      commit("closeModal");
      // 4. 提示
      return response;
    }
  }
}