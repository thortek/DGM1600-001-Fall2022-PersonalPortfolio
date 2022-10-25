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

// Boolean

let myBool = false

// need to look into "truthy" and "falsy" values

// Arrays - hold sets of items of any data type

let mySimpleArray = []  // legit, empty array notice the square brackets

// ordering    0     1      2        3      4
let myArray = [42, "Bob", myBool, ANSWER, true]

myArray.length // handy property to find your array's length

let firstItem = myArray[0]

let lastItem = myArray[myArray.length - 1]

// Objects

let minObject = {} // the most minimal object possible

let myCar = {
    make: 'Chevrolet',
    color: 'Bahama Green',
    year: 1964,
    vin: '2039840982039842LKJ'
}

myCar.color // accessing an object's property through simple dot notation
myCar.numDoors = 2 // we can also simply add a property to an object using dot notation

const anotherObject = { // objects can contain just about anything
    wordz: ['foo', 'bar', 'baz'],
    car: {
        make: 'McLaren',
        model: '720s',
        topSpeed: '212mph'
    },
    awesomeness: true
}

// Functions

function myFunction() { // this is a named function definition
    return "My greeting to you... is what I return to you!" // doesn't do much, just returns a string
}

function sumTwoThings(thingOne, thingTwo) {
    return thingOne + thingTwo
}