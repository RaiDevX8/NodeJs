const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const pagenotfound=require('./controller/pagenotfound')
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes)
app.use(shopRoutes);

app.use(pagenotfound.pagenotfound)

app.listen(3000);
