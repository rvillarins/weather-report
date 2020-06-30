window.addEventListener("load", () => {

let long
let lat
let tempdata = document.querySelector('.temp')
let umidata = document.querySelector('.umi')
let veldata = document.querySelector('.vel')
let voldata = document.querySelector('.vol')
let dhdata = document.querySelector('.dhmed')
let dhsdata = document.querySelector('.dhs')

if (navigator.geolocation){
navigator.geolocation.getCurrentPosition(position => {

long = position.coords.longitude;
lat = position.coords.latitude;

const proxy = 'https://cors-anywhere.herokuapp.com/'
const key = 'your_key_goes_in_here'


const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}?units=si`


function icone (icon,iconID){
    const skycons = new Skycons({color: "white"})
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[currentIcon])
}

function getdata(){
    now = new Date
    var day = now.getDay()
    var hour = now.getHours()
    var min =  now.getMinutes()
    var sec = now.getSeconds()
    
    fetch(api)
    .then(response => {
        return response.json()
    })
    .then(data =>{
        console.log(data)
        const {icon, temperature, humidity, windSpeed, precipIntensity,time} = data.currently

        var formattedTime = new Date(time * 1000).toLocaleTimeString("pt-BR",{timeZone: data.timezone, hour12: false})
        console.log(formattedTime)

        tempdata.textContent = `${Math.floor(temperature)}°C`
        umidata.textContent = `${Math.floor(humidity * 100)}%`
        veldata.textContent = `${windSpeed.toFixed(2)} m/s`
        voldata.textContent = `${(precipIntensity * 24).toFixed(2)} mm`
        dhdata.textContent = `${now.getDate()} / ${now.getMonth() + 1} / ${now.getFullYear()} às ${formattedTime}`
        dhsdata.textContent =`${now.getDate()} / ${now.getMonth() + 1} / ${now.getFullYear()} às ${hour}:${min}:${sec}`
        icone(icon,document.querySelector('.icon1'))
        
    })

}

getdata()

//it defines the access interval to the API in milliseconds
setInterval(getdata,900000) //15 min

//setInterval(getdata,5000) //5 seg

  })
 }

}) 
