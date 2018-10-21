<template>
  <v-app>
    <v-toolbar
      :app="!$route.meta.fullScreen"
      fixed
      :class="{'active': !showToolbar}">
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
    <slot name="footer"></slot>
  </v-app>
</template>

<script>
export default {
  name: 'page',
  computed: {
    routerName () {
      return this.$route.meta.name || ''
    },
    showToolbar () {
      return this.$store.state.showToolbar
    }
  },
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .active {
    transform: translateY(-56px) !important;
    box-shadow: none;
  }
</style>
