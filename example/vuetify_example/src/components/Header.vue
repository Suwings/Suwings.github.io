<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-04 16:37:32
 * @LastEditTime: 2020-12-07 17:53:43
 * @Description: 标题栏
-->
<template>
  <v-app-bar dense flat>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
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
