let student = {
  background: 'Beach',
  last: 'Shea',
  name: 'Dennis',
}
// Long way:
let name = student.name
let last = student.last
let background = student.background

// "Destructuring":
let { name, last, background } = student
