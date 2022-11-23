//Started foundational rework

import('./cursor.js');
// (function(){

const textCtn = dqs("#textArr-ctn");
const textArr = dqs("#textArr");
const add = {};
add.child = (parent, child) => {
  parent.insertAdjacentHTML('beforeEnd', child)
};
const domWORDS = dqs('words');
domWORDS.remove();
const wordsArr = [];
let words = domWORDS.dataset.val.split(',');
//init array to hold randomized words
// randomizedWords = [];

// add 1 item of 0 to the wordsArr because I'm too lazy to figure out the exact math to pull from a 0 index using length lol
words.shift(0);

const shadowRealm = document.createElement('span');

const randomizeArr = (inputArr) => {
  const outputArr = [];
  while (inputArr.length > 0) {
    let randIndex = Math.round(Math.random() * inputArr.length) - 1;
    if (randIndex == -1) { randIndex += 1 };
    let pluckedWord = inputArr.splice(randIndex, 1);
    outputArr.push(pluckedWord[0]);
  }
  return outputArr;
}


let randomWords = randomizeArr(words);


let errMode = 0;

const wordEl = (wordString, addSpace = 1) => {
  let space = "";
  if (addSpace == 1) {
    space = '<span class="space word"><span class="letter">_</span></span>'
  }
  let word = `<span class='word' data-word='${wordString}'>`
  // word.classList = "word";
  let spanLetters = "";
  wordString.split('').forEach((letter) => {
    spanLetters += `<span class="letter">${letter}</span>`;
  });
  word += spanLetters + '</span>' + space;
  return word;
};

const wordSpace = (wordString) => {
  let space = '<span class="letter space"> </span></span>'
  let word = `<span class='word' data-word='${wordString}'>`
  // word.classList = "word";
  let spanLetters = "";
  wordString.split('').forEach((letter) => {
    spanLetters += `<span class="letter">${letter}</span>`;
  });
  word += spanLetters + space + '</span>';
  return word;
};

const makeWord = (wordString) => {
  let word = `<span class='word' data-word='${wordString}'>`
  // word.classList = "word";
  let spanLetters = "";
  wordString.split('').forEach((letter) => {
    spanLetters += `<span class="letter">${letter}</span>`;
  });
  word += spanLetters + '</span>';
  return word;
};


const newWords = (wordsArr, numberNewWords = 15) => {
  for (i = 0; i < numberNewWords; i++) {
    add.child(dqs('#textArr'), wordSpace(wordsArr[i]))
  }
}

let testBegin;

newWords(randomWords, 40)

let cursor = document.createElement('span');
cursor.classList = "cursor";
cursor.innerHTML = "_";

let cursorPos;
let wordPos;
const initCursor = () => {
  wordPos = dqs('.word');
  wordPos.classList.add('word-pos');
  cursorPos = dqs('span > .letter');
  cursorPos.classList.add('cursor-pos');
  cursorPos.appendChild(cursor);
}

const getCursorParent = () => {
  return dqs(".cursor-pos");
}

let lastWord;

const validateLetter = (key, letter = cursorPos) => {

  if (key != " " && key != cursorPos.innerText[0] && cursorPos.innerText[0] == "_" && key != "Backspace") {
    // window.alert('ERRORMODE GOOOO')
    errMode = 1;
    score.reset('key')
    wordPos.classList.remove('word-pos')
    lastWord = wordPos.previousSibling;
    wordPos = lastWord;
    wordPos.classList.add('word-pos');
    wordPos = lastWord;
    // checkKillRow();

    // getCursorParent().parentNode.appendChild(floatingError)
    // errWrite(key);
    //Move cursor into floatingError
    floatingError.appendChild(cursor);

    //Add floating error to current "space" character
    getCursorParent().appendChild(floatingError);
    //Checks for incorrect letter for space key
    // window.alert(`NOOOO, ${key} is NOT '${cursorPos.innerText[0]}'`)
    // letter.classList.remove('yes');
    // letter.classList.add('no');
  }
  else if (key == cursorPos.innerText[0] || key == " " && cursorPos.innerText[0] == "_") {
    //Checks for correct letter
    letter.classList.add('yes');
    score.up(1, 'key')
    score['key'].style.animation = null;
    score.animate('key')
  } else if (key !== "Backspace") {
    //Checks for incorrect letter
    score.reset('key')
    letter.classList.add('no');
  } else {
    letter.classList.remove('yes');
    letter.classList.remove('no');
  }
}

