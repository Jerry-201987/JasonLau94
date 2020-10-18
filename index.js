const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use('/', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
//接受post请求，
app.post('/login', (req, res) => {
    // console.log(req.body.username)
    // console.log(req.body.password)
    let { username, password } = req.body
    if (username === 'lau' && password === '1994') {
        res.json({ isSuccess: true })
    } else { res.json({ isSuccess: false }) }
    // res.json([1, 2, 3])
})

app.listen(8989)