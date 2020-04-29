<template>
    <div>    
        <h2>Login</h2>    
        <form v-on:submit="login">    
            <input type="text" v-model="user.username" name="username" /><br>    
            <input type="password" v-model="user.password" name="password" /><br>    
            <input type="submit" value="Login" />    
        </form>    
    </div>
</template>

<script>
    import router from "../router"
    export default {    
        name: "Login",
        data() {
            return {
                user: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {    
            login: function(e) {
                e.preventDefault()   
                let login = () => {   
                    this.$http.post("/login", this.user)    
                        .then((response) => {
                            if (response.status === 200) {
                                router.push('/profile')
                            }
                        })    
                        .catch((errors) => {
                            if (errors.response.status === 401) {
                                this.$set(this, "user", {username: "", password: ""});
                            }  
                        })    
                }    
                login()    
            }    
        }    
    }
</script>