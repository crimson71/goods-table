<template>
  <div>
    
  <MyTable :data="goodsList">
    <template #header>      
        <td>#</td>
        <td>商品名称</td>
        <td>价格</td>
        <td>标签</td>            
        <td>操作</td>            
    </template>
    <template #body="{row,index}">
      <td>{{index+1}}</td>
      <td>{{row.goods_name}}</td>
      <td>￥{{row.goods_price}}</td>
      
      <td>
        
        <input type="text" class="form-control form-control-sm form-ipt" 
        v-if="row.inputVisible" 
        v-focus 
        v-model.trim="row.inputValue" 
        @blur="inputComfire(row)"
        @keyup.enter="inputComfire(row)"
        @keyup.esc="row.inputValue=''">
        <button type="button" class="btn btn-primary btn-sm" v-else @click="row.inputVisible=true">+Tag</button>
        <span class="badge badge-warning" v-for="item in row.tags" :key="item" style="margin-left: 5px;">{{item}}</span>
      </td>
      <td>
        <button class="btn btn-danger btn-sm" @click="onRemove(row.id)">删除</button>
      </td>
      
      
    </template>
   
  </MyTable>

  </div>
  
</template>

<script>
import MyTable from './components/my-table/MyTable.vue'
export default {
  name:'MyApp',
  components:{
    MyTable
  },
  directives:{
    focus:{
      mounted(el) {
        el.focus()
      },
    }
  },
  data() {
    return {
      goodsList:[],
    }
  },
  methods:{
    async getGoodsList() {
      const {data:res} = await this.$http.get('/api/goods')
      if(res.status !== 0) return console.log('获取信息失败')
      this.goodsList = res.data
    },
    // 根据id删除商品
    onRemove(id) {
      this.goodsList = this.goodsList.filter(x => x.id !== id)

    },
    inputComfire(val) {
      const newval = val.inputValue
      val.inputValue = ''

      val.inputVisible = false
      
      if(!newval || val.tags.indexOf(newval) !== -1) return 
      val.tags.push(newval)
    }
    
  
  },
  created() {
    this.getGoodsList()

  }


}
</script>

<style lang="less" scoped>
.form-ipt {
  width: 80px;
  display: inline;
}
</style>