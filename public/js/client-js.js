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

//Createa  testimony re-direct

// const newsArticleTitle= document.querySelector('#form-title');
// const newsArticleContent= document.querySelector('#form-title');
// const resourcesLink = document.querySelector('#form-title');
// const submitThought = document.querySelector('#button-thought');
// const submitNews = document.querySelector('.button-news')


