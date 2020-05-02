<template>
  <div id="app">
    <h1>Check-In Pal</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-image: url('./assets/map_background.jpg');
}

table {
  font-family: 'Open Sans', sans-serif;
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px;
  text-align: center;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}

PlacesTable {
  text-align: center;
}
</style>
