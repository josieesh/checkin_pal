<template>
    <div>    
        <h2>Register</h2>    
        <form v-on:submit="register">   
            <p v-if="errors.length !== 0">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </p>
            <input type="text" v-model="form.firstName" name="firstName" placeholder="First name"/><br>
            <input type="text" v-model="form.lastName" name="lastName" placeholder="Last name"/><br>  
            <input type="text" v-model="form.username" name="username" placeholder="username"/><br>  
            <input type="text" v-model="form.sin" name="sin" placeholder="Social Insurance Number"/><br>  
            <input v-model="form.password" name="password" type="password" placeholder="Password">
            <input v-model="form.confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password">
            <input type="submit" value="Register" /> 

            

            <!-- Errors

            <div class="alert alert-danger" v-show="errors.any()">
              <div v-if="errors.has('password')">
                {{ errors.first('password') }}
              </div>
              <div v-if="errors.has('password_confirmation')">
                {{ errors.first('password_confirmation') }}
              </div>
          </div> -->
        </form>    
    </div>
</template>

<script>
    import router from "../router"
    import {formatRegistrationBody } from "../helpers/formatters"
    export default {    
        name: "Register",
        data() {
            return {
                errors: [],
                form: {
                    firstName: "",
                    lastName: "",
                    sin: "",
                    username: "",
                    password: "",
                    confirmPassword: ""
                }
            }
        },
        methods: {    
            register: function(e) {
              let register = () => {
                try {
                  // format body
                  let data = formatRegistrationBody(this.form)
                  console.log(data);
                  setTimeout(4000);
                  this.$http.post("/register", data)    
                      .then((response) => {
                          if (response.status === 201) {
                              router.push('/profile')
                          }
                      })    
                      .catch((e) => {
                          console.log(e);
                      })
                }
                catch(e) {
                  console.log("E:")
                  console.log(e)
                  this.errors.push(e)
                }                 
              } 
              e.preventDefault();
              register()    
            }    
        }    
    }
</script>