let counter = document.querySelector('#count-trigger');
let counterText = document.querySelector('#counter-text');

counter.addEventListener('click', async ()=>
{
    location.reload();
    counter.style.display= 'none'
    counterText.textContent= "Ya te has unido a la cuenta"

    console.log('I have been clicked')
    const options = 
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                count: 'a'
            }
        )
    };

const res = await fetch('/counter', options);
const json = await res.json();
console.log(json)


})

let  onloadFunctions =function()
{
async function getCount()
{
    let circleCount = document.querySelector('#count-circle h1')
    const res = await fetch('/getcount')
    const data = await res.json();
    circleCount.textContent = data.length
}

async function getResourceCount()
{
    const res = await fetch('/get-resource')
    const data = await res.json();
    let aTagWrap = document.querySelector('.rc-r');
    
    for (item of data)
    {
        let aTag = document.createElement('A');
        aTag.setAttribute('href', item.linkContent);
        aTag.textContent = item.linkTitle
        aTagWrap.appendChild(aTag);
    }
}
async function getBlogContent()
{
    const res = await fetch('/get-resources')
    const data = await res.json();

    let blogTitle = document.querySelector('#blog-title');
    let blogContent = document.querySelector('#blog-content');
    let newsTitle = document.querySelector('#newsTitle');
    let newsContent = document.querySelector('#newsContent');

    blogTitle.textContent = data[0].title;
    blogContent.textContent = data[1].content;
    newsTitle.textContent = data[2].title;
    newsContent.textContent= data[3].content;

}
getCount()
getResourceCount()
getBlogContent()
};