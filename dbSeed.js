const db = require('./models')

const userSeed = async () => {

const userData = [
  {name: 'Andy', email: 'andy@ggmail.com'},
  {name: 'Bobby', email: 'bobby@ggmail.com'},
  {name: 'Cahty', email: 'cathy@ggmail.com'},
  {name: 'Danny', email: 'danny@ggmail.com'},
  {name: 'Elly', email: 'elly@ggmail.com'},
]
let res = await db.GoogleUser.bulkCreate(userData)
console.log(res)
}

userSeed()
