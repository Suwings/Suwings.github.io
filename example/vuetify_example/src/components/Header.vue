<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-04 16:37:32
 * @LastEditTime: 2020-12-04 17:11:37
 * @Description: 标题栏
-->
<template>
  <v-app-bar dense flat app color="black" dark>
    <span>{{ title }}</span>
    <v-spacer></v-spacer>
    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
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
