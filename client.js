#!/bin/env node
/*
 * An example solution for the excercise in JavaScript.
 * Dependencies are : 
 * node-fetch :  npm install node-fetch
*/

const fetch = require('node-fetch');

function httpget(host, port, path, cb){
    var http = require('http');
    var options = {
        host: host,
        port: port,
        path: path,
        method: 'GET'
    };
    var req = http.request(options, function(res) {
        var data = '';
        res.on('data', chunk => data += chunk );
        res.on('end', () => { if(cb) cb(data)} );
        res.on('error', () => cb());
    });
    req.end();
}

function exercise0(){
    console.log("--------Exercise 0----------------");
    let start = Date.now();
    httpget('localhost', 8080, '/i/42', function(data){
        console.log(`Received response ${data}`);
        console.log(`Time taken ${(Date.now()-start)/1000}s`);
    });
}

function exercise1(){
    console.log("--------Exercise 1----------------");
    let start = Date.now();
    httpget('localhost', 8080, '/s/42', function(data){
        console.log(`Received response ${data}`);
        console.log(`Time taken ${(Date.now()-start)/1000}s`);
    });
    console.log("JS is non-blocking");
}

function exercise1a(){
    console.log("--------Exercise 1a----------------");
    let start = Date.now();
    fetch('http://localhost:8080/s/42', {insecureHTTPParser:true}).then(response => response.text()).then( data => {
        console.log(`Received response ${data}`);
        console.log(`Time taken ${(Date.now()-start)/1000}s`);
    });
    console.log("JS is non-blocking");
}

function exercise2(){
    console.log("--------Exercise 2----------------");
    let urls = [
        `http://localhost:8080/s/42`, 
        `http://localhost:8080/s/43`, 
        `http://localhost:8080/s/44`, 
        `http://localhost:8080/s/45`
    ]
    let start = Date.now();
    let fetchPromises = urls.map( url => fetch(url, {insecureHTTPParser:true}).then(response => response.text()))
    Promise.all(fetchPromises).then( data => {
        console.log(`Received response ${data}`);
        console.log(`Time taken ${(Date.now()-start)/1000}s`);
    });
}

async function exercise3(){
    console.log("--------Exercise 2----------------");
    let urls = [
        `http://localhost:8080/s/42`, 
        `http://localhost:8080/s/43`, 
        `http://localhost:8080/s/44`, 
        `http://localhost:8080/s/45`
    ]
    let start = Date.now();
    let fetchPromises = urls.map( url => fetch(url, {insecureHTTPParser:true}).then(response => response.text()))
    let data = await Promise.all(fetchPromises);
    console.log(`Received response ${data}`);
    let S = data.reduce((a,b) => a+b);
    let data2 = await fetch(`http://localhost:8080/s/${S}`, {insecureHTTPParser:true})
    console.log(`Received response ${data2}`);
    console.log(`Time taken ${(Date.now()-start)/1000}s`);
}

// exercise0();
// exercise1();
// exercise1a();
// exercise2();
// exercise3();