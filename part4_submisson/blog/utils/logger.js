const info = (...args) => {
    console.log(args.join(' '))
}

const error = (...args) => {
    console.log(args.join(' '))
}

module.exports = {
    info,
    error
}