let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const animationsSection = document.getElementById("animations");
const town = document.getElementById("town");
const store = document.getElementById("store");
const cave = document.getElementById("cave");
let imgTest = document.getElementById("img-test");
let monsterImg = document.getElementById("monster-img");
let dragonRoom = document.getElementById("dragon-room");
const blood = document.getElementById("blood");
let damageOnMonster = document.getElementById("damage-on-monster");
let damageOfMonster = document.getElementById("damage-of-monster");
const items = document.getElementById("items");
let ambianceSound = document.getElementById("ambiance-sound");
const attackSound = document.getElementById("attack-sound");
const battleMusic = document.getElementById("battle-music");
const deathSound = document.getElementById("death");
const monsterAttackSound = document.getElementById("attack-monster");
const gandalf = document.getElementById("gandalf");
const teleport = document.getElementById("teleport");
const youDie = document.getElementById("you-die");
const heal = document.getElementById("heal");
const goldSound = document.getElementById("gold-sound");
const welcomeStranger = document.getElementById("welcome-stranger");
const fireball = document.getElementById("fireball");
const dragonRoar = document.getElementById("dragon-roar");
const kameaSound = document.getElementById("kamea-sound");

//variable qui va determiner mes monstres
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
        imageURL: "images/slime.png",
        music: ["media/battle.mp3", "media/darksoul.mp3"],
        attackSound: "media/zombie.mp3"
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60,
        imageURL: "images/beast.png",
        music: ["media/battle.mp3", "media/darksoul.mp3"],
        attackSound: "media/couteau.mp3"
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
        music: ["media/dragonbattle.mp3", "media/darksoul.mp3"],
        voice: "media/gandalf.mp3",
        attackAnimation: "images/fireball.png",
        roar: "media/dragon.mp3"
    },
];


//variable qui va determiner mes armes
const weapons = [
    {
        name: "stick",
        power: 5,
        imageURL: "images/stick.png",
        soundHit: "media/attaque.mp3"
        
        
    },
    {
        name: "dagger",
        power: 30,
        imageURL: "images/dagger.png",
        imageWeapon: "images/dague.png",
        soundHit: "media/attaque.mp3"
    },
    {
        name: "claw hammer",
        power: 50,
        imageURL: "images/axe.png",
        imageWeapon: "images/hache.png",
        soundHit: "media/attaque.mp3"
    },
    {
        name: "sword",
        power: 100,
        imageURL: "images/sword.png",
        imageWeapon: "images/epee.png",
        soundHit: "media/punch.mp3"
    }    
];


//variable qui determine les locations mais aussi mes boutons selon l'endoit ou je suis.
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"], // ceux qu il y a ecrit sur les bouton en ville.
        "button functions": [goStore, goCave, fightDragon], //les boutons dans la ville qui font  appel par reference (c'est à dire, indique le chemin pour aller jusqu'à la fonction) aux fonctions nommés
        text: "You are in the town square. You see a sign that says \"Store\".", // le texte ecrit quand je suis en ville.
        ambiance: "media/ville.mp3"
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store.",
        ambiance: "media/erreur.mp3",
        soundWelcome: "media/welcome.mp3"
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters.",
        ambiance: "media/grotte.mp3"
    },
    
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];


//initialize buttons : determine vers quel fonction vont m'emmener mes bouton quand je suis en ville. (menu)
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


//fonction qui va me faire revenir vers la ville en faisant appel à ma fonction update qui elle meme choisir une location dans ma variable location : ici index 0 me fait revenir vers la ville.
function goTown() {
    youDie.style.display = "none";
    youDie.style.opacity = "0";
    town.style.display = "block";
    cave.style.display = "none";
    store.style.display = "none";
    dragonRoom.style.display = "none";
    monsterImg.style.display = "none"
    update(locations[0]); //update permet de changer les boutons selon la location où je me trouve
    animationsSection.style.backgroundImage = "url(images/village.webp)";
    battleMusic.src = "";
}

//fontion qui va me faire aller vers le store en faisant appel à ma fonction upadate qui elle meme va choisir une location dans ma variable location : ici index 1 me fait aller vers le store et donc upgrader mes button pour le store
function goStore() {
    update(locations[1]);
    cave.style.display = "none";
    town.style.display = "none";
    store.style.display = "block";
    dragonRoom.style.display = "none";
    monsterImg.style.display = "none"
    animationsSection.style.backgroundImage = "url(images/store.webp)"
    let seller = document.createElement("img");
    seller.id = "seller";
    seller.src = "images/seller.png";
    store.appendChild(seller);
    welcomeStranger.src = "media/welcome.mp3";
}

