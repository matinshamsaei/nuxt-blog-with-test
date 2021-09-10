<template>
  <div>
    <the-header @sidenavToggle="displaySideNav = !displaySideNav"></the-header>
    <the-sidenav
      :show="displaySideNav"
      @close="displaySideNav = false">
    </the-sidenav>
    <Nuxt />
  </div>
</template>

<script>
  import TheHeader from "../components/Navigation/TheHeader";
  import TheSidenav from "../components/Navigation/TheSidenav";

  export default {
    data() {
      return {
        displaySideNav: false
      }
    },

    // middleware: 'log',

    components: {
      TheHeader,
      TheSidenav
    }
  }
</script>

<style>
html {
  font-family: 'Grandstander', cursive;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}
</style>
