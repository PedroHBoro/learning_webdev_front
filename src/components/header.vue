<template>
    <v-card id="app">
            <v-app-bar id="app">
                <div>
                    <v-btn icon="mdi-menu" @click="drawer = !drawer"></v-btn>
                </div>
                <div>
                    <v-btn plain to="/">HOME</v-btn>
                </div>
            </v-app-bar>
            <v-navigation-drawer id="app" v-model="drawer" >
                <v-list nav>
                    <v-btn block class="mb-2" to="/user">USER</v-btn>
                    <v-btn block class="mb-2" to="/tasks">TASKS</v-btn>
                </v-list>
            </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
    name: 'Header',
    data() { return {
        drawer: false
    }}
}
</script>

<style scoped>

</style>