function goCave() {
    town.style.display = "none";
    cave.style.display = "block";
    store.style.display = "none";
    dragonRoom.style.display = "none";
    update(locations[2]);
    // animationsSection.style.backgroundImage = "url(images/cave.png)";
}


// fonction qui me permet de combattre les monstre.
function goFight() {
    update(locations[3]); // change les boutons
    
    monsterHealth = monsters[fighting].health; //selectione le nombre de point de vie selon le monstre
    monsterStats.style.display = "block"; // fait apparaitre les stats des monstres
    monsterImg.src = monsters[fighting].imageURL;
    battleMusic.src = monsters[fighting].music[0];
    gandalf.src = monsters[fighting].voice;
    monsterName.innerText = monsters[fighting].name; //permet de changer le texte pour montrer le nom du monstre qu on est entrain d affronter
    monsterHealthText.innerText = monsterHealth; //afficher en texte la vie du monstre
    health.innerText = health; // affiche mes points de vie
    console.log(monsterImg)
}

function fightSlime() { // fonction pour afronter le slime
    fighting = 0; // selectione l'index 0 dans ma variable "monsters" donc le slime
    monsterImg.style.display = "block";
    setTimeout(() => {
        monsterImg.style.transition = "opacity .5s ease";
        monsterImg.style.opacity = 1;
        }, "100");
    
    goFight(); // fait appel à la fonction go fight 
}

function fightBeast() {
    fighting = 1;// selectione l'index 1 dans ma variable "monsters" donc le Beast
    monsterImg.style.display = "block";
    monsterImg.style.transition = "opacity 2.5s ease";
    monsterImg.style.opacity = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    town.style.display = "none";
    cave.style.display = "none";
    store.style.display = "none";
    dragonRoom.style.display = "block"
    dragonRoom.style.backgroundImage = "url(images/volcan1.webp)";
    goFight();
}

function kamea() {
    const kamehameha = document.createElement("button");
    kamehameha.innerText = "Kamehameha";
    kamehameha.id = "kamehameha";
    kamehameha.style.display = "block";
    animationsSection.appendChild(kamehameha);
    kamehameha.addEventListener('click', function(){
        kameaSound.src = "media/kamea.mp3";
        const kameaBall = document.createElement("img");
        kameaBall.id = "kamea-ball";
        kameaBall.src = "images/boulekamea.webp";
        kameaBall.style.opacity = "0";
        const kameaTir = document.createElement("img");
        kameaTir.id = "kamea-tir";
        kameaTir.src = "images/tirkamea.png";
        kameaTir.style.opacity = "0";
        const aura = document.createElement("img");
        aura.id = "aura";
        aura.src = "images/aura.gif";
        aura.style.opacity = "0";
        animationsSection.appendChild(aura);
       animationsSection.appendChild(kameaTir);
        animationsSection.appendChild(kameaBall);
        setTimeout(() => {
            kameaBall.style.transition = "opacity 3s ease";
            kameaBall.style.opacity = "1";
            aura.style.transition = "opacity 1s ease"
            aura.style.opacity = "1";
        }, 300);
        setTimeout(() => {
            kameaBall.style.transform = "translateX(100%)";
            kameaBall.style.transition = "transform .2s ease"
            kameaTir.style.transition = "opacity .2s ease"
            kameaTir.style.opacity = ".8";
        }, 3000);
        setTimeout(() => {
            kameaTir.style.transition = "opacity 3s ease"
            kameaTir.style.opacity = "0";
            kameaBall.style.transition = "opacity 3s ease"
            kameaBall.style.opacity = "0";
            aura.style.transition = "opacity 4s ease"
            aura.style.opacity = "0";
        }, 5500);
        
        

    });
}
kamea();


