<template>
    <div>
        <div :rou='$route.path'>11111</div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from './Footer'
export default{
  data () {
    return {

    }
  },
  components: {
    Footer
  }

}
</script>

<style scoped>

</style>
