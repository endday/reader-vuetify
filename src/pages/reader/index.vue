<template>
  <page class="page"
        :title="book.title">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary>
      <chapters
        :chapters="chapters"
        :bookTitle="book.title"
        @chapter-click="jumpChapter"/>
    </v-navigation-drawer>
    <div class="reader-mask">
      <div class="area">
        <div class="pre-ctrl" @click="prePage"></div>
      </div>
      <div class="area">
        <div class="pre-ctrl" @click="prePage"></div>
        <div class="mid-ctrl" @click="toggleToolbar"></div>
        <div class="next-ctrl" @click="nextPage"></div>
      </div>
      <div class="area">
        <div class="next-ctrl" @click="nextPage"></div>
      </div>
    </div>
    <div class="page-header">
      <p class="chapter-title"
         v-if="chapters[chapterNo]"
         v-text="chapters[chapterNo].title"></p>
    </div>
    <div class="reader-content">
      <article class="chapter-body">
        <section class="reader-section"
                 ref="reader"
                 :style="{transform: `translateX(-${pageNo * pageWidth}px)`}">
          <div v-if="chapters[chapterNo] && chapters[chapterNo].article.length">
            <h4 class="title pa-3"
                v-text="chapters[chapterNo].title"></h4>
            <p class="main-text"
               v-for="(line, index) in chapters[chapterNo].article"
               :key="index"
               v-text="line">
            </p>
          </div>
        </section>
      </article>
    </div>
    <v-bottom-nav
      slot="footer"
      :value="showToolbar"
      :fixed="true"
      height="48px"
      color="#fff">
      <v-btn flat @click="drawer = true">
        <v-icon class="mb-0">format_list_bulleted</v-icon>
      </v-btn>
      <v-btn flat @click="bright = !bright">
        <v-icon v-show="bright" class="mb-0">brightness_high</v-icon>
        <v-icon v-show="!bright" class="mb-0">brightness_low</v-icon>
      </v-btn>
      <v-btn flat @click="set = true">
        <v-icon class="mb-0">settings</v-icon>
      </v-btn>
      <v-btn flat>
        <v-icon class="mb-0">file_download</v-icon>
      </v-btn>
    </v-bottom-nav>
    <v-bottom-sheet v-model="set">
      <readSet></readSet>
    </v-bottom-sheet>
  </page>
</template>

<script>
import chapters from './components/chapters'
import readSet from './components/readSet'

