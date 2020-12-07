<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-04 16:37:32
 * @LastEditTime: 2020-12-07 19:40:54
 * @Description: 标题栏
-->
<template>
  <v-app-bar
    flat
    style="
      background-color: rgb(255, 255, 255);
      border-bottom: 1px solid #00000033;
    "
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon dense>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon dense>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon dense>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    title: "MCSManager",
  }),
};
</script>
