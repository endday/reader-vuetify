<template>
  <v-app>
    <v-toolbar :app="fullScreen"
               fixed
               :class="{'active': !showToolbar}">
      <slot name="toolbar">
        <v-btn icon
               @click="back">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title v-text="titleName"></v-toolbar-title>
      </slot>
      <slot name="extension"
            slot="extension"
            height="44">
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
  props: {
    title: {
      type: String
    }
  },
  computed: {
    fullScreen () {
      return !this.$route.meta.fullScreen
    },
    titleName () {
      return this.title || this.$route.meta.name || ''
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
