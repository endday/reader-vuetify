<template>
  <page>
    <v-tabs
      slot="extension"
      v-model="tabIndex"
      centered
      fixed-tabs
      color="transparent">
      <v-tab
        v-for="(rankCat, index) in rankCats"
        :key="index">
        {{rankCat.name}}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabIndex">
      <v-tab-item v-for="(lists, index) in rankType"
                  :key="index">
        <v-layout row>
          <v-flex xs3 sm2 offset-sm2>
            <v-list class="left-list">
              <v-list-tile
                v-for="(list, subIndex) in lists"
                @click="changeType(subIndex)"
                :key="list._id"
                :class="{'select-type': subIndex === rankCats[index].subIndex}">
                <v-list-tile-content>
                  <v-list-tile-title
                    class="text-xs-center"
                    v-text="list.shortTitle">
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
          <v-flex xs9 sm6>
            <v-list three-line
                    class="right-list"
                    v-for="(list, index) in lists"
                    :key="list._id"
                    v-show="index === rankCats[tabIndex].subIndex">
              <div v-for="book in list.books.slice(0, 10)"
                   :key="book._id">
                <v-list-tile
                  @click="openBook(book._id)">
                  <v-list-tile-action>
                    <img class="cover"
                         v-lazy="book.cover"
                         alt="">
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="book.title"></v-list-tile-title>
                    <v-list-tile-sub-title>
                      <div v-text="book.author"></div>
                      <v-layout>
                        <p>
                          <span v-text="book.latelyFollower"></span>人气
                        </p>
                        <p>
                          <span v-text="book.retentionRatio"></span>%留存率
                        </p>
                      </v-layout>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider
                  :inset="true">
                </v-divider>
              </div>
            </v-list>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
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
      rankCats: [
        {
          value: 'male',
          name: '男频',
          subIndex: 0
        },
        {
          value: 'female',
          name: '女频',
          subIndex: 0
        },
        {
          value: 'epub',
          name: '出版',
          subIndex: 0
        },
        {
          value: 'picture',
          name: '漫画',
          subIndex: 0
        }
      ],
      tabIndex: 0
    }
  },
  computed: {
    rankType () {
      return this.$store.state.rank.rankType
    }
  },
  created () {
    this.$store.dispatch('rank/getRankType')
      .then(() => {
        this.changeType()
      })
  },
  watch: {
    tabIndex () {
      this.tabChange()
    }
  },
  methods: {
    changeType (subIndex = 0) {
      this.rankCats[this.tabIndex].subIndex = subIndex
      this.$store.dispatch('rank/getBooks', {
        index: this.tabIndex,
        subIndex: subIndex
      })
    },
    tabChange (tabIndex) {
      this.$store.dispatch('rank/getBooks', {
        index: this.tabIndex,
        subIndex: this.rankCats[this.tabIndex].subIndex
      })
    },
    openBook (id) {
      this.$router.push(`/bookDetail/${id}`)
    },
    routePath (type) {
      return {
        path: 'rankList',
        query: {
          cat: this.rankCats[this.tabIndex].value,
          type: type
        }
      }
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

  .select-type, .select-type a {
    background-color: #fff;
  }

  .cover {
    width: 45px;
  }
</style>

<style>
  .v-avatar {
    width: 70px;
    height: 100px;
  }
</style>
