const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());





// const uri = "mongodb://localhost:27017"

const uri = "mongodb+srv://chatbox:OmrRaOExEGfklsA2@cluster0.xlk7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://chatbox:OmrRaOExEGfklsA2@cluster0.xlk7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("chatbox");
    const chatCollectui = database.collection("chat");



    app.post('/chat', async(req, res) => {
        const user = req.body;
        const result = await chatCollectui.insertOne(user)
        res.send(result)
    });

    app.get("/chat", async (req, res) => {
        const result = await chatCollectui.find().toArray();
        res.send(result);
      });



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req, res) => {
    res.send('chstbox running')
});
app.listen(port, () => {
    console.log(`Server started on port, ${port}`);
});