<template>
    <div class="d-flex justify-center">
        <v-card 
        class="h-75"
        style="width: 500px; margin: 100px;">
            <v-card 
            class="py-4"
            variant="outlined" 
            style="border-top: none; border-left: none; border-right: none;">
                <v-card-title class="d-flex justify-center mb-5">
                    <span>LOGIN</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                        type="email"
                        label="email"
                        v-model="form.email"
                        :rules="rulesEmail">
                        </v-text-field>
                            <v-spacer class="my-3"></v-spacer>
                        <v-text-field
                        class="mr-2"
                        :type="showPassword ? 'text' : 'password'"
                        label="password"
                        v-model="form.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        @keyup.enter="login(form)"
                        :rules="rulesPassword">
                        </v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                    :disabled="!formIsValid || isBusy"
                    size="large"
                    :prepend-icon="isBusy ? 'mdi-loading' : 'mdi-login-variant'"
                    @click.prevent="login(form)">
                    LOGIN
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-card>
    </div>
</template>

<script>

export default {
    name: 'Login',
    props: [
        'isBusy'
    ],
    data() { return {
        form: {
            email: '',
            password: ''
        },
        rulesEmail: [
            value => {
                if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
                    return true
                } else {
                    return 'invalid email'
                }
            }
        ],
        rulesPassword: [
            value => {
                if (/^[A-Za-z\d!@#$%*(),.?:{}<>]{8,}$/.test(value)){
                    return true
                } else {
                    return 'invalid password'
                }
            }
        ],
        showPassword: false,
        formIsValid: false
    }},
    computed: {

    },
    watch: {
        form: {
            async handler(val){
                if (val.email && val.password) {
                    this.formIsValid = await this.isValid()
                } else {
                    this.formIsValid = false
                }
            },
            deep: true
        }
    },
    methods: {
        async isValid(){
            const { valid } = await this.$refs.form.validate()
            this.$emit('ready', valid)
            return valid
        },
        login(data){
            if (!this.formIsValid) {
                return
            }
            this.$emit('login', data)
            this.formIsValid = false
        }
    }
}
</script>

<style>

</style>