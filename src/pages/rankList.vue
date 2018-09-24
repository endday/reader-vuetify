<template>
  <page>
    <v-layout row>
      <v-flex xs3 sm2 offset-sm2>
        <v-list v-show="rankType.length"
                class="left-list">
          <v-list-tile
            v-for="(item, index) in rankType"
            :key="item._id"
            inactive
            :class="{'select-type': index === currentType}"
            @click="changeType(index)">
            <v-list-tile-content>
              <v-list-tile-title
                class="text-xs-center"
                v-text="item.shortTitle">
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs9 sm6>
        <v-list three-line
                class="right-list">
          <div v-for="(list, i) in rankList"
               :key="`${i}-list`"
               v-show="i === currentType">
            <div v-for="(item, j) in list"
                 :key="`${j}-${item._id}`">
              <v-list-tile
                @click="openBook(item._id)">
                <v-img
                  class="cover"
                  :src="item.cover"
                  height="80px"
                  contain
                ></v-img>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title>
                    <div v-text="item.author"></div>
                    <div><span v-text="item.latelyFollower"></span>人气<span v-text="item.retentionRatio"></span>%留存率
                    </div>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider
                :inset="true">
              </v-divider>
            </div>
          </div>
        </v-list>
      </v-flex>
    </v-layout>
  </page>
</template>

<script>
export default {
  name: 'rankList',
  data () {
    return {
      items: [
        { title: '测试', href: 'rankList' }
      ],
      currentType: 0
    }
  },
  computed: {
    rankType () {
      return this.$store.state.rank.rankType.male
    },
    rankList () {
      return this.$store.state.rank.rankList
    }
  },
  created () {
    if (this.$route.query.index) {
      this.currentType = parseInt(this.$route.query.index)
    }
    this.$store.dispatch('rank/getRankList', this.currentType)
  },
  methods: {
    changeType (index) {
      this.currentType = index
      this.$router.replace({
        path: 'rankList',
        query: { index }
      })
      this.$store.dispatch('rank/getRankList', index)
    },
    openBook (id) {
      this.$router.push(`/bookDetail/${id}`)
    }
  }
}
</script>
<style scoped>
  .left-list {
    max-height: 680px;
    overflow-y: scroll;
    background-color: #eee;
  }

  .right-list {
    max-height: 680px;
    overflow-y: scroll;
  }

  .select-type {
    background-color: #fff;
  }

  .cover {
    margin-right: 10px;
  }
</style>

<style>
  .v-avatar {
    width: 70px;
    height: 100px;
  }
</style>
