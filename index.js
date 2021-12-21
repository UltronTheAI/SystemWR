const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: {origin: "*"} });


// var money = 0;
const fs = require('fs');
// const path = require('path');

app.get('/File/OPEN_FILE', (req, res) => {
    var list = req.url.split("?");
    var data = list[1].split('&');
    let fr = {

    };
    var path7 = "";
    for (let index = 0; index < data.length; index++) {
        let data_ = data[index].split("=");
        var num = 0;
        for (let index2 = 0; index2 < data_.length; index2++) {
            var d3 = data_[index2];
            if (num < 1){
                fr[d3] = "";
            }
            else{
                path7 = data_[0]
                fr[data_[0]] = String(d3).replaceAll('\\\\', '\\').replaceAll('%22', '');
            }
            num = num + 1;    
        }        
    }
    // const fs = require('fs')

    // var FileData = "";

    fs.readFile(fr[path7].replaceAll('%5C', '\\').replaceAll('\\\\', '\\'), 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        // console.log(__dirname);
        var ddd = new Date();
        console.log('\n\n\t# # # \t' + fr[path7].replaceAll('%5C', '\\').replaceAll('\\\\', '\\') + '\tAT\t#\t' + ddd.getTime() + '\t#')
        console.log("\n - # # # - {");
        console.log(data);
        console.log("\n - # # # - }")
        if (fr[path7].split("//").length == 0){
            // console.log(__dirname)
        }
        res.send(String(data)); 
    });
});

app.get('/File/WRITE_FILE', (req, res) => {
    var list = req.url.split("?");
    var data = list[1].split('&');
    let fr = {};
    var path7 = "";
    for (let index = 0; index < data.length; index++) {
        let data_ = data[index].split("=");
        var num = 0;
        for (let index2 = 0; index2 < data_.length; index2++) {
            var d3 = data_[index2];
            if (num < 1){
                fr[d3] = "";
            }
            else{
                path7 = data_[0]
                fr[data_[0]] = String(d3).replaceAll('\\\\', '\\').replaceAll('%22', '');
            }
            num = num + 1;    
        }        
    }
    // const fs = require('fs')

    // var FileData = "";

    const content = fr.text
    // console.log(content)
    try{
        fs.writeFile(fr.name, content, err => {
            if (err) {
                console.error(err)
                // res.send("Error");
                return
            }
            //file written successfully
            });

            res.send("Done");
    }
    catch(e){
        res.send("Error");
    }
});

app.get('/File/OS_COMMAND', (req, res) => {var list = req.url.split("?");var data = list[1].split('&');let fr = {};var path7 = "";for (let index = 0; index < data.length; index++) {let data_ = data[index].split("=");var num = 0;for (let index2 = 0; index2 < data_.length; index2++) {var d3 = data_[index2];if (num < 1){fr[d3] = "";}else{path7 = data_[0];fr[data_[0]] = String(d3).replaceAll('\\\\', '\\').replaceAll('%22', '');}num = num + 1;    }        }const { exec } = require("child_process");exec(fr.command.replaceAll("%20", ' '), (error, stdout, stderr) => {if (error) {console.log(`error: ${error.message}`);return;}if (stderr) {console.log(`stderr: ${stderr}`);return;}res.send(stdout);});});

server.listen(process.env.PORT || 5000);

io.on("connection", (socket) => {

    socket.on('disconnect', () =>{
        //console.log("User disconnected... user id = " + socket.id + "\t,\t" + use[socket.id]);
        // socket.broadcast.emit("message", [use[socket.id], "Leave the chat..."]);
        // delete use[socket.id];
        // delete socket;
    });

});
