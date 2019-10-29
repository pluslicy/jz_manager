import request from '@/utils/request'

export default {
  namespaced:true,
  state:{
    categories:[],
    visible:false,
    title:"添加顾客信息"
  },
  getters:{
    categorySize(state){
      return state.categories.length;
    },
    orderCategory:(state)=>{
      return function(flag){
        state.categories.sort((a,b)=>{
          if(a[flag] > b[flag]){
            return -1;
          } else {
            return 1;
          }
        })
        return state.categories;
      }
    }
  },
  mutations:{
    showModal(state){
      state.visible = true;
    },
    closeModal(state){
      state.visible = false;
    },
    refreshCategories(state,categories){
      state.categories = categories;
    },
    setTitle(state,title){
      state.title = title;
    }
  },
  actions:{
    async batchDeleteCategory(context,ids){
      // 1. 批量删除
      let response = await request.post("/category/batchDelete",{ids})
      // 2. 分发
      context.dispatch("findAllCategories");
      // 3. 返回结果
      return response;
    },
    async deleteCategoryById(context,id){
      let response = await request.get("/category/deleteById?id="+id);
      context.dispatch("findAllCategories");
      return response;
    },
    async findAllCategories(context){
      // 1. ajax查询
      let response = await request.get("/category/findAll");
      // 2. 将查询结果更新到state中
      context.commit("refreshCategories",response.data);
    },
    // payload 顾客信息
    async saveOrUpdateCategory({commit,dispatch},payload){
      // 1. 保存或更新
      let response = await request.post("/category/saveOrUpdate",payload)
      // 2. 刷新页面
      dispatch("findAllCategories");
      // 3. 关闭模态框
      commit("closeModal");
      // 4. 提示
      return response;
    }
  }
}