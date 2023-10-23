const Axios = require("axios");
require("dotenv").config();
const API = process.env.API_KEY;
const HOST = process.env.API_HOST;

/* Trial Period has EXPIRED (Yet to find a FREE substitue API)
async function conversion(req, res) {
  try {
    const { from, to, v } = req.body;

    if (!from || !to || !v) {
      return res
        .status(400)
        .json({ Alert: "From/to or conversion val not provided" });
    }

    const response = await Axios.post(
      `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${v}&api_key=${API}`,
      {},
      {
        headers: {
          accept: "application/json",
        },
      }
    ).then((r) => {
      res.json(r.data.result);
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Alert: "An error occurred while processing your request" });
  }
}
*/

async function translator(req, res) {
  const { q, t, s } = req.body;

  const encodedParams = new URLSearchParams();
  encodedParams.set("q", q);
  encodedParams.set("target", t);
  encodedParams.set("source", s);

  try {
    const response = await Axios.post(
      "https://google-translate1.p.rapidapi.com/language/translate/v2",
      encodedParams,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept-Encoding": "application/gzip",
          "X-RapidAPI-Key":
            "6ab6426498msh3a8b554f47aecdap1a6bd3jsn68aa72332bfc",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        },
      }
    );

    res.json(response.data.data.translations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function getLangs(req, res) {
  try {
    const r = await Axios.get(
      "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
      {
        headers: {
          "Accept-Encoding": "application/gzip",
          "X-RapidAPI-Key":
            "6ab6426498msh3a8b554f47aecdap1a6bd3jsn68aa72332bfc",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        },
      }
    )
      .then((r) => {
        res.json(r.data);
      })
      .catch((e) => {
        console.error(e);
      });
  } catch (error) {
    console.error(error);
  }
}



module.exports = {translator, getLangs};
