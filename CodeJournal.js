// Variables - containers that store values

var name // a declared variable with the name "name"   It is not initialized (no value) and it's in the "global scope" (BAD)

let foo // a declared ES6 variable that can be changed - still no value however, in this example

const bar = "Bar" // a declared ES6 constant that cannot be changed
// '=' is the assignment operator.  Read it as "is assigned the value of..."

const ANSWER = 42

// Strings - a set of characters

let string1 = "Hello World!"

let string2 = "Hello World 'I mean Utah!'" // how to show a string within another string

let string3 = new String("Hello New World!") // using a String constructor/function

// Numbers

let myNum = 23084209384

let myNum2 = 75.25

"1" // is not a number! It is a string.
"1" == 1 // evalutes to true because of type coercion and loose equality checking
"1" === 1 // evaluates to false because this is strict equality checking