const score = {
  'key': dqs('.keycount .val'),
  'word': dqs('.wordcount .val'),
  'wpm': dqs('.wpm .val')
};


score.up = (pt, TargetClassDOM) => {
  score[`${TargetClassDOM}`].innerText = +score[TargetClassDOM].innerText + pt;
}

score.reset = (TargetClassDOM) => {
  score[`${TargetClassDOM}`].innerText = 0;
}

score.animate = (TargetClassDOM) => {
  let anim = score[TargetClassDOM];
  anim.classList.toggle('increment2');
  anim.classList.toggle('increment');
  // anim.style.animationPlayState = 'initial';
}

const helperFunction = {};
helperFunction.update = (element) => {
  if (!typeof (element) == 'object') {
    return
  }
  dqs('#help').value = element.outerHTML;
}
helperFunction.clipboard = (input) => {
  input.select();
  document.execCommand("copy");
}
helperFunction.updateScope = (target) => {
  let rect = target.getBoundingClientRect();
  const sniperScope = dqs('#sniperScope');
  sniperScope.style.width = `${rect.width}px`;
  sniperScope.style.height = `${rect.height}px`;
  sniperScope.style.top = `${rect.top - 50}px`;
  sniperScope.style.left = `${rect.left - 8}px`;
  sniperScope.style.bottom = `${rect.bottom}px`;

}

// dqs('#help').addEventListener("click", (e)=>{
//   helperFunction.update(e.target.outerHTML);
//   helperFunction.updateScope(e.target.getBoundingClientRect());
// })

const updateCombo = (comboSelector, incdec = 1, val = 1) => {
  //Init the DOM object to update
  let updateTarget = dqs(`${comboSelector}`);
  //Get the current score

}

const wordCheck = (word) => {
  //init boolean
  let check = 1;
  word.classList.remove('word-pos')

  //If any of the letters have a 'no' class, change check to 0 and break loop
  for (let letter of word.children) {
    if (check == 0) { continue };
    if (letter.classList.contains('no')) {
      check = 0;
    }
  }

  word.classList.toggle('cleared');
  if (check == 1) {
    word.classList.toggle('yes')
    party(word, undefined, partyImages, animMode);
    totalKeyCount += word.children.length;
    score.up(1, 'word');
    //increment total correct words
    totalWordCount += 1;
    score['word'].style.animation = null;
    score.animate('word')
  } else {
    word.classList.toggle('no')
    score.reset('word')
  }
  updateWPM();
}

