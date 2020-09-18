const functions = require('firebase-functions')
const firebase = require('firebase-admin')
const express = require('express')
const engines = require('consolidate')
const { getStudents, getStudentByName } = require('./src/students')

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
)

function getCourses() {
  const ref = firebaseApp.database().ref('courses')
  return ref.once('value').then(snap => snap.val())
}

const app = express()
app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/students', getStudents)
app.get('/students/:name', getStudentByName)

app.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-max-age=600')
  getCourses().then(courses => {
    console.log(courses)
    res.render('index', { courses })
  })
})

app.get('/courses.json', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-max-age=600')
  getCourses().then(courses => {
    console.log(courses)
    res.json(courses)
  })
})

exports.app = functions.https.onRequest(app)