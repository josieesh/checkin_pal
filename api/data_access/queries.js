const Sequelize = require('sequelize')
const epilogue = require('epilogue')

// const database = new Sequelize({
//   dialect: 'sqlite',
//   storage: './test.sqlite',
//   operatorsAliases: false
// })

// const Location = database.define('location', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     latitude: {
//         type: Sequelize.FLOAT,
//         allowNull: false
//     },
//     longitude: {
//         type: Sequelize.FLOAT,
//         allowNull: false
//     },
//     address: {
//         type: Sequelize.TEXT,
//         allowNull: true
//     },
//     capacity: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
//   })
  
//   const initializeDatabase = async (app) => {
//     epilogue.initialize({ app, sequelize: database })
  
//     epilogue.resource({
//       model: Location,
//       endpoints: ['/parts', '/parts/:id']
//     })
  
//     await database.sync()
//   }
  
//   export default initializeDatabase;


// const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   };

// const getUserBySIN = (request, response)


// const createUser = (request, response) => {
//     const { name, email } = request.body

//     pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//         if (error) {
//         throw error
//         }
//         response.status(201).send(`User added with ID: ${result.insertId}`)
//     })
// };