const express = require('express');
const morgan = require('morgan');

const app = express();
const usersRouter = require('./routes/api/Users');
const db = require('./models');
const mocks = require('./mocks.json');

require('dotenv').config();

app.use(morgan('common'));
app.use(express.json());

app.use('/api/customers', usersRouter);

app.get('/', (req, res) => {
    res.json({message: "Hi!"});
});

console.log(process.env.NODE_ENV);

const initDb = async () => {

    await db.sequelize.sync();

    if (process.env.NODE_ENV == 'development') {
        let count = await db.Customers.count();
        if(count == 0) { await db.Customers.bulkCreate(mocks);}
    }
}
    
initDb();

module.exports = app;

