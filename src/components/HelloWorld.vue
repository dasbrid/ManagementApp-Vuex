<template>
  <div class="hello">
    <h1>Preferances</h1>
    <p v-if="dataLoaded==false">
    Loading 
    </p>
    <p v-if="dataSaving==true">
    Saving
    </p>
    <div v-if="dataLoaded==true">
    <p>
      There are {{ nbMailItems }} allowed
    </p>
    <p>
    <input v-model="nbMailItemsInput" placeholder="number of allowed" type="number">    
    </p>
    <p>
      Track and Trace for {{ ttNumberOfDays }} days
    </p>
    <p>
    <input v-model="nbDaysInput" placeholder="number of days" type="number">    
    </p>
    <button v-if="dataSaving==false"
      @click="save">
      Save
    </button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  },
  data() {
    return {
      nbDaysInput: null,
      nbMailItemsInput: null,
      dataLoaded:false,
      dataSaving:false,
    }
  },
  computed: {
    nbMailItems () {
      return this.$store.state.nbMailItems
    },
    ttNumberOfDays () {
      return this.$store.state.ttNumberOfDays
    },
  },
  methods: {
    save() {
      console.log("save data")
      this.dataSaving = true;
      // Dispatch the action to save config data
      //this.$store.dispatch('SAVE_nBMailItems',{nbMailItems : +this.nbMailItemsInput, ttNumberOfDays : +this.nbDaysInput})
      this.$store.dispatch('SAVE',{nbMailItems : +this.nbMailItemsInput, ttNumberOfDays : +this.nbDaysInput}).then(response => {
          console.log("Saved datadata " +response.data.nbMailItems)
        this.dataSaving = false;
      }, error => {
            console.error("Got nothing from server. Prompt user to check internet connection and try again" + error) 
        })
    },
  },
  mounted(){
    console.log("mounted... get nbMailitms")

       // This component just got created. Lets fetch some data here using an action
        // the action execution is asynchronous so we programmed it to return a promise.
        // This allows us to set the initial input values when the promise returns
        // we could also use this to preent a "loading ..." message
        this.$store.dispatch("GET_nBMailItems").then(response => {
          console.log("Got some data, now lets show something in this component " +response.data.nbMailItems)
          this.nbMailItemsInput = response.data.nbMailItems
          this.nbDaysInput = this.ttNumberOfDays
          this.dataLoaded = true
        }, error => {
            console.error("Got nothing from server. Prompt user to check internet connection and try again" + error) 
        })
  
   }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
