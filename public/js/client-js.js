
// const newsArticleTitle= document.querySelector('#form-title');
// const newsArticleContent= document.querySelector('#form-title');
// const resourcesLink = document.querySelector('#form-title');
// const submitThought = document.querySelector('#button-thought');
// const submitNews = document.querySelector('.button-news')
const submitTestimony = document.querySelector('#testimony-button')
let form = document.querySelectorAll('.the-form');

form.forEach(element => {
    element.addEventListener('submit', (e)=>
    {
        e.preventDefault(); 
    });
});
const testimonyGenderF = document.querySelector('.genderF').checked;
const testimonyGenderM = document.querySelector('.genderM').checked;
console.log(testimonyGenderF,testimonyGenderM)
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
                            title: TestimonytName,
                           content: TestimonyTitle,
                           name: TestimonyContent,
                            gender: CheckedTrue[0].value
                        //   genderF:  thoughtGenderF
                        }
                    )
                };

            const res = await fetch('/api', options);
            const json = await res.json();
            console.log(json)
            console.log(CheckedTrue[0].value)
            // window.location.href = window.location.href;
};