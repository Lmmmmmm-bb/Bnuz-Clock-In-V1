const fs = require('fs')
const readline = require('readline')

const filePath = 'Your File Path'

const rewrite = () => {
  const stream = fs.createReadStream(filePath)
  const totalName = []
  const totalPwd = []
  const bnuzName = []
  const bnuzPwd = []

  const rl = readline.createInterface({
    input: stream
  })
  stream.setEncoding('utf-8')

  rl.on('line', input => {
    const [name, pwd] = input.split(',')
    totalName.push(name)
    totalPwd.push(pwd)
  })

  rl.on('close', () => {
    for (let i = totalName.length - 1; i >= 0; i--) {
      if (!bnuzName.includes(totalName[i])) {
        bnuzName.push(totalName[i])
        bnuzPwd.push(totalPwd[i])
      }
    }
    let res = ''
    for (let i = 0; i < bnuzName.length; i++) {
      if (i === 0) {
        res += `${bnuzName[i]},${bnuzPwd[i]}`
      } else {
        res += `\n${bnuzName[i]},${bnuzPwd[i]}`
      }
    }
    fs.writeFileSync(filePath, res)
  })
}

module.exports = rewrite
