const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const jwtService = require('../services/security/JwtService')
const userService = require('../services/security/UserService')
const app = express()
const port = 3000

app.use(cors())
app.use(body_parser.json())


app.post('/api/createNewUser', async (req, res) => {
  const request = req.body
  const user = await userService.registre_user(request)
  const token = jwtService.generateAccessToken({ username: user.username });
  res.json(token);

});

app.post('/api/logIn', async (req, res) => {
  const request = req.body
  const user = await userService.authenticateUser(request)
  if(!user) return res.sendStatus(401)
  const token = jwtService.generateAccessToken({ username: user.username });
  res.json({"token": "baire " + token, "username": user.username});

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})