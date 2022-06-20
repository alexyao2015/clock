<template>
  <div>
    <v-app>
      <v-main>
        <Navbar />
        <NuxtPage></NuxtPage>
      </v-main>
    </v-app>
  </div>
</template>

<style>
html {
  overflow-y: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.v-application__wrap {
  min-height: unset !important;
}
</style>
