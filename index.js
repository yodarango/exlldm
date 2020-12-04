const express = require('express');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000, ()=> 
{
    console.log('listening')
});

app.get('', (req, resp)=> 
{
    
let thoughtOfTheDay = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys'+ 
' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' + 
' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was ' + 
'popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing'
' software like Aldus PageMaker including versions of Lorem Ipsum'
let title = 'For Today'
resp.render('index',
{
    title,
    thoughtOfTheDay
})
});

app.get('/testimonios', (req, resp)=> 
{
resp.render('testimonios')
});

app.get('/my-testimonio', (req, resp)=> 
{
resp.render('my-testimonio')
}); 
