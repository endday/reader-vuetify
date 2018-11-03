<template>
  <v-list three-line>
    <template v-for="(book, index) in shelf">
      <v-list-tile
        :key="book.id"
        class="py-1"
        @click="goToRead(book.id)">
        <v-img
          class="mr-3"
          :src="book.cover"
          height="80px"
          max-width="60px"
          width="60px"
          contain
        ></v-img>
        <v-list-tile-content>
          <v-list-tile-title v-text="book.title"></v-list-tile-title>
          <v-list-tile-sub-title>
            <p>
              <span v-text="book.updatedText"></span>:<span v-text="book.lastChapter"></span>
            </p>
          </v-list-tile-sub-title>
          <!--<v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>-->
        </v-list-tile-content>
      </v-list-tile>
      <v-divider
        v-if="index !== shelf.length - 1"
        :key="index">
      </v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'shelf',
  computed: {
    shelf () {
      return this.$store.state.shelf.books
    }
  },
  data () {
    return {}
  },
  created () {
    this.$store.commit('shelf/getBooks')
  },
  methods: {
    goToRead (id) {
      this.$router.push(`/reader/${id}`)
    }
  }
}
</script>

<style scoped>

</style>
