import * as firebase from 'firebase' //import all NAMED exports from firebase and add them into variable called 'firebase'. We are doing this as an alternative to manually listing all the named exports we need

//Firebase provides an amazing Real-Time Database. But it's not the only thing it provides for our application. It also provides Authentication, File Hosting, Analytics and few other great features!!
//firebase.database(), firebase.auth() etc

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig)

//ref provides a reference to a specific part of our database
//ref() -> points to the root of the database. You can pass arguments to ref() to access data elsewhere in our DB

const database = firebase.database()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }

//// fetch data once 
// database.ref().once('value').then((snapshot) => {
//     console.log(snapshot.val())
// })

// // subscribing to get notified of ANY changes in data
// const onValueChange = database.ref().on('value', (snapshot) => { //using callback instead of promise because we want this function to run EVERY time data changes, unlike promise which only gets resolved or rejected ONCE with single data
//     console.log(snapshot.val()) //gets called each time any data changes on root reference (i.e., all data)
// })

// setTimeout(() => {
//     database.ref('name').set('Mike')
// }, 3000)

// setTimeout(() => {
//     database.ref().off('value', onValueChange) //unsubscribe from a particular subscription. That means we don't get NOTIFIED of further data changes
// }, 7000)

// setTimeout(() => {
//     database.ref('name').set('Asritha Bolla') //data changes but we are not notified
// }, 10000)

// database.ref().set({
//     name: 'Asritha Bolla',
//     age: 24,
//     isSingle: false,
//     stressLevel: 6,
//     job: {
//         title: 'Junior Developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'Hyderabad',
//         country: 'India'
//     }
// }).then(() => {
//     console.log('Data saved 1!')
// }).catch((err) => {
//     console.log('Failed to save data: ', err)
// })

//All calls to set() are asynchronous!
//database.ref().set('This is a string') //wipes out original reference value and sets it to new value => not suited if you want to make small changes to existing data
//use ref with proper location to update any existing value like follows

// database.ref('age').set(25)
// database.ref('location/city').set('Mumbai') //to update only city rather than the whole location object

// database.ref('attributes').set({ //we are just changing the value for 'attributes' so all other data is retained
//     height: 153,
//     weight: 56
// }).then(() => {
//     console.log('Data saved 2!')
// }).catch((err) => {
//     console.log('Error in saving data: ', err)
// })

// database.ref('isSingle').remove().then(() => { //not passing anything to ref (i.e., root reference) and calling remove() removes entire DB
//     console.log('Data removed!')
// }).catch((err) => {
//     console.log('Error in removing data: ', err)
// })

// database.ref('isSingle').set(null).then(() => { //passing null to set removes the data at that reference. i.e., alternate way to remove data
//     console.log('Data removed!')
// }).catch((err) => {
//     console.log('Error in removing data: ', err)
// })

// database.ref().update({
//     age: 26, //updates existing value
//     job: 'Software Developer', //adding new property
//     isSingle: null, //removing property
//     // location: {
//     //     city: 'Mumbai' 
//     // }, //overwrites location object => country is lost
//     'location/city': 'Mumbai' //only updates city (YAY!)
// })

// database.ref('notes').push({ //each push generates a unique id which you can use as child location later to grab that individual item
//     title: 'Go for a run',
//     body: 'Exercise is good for health'
// })

// database.ref('notes').push({ //each push generates a unique id which you can use as child location later to grab that individual item
//     title: 'Courses',
//     body: 'JS, React, HTML'
// })

// database.ref('notes/-MjV4O2byG8nrpIszS8r').update({
//     title: 'Yoga'
// })

// const expenses = [{
//     description: 'Gum',
//     note: '',
//     amount: 150,
//     createdAt: 0
// }, 
// {
//     description: 'Rent',
//     note: '',
//     amount: 15000,
//     createdAt: 0
// },
// {
//     description: 'Coffee',
//     note: '',
//     amount: 200,
//     createdAt: 0
// }]

// database.ref('expenses').push(expenses[0])
// database.ref('expenses').push(expenses[1])
// database.ref('expenses').push(expenses[2])

// database.ref('expenses').once('value').then((snapshot) => {
//     const expenses = []
//     snapshot.forEach(childSnapshot => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })

//     console.log(expenses)
// })

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = []
//     snapshot.forEach(childSnapshot => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })

//     console.log(expenses)
// })

// database.ref('expenses').on('child_removed', (snapshot) => {
//     //snapshot has removed child data
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_changed', (snapshot) => {
//     //snapshot has updated child data
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_added', (snapshot) => {
//     //runs once for existing children and once each for each new child
//     console.log(snapshot.key, snapshot.val())
// })