const apikey = 'eb1fcd935ede98a7c4bcc9f082499981';

document.getElementById('weatherForm').addEventListener('submit',function(event){
event,preventDefault();

const city = document.getElementById('cityinput').value.trim();

if(city===''){
    alert('Por favor, Digite o nome da cidade.');
    return;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units-metric&lang=pt_br';
}
fetch(apiUrl)
    .then(response => {
        if(!response.ok){
            throw new error('Cidade não encontrada.');
        }
        return response.json();
    })
    .then(data=> {
        const location = data.name + ','+ data.sys.country;
        const temperature = data.main.temp + '°C';
        const condition = data.weather[0].description;
    
        const weatherCard = `
            <div class="col-mb-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">$(location)</h5>
                        <p class="card-text>$(temperature</p>
                        <p class="card-text>$(condition)</p>
                        <p class="card-text>Umidade: $(data.main.humidity)%</p>
                    </div>
                </div>
            </div>
            `;
            document.getElementByld('weatherCards').innerHTML = weatherCard;
})
.catch(error =>{
    alert(error.message);
    HTMLFormControlsCollection.error('Erro ao buscar dados:',error);
});

});

