const { ObjectId , MongoClient} = require("mongodb");
require("dotenv").config();
const cluster = process.env.CLUSTER;




async function getItems(req,res){
    const collection = db.collection("items");
    try {
      const items = await collection.find().toArray();
      res.json(items);
    } catch (error) {
      console.log(error);
    }
};

async function updateItems(req,res){
    const collection = db.collection("items");
    const { title, id } = req.body;
    
    if (!title || !id) {
      return res.status(400).json({ Alert: "Title or ID not found" });
    }
  
    try {
      const filter = { _id: new ObjectId(id) };
      const update = { $set: { title: title } };
  
      const result = await collection.updateOne(filter, update);
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ Alert: "Item not found" });
      }
  
      res.status(200).json({ Alert: "Item updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Alert: "Internal Server Error" });
    }
};

async function deleteItems(req,res){
    const collection = db.collection("items");
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ Error: "No item name provided" });
    } else {
      const del = await collection
        .findOneAndDelete({ title: title });
      if (!del) {
        return res.status(404).json({ Error: "Item  not found" });
      } else {
        return res
          .status(200)
          .json({ Alert: `Item ID ${title} has been deleted` });
      }
    }
};


async function searchItems(req, res) {
  const collection = db.collection("items");
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ Error: 'No title found' });
  }

  const searchResults = await collection.find({ title: title }).toArray();

  if (searchResults.length === 0) {
    return res.status(404).json({ Error: 'Unable to find' });
  } else {
    return res.status(200).json({ searchResults, nbHits: searchResults.length });
  }
}

async function Connect() {
  try {
    const client = new MongoClient(cluster, { useNewUrlParser: true });
    await client.connect();
    db = client.db();
   
  } catch (error) {
    console.error("Error connecting to Data Verification:", error);
    process.exit(1);
  }
}

Connect();

module.exports = {getItems,updateItems,deleteItems,searchItems};