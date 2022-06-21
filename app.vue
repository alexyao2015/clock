<template>
  <div>
    <NuxtLayout>
      <NuxtPage class="inner-page"></NuxtPage>
    </NuxtLayout>
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
.inner-page {
  padding: 40px;
}
</style>
