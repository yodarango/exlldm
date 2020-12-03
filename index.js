const express = require('express');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000, ()=> 
{
    console.log('listening')
});

app.get('/', (req, resp)=> 
{
resp.render('index')
});

app.get('/testimonios', (req, resp)=> 
{
resp.render('testimonios')
});

app.get('/my-testimonio', (req, resp)=> 
{
resp.render('my-testimonio')
}); 
