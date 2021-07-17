const fs = require('fs')
const path = require('path')
const readline = require('readline')
const router = require('koa-router')()
const { decrypt } = require('../utils/crypto')
const filePath = 'Your File Path'
const rewrite = require('../utils/rewrite')

router.post('/api/register', ctx => {
    const responseBody = { code: 0, data: {} }
    const { username, encryptPwd: pwd } = ctx.request.body
    try {
        fs.appendFileSync(filePath, '\n' + username + ',' + decrypt(pwd))
        rewrite()
        responseBody.code = 200
        responseBody.data = { msg: '提交成功' }
    } catch(err) {
        responseBody.code = 503
        responseBody.data = { msg: '提交失败，服务器出现问题' }
        console.log(err)
    } finally {
        ctx.response.status = responseBody.code
        ctx.response.body = responseBody
    }
})

module.exports = router
