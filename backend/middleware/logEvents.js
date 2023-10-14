const {format} = require("date-fns");
const {v4:uuid} = require("uuid");
const fs = require("fs");
const path = require("path");
const {EventEmitter} = require('events');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();

async function logEvents(msg,logFile){
    const dateEvent = `${format(new Date,"yyyyMMdd\tHH:mm:ss")}`
    const logEvent = `${dateEvent}\t${uuid()}\t${msg}\n`

    if(!fs.existsSync(path.join(__dirname,"..","logs"))){
        fs.mkdirSync(path.join(__dirname,"..","logs"))
    };

    fs.appendFileSync(path.join(__dirname,"..","logs",logFile),logEvent);
};

async function Log(req,res,next){
    myEmitter.setMaxListeners(15);
    myEmitter.on("log",(msg,logName)=>{
        logEvents(msg,logName)
    });
    try{
        myEmitter.emit("log",`${req.url}\t${req.method}\t${req.headers.origin}`,"allworkingLogs.txt");
    }catch(error){
        myEmitter.emit("log",`${error.name}\t${error.message}`,"allCrashReports.txt");
        console.log(error);
    }
    next();
 
 
};

module.exports = {Log};