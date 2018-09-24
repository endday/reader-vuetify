<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.href"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: '排行榜', href: 'rankList' }
      ]
    }
  }
}
</script>
<style scoped>

</style>
