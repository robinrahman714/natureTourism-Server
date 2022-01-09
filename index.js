const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = 5000;
//middleware
app.use(cors());
app.use(express.json());


//tourGuide
// iJQJ3hxdmnPwye4Y


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.klq8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("tourGuide");
    const servicesCollection = database.collection("services");

    //post api
  //   app.get('/services', async (req, res) => {
  //     const cursor = servicesCollection.find({});
  //     const services = await cursor.toArray();
  //     res.send(services);
  // });
  
        //Single Service
        app.get('/services/:id', async (req, res) => {
          const id = req.params.id;
          console.log('getting specific service', id);
          const query = { _id: ObjectId(id) };
          const service = await servicesCollection.findOne(query);
          res.json(service);
      })

    app.post("/services", async (req, res) => {
      const services = {
        "name": "Bahamas",
        "price": "15000USD",
        "description":
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, distinctio.",
        "img": "https://i.ibb.co/rvprWjF/1.jpg"
      };
      const result = await servicesCollection.insertOne(services);
      console.log(result);
    });
    // api delete

    app.delete('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);
      res.json(result);
  })
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running the server, yoooo!");
});

app.listen(port, () => {
  console.log("Running the server on port", port);
});
