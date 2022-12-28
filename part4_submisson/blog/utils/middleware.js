const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: err.message
        })
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'token expired'
        })
    }

    logger.error(err.message)
    next(err)
}

const unknownEndpoint = (reqt, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    errorHandler,
    requestLogger,
    unknownEndpoint
}