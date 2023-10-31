const { ObjectId } = require("mongodb");
const storeModel = require("../models/store");

async function getItems(req, res) {
  try {
    const items = await storeModel.find();
    res.json(items);
  } catch (error) {
    console.log(error);
  }
}

async function updateItems(req, res) {
  const { title, id } = req.body;

  if (!title || !id) {
    return res.status(400).json({ Alert: "Title or ID not found" });
  }

  try {
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { title: title } };

    const result = await storeModel.updateOne(filter, update);

    if (result.matchedCount === 0) {
      return res.status(404).json({ Alert: "Item not found" });
    }

    res.status(200).json({ Alert: "Item updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
}

async function deleteItems(req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ Error: "No ID name provided" });
  } else {
    const del = await storeModel.findOneAndDelete({ _id: id });
    if (!del) {
      return res.status(404).json({ Error: "ID  not found" });
    } else {
      return res.status(200).json({ Alert: `Item ${id} has been deleted` });
    }
  }
}

async function searchItems(req, res) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ Error: "No title found" });
  }

  const searchResults = await storeModel.find({ title: title });

  if (searchResults.length === 0) {
    return res.status(404).json({ Error: "Unable to find" });
  } else {
    return res
      .status(200)
      .json({ searchResults, nbHits: searchResults.length });
  }
}

module.exports = { getItems, updateItems, deleteItems, searchItems };
