// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM ELEMENTS
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");
const button = document.querySelector("button");
// init Voices array
let voices = [];
const getVoices = () => {
  voices = synth.getVoices();
  // LOOP THROUGH VOICES AND CREATE AN OPTION FOR EACH ONE
  voices.map((voice) => {
    // CREATE AN OPTION ELEMENT
    const option = document.createElement("option");
    // FILL OPTION WITH VOICE AND LANGUAGE
    option.textContent = `${voice.name} (${voice.lang})`;
    // SET NEEDED OPTION ATTRIBUTES
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// SPEAK
const speak = () => {
  // CHECK IF SPEAKING
  if (synth.speaking) {
    console.error("already speaking");
    return;
  }
  if (textInput.value !== "") {
    // ADD BACKGROUND ANIMATION
    body.style.background = "#8a2be2 url(wave.gif)";
    body.style.backgroundRepeat = "repeat";
    body.style.backgroundSize = "100% 100%";

    // GET SPEAK TEXT
    const speakTest = new SpeechSynthesisUtterance(textInput.value);
    // SPEAK END
    speakTest.onend = (e) => {
      console.log("Done Speaking ...");
      body.style.background = "#8a2be2";
    };
    // SPEAK ERROR
    speakTest.onerror = (e) => {
      console.error("Something went wrong !!");
    };

    // SELECTED VOICE
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    //LOOP THROUGH VOICES
    voices.map((voice) => {
      if (voice.name === selectedVoice) {
        speakTest.voice = voice;
      }
    });

    // SET PITCH AND RATE
    speakTest.rate = rate.value;
    speakTest.pitch = pitch.value;
    // SPEAK
    synth.speak(speakTest);
  }
};

// EVENT LISTENERS
// TEXT FORM SUBMIT
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//RATE VALUE CHANGE
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

//PITCH VALUE CHANGE
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

// ON BUTTON CLICK
button.addEventListener("click", (e) => speak());
//VOICE SELECT CHANGE
//voiceSelect.addEventListener("change", (e) => speak());
