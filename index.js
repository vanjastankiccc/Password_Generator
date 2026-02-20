const characters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",

    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",

    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",

    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
    "-", "_", "=", "+", "[", "]", "{", "}", "|", ";",
    ":", "'", '"', ",", ".", "<", ">", "?", "/"
];
let passwordLength = 15
let password1El = document.getElementById("password1-el")
let password2El = document.getElementById("password2-el")
let customPasswordLength = document.getElementById("char-length")
let toggleSymbol = document.getElementById("cb-symbol")
let toggleNumber = document.getElementById("cb-number")
let isSymbolToggled
let isNumberToggled

function setPasswordLength(){
    let length = customPasswordLength.valueAsNumber 
    if(!Number.isNaN(length)){
        passwordLength = length
    }
    
    return passwordLength
}

function isSymbol(char){
    let num = char.charCodeAt()
    if((num >= 33) && (num <= 47) || (num >= 58 && num <= 64) 
        || (num >= 91 && num <= 96) || (num >= 123 && num <= 126)){
        return true
    }
    return false
}

console.log(isSymbol("2"))

function isNumber(char){
    let num = char.charCodeAt()
    if(num >= 48 && num <= 57){
        return true
    }
    return false
}

function randomNumer() {
    return Math.floor(Math.random() * characters.length)
}

function generatePasswordsString(password) {
    let passwordString = ""
    for (let i = 0; i < password.length; i++) {
        passwordString += password[i]
    }
    return passwordString
}

function generatePasswordsArrays() {
    let password1 = []
    let password2 = []
    let rand1, rand2
    isSymbolToggled = toggleSymbol.checked
    isNumberToggled = toggleNumber.checked

    for (let i = 0; i < setPasswordLength(); i++) {
        if(!isNumberToggled && !isSymbolToggled){
            while(true){
                rand1 = randomNumer()
                rand2 = randomNumer()
                if((!isSymbol(characters[rand1]) && !isNumber(characters[rand1])) &&
                    (!isSymbol(characters[rand2]) && !isNumber(characters[rand2]))){
                    password1.push(characters[rand1])
                    password2.push(characters[rand2])
                    break
                }
            }
        }else if(isSymbolToggled && !isNumberToggled){
            while(true){
                rand1 = randomNumer()
                rand2 = randomNumer()
                if((isSymbol(characters[rand1]) || !isNumber(characters[rand1])) && 
                    (isSymbol(characters[rand2]) || !isNumber(characters[rand2]))){
                    password1.push(characters[rand1])
                    password2.push(characters[rand2])
                    break
                }
            }
        }else if(!isSymbolToggled && isNumberToggled){
            while(true){
                rand1 = randomNumer()
                rand2 = randomNumer()
                if((!isSymbol(characters[rand1]) || isNumber(characters[rand1])) &&
                    (!isSymbol(characters[rand2]) || isNumber(characters[rand2]))){
                    password1.push(characters[rand1])
                    password2.push(characters[rand2])
                    break
                }
            }
        }else{
            password1.push(characters[randomNumer()])
            password2.push(characters[randomNumer()])
        }
    }
    password1El.textContent = generatePasswordsString(password1)
    password2El.textContent = generatePasswordsString(password2)
}

document.querySelector("#password1-el").addEventListener("click", function(){
    navigator.clipboard.writeText(password1El.textContent)
    .then(() => alert("Copied!"))
})

document.querySelector("#password2-el").addEventListener("click", function(){
    navigator.clipboard.writeText(password2El.textContent)
    .then(() => alert("Copied!"))
})

//create two passwords
//each characters needs to be 15 characters long
//Ability to set password length
//Toggle options for symbols and numbers
//Add "copy-on-click" feature
