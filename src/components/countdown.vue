<template lang="pug">
#countdown.d-flex.flex-column.align-item-center
  .time.time-position
    span {{ min }}
    | :
    span {{ sec }}
  .btns.d-flex.mt-5.btn-position
    b-btn.btn-i(@click="muteswitch" :class="{mute: mute}")
      img(:src="require('@/assets/img/icon-bell.svg')")

    div.start-button(v-if="!breakStatus")
      b-btn.btn-i(@click="start" :disabled="btnswitch == false")
        img(:src="require('@/assets/img/icon-play--orange.svg')")
    div.start-button(v-if="breakStatus")
      b-btn.btn-i(@click="breakStart" :disabled="btnswitch == false")
        img(:src="require('@/assets/img/icon-play--orange.svg')")

    b-btn.btn-i(@click="pause" :disabled="btnswitch == true")
        img(:src="require('@/assets/img/icon-cancel.svg')")
</template>

<script>
const audio = new Audio(require('../assets/audio/alarm.mp3'))

export default {
  data () {
    return {
      // 0 = out
      // 1 = countdown
      // 2 = pause
      status: 0,
      timer: 0,
      mute: false,
      active: false,
      btnswitch: true
    }
  },
  computed: {
    timecount () {
      return this.$store.state.timecount
    },
    min () {
      return Math.floor(this.timecount / 60).toString().padStart(2, '0')
    },
    sec () {
      return Math.floor(this.timecount % 60).toString().padStart(2, '0')
    },
    items () {
      return this.$store.state.items.map(item => {
        item.state = item.model.length > 0
        return item
      })
    },
    breakStatus () {
      return this.$store.state.breakStatus
    }
  },
  methods: {
    start () {
      const filterUnFinished = this.items.filter(item => {
        return !item.done
      })
      if ((this.status === 0 && filterUnFinished.length > 0) || this.status === 2) {
        this.status = 1
        this.btnswitch = false
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timecount <= -1) {
            this.finish()
            this.btnswitch = true
          }
        }, 1000)
        this.active = !this.active
        console.log(filterUnFinished)
        console.log(this.$store.state)
      }
    },
    pause () {
      this.status = 2
      clearInterval(this.timer)
      this.btnswitch = true
    },
    finish () {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')
      audio.play()
    },
    muteswitch () {
      this.mute = !this.mute
      this.mute ? audio.volume = 0 : audio.volume = 1
    },
    breakStart () {
      if (this.status === 0 || this.status === 2) {
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timecount <= -1) {
            this.breakFinish()
          }
        }, 1000)
      }
    },
    breakFinish () {
      clearInterval(this.timer)
      this.status = 0
      audio.play()
      this.$store.commit('breakFinished')
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
@import '../sass/_variable.scss';
@import '../sass/countdown.scss';

</style>