export default {
  name: 'reader',
  components: {
    chapters,
    readSet
  },
  data () {
    return {
      shelf: [],
      book: {
        title: ''
      },
      drawer: false,
      set: false,
      bright: true,
      sourceId: null,
      chapters: [],
      chapterId: null,
      title: '',
      pageNo: 0,
      chapterNo: 0,
      readerHeight: 0,
      lineHeight: 1.6,
      fontSize: 16,
      shimHeight: 0,
      pageWidth: 0,
      chapterWidth: 0
    }
  },
  computed: {
    bookId () {
      return this.$route.params.id
    },
    showToolbar () {
      return this.$store.state.showToolbar
    }
  },
  beforeRouteEnter (from, to, next) {
    next((vm) => {
      vm.$store.commit('toggleToolbar', false)
    })
  },
  beforeRouteLeave (from, to, next) {
    this.$store.commit('toggleToolbar', true)
    next()
  },
  created () {
    this.getScreenWidth()
    this.getBookDetail()
    this.init()
  },
  methods: {
    getBookDetail (id = this.$route.params.id) {
      this.$http.get(`book/${id}`)
        .then(res => {
          this.book.title = res.title
        })
    },
    getScreenWidth () {
      this.pageWidth = document.body.clientWidth - 16
    },
    getBookSource (id = this.bookId) {
      return this.$http.get(`book/sources/${id}`)
        .then(res => {
          return Promise.resolve(res[1]._id)
        })
    },
    getCatalog (id = this.sourceId) {
      if (!this.chapters.length) {
        return this.$http.get(`book/catalog/${id}`)
          .then(res => {
            this.chapters = res.chapters.map(item => ({
              article: [],
              ...item
            }))
            return Promise.resolve()
          })
      }
      return Promise.resolve()
    },
    getChapter (link = this.chapterId) {
      if (!this.chapters[this.chapterNo].article.length) {
        const formatLink = encodeURIComponent(link)
        return this.$http.get(`book/chapter/${formatLink}`)
          .then(res => {
            this.title = res.chapter.title
            this.chapters[this.chapterNo].article = res.chapter.body.split('\n')
          })
      } else {
        return Promise.resolve()
      }
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
      if (!this.sourceId) {
        this.sourceId = await this.getBookSource()
      }
      await this.getCatalog()
      if (!this.chapterId) {
        this.chapterId = this.chapters[0].link
      }
      await this.getChapter()
      this.$nextTick().then(() => {
        this.chapterWidth = this.$refs.reader.scrollWidth
      })
    },
    jumpChapter (chapter) {
      this.chapterNo = chapter.index
      this.chapterId = this.chapters[this.chapterNo].link
      this.pageNo = 0
      this.getChapter()
      this.drawer = false
      this.hideToolbar()
    },
    async nextPage () {
      this.hideToolbar()
      if ((this.pageNo + 1) * this.pageWidth >= this.chapterWidth) {
        await this.getCatalog()
        this.chapters[this.chapterNo].totalpage = this.pageNo
        this.chapterNo += 1
        this.chapterId = this.chapters[this.chapterNo].link
        this.pageNo = 0
        await this.getChapter()
        this.$nextTick().then(() => {
          this.chapterWidth = this.$refs.reader.scrollWidth
        })
      } else {
        this.pageNo += 1
      }
    },
    async prePage () {
      this.hideToolbar()
      if (this.pageNo <= 0) {
        this.pageNo = 0
        if (this.chapterNo > 0) {
          this.chapterNo -= 1
          await this.getChapter()
          this.$nextTick().then(() => {
            this.chapterWidth = this.$refs.reader.scrollWidth
          })
          this.pageNo = this.chapters[this.chapterNo].totalpage
        }
      } else if (this.pageNo > 0) {
        this.pageNo -= 1
      } else {
        this.pageNo = 0
      }
    },
    toggleToolbar () {
      this.$store.commit('toggleToolbar')
    },
    hideToolbar () {
      if (this.showToolbar) {
        this.$store.commit('toggleToolbar', false)
      }
    }
  }
}
</script>
<style scoped>
  .page {
    transform-style: preserve-3d;
  }

  .page-header {
    position: fixed;
    top: 0;
    left: 16px;
    height: 44px;
    display: flex;
    align-items: center;
  }

  .chapter-title {
    font-size: 13px;
    color: #999;
    margin-bottom: 0;
  }

  .reader-content {
    position: absolute;
    top: 44px;
    bottom: 0;
    overflow: hidden;
    width: 100%;
    border-top: 0;
  }

  .chapter-body {
    height: 100%;
    margin: 0 16px;
    font-size: 18px;
    line-height: 1.8;
    overflow: hidden;
  }

  .reader-section {
    overflow: visible;
    height: 100%;
    columns: calc(100vw - 32px) 1;
    column-gap: 16px;
  }

  .reader-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
  }

  .area {
    flex: 1;
    display: flex;
  }

  .pre-ctrl {
    flex: 1;
    height: 100%;
  }

  .next-ctrl {
    flex: 1;
    height: 100%;
  }

  .mid-ctrl {
    flex: 1;
    height: 100%;
  }

  .main-text {
    text-indent: 2em;
    margin-bottom: 0;
    font-size: 1em;
  }

  .firstLine {
    text-indent: 2em;
  }
</style>
