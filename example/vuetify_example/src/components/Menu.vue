<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-04 16:48:28
 * @LastEditTime: 2020-12-04 18:10:44
 * @Description: 
-->
<template>
  <v-navigation-drawer width="300px" absolute permanent>
    <v-list>
      <!-- <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item> -->

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title"> MCSManager </v-list-item-title>
          <v-list-item-subtitle>#master</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item>
        <v-list-item-content>
          <v-text-field label="搜索功能" outlined dense></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link v-for="item in list" :key="item">
        <v-list-item-icon style="margin-right: 10px">
          <v-icon v-text="item.icon" right dense></v-icon>
        </v-list-item-icon>
        <v-list-item-title
          v-text="item.title"
          dense
          class="text-left"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    title: "MCSManager",
    list: [
      { icon: "mdi-folder", title: "概述" },
      { icon: "mdi-account-multiple", title: "服务器" },
      { icon: "mdi-star", title: "用户" },
      { icon: "mdi-folder", title: "API 接口" },
      { icon: "mdi-folder", title: "守护进程" },
      { icon: "mdi-folder", title: "新闻" },
      { icon: "mdi-folder", title: "集群" },
      { icon: "mdi-folder", title: "设置" },
    ],
  }),
};
</script>
