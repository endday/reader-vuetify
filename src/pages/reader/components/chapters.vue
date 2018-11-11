<template>
  <div>
    <v-list class="pa-1">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title v-text="bookTitle"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile
        v-for="(item, index) in chapters"
        :key="index"
        @click="handleClick({item,index})">
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'drawer',
  props: {
    bookTitle: {
      type: String
    },
    chapters: {
      type: Array
    }
  },
  methods: {
    handleClick (chapter) {
      this.$emit('chapter-click', chapter)
    }
  }
}
</script>

<style scoped>

</style>
