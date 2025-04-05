document.addEventListener("DOMContentLoaded",function (){

    // hold the components

    const city_input=document.getElementById("city-input");
    const btn=document.getElementById("btn")
    const predict=document.getElementById("predict")
    const city=document.getElementById("city")
    const temp=document.getElementById("temp")
    const weather_msg=document.getElementById("weather-msg")
    const error_msg=document.getElementById("error-msg")



    const api_key="377363c3590eeedd53abda52d7ca3ffb"

    btn.addEventListener("click",async (event)=>{
        event.preventDefault();
        const cityName=city_input.value.trim()
        if(!cityName) return;


        // when we have to fetching something fromm server :- use try catch for safety

        try{

            const data=await fetchData(cityName)

            displayData(data)

        }
        catch(error){
            showError()
        }

    })

    // functions :-

    async function fetchData(cityName){
        // fetch the data from the api
        // using api key , url 

        const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`

        // fetch api
        const response= await fetch(url)
        

        if(!response.ok){
            throw new Error("can not find city");
        }
        

        const data= await response.json()

        

        return data;


    }

    function displayData(data){
        // display data

        

        const {name,main,weather}=data

        city.textContent=name
        temp.textContent=main.temp
        weather_msg.textContent=weather[0].description

        predict.classList.remove("hidden")
        error_msg.classList.add("hidden")

        
    }


    function showError(){
        predict.classList.add("hidden")
        error_msg.classList.remove("hidden")
    }



})