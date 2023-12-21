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


//variable qui va determiner mes monstres
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60,
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
    },
];


//variable qui va determiner mes armes
const weapons = [
    {
        name: "stick",
        power: 5,
    },
    {
        name: "dagger",
        power: 30,
    },
    {
        name: "claw hammer",
        power: 50,
    },
    {
        name: "sword",
        power: 100,
    }    
];


//variable qui determine les locations mais aussi mes boutons selon l'endoit ou je suis.
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"], // ceux qu il y a ecrit sur les bouton en ville.
        "button functions": [goStore, goCave, fightDragon], //les boutons dans la ville qui font appel aux fonctions nommés
        text: "You are in the town square. You see a sign that says \"Store\"." // le texte ecrit quand je suis en ville.
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
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
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    }
];


//initialize buttons : determine vers quel fonction vont m'emmener mes bouton quand je suis en ville. (menu)
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


//fonction qui va me faire revenir vers la ville en faisant appel à ma fonction update qui elle meme choisir une location dans ma variable location : ici index 0 me fait revenir vers la ville.
function goTown() {
    update(locations[0]); //update permet de changer les boutons selon la location où je me trouve

}

//fontion qui va me faire aller vers le store en faisant appel à ma fonction upadate qui elle meme va choisir une location dans ma variable location : ici index 1 me fait aller vers le store et donc upgrader mes button pour le store
function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}


// fonction qui me permet de combattre les monstre.
function goFight() {
    update(locations[3]); // change les boutons
    monsterHealth = monsters[fighting].health; //selectione le nombre de point de vie selon le monstre
    monsterStats.style.display = "block"; // fait apparaitre les stats des monstres
    monsterName.innerText = monsters[fighting].name; //permet de changer le texte pour montrer le nom du monstre qu on est entrain d affronter
    monsterHealthText.innerText = monsterHealth; //afficher en texte la vie du monstre
    health.innerText = health; // affiche mes points de vie
}

function fightSlime() { // fonction pour afronter le slime
    fighting = 0; // selectione l'index 0 dans ma variable "monsters" donc le slime
    goFight(); // fait appel à la fonction go fight 
}

function fightBeast() {
    fighting = 1;// selectione l'index 1 dans ma variable "monsters" donc le Beast
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function buyHealth() { // fonction pour acheter de la vie.
    if(gold >= 10) { // si j'ai 1à golds ou + alors je peux acheter de la vie
        gold -=  10; // reduit mes golds quand j achete de la vie
        health += 10; // augmenter ma vie quand j achete de la vie
        goldText.innerText = gold; //met à jour le texte quand mes golds changent
        healthText.innerText = health; //met à jour le texte quand ma vie change
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
}

function attack() { //la fonction attaque qui determine les degats selon mon arme et mon xp
    text.innerText = "The " + monsters[fighting].name + " attacks."; //annonce sous forme de texte que le montre attaque.
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + "."; // annonce que j attaque avec mon arme actuelle
    health -= monsters[fighting].level; // reduit mes points de vie selon le montre qui attaque et par rapport à son level.
    monsterHealth -= weapons[currentWeapon].power + (Math.floor(Math.random() * xp) + 1); // baisse la vie du monstre selon mon arme ET selon un chiffre au hasard compris entre 1 et mon XP actuel.
    healthText.innerText = health; //affiche en texte ma vie.
    monsterHealthText.innerText = monsterHealth; //affiche la vie du monstre
    if(health <= 0) { // si mes points de vie sont à 0, alors appel de la fonction lose.
        lose()
    }else if (monsterHealth <= 0) { //si la vie du monstre atteind 0 alors appel la fonction defeatMonster
        defeatMonster(); //appel de la fonction
    }
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + "."
}

function defeatMonster() { //fonction quand le monstre est vaincu
    gold += Math.floor(monsters[fighting].level * 6.7); // gole = gold + le lvl du monstre multiplié par 6.7, le tout arrondi
    xp += monsters[fighting].level; //ajoute de l'xp selon le level du monstre
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {

}
