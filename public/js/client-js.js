const thoughtTitle = document.querySelector('#form-title');
const thoughtContent= document.querySelector('#form-title');
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
submitThought.addEventListener('click', async ()=>
{

    console.log('I have been clicked')
let thoughtTData = thoughtTitle.value;
let thoughtCData = thoughtContent.value;
            const data =  
                {
                 title: thoughtTData ,
                 content: thoughtCData
                }
            const options = 
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                };

            const res = await fetch('/posts-thought', options);
            const json = await res.json();
            console.log(json)
                console.log(data)
            // window.location.href = window.location.href;
});
