const express = require('express') // importing express library
const { get } = require('http')
const { getStudents, getStudentByName } = require('./src/students')
const app = express() // creating an express server called "app"
const port = 3000

app.get('/', (request, response) => response.send('Hello World!'))

app.get('/students', getStudents)
app.get('/students/:name', getStudentByName)

app.get('/courses', (req, res) => res.send('These are our Courses'))
app.get('/courses/:courseName', (req, res) => {
  res.send('Here is our ' + req.params.courseName + ' course.')
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))