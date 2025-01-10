import Cookies from "js-cookie"

export class JWT{
    constructor(jwt_name){
        this.jwt_name = jwt_name
    }

    getToken(){
        return Cookies.get(this.jwt_name)
    }
    
    setToken(token){
        return Cookies.set(this.jwt_name, token)
    }
}