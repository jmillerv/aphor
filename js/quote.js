const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const quoteCitation = document.getElementById("quote-citation");

export async function fetchQuotes() {
    const response = await fetch('data/quotes.json');
    if (!response.ok) {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data.quotes)) {
        throw new Error('Invalid data structure: missing quotes array');
    }
    return data.quotes;
}

export function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote(quoteObj) {
    quoteText.textContent = quoteObj.quote;
    quoteAuthor.textContent = quoteObj.author;
    quoteCitation.textContent = quoteObj.citation;
}

function scaleText() {
    const containerWidth = document.querySelector(".quote-container").clientWidth;
    const textWidth = quoteText.clientWidth;
    const scaleFactor = containerWidth / textWidth;

    if (scaleFactor < 1) {
        quoteText.style.transform = `scale(${scaleFactor})`;
    } else {
        quoteText.style.transform = "scale(1)";
    }
}

async function populateQuote() {
    try {
        const quotes = await fetchQuotes();
        const randomQuote = getRandomQuote(quotes);
        displayQuote(randomQuote);
        requestAnimationFrame(scaleText);
        window.addEventListener("resize", scaleText);
    } catch (error) {
        console.error(`Error loading quotes: ${error.message}`);
    }
}

// Load the initial quote
populateQuote();

// Listen for click events on the "New Quote" button after DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn').addEventListener('click', populateQuote);
})
