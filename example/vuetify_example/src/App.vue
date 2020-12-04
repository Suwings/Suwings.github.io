<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-04 16:25:47
 * @LastEditTime: 2020-12-04 17:53:53
 * @Description: 
-->
<template>
  <v-app>
    <!-- <Header />  -->
    <Menu />
    <v-main>
      <div class="main_content">
        <ContentIndex />
      </div>
    </v-main>
  </v-app>
</template>

<style>
.main_content {
  margin-left: 300px;
  padding: 0px 12px;
}
</style>

<script>
// import Header from "./components/Header";
import Menu from "./components/Menu";
import ContentIndex from "./components/ContentIndex";

export default {
  name: "App",

  components: {
    // Header,
    Menu,
    ContentIndex,
  },

  data: () => ({
    //
  }),
};
</script>
