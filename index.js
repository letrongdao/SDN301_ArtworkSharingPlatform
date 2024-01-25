const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('You are on Home page')
        res.end()
    } else if (req.url === '/another'){
        res.write("I am another route...")
        res.end()
    } else {
        res.write("I am listening...")
        res.end()
    }
})

server.listen(3000, () => {
    console.log('Server started on port 3000...')
})