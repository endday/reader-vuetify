<template>
  <router-view keep-alive/>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isTab () {
      return ['shelf', 'discover', 'index'].includes(this.$route.name)
    },
    routerName () {
      return this.$route.meta.name || ''
    }
  },
  data () {
    return {
      tabs: [
        {
          name: '追书',
          href: '/shelf'
        },
        {
          name: '发现',
          href: '/discover'
        }
      ],
      currentTab: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
