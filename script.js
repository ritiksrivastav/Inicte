const quoteContainer = document.getElementById('quote-container');

const quoteText = document.getElementById('quote');

const authorText = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');

const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader'); 
let apiQuotes = [];

// Show Loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote

function newQuote(){
    loading();
    // Pick a random quotes from the list of quotes 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank
    if(!quote.author){
        authorText.textContent = '- Unknown';
    }else{
        authorText.textContent = '- '+quote.author;
    }
    // Check quote length
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    complete();
    quoteText.textContent = quote.text;
}

// Get Quotes from Api

async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
        // Handling error

    }
}

// Tweet Quote

function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} \n ${authorText.textContent}`;
    window.open(tweetUrl, '_blank'); 
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on load

getQuotes();