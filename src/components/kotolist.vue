<template lang="pug">
#kotolist
  div(v-if="!takeABreak")
    div.kotolist-list(v-if="filterUnFinished.length > 0")
      div.d-flex.justify-content-start.mt-5.ml-5.border-bottom.w-75(v-for="item in filterUnFinished" :key="item.id")
        b-btn.mx-3.finished-circle(@click="changeItemState(item.id)")
        div.h1 {{ item.name }}
    div.taiki-title.d-flex.justify-content-start.ml-5(v-if="filterUnFinished == 0")
      div.h1.mt-5.ml-5 待機中
      div.h1.mt-5.loading ...
  div.tsukareta-title(v-if="takeABreak")
    div.h1.mt-5.w-100 如果累了...
    div.h1.mt-5.w-100 就休息一下吧！
</template>

<script>
export default {
  computed: {
    current () {
      return this.$store.state.current
    },
    items () {
      return this.$store.state.items.map(item => {
        item.state = item.model.length > 0
        return item
      })
    },
    currentText () {
      return this.current.length > 0 ? this.current : this.items.length > 0 ? '' : '待機中...'
    },
    takeABreak () {
      const breakStatus = this.$store.state.breakStatus
      return breakStatus
    },
    filterUnFinished () {
      const filterFalse = this.$store.state.items.filter(item => item.done === false)
      return filterFalse
    }
  },
  methods: {
    changeItemState (id) {
      this.$store.commit('changeItemState', id)
    }
  }
}
</script>

<style lang="scss">
@import '../sass/kotolist.scss';

</style>
