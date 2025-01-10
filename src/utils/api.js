import { JWT } from "./cookies"

export class API {
    constructor(url, token_name){
        this.url = url
        this.token_name = token_name
        this.jwt = new JWT(token_name)
    }

    async login(data){
        try {
            const response = await fetch(`${this.url}/auth/login`, {
                method: 'POST',
                headers: {
		            'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const json = await response.json()
            this.jwt.setToken(json.token)
            return json
        } catch (err) {
            console.log(err)
            return {
                error: err,
                ok: false
            }
        }
    }

    async register(data){
        try {
            const response = await fetch(`${this.url}/auth/register`, {
                method: 'POST',
                headers: {
		            'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const json = await response.json()
            return json
        } catch (err) {
            console.log(err)
            return {
                error: err,
                ok: false
            }
        }
    }

    async validate() {
        try {
            if (this.jwt.getToken()) {
                const response = await fetch(`${this.url}/auth/validate`, {
                    method: 'GET',
                    headers: {
                    'access_token': this.jwt.getToken()
                    }
                })
                const json = await response.json()
                return json.authenticated
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
            return false
        }
    }
}