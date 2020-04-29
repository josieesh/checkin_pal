<template>
    <div>    
        <h2>Profile</h2>    
        <p>Name: {{ user.first_name }} {{ user.last_name}}</p>   
        <div>
            <button v-on:click="checkin">Check-in</button>
            <button v-on:click="logout">Logout</button>    
        </div> 
    </div>
</template>
<script>
    import axios from "axios"    
    import router from "../router"    
    import {getLocation} from "../helpers/location"

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
                        if (errors.response.status === 403) router.push("/login")    
                    })    
            },
            logout: function() {
                this.$http.get("/logout")
                .then((response) => {
                    console.log("loggedout")
                    router.push("/login")
                })
                .catch((errors) => {
                    console.log(errors)
                })
            },
            checkin: async function() {
                getLocation()
                    .then((position) => {
                        this.$http.post("/checkin", {lng: position.coords.longitude, lat: position.coords.latitude})
                    }).catch((e) => {
                        console.log(e);
                    })
            }
        },    
        mounted() { 
            this.getUserData()    
        }    
    }
</script>