function buyHealth() { // fonction pour acheter de la vie.
    if(gold >= 10) { // si j'ai 1à golds ou + alors je peux acheter de la vie
        gold -=  10; // reduit mes golds quand j achete de la vie
        health += 10; // augmenter ma vie quand j achete de la vie
        goldText.innerText = gold; //met à jour le texte quand mes golds changent
        healthText.innerText = health; //met à jour le texte quand ma vie change
        heal.src = "media/heal.mp3";
        items.src = "images/coeur.png";
        items.style.opacity = "1";
        items.style.transition = "transform .3s ease";
        items.style.transform = "translateY(-50%)";
        setTimeout(() => {
            items.style.transition = "opacity .3s ease"
            items.style.opacity ="0";
            }, "300");
            setTimeout(() => {
                
                items.style.transform = "translateY(0%)";
                }, "600");

    }else {
        text.innerText = "You do not have enough gold to buy health." //si je n'ai pas assez de gold, alors affiche ce texte
    }
}

function buyWeapon() { //fonction pour acheter des armes
    if(currentWeapon < weapons.length - 1) { // si mon arme actuelle est plus petit que le dernier index de mon tableau weapons alors je peux acheter une arme
        if(gold >= 30) {
            gold -= 30;
            currentWeapon ++; //incremente ma valeur de currentWeapon, ce qui me permettra d'acheter une nouvelle arme dans le tableau weapon car l'index sera superieur
            goldText.innerText = gold; //permet d'afficher mes gold en texte
            let newWeapon = weapons[currentWeapon].name; // variable qui determine le nom de la nouvelle arme. Vu que quand j achete une nouvelle arme, mon currentWeapon incremente (il passe de 1 à 2 par exemple), alors cela me permetra de changer d'index dans mon tableau et donc d'obtenir une nouvelle arme.
            text.innerText = "You now have a" + newWeapon + "."; // permet d afficher en texte ma nouvelle arme
            goldSound.src = "media/gold.mp3";
            imgTest.src = weapons[currentWeapon].imageURL;
            items.src = weapons[currentWeapon].imageWeapon;
            items.style.opacity = "1";
            items.style.transition = "transform .5s ease";
            items.style.transform = "translateY(-70%)";
            setTimeout(() => {
            items.style.transition = "opacity .5s ease"
            items.style.opacity ="0";
            }, "300");
            setTimeout(() => {
                
                items.style.transform = "translateY(0%)";
                }, "600");
            inventory.push(newWeapon); // ajouter la nouvelle arme au tableau inventory
            text.innerText += " In your inventory you have: " + inventory;
            
        }else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    }else {
        text.innerText = "You already have the most powerful weapon!" 
        button2.innerText = "Sell weapon for 15 gold"; //permet de changer le texte du bouton 2 
        button2.onclick = sellWeapon; // si j'ai l'arme la plus puissante, le bouton 2 va changer et me permetre de m"nvoyer vers la fonction sellWeapon, pour pouvoir vendre mes anciennes armes.
    }
}

