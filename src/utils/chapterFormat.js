// const lineCount = 16
/*
font-size: 18px; => lineLong = 23
* */
const lineLong = 23
let x = 0
let y = lineLong

let array = []
const newLineSymbol = '\n'

function init (content) {
  while (x < content.length) {
    let currentLine = sentence(content, x, x + lineLong)
    y = newLineCtrl(currentLine)
    currentLine = sentence(content, x, y)
    indentSpace(currentLine, content)
    pushLine(x, y, content)
    x = parseInt(y)
  }
  return array
}

function indentSpace (text, content) {
  const count = countSymbol(text)
  if (count > 1) {
    const nextNewLine = sentence(content, x + 1, y + count).indexOf(newLineSymbol)
    if (nextNewLine < 0) {
      y = y + 2
    } else {
      y = x + 1 + nextNewLine
    }
  }
}

function newLineCtrl (text) {
  if (text.indexOf(newLineSymbol) > 0) {
    // 换行符不在句首，直接返回该位置
    return x + text.indexOf(newLineSymbol)
  } else if (text.indexOf(newLineSymbol) === 0) {
    // 首位是换行符的情况
    if (text.substring(1).indexOf(newLineSymbol) > 0) {
      // 继续判断是否有其他换行符
      // 有则将换行符的位置返回，以供断句
      return x + text.substring(1).indexOf(newLineSymbol) + 1
    }
    // 没有其他换行符，返回该位置-1
    return x + lineLong - 1
  }
  // 没有换行符，返回句长的位置
  return x + lineLong
}

function sentence (content, start, end) {
  return content.substring(start, end)
}

function countSymbol (text) {
  return parseInt(((text.split(/[“”‘’.]/).length - 1) / 2).toFixed(0))
}

function pushLine (x, y, content) {
  let line = {}
  line.text = content.substring(x, y)
  const firstWord = line.text.charAt(0)
  if (firstWord === '\n' || firstWord === '↵') {
    line.firstLine = true
  }
  array.push(line)
}

export default init
