const Promise = require('bluebird');
const axios = require('axios');
const geolib = require('geolib');

foo();
async function foo() {
    console.log('task 1');  
    let cities = await Promise.all([
            axios.get(`https://geocode.xyz/Minsk?json=1`),
            axios.get(`https://geocode.xyz/Madrid?json=1`),
            axios.get(`https://geocode.xyz/Rome?json=1`)
        ]);
    cities.forEach((i)=>{
        console.log(i.data.standard.city+' - '+i.data.standard.countryname);
    }); 

    console.log('task 2');
    let city = await Promise.any([
            axios.get(`https://geocode.xyz/Paris?json=1`),
            axios.get(`https://geocode.xyz/Nice?json=1`)
        ]);
        console.log(city.data.standard.city+' - '+city.data.standard.countryname);

    console.log('task 3');
    let cord = [];

    let town = await Promise.all([
            axios.get(`https://geocode.xyz/Minsk?json=1`),
            axios.get(`https://geocode.xyz/Brest?json=1`)
        ]);
    town.forEach((i)=>{
        cord.push({latitude: i.data.latt, longitude:i.data.longt});
    }); 
    console.log('Lenght between Brest & Minsk ' + geolib.getDistance(cord[0], cord[1]));

    console.log('task 4');
    let cords = [];

    
    var spots = {
    "Brandenburg Gate, Berlin": {latitude: 52.516272, longitude: 13.377722},
    "Dortmund U-Tower": {latitude: 51.515, longitude: 7.453619},
    "London Eye": {latitude: 51.503333, longitude: -0.119722},
    "Kremlin, Moscow": {latitude: 55.751667, longitude: 37.617778},
    "Eiffel Tower, Paris": {latitude: 48.8583, longitude: 2.2945},
    "Riksdag building, Stockholm": {latitude: 59.3275, longitude: 18.0675},
    "Royal Palace, Oslo": {latitude: 59.916911, longitude: 10.727567}
}

console.log(geolib.findNearest(spots['Dortmund U-Tower'], spots, 1));


    let towns = Promise.all([
            axios.get(`https://geocode.xyz/Minsk?json=1`),
            axios.get(`https://geocode.xyz/Oslo?json=1`),
            axios.get(`https://geocode.xyz/Copenhagen?json=1`),
            axios.get(`https://geocode.xyz/Brussels?json=1`)
        ]);

    Promise.mapSeries(towns, function(town){
        cords.push({latitude: town.data.latt, longitude:town.data.longt, town:town.data.standard.city});
    }).then(function(resolve, reject){
        console.log(cords[geolib.findNearest(cords[0], cords, 1).key].town)
    })
}