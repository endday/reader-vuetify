<template>
  <page>
    <v-container fluid>
      <v-layout row>
        <v-img
          :src="book.cover"
          width="90px"
          contain>
        </v-img>
        <v-flex xs12 sm12 class="pl-3">
          <h5 class="headline pb-2" v-text="book.title"></h5>
          <div class="pb-2"
               v-if="book.rating">
            <h6 class="title yellow--text text--darken-4 pr-2 d-inline-block"
                v-text="book.rating.score"></h6>
            <v-rating
              class="d-inline-block pr-2"
              :value="book.rating.star"
              size="18"
              color="yellow darken-3"
              half-increments
              dense
              readonly>
            </v-rating>
            <span class="subheading"
                  v-text="`${book.rating.count}人评`"></span>
          </div>
          <p class="subheading mb-2">
            <span class="red--text text--darken-2"
                  v-text="book.author"></span>
            <span class="px-1">|</span>
            <span v-text="book.majorCate"></span>
          </p>
          <p class="subheading mb-0">
            <span class="subheading"
                  v-text="`${book.wordCount}字`"></span>
            <span class="px-1">|</span>
            <span class="subheading"
                  v-text="book.updated"></span>
          </p>
        </v-flex>
      </v-layout>
      <v-layout class="pt-4 pb-4">
        <v-flex>
          <p class="title grey--text text--darken-2 text-xs-center mb-1" v-text="book.latelyFollower"></p>
          <p class="grey--text text--lighten-1 text-xs-center mb-0">追书人气</p>
        </v-flex>
        <v-flex>
          <p class="title grey--text text--darken-2 text-xs-center mb-1" v-text="`${book.retentionRatio}%`"></p>
          <p class="grey--text text--lighten-1 text-xs-center mb-0">读者留存</p>
        </v-flex>
        <v-flex>
          <p class="title grey--text text--darken-2 text-xs-center mb-1" v-text="book.postCount"></p>
          <p class="grey--text text--lighten-1 text-xs-center mb-0">社区帖子</p>
        </v-flex>
        <v-flex>
          <p class="title grey--text text--darken-2 text-xs-center mb-1" v-text="book.serializeWordCount"></p>
          <p class="grey--text text--lighten-1 text-xs-center mb-0">日更新字</p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <h5 class="title font-weight-medium mt-4 mb-4">简介</h5>
      <p class="body-1" v-text="book.longIntro"></p>
      <v-layout class="v-footer--absolute px-3 py-2">
        <v-flex pr-3>
          <v-btn class="red--text"
                 color="red lighten-5"
                 block
                 round
                 depressed
                 @click="addToShelf()">追更新
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn class="white--text"
                 color="red darken-1"
                 block
                 round
                 depressed
                 @click="goToRead()">开始阅读
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </page>
</template>

<script>
export default {
  name: 'bookDetail',
  data () {
    return {
      book: {}
    }
  },
  created () {
    this.getBookDetail()
  },
  methods: {
    getBookDetail (id = this.$route.params.id) {
      this.$http.get(`book/${id}`)
        .then(res => {
          res.cover = decodeURIComponent(res.cover).slice(7)
          res.rating.star = res.rating.score / 2
          res.rating.score = res.rating.score.toFixed(1)
          res.rating.countText = this.formatCount(res.rating.count)
          res.wordCount = this.formatCount(res.wordCount, 0)
          res.updated = this.timeToNow(res.updated)
          res.latelyFollower = this.formatCount(res.latelyFollower, 1)
          res.postCount = this.formatCount(res.postCount, 1)
          this.book = res
        })
    },
    formatCount (num, count = 1) {
      if (num >= 10000) {
        return `${(num / 10000).toFixed(count)}万`
      }
      return num
    },
    timeToNow (time) {
      const lag = Date.now() - Date.parse(time)
      const minute = 60 * 1000
      const hour = 60 * minute
      const day = 24 * hour
      const month = day * 30
      const year = day * 365
      const timeList = [year, month, day, hour, minute]
      const index = timeList.findIndex(item => lag > item)
      if (index <= 0) {
        return `${(lag / year).toFixed(0)}年前`
      } else if (index === 1) {
        return `${(lag / month).toFixed(0)}个月前`
      } else if (index === 2) {
        return `${(lag / day).toFixed(0)}天前`
      } else if (index === 3) {
        return `${(lag / hour).toFixed(0)}小时前`
      } else if (index === 4) {
        return `${(lag / hour).toFixed(0)}分钟前`
      }
    },
    addToShelf () {
      let session = window.localStorage.getItem('bookShelf')
      const bookShelf = session ? JSON.parse(session) : []
      if (bookShelf.every(book => book._id !== this.book._id)) {
        bookShelf.push(this.book)
        session = JSON.stringify(bookShelf)
        window.localStorage.setItem('bookShelf', session)
      }
    },
    goToRead (id = this.$route.params.id) {
      this.$router.push(`/reader/${id}`)
    }
  }
}
</script>
<style scoped>

</style>
