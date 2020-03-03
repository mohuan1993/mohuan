<template>
    <div class="wrap">
      <div class="topBanner">
        <div class="search">
          <span class="stage" v-if="data.length!=0">{{data[0].name}}<van-icon name="arrow-down" /></span>
          <van-icon name="search" class="s-icon"/>
        </div>
        <div class="nav">
          <div class="channel-list" ref="wrapper">
            <ul class="scroll-parent"  v-if="data.length!=0" ref="content">
              <li v-for="(item,index) in data[0].data" :key=index @click="selectchange(index)" :class="index==active?'selectedchannel tags':'tags'">{{item.name}}</li>
            </ul>
          </div>
          <div  class="mark">
              <van-icon name="apps-o"/>
          </div>
      </div>
      </div>
      <div class="main" ref="conWrapper">
        <div class="content" ref="conWidth" v-if="data.length!=0" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend="touchEnd">
           <div  v-for="(item,index) in data[0].data" :key=index class="contentIner" :index=index>
                <swiper v-if="index==0" :options="swiperOption" class="swiper-box">
                  <swiperSlide v-for='(item2,index2) in item.srcimg' :key=index2>
                  <img :src="item2.src" alt="">
                  </swiperSlide>
                </swiper>
           </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import Footer from './Footer'
import axios from 'axios'
import BScroll from 'better-scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
  data () {
    return {
      active: 0,
      data: '',
      touch: {},
      percent: 0,
      touchindex: 0,
      swiperOption: {
        loop: true,
        autoplay: true,
        slidesPerView: 'auto', // 默认一个屏幕显示几张图，必须auto！
        centeredSlides: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      }
    }
  },
  components: {
    Footer,
    swiper,
    swiperSlide
  },
  methods: {
    initScroll () {
      this.$nextTick(() => {
        let sum = 0
        for (let i = 0; i < this.data[0].data.length; i++) {
          sum += this.data[0].data[i].name.length
        }
        let width = sum * 16 + 180
        this.$refs.content.style.width = width + 'px'
        let sWidth = window.screen.width
        this.$refs.conWidth.style.width = sWidth * this.data[0].data.length + 'px'
        let conarry = document.getElementsByClassName('contentIner')
        for (let i = 0; i < conarry.length; i++) {
          conarry[i].style.width = sWidth + 'px'
        }
      })
      this.$nextTick(() => {
        if (!this.Scroll) {
          this.Scroll = new BScroll(this.$refs.wrapper, {
            click: true, // 配置允许点击事件
            scrollX: true, // 开启横向滚动
            eventPassthrough: 'vertical' // 当设置 eventPassthrough 为 'vertical' 的时候，scrollY 无效
          })
        } else {
          this.Scroll.refresh() // 重新计算 better-scroll，当 DOM 结构发生变化的时确保滚动效果正常
        }
        if (!this.conScroll) {
          this.conScroll = new BScroll(this.$refs.conWrapper, {
            click: true, // 配置允许点击事件
            scrollX: true, // 开启横向滚动
            eventPassthrough: 'vertical', // 当设置 eventPassthrough 为 'vertical' 的时候，scrollY 无效
            momentum: false,
            bounce: false
          })
        } else {
          this.conScroll.refresh() // 重新计算 better-scroll，当 DOM 结构发生变化的时确保滚动效果正常
        }
      })
    },
    selectchange (num) {
      this.active = num
      let element = document.getElementsByClassName('contentIner')[num]
      this.conScroll.scrollToElement(element, 10)
    },
    touchStart (e) {
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
      this.touchindex = this.active
      // console.log(touch)
    },
    touchMove (e) {
      const touch = e.touches[0]
      // // 横向和纵向偏离位置
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      // 如果纵向滑动距离超过横向结束
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return false
      }

      this.percent = deltaX / window.screen.width
    },
    touchEnd () {
      let dis = Math.abs(this.percent)
      let el = document.getElementsByClassName('contentIner')
      if (dis < 0.5) {
        this.conScroll.scrollToElement(el[this.touchindex], 100)
      } else {
        if (this.percent > 0.5 && this.touchindex > 0) {
          this.touchindex -= 1
        }
        if (this.percent < -0.5 && this.touchindex < 5) {
          this.touchindex += 1
        }
        this.conScroll.scrollToElement(el[this.touchindex], 100)
        this.active = this.touchindex
        let tagel = document.getElementsByClassName('tags')[this.active]
        this.Scroll.scrollToElement(tagel, 50)
      }
    }
  },
  mounted () {
    axios({
      method: 'get',
      url: 'http://localhost:8088/test'
    }).then(res => {
      this.data = res.data
      this.initScroll()
    })
  }

}
</script>

<style scoped>
.wrap{
  width: 100%;
  overflow: hidden;
}
.topBanner{
  padding: 20px 16px 0;
}
.search{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.search .stage{
  color: #2d2d2d;
  font-size: 20px;
  font-weight: 500;
  line-height: 16px;
}
.stage .van-icon{
  position: relative;
  top:3.5px;
  margin-left: 6px;
}
.search .s-icon{
  position: relative;
  top:-4px;
  font-size: 22px;
  font-weight: 600;
}
.nav{
  height: 34px;
  width: 100%;
  line-height: 34px;
  overflow: hidden;
  margin-bottom: 8.5px;
  position: relative;
}
.channel-list{
  width: 100%;
}
.scroll-parent{
  height: 66px;
  display: flex;
}
.scroll-parent li{
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 16px;
}
.nav li{
  margin-right: 24px;
}
.nav .selectedchannel{
  font-size: 20px;
  color: #ff6c00;
}
.mark{
  position: absolute;
  right: 0;
  top:0;
  width: 58px;
  height: 34px;
  background:  linear-gradient(91deg,hsla(0,0%,100%,0),#fff 26%,#fff);
}
.mark .van-icon{
 float: right;
 font-size: 26px;
 margin-top: 3px;
}
.main{
  width: 100%;
}
.content{
  display: flex;
  flex-flow: nowrap;
  height: 500px;
}
.contentIner{
  flex-shrink: 0
}
.swiper-container {
}
.swiper-wrapper{
  display: flex !important;
}
.swiper-slide{
  width: 80%;
  padding: 0 10px;
}
.swiper-slide img{
  width: 100%;
  display: block;
  height: 136px;;
  border-radius: 10px;
}
</style>
