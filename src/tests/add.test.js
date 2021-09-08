// jest test file

const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`

//test case
//test() -> Global, but is only available in .test.js files!!
test('should add two numbers', () => { //name of test case and the code that should run in this case
    const result = add(3, 4)
    //if(result !== 7) throw new Error(`You added 3 and 4. Expected result is 7. Actual result is ${result}`)
    expect(result).toBe(7) //toBe => ===
})

test('should generate greeting from name', () => {
    expect(generateGreeting('Ashu')).toBe('Hello Ashu!')
})

test('should generate greeting for no name', () => {
    expect(generateGreeting()).toBe('Hello Anonymous!')
})