const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const { EventEmitter } = require('events');

class Emitter extends EventEmitter {}
const myEmitter = new Emitter();

async function logEvents(msg, logFile) {
  const dateEvent = format(new Date(), "yyyy\tMM\tdd\tHH:mm:ss");
  const logEvent = `${dateEvent}\t${uuidv4()}\t${msg}\n`;

  if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
    fs.mkdirSync(path.join(__dirname, "..", "logs"));
  }

  fs.appendFileSync(path.join(__dirname, "..", "logs", logFile), logEvent);
}

async function Log(req, res, next) {
  myEmitter.setMaxListeners(25);
  myEmitter.on("log", (msg, logName) => {
    logEvents(msg, logName);
  });

  try {
    myEmitter.emit("log", `${req.url}\t${req.method}\t${req.headers.origin}`, "allworkingLogs.txt");
  } catch (error) {
    console.error(error);
  }

  next();
}

module.exports = { Log };
