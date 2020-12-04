<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-04 16:25:47
 * @LastEditTime: 2020-12-04 17:22:41
 * @Description: 
-->
<template>
  <v-app>
    <!-- <Header />  -->
    <Menu />
    <v-main>
      <v-container style="margin-left: 255px"> AA </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import Header from "./components/Header";
import Menu from "./components/Menu";

export default {
  name: "App",

  components: {
    // Header,
    Menu,
  },

  data: () => ({
    //
  }),
};
</script>
