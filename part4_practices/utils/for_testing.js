// install jest: npm install --save-dev jest
// run jest: jest --verbose

const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = (arr) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return arr.reducer(reducer, 0) / arr.length
}

module.exports = {
    reverse,
    reduce
}

