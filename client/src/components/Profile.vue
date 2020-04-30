<template>
    <div>    
        <h2>Profile</h2>    
        <p>Name: {{ user.first_name }} {{ user.last_name}}</p>   
        <div>
            <button v-on:click="checkin">Check-in</button>
            <button v-on:click="logout">Logout</button>    
        </div> 
        <p style="color:green" v-if="checkinSuccess">Successful check-in!</p>
        <p style="color:red" v-if="checkinFailure">Something went wrong with the check-in. Try again later.</p>
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
                checkinSuccess: false,  
                checkinFailure: false,
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
                        .then((response) => {
                            if (response.status ===201) {
                                this.$set(this, "checkinSuccess", true)
                            }
                        })
                        .catch((e) => {
                            this.$set(this, "checkinFailure", true)
                            console.log(e)
                        })
                    }).catch((e) => {
                        this.$set(this, "checkinFailure", true)
                        console.log(e);
                    })
            }
        },    
        mounted() { 
            this.getUserData()    
        }    
    }
</script>