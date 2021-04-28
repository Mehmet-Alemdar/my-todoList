const fs = require('fs')

exports.save = (data) => {
  fs.writeFileSync('./data.json', JSON.stringify(data))
}

exports.load = () => {
  //   return JSON.parse(fs.readFileSync('./data.json', 'utf8'))
  var dataList = fs.readFileSync('./data.json', 'utf8')
  if (dataList.length != 0) {
    return JSON.parse(fs.readFileSync('./data.json', 'utf8'))
  } else {
    return []
  }
}
