const { ObjectId } = require("mongodb");
const storeModel = require("../models/store");
const sharp = require("sharp");

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

async function createItem(req, res) {
  async (req, res) => {
    try {
      const { title, description, quantity, extra } = req.body;
      if (!title || !description || !quantity)
        return res
          .status(400)
          .json({ Error: "Please enter title , description and quantity" });
      const duplicate = await storeModel.findOne({
        title: title,
      });
      if (duplicate) {
        return res.status(409).json({ Error: `${title} already exists` });
      } else {
        let photofilename;
        if (req.file) {
          photofilename = `${Date.now()}.jpeg`;
          const compressed = await sharp(req.file.buffer)
            .resize(480, 360)
            .jpeg({ quality: 60 })
            .toFile(path.join(__dirname, "public", "itemimgs", photofilename));
          console.log(compressed);
        }

        const newItem = new storeModel({
          title,
          description,
          quantity,
          photo: photofilename,
          extra,
        });

        console.log(newItem);
        await newItem.save();
        res.status(201).json({ Alert: `${title} Added to store` });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = {
  getItems,
  updateItems,
  deleteItems,
  searchItems,
  createItem,
};
