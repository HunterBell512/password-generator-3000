// Assignment Code
var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var ints = "0123456789";
var chars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.textContent = password;
}

// function to select a random integer within a max value
var rndInt = function (max) {
  return Math.floor(Math.random() * max);
};

// this function compose a set of characters to choose from
var composeCharSet = function (allow) {
  var set = "";
  if (allow.lower) {
    set += letters.slice(0, 26);
    // console.log(set)
  }

  if (allow.upper) {
    set += letters.slice(26, 52);
    // console.log(set)
  }

  if (allow.char) {
    set += chars;
    // console.log(set)
  }

  if (allow.ints) {
    set += ints;
    // console.log(set)
  }

  return set;
};

// function to compose the password and return it to password generator
var composePassword = function (set, limit) {
  var result = "";

  for (var i = 0; i < limit; i++) {
    result += set.charAt(rndInt(set.length));
  }

  return result;
};

// function to get character allowances from the user
var getAllowances = function () {
  var allow = {
    lower: window.confirm("Should the password have lowercase letters?"),
    upper: window.confirm("Should the password have uppercase letters?"),
    char: window.confirm("Should the password have special characters?"),
    ints: window.confirm("Should the password have numbers?"),
  };

  if (!allow.lower && !allow.upper && !allow.char && !allow.ints) {
    alert("At least one set of characters must be chosen!");
    return getAllowances();
  }

  return allow;
};

// function to generate the new password
function generatePassword() {
  var maxChars = window.prompt(
    "How many characters should the password have? (MIN: 8 | MAX: 128)"
  );

  // catch if input is less than 8 and more than 128
  while (maxChars < 8 || maxChars > 128) {
    if (maxChars < 8) {
      alert("Invalid! Too few characters!");
    } else if (maxChars > 128) {
      alert("Invalid! Too many characters!");
    }
    maxChars = window.prompt(
      "How many characters should the password have? (MIN: 8 | MAX: 128)"
    );
  }
  // prompt users to choose which characters they want in the password
  var allowances = getAllowances();

  // compose a set of characters to choose from
  var charSet = composeCharSet(allowances);

  // generate the password with given charSet
  return composePassword(charSet, maxChars);
}

var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
