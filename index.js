const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const Datastore = require('nedb');


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
const templatesPath = path.join(__dirname + '/templates');

hbs.registerPartials(templatesPath);

app.listen(process.env.PORT || 3000, ()=> 
{
    console.log('listening')
});

const database = new Datastore('database.db');
database.loadDatabase();

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

app.get('/my-testimonio', (req, resp)=> 
{
resp.render('my-testimonio',
{
    title: 'Yo soy ',
    testimonyTtile: 'My Historia',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys'+ 
    ' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' + 
    ' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was ' + 
    'popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing'
})
}); 

app.get('/share-mine', (req, res)=>
{
    res.render('share-mine')
});

app.get('/posts', (req, res)=>
{
    res.render('post')
});

app.post('/posts-thought', (req, res) =>
{

    const data = req.body;
    console.log(data)
    const timestamp = Date.now();
    database.insert('data');
    res.json({
        status: 'success',
        timestamp: timestamp
    });
});