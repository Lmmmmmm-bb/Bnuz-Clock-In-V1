<template>
  <div class="container">
    <van-cell-group inset>
      <van-cell>
        <div class="container-title">
          <div>每日打卡</div>
        </div>
      </van-cell>
      <van-cell>
        <van-field
          v-model.trim="username"
          type="digit"
          label="学生账号"
          maxlength="10"
          show-word-limit
        />
      </van-cell>
      <van-cell>
        <van-field
          v-model.trim="password"
          type="password"
          label="学生密码"
          maxlength="16"
        />
      </van-cell>
      <div class="container-submit">
        <van-button
          type="primary"
          @click="submitInfo"
        >
          提交学生信息
        </van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { Notify, Toast } from 'vant'
import 'vant/es/notify/style'
import isMobile from '../utils/agent'
import { User } from '../models/User'
import crypto from '../utils/crypto'
import request from '../utils/request'

export default defineComponent({
  name: 'Mobile',
  beforeRouteEnter(to, from, next) {
    if (!isMobile(navigator.userAgent)) {
      next('/')
    }
    next()
  },
  setup() {
    onMounted(() => {
      Notify({
        type: 'warning',
        message: '本系统仅供个人学习，不承担任何风险和责任。'
      })
    })

    const user = reactive<User>({
      username: '',
      password: ''
    })

    const throttle = ref(false)

    const submitInfo = async () => {
      const validate = (): boolean => {
        if (user.username.trim().length === 0 || user.password.trim().length === 0) {
          Notify({
            type: 'warning',
            message: '账号或密码不能为空'
          })
          return false
        } else if (!/\d{10}/.test(user.username)) {
          Notify({
            type: 'warning',
            message: '请输入正确的账号'
          })
          return false
        } else if (throttle.value) {
          Notify({
            type: 'warning',
            message: '请勿提交太快'
          })

          return false
        }

        return true
      }

      if (validate()) {
        throttle.value = true
        setTimeout(() => {
          throttle.value = false
        }, 3000)
        const toast = Toast.loading({
          message: '提交信息中...',
          forbidClick: true
        })
        try {
          await request.post('register', {
            'username': user.username,
            'encryptPwd': crypto.encrypt(user.password)
          })
          Toast.success('提交成功')
          user.username = ''
          user.password = ''
        } catch(err) {
          Toast.fail('服务器正在维护，请稍后重试')
        } finally {
          toast.clear()
        }
      }
    }

    return {
      ...toRefs(user),
      submitInfo
    }
  }
})

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient( 135deg, #ABDCFF 10%, #3badff 100%);
}

.container .container-title {
  padding: 10px 0;
  text-align: center;
  font-weight: 500;
  font-size: 22px;
}

.container .container-submit {
  margin: 20px 0;
  text-align: center;
}
</style>
