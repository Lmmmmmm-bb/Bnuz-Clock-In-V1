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
          v-model.trim="username"
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
          type="password"
          prefix-icon="el-icon-lock"
          v-model.trim="password"
          placeholder="在这里输入密码"
          :maxlength="16"
          show-password
        />
      </div>
      <div class="container-submit">
        <el-button
          type="primary"
          @click="submitInfo"
          :disabled="isDisabled"
        >
          提交学生信息
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import { User } from '../models/User'
import request from '../utils/request'
import crypto from '../utils/crypto'

export default defineComponent({
  setup() {
    onMounted(() => { showNotification() })

    const user = reactive<User>({
      username: '',
      password: ''
    })
    const isDisabled = ref(false)

    const showNotification = (): void => {
      ElNotification({
        type: 'warning',
        title: '警告',
        message: '本系统仅供个人学习，不承担任何风险和责任。'
      })
    }

    const submitInfo = async (): Promise<void> => {
      const validate = (): boolean => {
        if (user.username.trim().length === 0 || user.password.trim().length === 0) {
          ElMessage.warning({
            type: 'warning',
            message: '账号或密码不能为空'
          })
          return false
        } else if (!/\d{10}/.test(user.username)) {
          ElMessage.warning({
            type: 'warning',
            message: '请输入正确的账号'
          })
          return false
        }

        return true
      }

      if (validate()) {
        isDisabled.value = true
        try {
          const res = await request.post('register', {
            'username': user.username,
            'encryptPwd': crypto.encrypt(user.password)
          })
          ElMessage.success({
            type: 'success',
            message: '提交成功'
          })
          console.log(res)
        } catch(err) {
          ElMessage.error({
            type: 'error',
            message: '服务器正在维护，请稍后重试'
          })
        } finally {
          isDisabled.value = false
        }

      }
    }

    return {
      ...toRefs(user),
      isDisabled,
      submitInfo
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