function sellWeapon() { // fonction pour vendre 
    if (inventory.length > 1) { // si la longueur de mon tableau inventory > 1 alors je peux vendre
        gold += 15; //rajoute 15 golds à gold si je vend
        goldText.innerText = gold;
        let currentWeapon = inventory.shift(); //supprimer le premier element de mon tableau, donc dans ce cas, elimine la premiere arme de mon inventaire
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    }else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function update(location) { //la fonction qui permet de determiner mes boutons selon la location grave aux index de mon tableau
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
    ambianceSound.src = location.ambiance;
    
}

function attack() { //la fonction attaque qui determine les degats selon mon arme et mon xp
    attackSound.src = weapons[currentWeapon].soundHit;
    imgTest.style.transition = "transform .3s ease";
    imgTest.style.transform = "translateX(100%) rotate(35deg)";
    // imgTest.style.boxShadow = "10px 10px 5px #888888";
    
    setTimeout(() => {
        imgTest.style.transform = "translateX(0%)";
        }, "500");
        setTimeout(() => {
            monsterImg.style.transition = "transform .3s ease";
        monsterImg.style.transform = "translateX(-100%) rotate(-35deg)";
            }, "1000");
        
        // monsterImg.style.boxShadow = "10px 10px 5px #888888";
        setTimeout(() => {
            monsterImg.style.transform = "translateX(0%)";
            }, "1500");
    text.innerText = "The " + monsters[fighting].name + " attacks."; //annonce sous forme de texte que le montre attaque.
    text.innerText += " You attack hit with your " + weapons[currentWeapon].name + "."; // annonce que j attaque avec mon arme actuelle
    let damageReceived = getMonsterAttackValue(monsters[fighting].level);
    health -= damageReceived; // reduit mes points de vie selon le montre qui attaque et par rapport à son level.
    dragonRoar.src = monsters[fighting].roar; //va chercher dans mon tableau d'objet le cri du dragon
    fireball.src = monsters[fighting].attackAnimation;
    // fireball.style.display = "block";
    fireball.style.transition = "opacity 2s ease, transform 2s ease";
    fireball.style.opacity = "1";
    fireball.style.transform = "translateX(-100%) translateY(50%)"
    setTimeout(function() {
        
        fireball.style.opacity = "0";
        fireball.style.transform = "translateX(0%) translateY(0%)"
    },2000);
    
    
    setTimeout(function() {
        damageOfMonster.innerText = "- " + damageReceived;
        monsterAttackSound.src = monsters[fighting].attackSound;
    },1000);
    setTimeout(function() {
        damageOfMonster.innerText = "";
    },1700);

    if (isMonsterHit()) {
        let damageDone = weapons[currentWeapon].power + (Math.floor(Math.random() * xp) + 1)
        monsterHealth -= damageDone;
        damageOnMonster.innerText = damageDone;
        setTimeout(function() {
            damageOnMonster.innerText = "";
        },700);
        
    }else {
        text.innerText += " You miss.";
        damageOnMonster.innerText = "MISS";
        setTimeout(function() {
            damageOnMonster.innerText = "";
        },700);
    }
     // baisse la vie du monstre selon mon arme ET selon un chiffre au hasard compris entre 1 et mon XP actuel.
    healthText.innerText = health; //affiche en texte ma vie.
    monsterHealthText.innerText = monsterHealth; //affiche la vie du monstre
    
    if(health <= 0) { // si mes points de vie sont à 0, alors appel de la fonction lose.
        lose()
    }else if (monsterHealth <= 0) { //si la vie du monstre atteind 0 alors
         fighting === 2 ? winGame() : defeatMonster();   if (fighting === 2);  // si c'est le monstre de l'index 2 donc le dragon ALORS appel la fonction winGame SINON appel fonction defeatMonster.
    }
    if(Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks."; // inventory.pop() permet de supprimer le dernier element de mon tableau inventory, donc supprime mon arme.
        currentWeapon --;
    }
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ?  hit : 0;
}

function isMonsterHit() {
    if(true) {
       return Math.random() > .2 || health < 20;
    }
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + "."
    imgTest.style.transition = "transform .2s ease";
    imgTest.style.transform = "translateY(-25%)";
    teleport.src = "media/dodge.mp3";
    setTimeout(() => {
        imgTest.style.transform = "translateY(0%)";
        }, "250");
}

function defeatMonster() { //fonction quand le monstre est vaincu
    gold += Math.floor(monsters[fighting].level * 6.7); // gole = gold + le lvl du monstre multiplié par 6.7, le tout arrondi
    xp += monsters[fighting].level; //ajoute de l'xp selon le level du monstre
    goldText.innerText = gold;
    xpText.innerText = xp;
    monsterImg.style.transition = "opacity 2.5s ease";
    monsterImg.style.opacity = 0;
    setTimeout(() => {
        monsterImg.style.display = "none";
        }, "2000");
    update(locations[4]);
    setTimeout(() =>{
        battleMusic.src = "media/fanfare.mp3";
    },700)
    
}

function lose() {
    youDie.style.display = "block";
    setTimeout(() => {
        imgTest.style.transition = "rotate 3s ease";
        imgTest.style.transform = "rotate(-90deg)";
        blood.style.display = "block";
        deathSound.src = "media/mort.mp3"; 
        battleMusic.src = monsters[fighting].music[1];
        
        youDie.style.transition = "opacity 3s ease";
        youDie.style.opacity = "0.5";
        
        }, "1000");
        
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() { //fonction pour restart, donc reinitialise toutes les variables.
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    blood.style.display = "none";
    imgTest.src = "images/stick.png";
    imgTest.style.transition = "rotate 3s ease";
    imgTest.style.transform = "rotate(0deg)";
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 1; i < 5; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if(numbers.indexOf(guess) !== -1) { // verifie si la valeur de guess est bien dans mon tableau.
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    }else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health;
        if(health <= 0) {
            lose();
        }
    }
    
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}


