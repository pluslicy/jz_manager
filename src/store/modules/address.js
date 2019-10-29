import request from '@/utils/request'
export default {
  namespaced:true,
  state:{
    address:[]
  },
  mutations:{
    refreshAddress(state,address){
      state.address = address;
    }
  },
  actions:{
    async findAddressByCustomerId(context,id){
      let response = await request.get("/address/findByCustomerId?id="+id);
      context.commit("refreshAddress",response.data)
    }
  }
}