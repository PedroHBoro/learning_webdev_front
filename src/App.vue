<template>
  <v-app>
    <Header v-if="showHeader"></Header>
    <v-main>
      <div class="px-4 py-4">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/header.vue';

  export default {
    name: 'App',
    components: [
      Header
    ],
    data() { return {
      headerBlacklist: ['Auth'],
    }},
    computed: {
      showHeader(){ return !this.headerBlacklist.includes(this.$route.name)}
    }
  }
</script>
