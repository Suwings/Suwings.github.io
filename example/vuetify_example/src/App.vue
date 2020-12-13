<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-04 16:25:47
 * @LastEditTime: 2020-12-13 23:03:26
 * @Description: 
-->
<template>
  <v-app>
    <Menu />
    <v-main id="Main">
      <div class="MainContainer">
        <Header />
        <div class="MainContent">
          <ContentIndex />
          <Footer />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<style>
.MainContent {
  padding: 0px 4px;
  min-height: 100%;
}

#Main {
  background-color: rgb(250, 250, 250);
}
</style>

<script>
import Header from "./components/Header";
import Menu from "./components/Menu";
import ContentIndex from "./components/ContentIndex";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    Header,
    Menu,
    ContentIndex,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
