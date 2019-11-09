const path = require('path')
const fs = require('fs')
const indexes = []
const phpDocDir = 'php-chunked-xhtml'
const xhtmlDir = path.join(__dirname, 'public', phpDocDir)
fs.readdirSync(xhtmlDir).forEach(file => {
  if (!file.endsWith('.html')) return
  const content = fs.readFileSync(path.join(xhtmlDir, file), { encoding: 'utf-8' })
  if (!/<h1 class="refname">(.+?)<\/h1>/.test(content)) return
  const t = RegExp.$1.trim()
  if (!/<title>(.+?)<\/title>/.test(content)) return
  indexes.push({ t, p: phpDocDir + '/' + file, d: RegExp.$1.trim() })
})
fs.writeFileSync(path.join(__dirname, 'public', 'indexes.json'), JSON.stringify(indexes))
