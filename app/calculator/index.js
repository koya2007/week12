// global variable
// state : first,operator,second
const debug = false
let state
let display

let first
let second
let operator
let lastChart

let lastSecond = null

const init = () => {
    state = 'first'
    display = '0'
    first = 0
    second = 0
    operator = '?'
}

const insertSeperator = (str, seperator = ' ', groupSize = 3) => {
    let resultSting = "";
    let counter = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        resultSting = str[i] + resultSting
        if (i !== 0 && counter % groupSize === groupSize - 1)
            resultSting = seperator + resultSting
        counter++
    }

    // console.log(`"${resultSting}" ` )



    return resultSting
}

const render = () => {
    // display
    // insert thounsand seperator
    const insertSeparator = (str, separator = ' ', groupSize = 3) => {
        let resultString = ""
        let counter = 0
        for (let i = str.length - 1; i >= 0; i--) {
            resultString = str[i] + resultString
            counter++
            if (i !== 0 && counter % groupSize === groupSize - 1)
                resultString = separator + resultString
            counter++
        }
        return resultString
    }

    const outString = insertSeparator(display)
    document.getElementById('screen').innerText = outString

    debug && console.log(`[${state}] first:${first}, second:${second}, operator:${operator}, display:${display}`)

}


const numberClick = (num) => {
    console.log(num);
    switch (state) {
        case 'first':
            if (display.length < 9) {
                if (display === '0') {
                    display = String(num)
                }
                else {
                    display += String(num)
                }
            }
            break
        case 'operator':
            display = String(num)
            state = 'second'
            break
        case 'second':
            if (display.length < 9) {
                if (display === '0') {
                    display = String(num)
                }
                else {
                    display += String(num)
                }
            }
            break
    }
    render()
}
const operatorClick = (op) => {
    switch (state) {
        case 'first':
            first = Number(display)
            operator = String(op)
            state = 'operator'
            break
        case 'operator':
            operator = op
            break
        case 'second':
            const secondValue = Number(display)
            if (operator === '+') {
                first = first + secondValue
            }
            else if (operator === '-') {
                first = first - secondValue
            }
            display = String(first)
            operator = op
            state = 'operator'
            break
    }
    render()
}

const equalClick = () => {
    if (state === 'second') {
        second = Number(display)
        lastSecond = second

        if (operator === '+') {
            display = String(first + second)
        }
        else if (operator === '-') {
            display = String(first - second)
        }

        first = Number(display)
        state = 'first'
    }
    else if (state === 'first') {
        if (operator === '?') {
            operator = '+'
            lastSecond = Number(display)

            display = String(Number(display) + lastSecond)
            first = Number(display)
        }
        else if (operator === '+') {
            display = String(Number(display) + lastSecond)
            first = Number(display)
        }
        else if (operator === '-') {

            display = String(Number(display) - lastSecond)
            first = Number(display)
        }
    }

    render()
}
const ceClick = () => {
    display = '0'
    first = 0
    second = 0
    operator = '?'
    lastSecond = null
    state = 'first'

    render()
}
document.addEventListener('keydown', (e) => {
    // console.log(e);
    // checknumber
    if (e.key === 'Enter')
        equalClick()
    else if (e.key === 'Escape')
        ceClick()
    else if (e.key >= '0' && e.key <= 9)
        numberClick(e.key)
    else if (e.key === '-')
        operatorClick('-')
    else if (e.key === '+' || (e.key === '='))
        operatorClick('+')
})

document.addEventListener('DOMContentLoaded', () => {
    // inital all
    init()
    // first render
    render()
})