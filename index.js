const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const errorHandler = require('./middlewares/errorHandler');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const categoriesRoute = require('./routes/categories');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/categories', categoriesRoute);

app.use((req, res) => {
   res.status(404).send('Resource not found');
});

app.use(errorHandler);

mongoose.connect(process.env.DB_CON_STR,).then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT, process.env.HOST, () => {
        console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to database. And hence failed to spring' +
      ' up the server.', err);
});


/*const User = require('./models/user');

async function test() {
    try {
        const event = await Event.create({
            'title': 'Event 1',
            'description': 'Event 1 description',
            'date': new Date(),
            'location': 'Location 1',
            'createdBy': '673473a884507eb488f5cfe2'
        });
    } catch (e) {
        console.error(e);
    }
}*/
//test();