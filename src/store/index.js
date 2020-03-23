import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nbMailItems: null,
    ttNumberOfDays: null,
  },
  // Mutations change the state. They are called by actions
  // They are synchronous cannot run ascynchronous calls (Axios callse to API)
  mutations: {
    SET_nbMailItems : (state,payload) => {
      state.nbMailItems = payload.numMailitems
      state.ttNumberOfDays = payload.ttNumberOfDays
    },
  },
  // Actions are called from the GUI
  // They are not synchronous - which means they are asynchronous!
  // So they return immediately. Internally we make it return a promise
  // so that we know when the data has loaded
  actions: {
    GET_nBMailItems(context) {
      return new Promise((resolve, reject) => {
          // Do something here... lets say, a http call using vue-resource
          axios.get ("https://localhost:5001/api/config")
          .then(response => {
              // http success, call the mutator and change something in state
              console.log(response);
              var numMailitems = response.data.nbMailItems
              var ttNumberOfDays = response.data.ttNumberOfDays
              // use mutation to set config in the state
              context.commit('SET_nbMailItems',{numMailitems : numMailitems, ttNumberOfDays: ttNumberOfDays})
              resolve(response);  // Let the calling function know that http is done. You may send some data back
          }, error => {
              // http failed, let the calling function know that action did not work out
              reject(error);
          })
      })
  },
  SAVE(context, payload) {
    return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        axios.put ("https://localhost:5001/api/config",
        {
          NbMailItems: payload.nbMailItems,
          EventListTracked: "1, 2, 3, 4, 5, 6, 7",
          PathToStoreSignatureImg: "",
          TTNumberOfDays: payload.ttNumberOfDays
      })
        .then(response => {
            // http success, call the mutator and change something in state
            console.log(response);
            context.commit('SET_nbMailItems', { numMailitems : payload.nbMailItems, ttNumberOfDays : payload.ttNumberOfDays})
            resolve(response);  // Let the calling function know that http is done. You may send some data back
        }, error => {
            // http failed, let the calling function know that action did not work out
            reject(error);
        })
    })
},

   // Update the config value from the gui
   SAVE_nBMailItems : async (context, payload) => {
      // Post the value to the DB
      /*let { data } = */await axios.put('http://localhost:5000/api/config',
      {
        NbMailItems: payload.nbMailItems,
        EventListTracked: "1, 2, 3, 4, 5, 6, 7",
        PathToStoreSignatureImg: "",
        TTNumberOfDays: payload.ttNumberOfDays
    })
      // use mutation to set config in the state
      context.commit('SET_nbMailItems', { numMailitems : payload.nbMailItems, ttNumberOfDays : payload.ttNumberOfDays})
   },
  },
  modules: {
  },
  getters: {
    nbMailItems : state => {
      return state.nbMailItems
    },
    ttNumberOfDays : state => {
      return state.ttNumberOfDays
    },

  },
})
