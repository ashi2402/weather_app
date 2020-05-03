const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000
// Define paths for Express config

const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup statis directory to server 
app.use(express.static(publicDirectorypath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name : 'Ashish'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mathew'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            Error: 'You have to provide an Address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={})=> {
        if(error){
          return res.send({error})
        }
          
          forecast(longitude, latitude, (error, forecastData) => {
            if(error){
              return res.send({error})
            }
            res.send({
                forecast: forecastData, location,
                address: req.query.address
            })
          })
      })
})

app.get('/products', (req,res) => {
    if(!req.query.name){
       return res.send({
            error: 'you must provide name value'
        })
    }
    console.log(req.query);
    res.send({
        product: []
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Help article not found!'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mike Jon',
        errorMessage: 'Page not found'
    })
})

// app.get('/help/*', (req,res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Mike Jon',
//         errorMessage: 'Help article not found'
//     })
// })



// app.com
//  app.com/help






app.listen(port, () => {
    console.log('Server is runining on '+ port)
})


