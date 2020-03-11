<template>
  <div class="tip">
    <el-dialog title="提示"
               :visible="dialogVisible"
               width="30%">
      <span>{{msg}}</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="clear">取 消</el-button>
        <el-button type="primary"
                   @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '是否退出页面'
    }
  },
  methods: {
    clear () {
      this.$emit('clear', false);
    },
    sure () {
      this.$emit('sure', false);
      this.$router.push('/register');
    }
  }
}
</script>
<style lang="scss">
</style>