<template>
  <el-table :data="tableData"
            style="width: 100%">
    <el-table-column prop="title"
                     label="文章标题"
                     width="150">
    </el-table-column>
    <el-table-column prop="desc"
                     label="文章内容">
    </el-table-column>
    <el-table-column fixed="right"
                     label="操作"
                     width="100">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row._id)"
                   type="text"
                   size="small">编辑</el-button>
        <el-button type="text"
                   @click="remove(scope.row._id)"
                   size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'ArticleList',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.fetch();
  },
  methods: {
    fetch () {
      this.$http.get('articles').then(res => {
        if (res.status === 200) {
          this.tableData = res.data;
        }
      }).catch(e => console.log(e));
    },
    edit (id) {
      this.$router.push(`/articles/${id}/edit`);
    },
    remove (id) {
      this.$http.delete(`articles/${id}`).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '文章删除成功',
            type: 'success'
          });
          this.fetch();
        }
      }).catch(e => console.log(e));
    }
  }
}
</script>
<style lang="scss">
</style>