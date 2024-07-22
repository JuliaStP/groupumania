const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');
const { sequelize } = require('./models');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3001', // Allow this origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization' // Allow these headers
  }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', blogPostRoutes);
// app.use('/');

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});