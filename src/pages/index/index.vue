<template>
  <page>
    <v-toolbar
      slot="toolbar"
      app
      :tabs="true"
      scroll-off-screen>
      <v-toolbar-title>追书神器</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-tabs
        slot="extension"
        v-model="currentTab"
        fixed-tabs
        show-arrows
        color="transparent"
      >
        <v-tab
          v-for="(tab, index) in tabs"
          :key="index"
          :to="tab.href"
        >
          {{ tab.name }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <div>
      <shelf v-show="currentTab === '/shelf'"></shelf>
      <discover v-show="currentTab === '/discover'"></discover>
    </div>
  </page>
</template>

<script>
import shelf from './components/shelf'
import discover from './components/discover'

export default {
  name: 'index',
  components: {
    shelf,
    discover
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
      currentTab: 'shelf'
    }
  }
}
</script>
<style scoped>

</style>
