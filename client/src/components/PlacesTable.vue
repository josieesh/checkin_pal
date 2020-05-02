<template>
  <div style="text-align:center;">
    <table id="placesTable">
    <thead>
        <tr>
        <th>Time</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Address</th>
        <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(place, index) in places">
        <td>{{place.timestamp}}</td>
        <td>{{place.latitude}}</td>
        <td>{{place.longitude}}</td>
        <td>{{place.address}}</td>
        <td>
          <span v-if=place.details v-bind:style="{ color: place.details.color}">
            {{place.details.message}}
          </span>
            <button v-on:click="getDetails(place, index)" type="button" class="btn btn-primary">
              Get Details
            </button> 
        </td>
        </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
  const BusyFactor = Object.freeze({"red":"Over capacity","orange":"Very busy","yellow":"Moderately Busy","green":"Not too busy","blue":"Empty","grey":"Insufficient information"});
  export default {
    name: "MyPlaces",
    data() {
      return {
        places: []
      }
    },
    methods: {
        getMyPlaces: async function() {
            this.$http.get("/places")
            .then((response) => {
                this.$set(this, "places", response.data.places)
            }) 
        },
        getDetails: async function(place, index) {
          this.$http.get(`/places/${place.uuid}`)
          .then((response) => {
            var newPlace = place
            newPlace.details = this.computeBusyness(response.data)
            this.$set(this.places[index], "edit", newPlace)
          })
        },
        computeBusyness: function(data) {
          if (data.capacity && data.persons >= 0 && data.capacity >= 0) {
            if (data.persons / data.capacity > 1) return {color: "red", message: BusyFactor.red};
            else if (data.persons / data.capacity >= 0.75) return {color: "orange", message: BusyFactor.orange};
            else if (data.persons / data.capacity >= 0.5) return {color: "yellow", message: BusyFactor.yellow};
            else if (data.persons / data.capacity >= 0.25) return {color: "green", message: BusyFactor.green};
            else return {color: "blue", message: BusyFactor.blue};;
          }
          else {
            return {color: "grey", message: BusyFactor.grey};
          }
        }
    },
    mounted() { 
            this.getMyPlaces()    
        }    
  }
</script>