/**Sets specified root variable to desired string value. Note: UNITS NOT INCLUDED.**/
const setRootVar = (input, varName, units = "px") => {
  dqs(':root').style.setProperty(`${varName}${units}`, `${input}`);
}


//Crocodile mode lol
let crocodile = 0;
dqs('.date').addEventListener('click', (e) => {
  if (crocodile == "CROC") {
    return
  }
  crocodile++;
  if (crocodile >= 5) {
    partyImages = imgSet2;
    window.alert('CROCODILE MODE ENABLED. 🐊')
  }
})

//Animation change button
domAnimText = dqs('.domAnim')
animChangeButton = dqs('.period')
animChangeButton.addEventListener('click', (e) => {
  animChangeButton.classList.toggle('flare')
  animChangeButton.classList.toggle('burst')
  if (domAnimText.innerText == "Burst") {
    domAnimText.innerText = "Flare"
    animMode = "flare"
  } else {
    domAnimText.innerText = "Burst"
    animMode = undefined;
  }
  party(animChangeButton, undefined, partyImages, animMode);
})

//Jef mode lol
let jefMode = 0;
username = dqs('.username');
username.addEventListener('change', (e) => {
  if (e.target.value.toLowerCase() == "jef" && jefMode == 0) {
    e.target.style.color = "hotpink";
    e.target.style.backgroundImage = "url('/images/PixelJef.png')";
    partyImages = imgSetJef;
    // window.alert('JEF MODE ENABLED. 😎')
  } else {
    e.target.style.color = "";
    e.target.style.backgroundImage = "";
    jefMode = 0;
    partyImages = imgSet1;
  }
  party(e, undefined, partyImages, animMode);
});

username.addEventListener('focus', (e) => {
  if (typing == 1) {
    typing = 0;
    mobileDal.classList.remove('triggered');
  }
})

username.addEventListener('blur', (e) => {
  typing = 1;
})

const mainModal = dqs("#modal");

//Mobile
const mobileDal = dqs("#modal__left");
const mobileFocus = dqs("#mobileText");
dqs("#modal__left").addEventListener('click', (e) => {
  mobileDal.classList.add("triggered")
  mobileFocus.focus();
})
