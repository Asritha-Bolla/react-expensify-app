// Object destructuring

const person = {
    name: 'Ashu',
    age: 24,
    location: {
        city: 'Hyderabad',
        temp: 50
    }
}

//by default prop name = variable name. Rename variable using ':'
const { name: firstName = 'Anonymous', age: myAge } = person
console.log(`${firstName} is ${myAge}`)

const { city, temp: temperature } = person.location
console.log(`It's ${temperature} degrees in ${city}`)

//Array destructuring

const address = ['Rd No.4', 'Hyderabad', 'Telangana', '500070']
//In array destructuring, variables are assigned in the exact same order as array items
//unlike object properties, array doesn't have named prop's so nothing to rename here

//const [ street, city1, state, zipCode ] = address 
const [, city1, state = 'Some state'] = address //leaves out the first item and everything after the third item. If third item doesn't exist, it uses default value
//const [, , state] = address

console.log(`You are in ${city1}, ${state}`)