const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const Datastore = require('nedb');


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
const templatesPath = path.join(__dirname + '/templates');

hbs.registerPartials(templatesPath);
app.use(express.json());
app.listen(process.env.PORT || 5000, ()=> 
{
    console.log('listening')
});

const database = new Datastore('database.db');
database.loadDatabase();
const counter = new Datastore('counter.db');
counter.loadDatabase();
const indexFiles = new Datastore('indexFiles.db');
indexFiles.loadDatabase();

app.get('', (req, res)=> 
{
indexFiles.find({}, (err, data) =>
{
    if(err) {
        response.end();
        return;
            }
    res.render('index',
    {
        blogTitle: data.thoughtTitle,
        blogContent: data.thoughtContent,
        newsTitle: data.newsArticleTitle,
        newsContent: data.newsArticleContent,
        linkTitle: data.linkTitle,
        linkLink: data.linkContent
    })
});
});
app.post('/index-files', (req, res) =>
{
    let data = req.body;
    indexFiles.insert(data)
})

app.get('/get-resources', (req, res) =>
{
    indexFiles.find({}, (err, data) =>
    {
        if(err) {
            response.end();
            return;
        }
        res.json(data)
})
})

app.get('/testimonios', (req, resp)=> 
{
resp.render('testimonios', 
{
    title: 'Testimonios Reales de Personas Reales'
})
});

app.get('/my-testimonio/*', (req, res)=> 
{
    let user = req.query.user

    database.findOne({_id: user}, (err, doc) =>
    {
        res.render('my-testimonio',
        {
            title: doc.Name,
            testimonyTtile: doc.title,
            content: doc.content
        })
    });
}); 

app.get('/share-mine', (req, res)=>
{
    res.render('share-mine')
});

app.get('/posts', (req, res)=>
{
    res.render('post')
});

/////Post the testimony to the DBS
app.post('/post-testimony', (request, res) =>
{
   let data = request.body
    console.log(data)
    const timestamp = Date.now();
    database.insert(data);
    res.json({
        status: 'success',
        timestamp: timestamp
    });
});

//Get the data from the DB
app.get('/api', (req, res) =>
{
    database.find({}, (err, data) =>
    {
        if(err) {
            response.end();
            return;
        }
        res.json(data)
    });
});

//get the counter route
app.post('/counter', (req, res)=>
{
let newCount = req.body
counter.insert(newCount);
console.log(newCount)
});

app.get('/getcount', (req, res)=>
{
    counter.find({count: 'a'}, (err, data) =>
    {
        if(err) {
            response.end();
            return;
        }
        res.json(data)
        console.log(data.length)
    });
})