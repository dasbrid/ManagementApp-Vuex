<template>
<div id="app" class="wrapper">

<nav id="sidebar">
      <b-button block @click="$router.push('/preferences')">Preferences</b-button>
      <b-button block @click="$router.push('/tokens')">List of tokens</b-button>
      <b-button block @click="$router.push('/about')">About</b-button>
    </nav>
  
        <router-view class="mainview"/>
  </div>
</template>

<style>
.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
    background-color: rgb(255, 255, 255)
}

.mainview {
  width:100%
}
b-button {
  min-width: 200px;
}

#sidebar p {
    color: #fff;
    padding: 10px;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
    background:  #111;
    padding:20px
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #502c35;
}</style>
