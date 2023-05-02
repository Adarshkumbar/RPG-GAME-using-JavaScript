let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];


const button1 = document.querySelector("#button1"); //GO TO STORE 
const button2 = document.querySelector("#button2"); //GO TO CAVE
const button3 = document.querySelector("#button3"); //Fight Dragon
const text = document.querySelector("#text"); // description
const xpText = document.querySelector("#xpText"); //GO TO STORE 
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Array of All the Weapons

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
]

// Array of All the Monsters

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Town Square",
    "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in Town Square."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Weapon (30 gold)", "Go to Town Square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You Entered the Store"
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to Town Square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You Entered the Cave .You see Monsters"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a Monster"
  },
  {
    name: "kill monster",
    "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
    "button functions": [goTown, goTown, easterEgg],
    text: `Monster Screams !!!!! " it dies ". Congratulations ....You gain "Exprience points" and find "gold".`
  },
  {
    name: "lose",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "You die 💀💀💀"
  },
  {
    name: "win",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the Draon 🐉....YOU WIN THE GAME!"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to Town Square ?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a Secret Game\n. Pick a Number above .\n10 numbers will randomly choosen .If the number you choose matches one of random numbers, you win !!!! "
  }
]

//  initialize buttons
button1.onclick = goStore;    // right side is function call
button2.onclick = goCave;
button3.onclick = fightDragon;


// This function Updates all the actions
function update(location) {
  monsterStats.style.display = "none";
  //Below code changes button names while in store
  button1.innerHTML = location["button text"][0];   // location defines which obj from locations Array ...i.e 0,1,2 so on and each obj has key-value pair like name,button text,button functions 
  button2.innerHTML = location["button text"][1];
  button3.innerHTML = location["button text"][2];
  text.innerHTML = location.text; // this changes text

  // below code perform actions onclick on each button which has been renamed
  //*******************  RHS side are functions which are created below  ****************
  button1.onclick = location["button functions"][0];    // right side is function call
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
}

// Below function is front page/Home page
function goTown() {
  // calling update funtion
  update(locations[0]);
}
// creating the functions to do stuff

function goStore() {
  // calling update funtion
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else {
    text.innerText = "You Dont have enough Gold to buy Health";
  }
}



function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a new Weapon" + newWeapon + ".";
      inventory.push(newWeapon); //this adds new item to an Array
      text.innerText += "\nYour inventory : " + inventory + ".";//+= cuz adding text without erasing previous one 
    }
    else {
      text.innerText = "You Do not have enough gold to buy a Weapon.";
    }
  }
  else {
    text.innerText = "You Already have most powerful Weapon!"
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;  //calling sellWeapon funtion coded below
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();  //removes 1st emt and returns
    text.innerText = "You Sold a " + currentWeapon + ".";
    text.innerText += "Your inventory : " + inventory + ".";
  }
  else {
    text.innerText = "Can't Sell your only Weapon";
    text.innerText += "Your inventory : " + inventory + ".";
  }
}

// All the monster fighting functions
function fightSlime() {
  fighting = 0;
  goFight();
}
function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
}
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";   // this code shows the monster stats which wasnt visible cuz in style we hid it
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText = "You attack it with your " + weapons[currentWeapon].name + ".";

  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  }
  else {
    text.innerText += " You Miss ";
  }
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  }
  else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    }
    else {
      defeatMonster();
    }
  }

  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;   // i.e returns if more than 80% of the time or health <20
}
function dodge() {
  text.innerText = "You Dodged attack from " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);  // 6.7 is random number
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  let xp = 0;
  let health = 100;
  let gold = 50;
  let currentWeapon = 0;
  let inventory = ["stick"];
  healthText.innerText = health;
  xpText.innerText = xp;
  goldText.innerText = gold;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11))   // random number btw 1 and 10
  }
  text.innerText = " You picked " + guess + ". Here are the random numbers:\n";

  text.innerText += numbers
  // for (let i = 0; i < 10; i++) {
  //   text.innerText += numbers[i] + "\n "
  // }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "\nRight !!! You win 20 Gold. "
    gold += 20;
    goldText.innerText = gold;
  }
  else {
    text.innerText += "\nWrong !!! You lose 10 Health!"
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}