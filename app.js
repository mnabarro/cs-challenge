const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;
const usersRouter = require('./routes/api/Users');
const db = require('./models');
const mocks = require('./mocks.json');

app.use(morgan('common'));
app.use(express.json());

app.use('/api/customers', usersRouter);

app.get('/', (req, res) => {
    res.json({message: "Hi!"});
});

const initDb = async () => {
    let count = await db.Customers.count();

    if(count == 0) { await db.Customers.bulkCreate(mocks);}
}

db.sequelize.sync().then( ()=> {

    initDb();
    
    app.listen(PORT, () => {
        console.log(`Application listening on port ${PORT}`);
    });
});



