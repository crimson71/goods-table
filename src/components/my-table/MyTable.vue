<template>
  <div>
    <table class="table table-striped table-bordered">
  <thead>
    <tr>
      <slot name="header"></slot>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in data" :key="item.id">
      <slot name="body" :row="item" :index="index"></slot>
    </tr>
    
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  name:'MyTable',
  props:{
    data: {
      type:Array,
      default:[],
      required:true
    }
  }

}
</script>

<style lang="less" scoped>

</style>