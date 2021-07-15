<template>
  <div class="container">
    <el-card :body-style="{ padding: '20px 100px' }">
      <template #header>
        <div class="container-title">
          <div>每日打卡</div>
        </div>
      </template>
      <div class="input username">
        <span>学生账号</span>
        <el-input
          v-model="username"
          placeholder="在这里输入账号"
          prefix-icon="el-icon-user"
          :maxlength="10"
          show-word-limit
          autofocus
        />
      </div>
      <div class="input userpwd">
        <span>学生密码</span>
        <el-input
          prefix-icon="el-icon-lock"
          v-model="password"
          placeholder="在这里输入密码"
          :maxlength="16"
        />
      </div>
      <div class="container-submit">
        <el-button type="primary">提交学生信息</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import { User } from '../models/User'
import request from '../utils/request'

export default defineComponent({
  setup() {
    onMounted(() => { showNotification() })

    const user = reactive<User>({
      username: '',
      password: ''
    })

    const showNotification = (): void => {
      ElNotification({
        type: 'warning',
        title: '警告',
        message: '本系统仅供个人学习，本人不承担任何责任。'
      })
    }

    return {
      ...toRefs(user)
    }
  }
})

</script>

<style scoped>
.container {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 800px;
  background-image: linear-gradient( 135deg, #ABDCFF 10%, #3badff 100%);
}

.container .container-title {
  padding: 10px 0;
  text-align: center;
  font-weight: 500;
  font-size: 26px;
}

.container .input {
  padding: 20px 0;
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 800px;
}

.container .input span {
  width: 120px;
}

.container .container-submit {
  text-align: center;
  margin: 26px 0;
}
</style>
