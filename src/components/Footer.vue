<template>
    <ul class="bottom-tabbar">
        <li v-for="(item,index) in tabbarmsg" :key=index @click="changepage(item.path)">
          <van-icon :class="item.path==$route.path?'icon icolor':'icon'" :name='item.path==$route.path?item.aicon:item.nicon' size="18" />
            <span :class="item.path==$route.path?'icolor':''">{{item.labname}}</span>
        </li>
    </ul>
</template>

<script >
export default{
  name: 'Footer',
  data () {
    return {
      tabbarmsg: [
        {labname: '在线好课', path: '/', nicon: 'good-job-o', aicon: 'good-job'},
        {labname: '我的课程', path: '/mycourse', nicon: 'todo-list-o', aicon: 'todo-list'},
        {labname: '发现', path: '/discover', nicon: 'browsing-history-o', aicon: 'browsing-history'},
        {labname: '账户', path: '/account', nicon: 'user-o', aicon: 'manager'}
      ]
    }
  },
  methods: {
    changepage (pathname) {
      this.$router.push({path: pathname})
    }
  }
}
</script>

<style scoped>
.bottom-tabbar{position: fixed; bottom: 0; left: 0; display: flex; height: 50px; width: 100%;}
.bottom-tabbar>li{width: 25%; padding-top: 8px; text-align: center; font-size: 12px;}
.icon{display: block; padding-bottom: 4px;}
.icolor{color: #ff6c00; }
</style>
