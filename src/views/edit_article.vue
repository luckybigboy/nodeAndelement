<template>
  <el-form :model="ruleForm"
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="demo-ruleForm"
           @submit.native.prevent="submitForm">
    <el-form-item label="文章标题"
                  prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容"
                  prop="desc">
      <el-input type="textarea"
                v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 native-type="submit"
                 :disabled="isDisabled">发布</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'EditArticle',
  data () {
    return {
      ruleForm: {
        title: '',
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.fetch();
  },
  methods: {
    fetch () {
      this.$http.get(`articles/${this.$route.params.id}`).then(res => {
        if (res.status === 200) {
          this.ruleForm = res.data;
        }
      }).catch(e => console.log(e));
    },
    submitForm () {
      this.$http.put(`editArticle/${this.$route.params.id}`, this.ruleForm).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '文章修改成功',
            type: 'success'
          });
          this.$router.push('/home/list');
        }
      }).catch(e => console.log(e));
    },
    resetForm () {
      if (this.ruleForm.title || this.ruleForm.desc) {
        this.ruleForm.title = '';
        this.ruleForm.desc = '';
      } else {
        return false;
      }
    }
  },
  computed: {
    isDisabled () {
      if ((this.ruleForm.title.length > 2 && this.ruleForm.title.length < 6) && this.ruleForm.desc) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>