const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const apiKey = "0324f1f91b144946bc236ce695f20216";

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing our joke to VOicerRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//  Get Jokes from joke api
async function getJoke() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text to Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch errors
    console.log("Oh no! errors: ", error);
  }
}

// Event Listener for button

button.addEventListener("click", getJoke);
audio.addEventListener("ended", toggleButton);
