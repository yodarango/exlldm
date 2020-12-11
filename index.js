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
    res.render('index')

});
app.post('/index-files', (req, res) =>
{
    let blogTitle = req.body.thoughtTitle;
    let blogContent = req.body.thoughtContent;
    let newsTitle = req.body.newsArticleTitle;
    let newsContent = req.body.newsArticleContent;

    if(blogContent && blogTitle)
    {
        fs.writeFileSync(__dirname + '/indexTextFiles/blogTitle.txt',  blogTitle, 'utf8');
        fs.writeFileSync(__dirname + '/indexTextFiles/BlogContent.txt',  blogContent, 'utf8');

    }else if (newsContent && newsTitle)
    {
        fs.writeFileSync(__dirname + '/indexTextFiles/newsContent.txt', newsContent, 'utf8');
        fs.writeFileSync(__dirname + '/indexTextFiles/newsTitle.txt',  newsTitle, 'utf8');
    }

})
app.post('/index-file', (req, res) =>
{
    let data = req.body;
    indexFiles.insert(data)

})

app.get('/get-resources', (req, res) =>
{
    let blogTitle = {title: fs.readFileSync(__dirname + '/indexTextFiles/blogTitle.txt', 'utf8')};
    let blogContent = {content: fs.readFileSync(__dirname + '/indexTextFiles/BlogContent.txt', 'utf8')};
    let newsTitle = {title: fs.readFileSync(__dirname + '/indexTextFiles/newsTitle.txt', 'utf8')};
    let newsContent = {content: fs.readFileSync(__dirname + '/indexTextFiles/newsContent.txt', 'utf8')};    
    let data = [blogTitle, blogContent, newsTitle, newsContent]

    res.json(data)
})

app.get('/get-resource', (req, res) =>
{
    indexFiles.find({}, (err, data)=>
    {
        if (err)
        {
            res.end();
            return
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

app.get('/fjdkzmbcxdslheprpyewyqpyewbds', (req, res)=>
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
app.get('/login', (req, res) =>
{
let pass ='%5010J35U554lv4%';
let user = 'EXLLDM';
let red = '/fjdkzmbcxdslheprpyewyqpyewbds';
let credentials = 
{
    pass, 
    user, 
    red
}
res.json(credentials);
})