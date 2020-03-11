<template>
  <div class="register">
    <h3>注册</h3>
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
                      prop="pwd1">
          <el-input type="password"
                    v-model="ruleForm.pwd1"
                    autocomplete="off"
                    size="medium"
                    show-password
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="pwd2">
          <el-input type="password"
                    v-model="ruleForm.pwd2"
                    autocomplete="off"
                    size="medium"
                    show-password
                    placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     native-type="submit"
                     :disabled="isDisabled">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p>已账号, <el-link type="primary"
               @click="toLogin">去登录</el-link>
    </p>
  </div>
</template>  
<script>
export default {
  name: 'Register',
  data () {
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        return true;
      }
    };
    var validatePwd1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (this.ruleForm.pwd1 !== this.ruleForm.pwd2) {
        callback(new Error('两次密码必须相同'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: '',
        pwd1: '',
        pwd2: ''
      },
      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        pwd1: [
          { validator: validatePwd1, trigger: 'blur' }
        ],
        pwd2: [
          { validator: validatePwd2, trigger: 'blur' }
        ]
      },
      status: null
    };
  },
  computed: {
    isDisabled () {
      if (this.ruleForm.userName && this.ruleForm.pwd1 && this.ruleForm.pwd2 && (this.ruleForm.pwd1 === this.ruleForm.pwd2)) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    submitForm () {
      const data = {
        userName: this.ruleForm.userName,
        pwd: this.ruleForm.pwd1
      }
      this.$http.post('register', data).then(res => {
        if (res.status === 200) {
          this.status = res.status;
          this.$message({
            message: '注册成功',
            type: 'success'
          });
          this.$router.push('/login');
        }
      }).catch(e => console.log(e));
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    toLogin () {
      this.$router.push('/login');
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.ruleForm.userName || this.ruleForm.pwd1 || this.ruleForm.pwd2) {
      if (this.isDisabled) {
        this.$confirm('是否退出注册?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          next();
        }).catch(() => {
          next(false);
        });
      } else {
        if (this.status === 200) {
          next();
        }
      }
    } else {
      next();
    }
  }
}
</script>
<style lang="scss">
.register {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 30px;
  }
  p {
    margin-left: -200px;
  }
}
</style>