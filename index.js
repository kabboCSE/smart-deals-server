const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const uri =
  "mongodb+srv://smartDBUser:zSyH4JdCucEBojqh@kabbodb.grqcohv.mongodb.net/?appName=KabboDB";
//middleware
app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Smart Server is running");
});

async function run() {
  try {
    await client.connect();
    const db = client.db("smart_DB");
    const productsCollection = db.collection("products");

    app.post("/products", async (req, res) => {
      const newProduct = { name: "Kabbo", id: 525 };
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Smart Server is running on port : ${port}`);
});

// client.connect().then(() => {
//   app.listen(port, () => {
//     console.log(`Smart Server is running on now: ${port}`);
//   });
// });
