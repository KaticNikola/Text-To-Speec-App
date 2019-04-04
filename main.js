//init speach Synthesis API
const synt = window.speechSynthesis;

//DOM Elements selectors
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");
// const btn = document.querySelector("button");


//initi voices > api
let voices = [];

// get voices FN
const getVoices = ()=>{
    //voice iz SS poziva method sad je prazan obj jer radi async
    voices = synt.getVoices();

    //loop kroz voices koje dobijes i postavis ih u select element
    voices.forEach( voice =>{
        //napravi option el za select
        const option = document.createElement('option');
        //daj option el. vrenost voice
        option.textContent =voice.name + `(${voice.lang})`;

        //option atributi
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
        
    });

}

getVoices();
//da bi getVoice mogao da se antivira
if(synt.onvoiceschanged !== undefined){
    synt.onvoiceschanged = getVoices;
}


//speak
const speak = () => {
    //proveri da li je govor u toku
    if (synt.speaking) {
        console.error("Already speaking...");
        return;
    };
    //proverava da li input prazan
    if(textInput.value !== ''){
        //text postaje new... i kao arg vrednost koju hocemo da kaze
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //speak end > kad zavrsi govor run
        speakText.onend = e =>{
            console.log('Done Speaking ... ');
            body.style.background = "#141414";
        
        }

        //event za error
        speakText.onerror = e => {
            console.error("Something went wrong...")
        }

        // koristi selektovan glas 
                        //    inp element selektovana opcija  atribut    
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

        //loop kroz glasove i poredis ih
        voices.forEach( voice => {
            //da li je aktivan glas isti kao slektovan glas
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        })

        // pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //speak
        synt.speak(speakText);
        //add bg image =gif
        body.style.background = "#141414 url(img/wave.gif)";
        body.style.backgroundRepeat = "repeat-x";
        body.style.backgroundSize = "100% 100% ";
    }
}

// Event Listeneri

//submint form 

textForm.addEventListener("submit", e =>{

    speak()
    textInput.blur();

    e.preventDefault();
})

// slider displayed value
rate.addEventListener("change", e => rateValue.textContent = rate.value);
pitch.addEventListener("change", e => pitchValue.textContent = pitch.value);

//cim selektujes novi glas opet ponovi recenicu
voiceSelect.addEventListener("change", e => speak());


// option.setAttribute('data-lang', voice.lang);