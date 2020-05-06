const request = require('request');

const forecast = ( longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3965ab9afd27cf23c5a82747da9d2dd5&query=${latitude},${longitude}`
    // const degree = <span>&#8451;</span>
    request({url, json: true}, (error, {body})=> {
        if(error){
            callback('Unable to connect with weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            // callback(undefined, 'It is currently ' + body.current.temperature +' Degree F out. There is a '+ body.current.precip + ' % chance of rain today.'  )
            callback(undefined, body.current )
        }
    })
}

module.exports = forecast