const submitTestimony = document.querySelector('#testimony-button')
let form = document.querySelectorAll('.the-form');

form.forEach(element => {
    element.addEventListener('submit', (e)=>
    {
        e.preventDefault(); 
    });
});
submitTestimony.addEventListener('click', postIt);

async function postIt()
{
    
    const testimonyGenderF = document.querySelector('.genderF');
    const testimonyGenderM = document.querySelector('.genderM');
    const TestimonytName = document.querySelector('#form-name-testmony').value;
    const TestimonyTitle = document.querySelector('#form-title-testimony').value;
    const TestimonyContent= document.querySelector('#content-testimony').value;
    const genderChecked = [testimonyGenderF, testimonyGenderM];
    let CheckedTrue = genderChecked.filter( gender => gender.checked)
            const options = 
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'},
                    body: JSON.stringify(
                        {
                            Name: TestimonytName,
                           title: TestimonyTitle,
                           content: TestimonyContent,
                            gender: CheckedTrue[0].value
                        }
                    )
                };

            const res = await fetch('/post-testimony', options);
            const json = await res.json();
            console.log(json)
            console.log(CheckedTrue[0].value)
            window.location.href ='/testimonios';
};

// pull data from the dbs for the testimonies page


async function getDataLoad()
{
    const res = await fetch('/api')
    const data = await res.json();

    console.log(data);

    for (item of data)
{
    let testimonies = document.querySelector('.testimonies');
    let testimony = document.createElement('A');
    testimony.setAttribute('class', 'testimony')
    testimony.setAttribute('href', `/my-testimonio/?user=${item._id}`)
    testimonies.appendChild(testimony);
    let testimonyDiv = document.createElement('DIV');
    if (item.gender == 'female')
    {
    testimonyDiv.setAttribute('class', 'testimony-div')
    } 
    else if(item.gender == 'male')
    {
    testimonyDiv.setAttribute('class', 'testimony-div testimony-div-male')
    }
    let name = document.createElement('H3');
    name.setAttribute('class', 'testiomony-name');
    name.textContent = item.Name;

    let title = document.createElement('H4');
    title.setAttribute('class', 'testiomony-title');
    title.textContent = item.title;
    testimony.append(testimonyDiv, name, title)
};
}


/*********INDEX ROUTES ***************/

///////////blog part
async function postThought ()
{
    location.reload();
    const thoughtTitle= document.querySelector('#form-title-thought').value;
    const thoughtContent= document.querySelector('#content-thought').value;

    const option = 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(
           {thoughtTitle,
            thoughtContent,
        type: 'blog'}
        )
    }
   const res = await fetch('/index-files', option);
   const json = await res.json();
   console.log(json)
};

//////news part
async function postNews()
{
    location.reload();
    const newsArticleTitle= document.querySelector('#form-title-news').value;
    const newsArticleContent = document.querySelector('#content-news').value;

    const option = 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(
           {newsArticleTitle,
               newsArticleContent,
            type: 'news'}
        )
    }
   const res = await fetch('/index-files', option);
   const json = await res.json();
   console.log(json)
};

async function postResource()
{
    location.reload();
    const linkTitle= document.querySelector('#form-title-link').value;
    const linkContent = document.querySelector('#form-link').value;

    const option = 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(
           {linkTitle,
               linkContent,
            type: 'link'}
        )
    }
   const res = await fetch('/index-file', option);
   const json = await res.json();
   console.log(json)
}

///LOGIN PAGE

 async function login()
{
    
    let res = await fetch('/login');
    let data = await res.json()

    let username = document.querySelector('#username');
    let password =  document.querySelector('#password');
    let pass = data.pass;
    let user = data.user

if (username.value === user && password.value === pass)
{
    location.href = data.red
}
    console.log(data.pass)
}