const cursorMove = (key) => {

  const moveRight = () => {
    cursor.classList.remove('unmove')
    cursor.classList.remove('move')
    //get next element
    let nextLetter;
    nextLetter = getCursorParent().nextSibling;
    if (nextLetter == null) {
      //Insert word into wordCheck
      wordPos.classList.toggle('word-pos')
      wordPos = wordPos.nextSibling;
      wordPos.classList.toggle('word-pos')
      validateLetter(key, cursorPos);

      //If the lastWord is not set and the cursor moves onto a new line, set the idx of the last word on the top row


      if (errMode) {
        //init floatingError with current Key
        floatingError.innerText = key;
        return
      };
      wordCheck(getCursorParent().parentNode);
      //Remove original cursor-pos class
      cursorPos.classList.toggle('cursor-pos')
      //Set new cursorPos element
      cursorPos = wordPos.children[0];
      //Add cursor-pos class to new cursorPos element
      wordPos.children[0].classList.toggle('cursor-pos')
      wordPos.children[0].appendChild(cursor);
      cursorPos.classList.add('cursor-pos')
      cursor.classList.add('move');
      return
    }

    getCursorParent().classList.remove('cursor-pos');
    // console.log(nextLetter)
    if (nextLetter != null) {
      nextLetter.classList.toggle('cursor-pos');
    }

    //get current cursor child, animate movement
    let currentCursor = getCursorParent().children[0];
    cursorPos.classList.toggle('cursor-pos')
    //I'm not sure why I had this here before. Either way, after removing it, the app still appears to work as intended. Interesting.
    // wordPos.classList.remove('word-pos')
    validateLetter(key, cursorPos);
    nextLetter.appendChild(cursor);
    cursor.classList.toggle('move');
    if (errMode) { return }
    setTimeout(function () { cursor.classList.remove('move') }, 100)
    //remove current element position
    cursorPos.classList.toggle('cursor-pos')
    cursorPos = nextLetter;
    cursorPos.classList.remove('cursor-pos');
    currentCursor = nextLetter;
    currentCursor.classList.toggle('cursor-pos')
    //set new cursor position  }
  }
  const backspace = () => {

    cursor.classList.remove('move')
    cursor.classList.remove('unmove')
    //get next element
    let nextLetter = getCursorParent().previousSibling;
    if (nextLetter == null) {
      return;
    }
    getCursorParent().classList.remove('cursor-pos');
    nextLetter.classList.toggle('cursor-pos');

    //get current cursor child, animate movement
    let currentCursor = getCursorParent().lastChild;
    cursorPos.classList.toggle('cursor-pos')
    validateLetter(key, cursorPos);
    nextLetter.appendChild(cursor);
    cursor.classList.toggle('unmove');
    //remove current element position
    cursorPos.classList.toggle('cursor-pos')
    cursorPos = nextLetter;
    cursorPos.classList.remove('cursor-pos');
    currentCursor = nextLetter;
    currentCursor.classList.toggle('cursor-pos')
    validateLetter(key, cursorPos);
    //set new cursor position  }
  }

  const ctrlBackspace = () => {
    // console.log(getCursorParent());
    //Remove cursor position
    cursorPos.classList.remove('cursor-pos');
    errMode = 0;

    //Reset letter state of current word
    [...wordPos.children].forEach((letter) => { letter.classList.value = "letter" });

    //Redefine cursor position target
    wordPos.children[0].classList.add('cursor-pos');
    cursorPos = wordPos.children[0];

    //Change actual cursor position
    wordPos.children[0].appendChild(cursor);
  }

  if (key == 'Backspace') {
    score.reset('key');
    if (controlState == 0) {
      backspace();
    } else {
      ctrlBackspace();
    }
  } else if (["Control", "Alt", "Shift", "MediaPlayPause", "Home", "End", "PageUp", "PageDown", "F4", "F5", "F10", "F20", "Enter", "ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(key)) {
    return
  } else {
    moveRight();
  }
}

const errWrite = (key) => {
  if (key == 'Backspace') {
    if (controlState == 1) {
      floatingError.innerText = "";
      shadowRealm.appendChild(floatingError);
      dqs('.cursor-pos').appendChild(cursor);
    } else {
      //"Backspaces" using a splice on the innerText of the floatingError element
      floatingError.innerText = floatingError.innerText.split('').splice(0, floatingError.innerText.length - 1).join('');
    }
  } else if (["Control", "Alt", "Shift", "MediaPlayPause", "Home", "End", "PageUp", "PageDown", "F4", "F5", "F10", "F20", "Enter", "ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(key)) {
    return
  } else {
    //Adds to the error
    let modifiedKey = key;
    if (key == " ") {
      modifiedKey = "_"
    }
    floatingError.innerText = floatingError.innerText + modifiedKey;

  }
  if (floatingError.innerText.length < 1) {
    errMode = 0;

    // //Get back to the space
    shadowRealm.appendChild(floatingError);
    dqs('.cursor-pos').appendChild(cursor);
  }
}

let floatingError = document.createElement('span');
floatingError.classList.toggle('floatingErr');




initCursor();

let controlState = 0;

let totalWordCount = 0;
let totalKeyCount = 0;

const updateWPM = () => {
  //Get current time in seconds
  let currentTime = new Date().getTime() / 1000;

  //Subtract init time from currentTime(already in seconds) to get elapsed seconds
  let seconds = currentTime - testBegin;

  //divide total key count by 5 key/word and then by 1 minute * current seconds. This makes it so it measures WPM as using all 5 letter words.
  //Will need to make it so hovering will show total correct keys per minute, as well as raw "word" per minute.
  dqs('.wpm .val').innerText = Math.round(totalKeyCount / 5 * 60 / seconds, 2);

  //For future reference of a pause function, when the pause begins, we'll need to record the time at which it begins. That way, we can add the difference to the original time and then the words per minute will still be calculated properly from testBegin
}

//Event listener for handling cursor movement
typing = 1;
window.addEventListener('keydown', (e) => {
  if (!typing) {
    return
  }
  if (!testBegin) {
    testBegin = new Date().getTime() / 1000;
    setInterval(updateWPM, 1000);
  }

  if (e.key == ' ') {
    e.preventDefault();
  }
  //Toggle controlKey if not already toggled on keydown
  if (e.key == 'Control' && controlState != 1) {
    controlState = 1;
  };
  if (!errMode) {
    cursorMove(e.key);
  } else {
    errWrite(e.key);
  }
})

window.addEventListener('keyup', (e) => {
  if (e.key == 'Control') {
    controlState = 0
  }
})

let cursorY, wordIdx, topRowY, killIdx;

/*  */
const getYposition = () => {
  return dqs('.word-pos').offsetTop;
}

let killRow = document.createElement('span');

const setLastWordIdx = () => {
  //get current word
  const currWord = dqs('.word-pos');
  let idx = Array.from(dqs('#textArr').children).indexOf(currWord)
  //Because it's 0 index, we subtract by 1 to get the array position of the last word (or space) completed
  wordIdx = idx - 1;
  lastWord = wordIdx;
}

killRow.id = "killRow";
//Init y starting position of cursor
topRowY = getYposition();

//The first time it leaves the top row, get the index of the last word
const setKillRow = () => {
  let theWords = Array.from(textArr.children).slice(0, lastWord);
  //prepend the killRow
  let newKillRow = killRow.cloneNode();
  theWords.forEach((word) => {
    newKillRow.appendChild(word);
  });
  textArr.prepend(newKillRow);
  killRowPresent = 1;
}

const terminateKillrow = () => {
  dqs("#killRow").remove();
}

let killRowPresent = 0;
let topRowStep;

setTopRowStep = () => {
  if (!topRowStep) {
    topRowStep = getYstep() - topRowY;
  };

  if (Math.abs(getYposition() - topRowY)) {
    topRowStep = Math.abs(getYposition() - topRowY);
  }
}

const getYstep = () => {
  return getYposition() - topRowY;
}

const randomIntBetween = (lowNum, highNum, absolute = 1) => {
  let num = Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
  if (absolute != 1) {
    if (Math.round(Math.random()) > 0) {
      num = -num;
    }
  }
  return num;
}

// let partyImages = ['crocodile-4.png', 'lemon.png', 'circle1.png', 'circle2.png'];
let animMode = undefined;
const imgSet1 = ['circle2.svg', 'cross.svg', 'star4.svg']
const imgSet2 = ['crocodile-4.svg']
const imgSetJef = ['PixelJef.png']
let partyImages = imgSet1;

const party = (element, target = document.querySelector('html'), particleImgs = [], type = 'burst') => {
  console.log("IT'S PARTY TIME.")
  //Get screen position for element
  let elPos;
  if (!element.target) {
    elPos = element.getBoundingClientRect();
  } else {
    elPos = element.target.getBoundingClientRect();
  }

  //Create absolutely positioned element; add into  place at center of the element
  const blockParty = document.createElement('span');
  blockParty.classList.add('block__party')
  blockParty.style.top = (elPos.top + "px")
  blockParty.style.left = (elPos.left + "px")
  // blockParty.style.right = (elPos.right + "px")
  // blockParty.style.bottom = (elPos.bottom + "px")
  blockParty.style.height = (elPos.height + "px")
  blockParty.style.width = (elPos.width + "px")
  target.appendChild(blockParty);

  const originPartycle = document.createElement('span');
  originPartycle.classList.add('partycle__')

  let transforms = {
    x: {
      low: 0,
      high: 50,
      abs: 0,
      sign: "",
    },
    y: {
      low: 0,
      high: 50,
      abs: 0,
      sign: "",
    }
  }

  //Add Preset Modes as classes
  if (type == "flare") {
    originPartycle.classList.add(type);
    transforms = {
      x: {
        low: 50,
        high: 75,
        abs: 1,
        sign: "-",
      },
      y: {
        low: 50,
        high: 125,
        abs: 1,
        sign: "-",
      }
    }
  }

  //Add the particles!
  for (let i = 0; i < randomIntBetween(5, 15); i++) {
    blockParty.appendChild(originPartycle.cloneNode());
  }

  //Animate each particle
  Array.from(blockParty.children).forEach((partycle) => {
    randomSizeStart = `${randomIntBetween(1, 30)}px`;
    randomSizeEnd = `${randomIntBetween(10, 30)}px`;
    let xRand = randomIntBetween(transforms.x.low, transforms.x.high, transforms.x.abs) + "px";
    let yRand = randomIntBetween(transforms.y.low, transforms.y.high, transforms.y.abs) + "px";
    let rotateRand = randomIntBetween(0, 720, 0) + "deg";

    animation = [
      {
        // transformOrigin: transformOrigin,
        opacity: "300%",
        animationDirection: "normal",
        transform: "rotate(${randomIntBetween(0, 360, 0)}deg)",
        width: "1px",
        height: "1px",
      },
      {
        transform: `translate(${transforms.x.sign}${xRand}, ${transforms.y.sign}${yRand}) rotate(${rotateRand})`,
        // transform: `rotate(${ randomIntBetween(0, 100) } %)`,
        // transformOrigin: transformOrigin,
        opacity: 0,
        // width: randomSize,
        // height: randomSize,
        width: randomSizeEnd,
        height: randomSizeEnd,
        animationDirection: "normal"
      },

    ];

    // partycle.style.background = `RGB(${ randomIntBetween(100, 255) }, ${ randomIntBetween(100, 255) }, ${ randomIntBetween(100, 255) })`
    if (particleImgs.length == 0) {
      partycle.style.background = "red";
    } else {
      partycle.style.backgroundImage = `url('/images/${particleImgs[randomIntBetween(0, particleImgs.length - 1)]}')`
    }
    partycle.style.filter = `hue-rotate(${randomIntBetween(0, 360)}deg) saturate(500%)`;
    partycle.animate(
      animation,
      {
        "duration": randomIntBetween(1000, 2000),
        "easing": "cubic-bezier(0.08, 0.94, 0, 0.96)",
        // "easing": "cubic-bezier(.21,.67,.59,1.01)",
        // "easing": "ease-out",
      }
    )
    setTimeout(partycle.animate, 500, animation,
      {
        "duration": randomIntBetween(1000, 2000),
        "easing": "cubic-bezier(0.08, 0.94, 0, 0.96)",
        // "easing": "cubic-bezier(.21,.67,.59,1.01)",
        // "easing": "ease-out",
      })
  })


  // Remove blockParty!
  setTimeout(function () {
    blockParty.remove();
  }, 1000)
}

const header = dqs('h3.title');
header.addEventListener('mouseover', (e) => {
  party(e, undefined, partyImages, animMode);
});



//UI CONTROLLERS

const UItarget = dqs('#UItarget');
const HueSlider = dqs('#hue');
const SatSlider = dqs('#saturation');
const BriSlider = dqs('#brightness');

dqs('#styling').addEventListener('click', el => {
  const data = el.target.dataset;
  if (data.hasOwnProperty('el')) {
    dqs(".UI__.els .selected").classList = "";
    el.target.classList.add('selected')
    dqs("#UItarget").value = data.el;
  }
})

dqs('#styling .props').addEventListener('input', el => {
  const slider = el.target;
  const data = slider.dataset;
  const value = slider.id;


  dqs(':root').style.setProperty(`--${UItarget.value}Filter`, `hue-rotate(${HueSlider.value}deg) saturate(${SatSlider.value}%) brightness(${BriSlider.value / 100})`)


})