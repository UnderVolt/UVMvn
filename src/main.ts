import express = require("express");
import path = require("path");
import fs = require("fs");

const app = express();

const args = require('yargs').argv;
const port: number = args.port ? args.port : 8080;
const relativePackage: boolean = args.relative === "true";
let sendFirst = false;

app.get('/maven/*', (req, res) => {
    const opath = req.originalUrl.split("/").slice(2).join("/");
    const unformatted = opath.substring(0, opath.lastIndexOf("/")).split("/");
    const unformattedFile = path.basename(req.originalUrl).split(".");
    const unformattedDir = unformatted.slice(0, unformatted.length - 2);

    const directory = unformattedDir.join(relativePackage ? "." : path.sep);
    const artifact = unformatted[unformatted.length - 2];
    const version = unformatted[unformatted.length - 1];
    const ext = unformattedFile[unformattedFile.length - 1];
    const file = artifact + "-" + version + "." + ext;
    const localDir = !args.path ? path.join(__dirname, "..", "modules") : path.isAbsolute(args.path) ?  args.path : path.join(__dirname, "..", args.path);
    const local = path.join(localDir, directory, artifact, version, file);
    const exists = fs.existsSync(local);

    if(!fs.existsSync(localDir)) fs.mkdirSync(localDir);

    if(!sendFirst) console.log("--------------------");

    console.log("Directory: " + directory);
    console.log("Artifact: " + artifact);
    console.log("Version: " + version);
    console.log("Extension: " + ext);
    console.log("File: " + file);
    console.log("Local Module: " + local);
    console.log("Exists: " + exists);
    console.log("--------------------");

    if(!exists) res.sendStatus(404);
    else res.sendFile(local);
    sendFirst = true;
});

app.listen(port, () => {
    console.log("[UVLib] Started on port: " + port);
}).on('error', (err) => {
    if(err.message.includes("EADDRINUSE")){
        console.log("[UVLib] There was an error starting the server");
        console.log("[UVLib] The port is already in use try changing it with --port=1234");
    }else{
        console.log("[UVLib] There was an error starting the server");
    }
});
