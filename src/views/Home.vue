<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px"
              style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']"
               active-text-color="#409EFF"
               router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-tickets"></i>文章管理</template>
          <el-menu-item-group>
            <el-menu-item index="list">文章列表</el-menu-item>
            <el-menu-item index="create">创建文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="returnBack">
          <i class="el-icon-setting"
             style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出</el-dropdown-item>
            <el-dropdown-item command="b">注销账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{userName}}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      userName: ''
    }
  },
  created () {
    this.userName = this.$route.query.userName;
  },
  methods: {
    // 删除账号
    deleteAccount () {
      this.$confirm('你确定要删除账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.delete(`returnBack/${this.$route.query.id}`).then(res => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$router.push('/login');
          }
        }).catch(e => console.log(e));
      }).catch((e) => {
        console.log(e);
      });
    },
    // 退出
    back () {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$router.push('/login');
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        sessionStorage.clear("token");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '放弃退出'
        });
      });
    },
    returnBack (command) {
      if (command === 'a') {
        this.back();
      } else if (command === 'b') {
        this.deleteAccount();
      }
    }
  }
};
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>