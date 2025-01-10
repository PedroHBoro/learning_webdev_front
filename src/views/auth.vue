<template>
    <div class="d-flex">
        <v-col class="mr-0 ml-5" >
            <Login 
            :isBusy="isBusy"
            @ready="(v) => { readyLogin != v ? readyLogin = v : ''}" 
            @login="(v) => { login(v) }">
            </Login>
            <div v-if="alreadyRegistered" class="d-flex justify-center">
                <v-card style="width: 500px;">
                    <v-card-title class="d-flex justify-center">
                        successfuly registered
                    </v-card-title>
                </v-card>
            </div>
        </v-col>
        <v-col v-if="!alreadyRegistered" class="ml-0 mr-5">
            <Register 
            :isBusy="isBusy"
            @ready="(v) => { readyRegister != v ? readyRegister = v : ''}" 
            @register="(v) => { register(v) }">
            </Register>
        </v-col>
    </div>
</template>

<script>
import Login from '@/components/login.vue';
import Register from '@/components/register.vue';

import { api } from '@/router';

export default {
    name: 'Auth',
    components: [
        Login,
        Register
    ],
    data() { return {
        isBusy: false,
        alreadyRegistered: false,
        readyRegister: false,
        readyLogin: false,
    }},
    methods: {
        async login(data) {
            if (this.isBusy || !data) {
                return
            }

            this.isBusy = true
            const login = await api.login(data)
            login.error ? console.error(login.error) : location.reload()
            this.isBusy = false
        },
        async register(data) {
            if (this.isBusy || !data) {
                return
            }

            this.isBusy = true
            this.formIsValid = false
            const register = await api.register(data)
            register.error ? console.error(register.error) : this.alreadyRegistered = true, console.log(register)
            this.isBusy = false
        }
    }
}
</script>

<style>

</style>