<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-04 16:48:28
 * @LastEditTime: 2020-12-07 17:57:34
 * @Description: 
-->
<template>
  <v-navigation-drawer
    id="app-navigation-drawer"
    width="224px"
    absolute
    permanent
    dark
  >
    <!-- <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item> -->

    <!-- 标题栏 -->
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">MCSManager</v-list-item-title>
          <!-- <v-list-item-subtitle>#master</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- <v-divider></v-divider> -->

    <v-list-item-group
      active-class="list-item-group-active"
      v-model="selectedItem"
    >
      <v-list nav dense>
        <v-list-item
          class="list-item"
          style="border-radius: 0px"
          link
          v-for="item in list"
          :key="item.title"
        >
          <v-list-item-icon class="AppItemIcon" style="margin-right: 10px">
            <v-icon v-text="item.icon" right dense></v-icon>
          </v-list-item-icon>
          <v-list-item-title
            v-text="item.title"
            dense
            class="text-left"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-list-item-group>
  </v-navigation-drawer>
</template>

<style>
.AppItemIcon {
  margin-right: 10px;
  font-weight: 400;
}

.list-item-group-active {
  color: rgb(179, 179, 179);
}

#app-navigation-drawer {
  background-color: rgb(56, 72, 89);
}

.list-item {
  margin: 0px -8px;
  border-radius: 0px;
}
</style>

<script>
export default {
  name: "Menu",
  data: () => ({
    title: "MCSManager",
    AppActiveItem: "AppActiveItem",
    selectedItem: 0,
    list: [
      { icon: "mdi-equalizer-outline ", title: "数据监控" },
      { icon: "mdi-dns-outline ", title: "应用实例" },
      { icon: "mdi-account-cog-outline", title: "用户" },
      { icon: "mdi-dots-grid", title: "API 接口" },
      { icon: "mdi-cube-outline", title: "守护进程" },
      { icon: "mdi-card-bulleted-outline ", title: "新闻" },
      { icon: "mdi-cube-unfolded", title: "集群" },
      { icon: "mdi-cog-outline", title: "设置" },
    ],
  }),
};
</script>
