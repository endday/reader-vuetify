<template>
  <v-app>
    <v-toolbar
      app
      scroll-off-screen>
      <slot name="toolbar">
        <v-btn icon
               @click="back">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title v-text="routerName"></v-toolbar-title>
      </slot>
    </v-toolbar>
    <v-content>
      <slot></slot>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'page',
  computed: {
    routerName () {
      return this.$route.meta.name || ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
