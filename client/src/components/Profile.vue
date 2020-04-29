<template>
    <div>    
        <h2>Profile</h2>    
        <p>Name: {{ user.first_name }} {{ user.last_name}}</p>    
    </div>
</template>
<script>
    import axios from "axios"    
    import router from "../router"    

    export default {    
        name: "Profile",    
        data() {    
            return {    
                user: {    
                    first_name: "",
                    last_name: ""    
                }    
            }    
        },
        methods: {    
            getUserData: async function() {
                
                let self = this;
                this.$http.get("/user")    
                    .then((response) => {
                        self.$set(this, "user", response.data)
                    })    
                    .catch((errors) => {    
                        console.log(errors)    
                        router.push("/")    
                    })    
            }    
        },    
        mounted() { 
            this.getUserData()    
        }    
    }
</script>