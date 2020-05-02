<template>
    <div>    
        <h2>Profile</h2>
        <button v-on:click="logout">Logout</button>     
        <p>Name: {{ user.first_name }} {{ user.last_name}}</p>   
        <div>
            <button v-on:click="checkin">Check-in</button>
            <button v-on:click="places">My recent places</button>   
        </div> 
        <p style="color:green" v-if="checkinSuccess">Successful check-in!</p>
        <p style="color:red" v-if="checkinFailure">Something went wrong with the check-in. Try again later.</p>
        <PlacesTable ref="placesTable" v-if="getPlaces"/>
    </div>
</template>
<script>
    import axios from "axios"    
    import router from "../router"    
    import {getLocation} from "../helpers/location"
    import PlacesTable from "./PlacesTable"

    export default {    
        name: "Profile",    
        data() {    
            return {
                getPlaces: false,
                checkinSuccess: false,  
                checkinFailure: false,
                user: {    
                    first_name: "",
                    last_name: ""    
                }    
            }    
        },
        components: {
            PlacesTable
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
                                // update the Places Table if it is initialized
                                if (this.getPlaces) {
                                    this.$refs.placesTable.getMyPlaces()
                                }
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
            },
            places: async function() {
                this.$set(this, "getPlaces", !this.getPlaces)
            }
        },    
        mounted() { 
            this.getUserData()    
        }    
    }
</script>