<template>
  <div class="login">
    <h3>登录</h3>
    <div>
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm"
               style="width: 500px"
               @submit.native.prevent="submitForm">
        <el-form-item label="用户名"
                      prop="userName">
          <el-input type="text"
                    v-model="ruleForm.userName"
                    autocomplete="off"
                    size="medium"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pwd">
          <el-input type="password"
                    v-model="ruleForm.pwd"
                    autocomplete="off"
                    size="medium"
                    show-password
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     native-type="submit"
                     :disabled="isDisabled">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p>没有账号, <el-link type="primary"
               @click="toRegister">去注册</el-link>
    </p>
  </div>
</template>  
<script>
export default {
  name: 'Login',
  data () {
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        return true;
      }
    };
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: '',
        pwd: ''
      },
      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    isDisabled () {
      if (this.ruleForm.userName && this.ruleForm.pwd)
        return false;
      else
        return true;
    }
  },
  methods: {
    submitForm () {
      this.$http.post('login', this.ruleForm).then(res => {
        if (res.data.status) {
          sessionStorage.setItem("token", res.data.token);
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          });
          this.$router.push({ path: '/home', query: { userName: res.data.userName, id: res.data.id } });
        } else {
          this.$message.error('登录失败');
        }
      }).catch(e => console.log(e));
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    toRegister () {
      this.$router.push('/register');
    }
  }
}
</script>
<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 30px;
  }
  p {
    margin-left: -185px;
  }
}
</style>