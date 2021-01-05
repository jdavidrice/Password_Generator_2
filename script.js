// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listener
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
        if (length < 8 || length > 128) {
            alert ("Please choose a password length between 8 and 128.")
            window.location.reload()
            return ''    
        };    
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(
        hasUpper, 
        hasLower, 
        hasNumber, 
        hasSymbol, 
        length
    );
    console.log(hasUpper, hasLower, hasNumber, hasSymbol);
});

// Generate password function
function generatePassword(upper, lower, number, symbol, length) {
    // 1. Init pw var
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    console.log('typesCount: ', typesCount);
    // 2. Filter out unchecked types
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter
    (
        item => Object.values(item)[0]
    );
    // console.log('typesArr: ', typesArr);
    // If no boxes are checked, it won't generate a password
    if(typesCount === 0) {
        alert ("Please check which character types you want to use.");
        return '';
    }
    // 3. Loop over length call generator function for each type
    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName);
            generatedPassword += randomFunc[funcName]();
        });
    }
    // 4. Add final password to the password variable and return
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Generator functions
function getRandomLower() {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    return lowercase[Math.floor(Math.random() * lowercase.length)];
}
function getRandomUpper() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return uppercase[Math.floor(Math.random() * uppercase.length)];
}
function getRandomNumber() {
    const number = "0123456789";
    return number[Math.floor(Math.random() * number.length)];
}
function getRandomSymbol() {
    const symbols = "!'#$%&()*+,-./:;<=>?@[]^_`{|}~";
    return symbols[Math.floor(Math.random() * symbols.length)];
}
// console.log(getRandomLower(), getRandomUpper(), getRandomNumber(), getRandomSymbol());

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    if(!password) {
        alert ("Please generate a password before you copy.")
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard.');
    window.location.reload();
});
