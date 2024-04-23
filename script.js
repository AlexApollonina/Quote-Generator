const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quote');
const authorName = document.getElementById('author');
const newQuoteButton = document.getElementById('newQuote');
const twitterButton = document.getElementById('twitter');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function completeLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
//Show new Quote
function newQuotes() {
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorName.textContent = "Unknown";
    } else {
        authorName.textContent = quote.author;
    }
    if (quote.text.length > 100){
        quoteText.classList.add('longQuote');
    } else {
        quoteText.classList.remove('longQuote');
    }

    quoteText.textContent = quote.text;
    completeLoading();
}

function newTweet() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${ authorName.textContent}`;
    window.open(tweetUrl, '_blank');
}
 //Event Listeners
newQuoteButton.addEventListener("click", newQuotes);
twitterButton.addEventListener("click", newTweet);

// Get Quotes fro API
async function getQuotes() {
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuotes();
        
    } catch (error) {
        
    }
}

getQuotes();
