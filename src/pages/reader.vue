<template>
  <page>
    <section class="chapter-body" :style="bodyStyle">
      <!--<h4 class="title pa-3" v-text="title"></h4>-->
      <!--<p class="main-text pa-3" v-text="chapter"></p>-->
      <p class="main-text mb-0"
         :class="{'firstLine': item.firstLine}"
         v-for="(item, index) in chapter2"
         :key="index"
         v-text="item.text">
      </p>
    </section>
    <v-bottom-nav
      app
      :value="true"
      fixed
      height="48px"
      color="transparent">
      <v-btn flat>
        <v-icon class="mb-0">format_list_bulleted</v-icon>
      </v-btn>
      <v-btn flat @click="bright = !bright">
        <v-icon v-show="bright" class="mb-0">brightness_high</v-icon>
        <v-icon v-show="!bright" class="mb-0">brightness_low</v-icon>
      </v-btn>
      <v-btn flat>
        <v-icon class="mb-0">settings</v-icon>
      </v-btn>
      <v-btn flat>
        <v-icon class="mb-0">file_download</v-icon>
      </v-btn>
    </v-bottom-nav>
  </page>
</template>

<script>
import chapterFormat from '../utils/chapterFormat'

export default {
  name: 'reader',
  data () {
    return {
      shelf: [],
      book: {},
      bright: true,
      sourceId: null,
      chapters: [],
      chapterId: null,
      title: '',
      chapter: null,
      chapter2: ['1', '2'],
      bodyStyle: { height: '0px' }
    }
  },
  computed: {
    bookId () {
      return this.$route.params.id
    }
  },
  created () {
    this.init()
  },
  methods: {
    getBookSource (id = this.bookId) {
      return this.$http.get(`book/sources/${id}`)
        .then(res => {
          return Promise.resolve(res[1]._id)
        })
    },
    getCatalog (id = this.sourceId) {
      return this.$http.get(`book/catalog/${id}`)
        .then(res => {
          this.chapters = res.chapters
          return Promise.resolve(res.chapters[0].link)
        })
    },
    getChapter (id = this.chapterId) {
      const formatId = encodeURIComponent(id)
      return this.$http.get(`book/chapter/${formatId}`)
        .then(res => {
          this.title = res.chapter.title
          this.chapter = res.chapter.body
        })
    },
    getReadHistory () {
      let session = window.localStorage.getItem('bookShelf')
      this.shelf = session ? JSON.parse(session) : []
      this.book = this.shelf.find(book => book._id === this.bookId)
      if (this.book && this.book.history) {
        if (this.book.history.sourceId) {
          this.sourceId = this.book.history.sourceId
        }
        if (this.book.history.chapterId) {
          this.chapterId = this.book.history.chapterId
        }
      }
    },
    async init () {
      this.getReadHistory()
      if (!this.sourceId) {
        this.sourceId = await this.getBookSource()
      }
      if (!this.chapterId) {
        this.chapterId = await this.getCatalog()
      }
      await this.getChapter()
      const height = window.screen.availHeight - 104
      this.bodyStyle.height = `${height}px`
      this.chapter2 = chapterFormat(this.chapter)
    }
  }
}
</script>
<style scoped>
  .chapter-body {
    overflow-y: scroll;
    padding: 0 10px;
  }

  .main-text {
    line-height: 30px;
    font-size: 17px;
  }
  .firstLine {
    text-indent: 2em;
  }
</style>
