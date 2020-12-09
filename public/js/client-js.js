const thoughtTitle = document.querySelector('#form-title').value;
const thoughtContent= document.querySelector('#content').value;
const newsArticleTitle= document.querySelector('#form-title');
const newsArticleContent= document.querySelector('#form-title');
const resourcesLink = document.querySelector('#form-title');
const submitThought = document.querySelector('.button-thought');
const submitNews = document.querySelector('.button-news')

let form = document.querySelectorAll('.the-form');

form.forEach(element => {
    element.addEventListener('submit', (e)=>
    {
        e.preventDefault(); 
    });
});
submitThought.addEventListener('click', postIt);

async function postIt()
{

            const data =  
                {
                 thoughtTitle,
                thoughtContent
                }
            const options = 
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                };

            const res = await fetch('/api', options);
            const json = await res.json();
            console.log(json)
            console.log(options.body)
            // window.location.href = window.location.href;
};