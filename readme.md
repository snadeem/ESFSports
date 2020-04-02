# Node Express ESF SPORTS 

## These are  backend development with node and express
### The following packages used

- Authentication (passport & JWT)
- Validation
- Password Encryption (bcryptjs)
- Authorization and Access level control
- Database configuration with Sequelize ORM
- CORS (Bonus)

### To get started,

- clone this repository <directory>
- `cd <directory>`
- run `yarn install`
- add your database in `src/config/config.json`
- be sure to have `nodemon` installed for development purpose
- yarn run dev
- if you don't have `nodemon` installed, change your `dev` script in package.json to `node --exec babel-node src/index.js`

### To deploy to production,
- run `yarn run build` to generate the build folder
- upload the build server to your server

