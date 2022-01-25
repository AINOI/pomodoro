<template lang="pug">
#app.vh-100.overflow-y.position-relative
  sidebar(@sideBarOpen='update')
  div(v-if='!takeABreak')
    div.bg.overflow-x.modoru(:class="{ slideToRight:open }")
      b-container(fluid)
        b-row
          b-col(cols="12" :md="open ? 12 : 6" style="transition: 0.5s;")
            countdown
          b-col.mt-5.mt-md-0(cols="12" :md="6" :class="{ hide:open }")
            kotolist
  div(v-if='takeABreak')
    div.bgBreak.overflow-x.modoru(:class="{ slideToRight:open }")
      b-container(fluid)
        b-row
          b-col(cols="12" :md="open ? 12 : 6" style="transition: 0.5s;")
            countdown
          b-col.mt-5.mt-md-0(cols="12" :md="6" :class="{ hide:open }")
            kotolist
</template>

<script>

import kotolist from './components/kotolist.vue'
import countdown from './components/countdown.vue'
import Sidebar from './components/sidebar.vue'

export default {
  name: 'App',
  components: {
    kotolist,
    countdown,
    Sidebar
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    takeABreak () {
      const breakStatus = this.$store.state.breakStatus
      return breakStatus
    }
  },
  methods: {
    update (value) {
      this.open = value
    }
  }
}
</script>

<style lang="scss">

@import './sass/style.scss';
@import './sass/variable';
@import './sass/app.scss';

</style>
