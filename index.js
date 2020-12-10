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

app.get('', (req, resp)=> 
{
    //Thought of the day
let thoughtOfTheDay = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys'+ 
' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' + 
' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was ' + 
'popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing'
' software like Aldus PageMaker including versions of Lorem Ipsum'
let title = 'For Today'

//news section

let newsTitle = 'Lo Encierran por pedofilo y degenarado'
let newsArticle = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys'+ 
' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' + 
' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was ' + 
'popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing'
' software like Aldus PageMaker including versions of Lorem Ipsum'

resp.render('index',
{
    title,
    thoughtOfTheDay,
    newsTitle,
    newsArticle
})
});

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
            title: doc.name,
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