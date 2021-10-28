//Guardamos la API KEY de OpenWeather en una constante
const API_KEY = 'b2885e62e8e55a917a5e9b82390c87cb';

//Esta funcion getWeatherData va a recibir los datos sobre la posicion del usuario
const getWeatherData = position => {
    //Dentro del objeto coords copiamos el contenido que tengan como clave el mismo nombre a las variables llamadas latitude y longitude
    const { latitude , longitude } = position.coords;
    //fetch() nos permite obtener recursos de forma asincronica por la red, en este caso lo estoy usando para llamar a la API de OpenWeather
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`) // 1 - ERROR
    .then(response => response.json()) //Lo que hacemos es extraer la respuesta en formato JSON
    .then(data => setWeatherData(data)) //A la funcion setWeatherData le envio como parametro los datos traidos desde la API
   
    const setWeatherData = data => {
         //Mostramos la data para saber lo que se obtiene
        console.log(data);
        //Creamos una variable donde vamos a guardar toda la informacion que necesito desde la API 
        const weatherData = {
            location: data.name,
            description: data.weather[0].main,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            temperature: data.main.temp,
            date: getDate(),
        }

        Object.keys(weatherData).forEach(key => {
            document.getElementById(key).textContent = weatherData[key];   
        });

    }

//Funcion para devolver el dia - mes - año
const getDate = () => {
     let date = new Date();
     //El método toLocaleDateString() devuelve la fecha en un formato sensible a la localización, 
     //adaptándose así al idioma y formato del lugar donde te encuentres
     return date.toLocaleDateString();
}
   
}
// Es funcion sirve para obtener la ubicacion del usuario
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(getWeatherData);
}

/*
    1- ERROR: Mucho ojo confundir las comillas simples con "acento grave" (alt + 96) segun ascii, es un error de sintaxis me costo mucho darme cuenta
    2-
    3- 
*/ 