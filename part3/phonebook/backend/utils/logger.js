// do all printing to the cosole

const info = (...params) => {
    console.log(params.join(' '))
}

const error = (...params) => {
    console.log(params.join(' '))
}

module.exports = { info, error }