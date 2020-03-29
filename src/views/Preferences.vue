<template>
  <div class="hello">
    <h1 v-if="dataLoaded==false">
           Loading preferences
   </h1>
    <b-container v-if="dataLoaded==true" fluid>
        <b-row class="my-2">
            <b-col md="12">
            <H1>
                Configuration management
            </H1>
            </b-col>
        </b-row>      
    </b-container>
        <b-row class="my-2">
            <b-col md="12">
                <b-form-group label-cols-sm="6" label="Number of mail items that can be tracked in a single call" class="mb-0">
                <b-form-input v-model="nbMailItemsInput" type="number" min="0" max="20" placeholder="Number of mail items"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="my-2">
            <b-col md="12">
                <span v-if="!numMailitemsValid">
                The number of mail items is not valid
                </span>
            </b-col>
        </b-row>

        <b-row class="my-2">
            <b-col md="10">
                <b-form-group label-cols-sm="5" label="Track and Trace mail item events not older than (Number of days):" class="mb-0">
                <b-form-input v-model="nbDaysInput" type="number" min="0" max="730" placeholder="Number of days" :disabled="doNotUse"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="2">
                <input type="checkbox" id="checkbox" v-model="doNotUse">
                <label for="checkbox">Do not use</label> 
            </b-col>
        </b-row>

        <b-row>
            <span v-if="!numDaysValid">
            The number of days specified is not valid
            </span>
        </b-row>
    <button v-if="dataSaving==false"
      @click="save">
      Save
    </button>


    <p v-if="dataSaving==true">
    Saving
    </p>
  </div>
</template>

<script>
export default {
  name: 'Preferences',
  props: {
  },
  data() {
    return {
      doNotUse: false,
      nbDaysInput: null,
      nbMailItemsInput: null,
      dataLoaded:false,
      dataSaving:false,
    }
  },
  watch: {
      doNotUse(newValue) {
          if (newValue == true)
          {
              this.nbDaysInput = 0
          } else {
              this.nbDaysInput = 365
          }
      }
  },
  computed: {
    nbMailItems () {
      return this.$store.state.nbMailItems
    },
    ttNumberOfDays () {
      return this.$store.state.ttNumberOfDays
    },
        numDaysValid () {
        if (this.doNotUse)
            return true
        if (this.nbDaysInput < 0)
            return false
        if (this.nbDaysInput > 750)
            return false
        return true
    },
    numMailitemsValid () {
        if (!this.nbMailItemsInput)
            return false
        if (this.nbMailItemsInput < 0)
            return false
        if (this.nbMailItemsInput > 20)
            return false
        return true
    },
  },
  methods: {
  save() {
      console.log("save data")
      this.dataSaving = true;
      this.$store.dispatch('SAVE_Preferences',{nbMailItems : +this.nbMailItemsInput, ttNumberOfDays : +this.nbDaysInput}).then(response => {
          console.log("Saved data " +response.data.nbMailItems)
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
        this.$store.dispatch("GET_Preferences").then(response => {
          console.log("Got some data, now lets show something in this component " +response.data.nbMailItems)
          this.nbMailItemsInput = response.data.nbMailItems
          this.nbDaysInput = this.ttNumberOfDays
          if (this.ttNumberOfDays == 0)
          {
            this.doNotUse = true
          }
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
