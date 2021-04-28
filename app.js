const express = require('express')
const bodyParser = require('body-parser')

const Database = require('./database')
const Model = require('./model')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

var requestedId = ''
let modelList = Database.load()

app.get('/', (req, res) => {
  modelList = Database.load()
  res.render('home', {
    newWorks: modelList,
    dateHome: getDate(),
  })
})

app.post('/', (req, res) => {
  let newWork = req.body.newWork

  if (newWork != undefined && newWork.trim().length != 0) {
    const newModel = new Model(newWork, [])
    modelList.push(newModel)
    Database.save(modelList)
    res.redirect('/')
  } else {
    res.redirect('/')
  }
})

app.get('/delete', (req, res) => {
  modelList = []
  Database.save(modelList)
  setTimeout(() => {
    res.redirect('/')
  }, 300)
})

app.get('/lists/:getId', (req, res) => {
  requestedId = req.params.getId

  res.render('lists', {
    newItems: modelList[requestedId].data,
    currentlyDate: getDate(),
    listName: Database.load()[requestedId].name,
  })
})
app.post('/lists/' + requestedId, (req, res) => {
  let newItem = req.body.newItem

  if (newItem != undefined && newItem.trim().length != 0) {
    modelList[requestedId].data.push(newItem)
    Database.save(modelList)
    res.redirect('/lists/' + requestedId)
  } else {
    res.redirect('/lists/' + requestedId)
  }
})
const getDate = () => {
  const today = new Date()
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }
  return today.toLocaleDateString('en-EN', options)
}

app.listen(3000, () => {
  console.log('Server ports 3000 online...')
})
