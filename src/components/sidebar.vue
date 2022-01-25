<template lang="pug">
#sidebar
  .btns.vh-100.column-justcenter
    b-btn.btn-s(v-b-toggle.list :calss="{active: listopen}")
      img(:src="require('@/assets/img/icon-list.svg')")
    b-btn.btn-s(v-b-toggle.chartlist :calss="{active: chartopen}")
      img(:src="require('@/assets/img/icon-analysis.svg')")

  b-sidebar#list(no-header v-model="listopen")
    .mx-3.mt-5
      .list-header.d-flex.justify-content-around.align-items-center
        h2 待辦事項
        .list-switch
          label.mx-3(for="unfinished" :class="{active: listtype === 'unfinished'}")
            input#unfinished.d-none(type="radio" value="unfinished" v-model="listtype")
            span 未完成
          label.mx-3(for="finished" :class="{active: listtype === 'finished'}")
            input#finished.d-none(type="radio" value="finished" v-model="listtype")
            span 已完成

      //- 輸入欄位
      .container.px-5
        .list-create.mt-5
          input.w-100(type="text" maxlength="20" placeholder="新增事項" v-model="newlist" @keydown.enter="addlist(items)")
          button.createbtn(@click="addlist")
            b-icon(icon="plus")

        //- 清單欄位
        .listform.mt-5
          div.text-s
            //- 未完成清單
            div.w-100.mt-3.listborder.list-btn-style(v-if='listtype === "unfinished" && item.done == false' v-for='(item, index) in items' :key='index')
              div(v-if='item.edit' style="display: none;")
              div.d-flex.justify-content-start(v-else style="font-size: 24px;") {{ item.name }}
                div.d-flex.justify-content-start
                  div.working &nbsp; &nbsp; &nbsp;進行中
                  div.workingdot ...
              //- v-for= '(item, index) in items' item+index，賦予index值。
              //- value = 先去搜尋新增後store.state裡面所有的值

              //- 更動
              div.editform(v-if='item.edit' style="width: 100%;")
                  b-form-input(@input="updataedit(index, $event)" v-model='item.model')
                  div.editbtnGroup
                    button.editbtn(@click="submitedit(index)")
                      img(:src="require('@/assets/img/icon-edit.svg')")
                    button.editbtn(@click="canceledit(index)")
                      img(:src="require('@/assets/img/icon-cancel.svg')")
              //- 非更動
              div(v-else)
                button(@click="editlist(index)")
                  img(:src="require('@/assets/img/icon-edit.svg')")
                button(@click="dellist(index)")
                  img(:src="require('@/assets/img/icon-cancel.svg')")

            //- 已完成清單
            div.w-100.mt-3.listborder.list-btn-style(v-if='listtype === "finished" && item.done' v-for='(item, index) in items' :key='index')
              div.d-flex.justify-content-center(style="font-size: 24px;")
                button.finishedClean(@click='dellist(index)')
                div.ml-3 {{ item.name }}

  b-sidebar#chartlist(no-header v-model="chartopen")
    .chart-header
      h1.mt-5.mx-5(style="text-align: start;") 專注度分析
        .itemchart.d-flex.w-100.justify-content-between.mt-5
          .daychart
            h6 今日
              span.ml-3 {{ today }}
            .chartbox.w-100.rounded.d-flex.justify-content-between
              .chart-item-count.w-50
                .text-center.itemcount 9
                h5.text-center 待辦事項
              .chart-item-finished.w-50
                .text-center.itemFinished 7
                h5.text-center 已完成
          .weekchart
            h6 本週
            .chartbox.w-100.rounded.d-flex.justify-content-between
              .chart-item-count.w-50
                .text-center.itemcount 54
                h5.text-center 待辦事項
              .chart-item-finished.w-50
                .text-center.itemFinished 48
                h5.text-center 已完成
        Barchart.chartstyle
</template>

<script>
import Barchart from './Barchart.vue'

export default {
  data () {
    return {
      listopen: false,
      chartopen: false,
      listtype: 'unfinished',
      newlist: ''
    }
  },
  computed: {
    items () {
      return this.$store.state.items.map(item => {
        item.state = item.model.length > 0
        return item
      })
    },
    today () {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      return `${year} / ${month} / ${day}`
    }
  },
  methods: {
    addlist () {
      if (this.newlist.length > 0) {
        this.$store.commit('addlist', this.newlist)
        this.newlist = ''
      }
    },
    editlist (index) {
      this.$store.commit('editlist', index)
    },
    dellist (index) {
      this.$store.commit('dellist', index)
    },
    updataedit (index, event) {
      this.$store.commit('updataedit', { id: index, value: event })
    },
    submitedit (index) {
      if (this.items[index].state) {
        this.$store.commit('submitedit', index)
      }
    },
    canceledit (index) {
      this.$store.commit('canceledit', index)
    },
    finish (index) {
      this.$store.commit('finish', index)
    }
  },
  watch: {
    listopen () {
      if (this.listopen) {
        this.chartopen = false
        this.$emit('sideBarOpen', true)
      } else if (!this.listopen && !this.chartopen) {
        this.$emit('sideBarOpen', false)
      }
    },
    chartopen () {
      if (this.chartopen) {
        this.listopen = false
        this.$emit('sideBarOpen', true)
      } else if (!this.listopen && !this.chartopen) {
        this.$emit('sideBarOpen', false)
      }
    }
  },
  components: { Barchart }
}

</script>

<style lang="scss">
@import '../sass/_variable.scss';
@import '../sass/sidebar.scss';

</style>
