const express = require('express');
const rutas = require('./routes/index');
const app = express();
const puerto = 8080;
const path = require('path');
const {engine} = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
    layoutsDir: path.join(__dirname,'views/layout'),
    partialDir: path.join(__dirname, './views/partials')
}));

app.use('/api', rutas);

app.use(express.static(path.join(__dirname, '..','./public')));

app.use((req, res) => {
    res.status(404).send("No pudimos encontrar la dirección");
});

app.use((err, req, res) => {
    console.error(err);
    res.status(500).send("Ocurrió un error");
});

app.listen(puerto, err => {
    if (err) {
        console.log(`Hubo un error al inciar el servidor : ${err}`);
    } else {
        console.log(`Servidor escuchando el puerto: ${puerto}`);
    };
});