<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-04 16:25:47
 * @LastEditTime: 2020-12-07 20:04:51
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
.MainContainer {
  margin-left: 224px;
}

#Main {
  background-color: rgb(236, 236, 236);
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
