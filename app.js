const express = require('express')
var bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

const app = express()
const port = 3000

const mongoUrl = "mongodb://127.0.0.1:27017"

app.use(express.static('public'));
// for parsing application/json
app.use(bodyParser.json()); 

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" )
})

app.post('/app/message', async function (req, res) {
   try{
      const { name, email, message } = req.body
      const client = new MongoClient(mongoUrl)
      const database = client.db("bhuvan")
      const user_messages = database.collection("user_messages")
      const record = { name, email, message }
      const result = await user_messages.insertOne(record)
      res.status(200).send({message: "OK"});
   }catch(ex){
      res.status(500).send({message: "Server Internal Error"})
   }
 })

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
