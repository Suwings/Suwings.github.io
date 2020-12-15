<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2020-12-15 20:04:09
 * @LastEditTime: 2020-12-15 21:49:13
 * @Description: 
-->
<template>
  <el-container id="app">
    <el-aside width="250px">
      <!-- <el-scrollbar style="height: 100%; width: 250px"> -->
      <el-menu
        :default-openeds="['1', '2']"
        background-color="#333333"
        text-color="#FFFFFF"
        style="height: 100%"
      >
        <el-menu-item index="999" style="text-align: center">
          <img src="./assets/logo.png" alt="" srcset="" />
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>服务管理
          </template>
          <el-menu-item index="1-1">面板总览</el-menu-item>
          <el-menu-item index="1-2">应用实例</el-menu-item>
          <el-menu-item index="1-3">用户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>核心功能
          </template>
          <el-menu-item index="2-1">守护进程</el-menu-item>
          <el-menu-item index="2-2">容器</el-menu-item>
          <el-menu-item index="2-3">镜像</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>扩展功能
          </template>
          <el-menu-item index="3-1">应用程序接口</el-menu-item>
          <el-menu-item index="3-2">集群</el-menu-item>
          <el-menu-item index="3-3">设置</el-menu-item>
        </el-submenu>
      </el-menu>
      <!-- </el-scrollbar> -->
    </el-aside>
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"
            ><a href="https://www.ele.me" target="_blank"
              >订单管理</a
            ></el-menu-item
          >
        </el-menu>
      </el-header>

      <el-scrollbar style="height: 110%">
        <el-main>
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "app",
  components: {},
};
</script>

<style>
body,
html {
  margin: 0px;
  padding: 0px;
  height: 100%;
}

#app {
  height: 100%;
}
</style>
