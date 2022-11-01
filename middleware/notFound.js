const notFoundMiddleware = (req, res) => {
    res.send('Unable to find the page you were looking for.')
}

export default notFoundMiddleware