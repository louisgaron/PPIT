const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const path = require('path')

app.use(cors())

app.use(express.static(path.join(__dirname, '../build')))
app.use('/static', express.static(path.join(__dirname, 'build//static')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const myConnectionString = 'mongodb+srv://admin:1234@cluster0.ip4km.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});

var movieModel = mongoose.model("movie", movieSchema);

app.get('/', (req, res) => {
    res.send("Hello World!")
})


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.get('/api/movies', (req, res) => {

    movieModel.find((err, data) => {
        res.json(data);
    })

    // res.status(200).json({
    //     message: "Everything is OK",
    //     movies: myovies
   // })
});

app.get('/api/movies/:id', (req,res) => {
    console.log(req.params.id);

    movieModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

app.put('/api/movies', (req,res) => {
    console.log("Update movie: " + req.params.id)
    console.log(req.body)

    movieModel.findByIdAndUpdate(req.param.id, req.body, {new:true},
        (error,data) => {
            res.send(data)
        })
})

app.post('/api/movies', (req, res) => {
    console.log('Movie Recieved!')
    console.log(req.body.title)
    console.log(req.body.year)
    console.log(req.body.poster)

    movieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    });

    res.send('Item Added');
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 

app.delete('/api/movies/:id', (req,res) => {
    console.log("Delete Movie: " + req.params.id)

    movieModel.findByIdAndDelete(req.params.id, (err,data) => {
        res.send(data);
    })
})
