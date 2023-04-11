// quote.js

function populateQuote() {
    fetch('data/quotes.json')
        .then(response => {
            // Handle non-successful response codes
            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }
            return response.json()}
        )
        .then(data => {
            // Check that the data has the expected structure
            if (!Array.isArray(data.quotes)) {
                throw new Error('Invalid data structure: missing quotes array');
            }

            const quotesSize = data.quotes.length;
            const randomIndex = Math.floor(Math.random() * quotesSize);
            // initialize variables
            const quote = data.quotes[randomIndex].quote;
            const author = data.quotes[randomIndex].author;

            // modify elements within container
            const quoteContainer = document.querySelector('.centered-quote');
            quoteContainer.querySelector('h3').textContent = quote;
            quoteContainer.querySelector('p').textContent = author;
        })
        .catch(error => {
            console.error(`Error loading quotes from ${'data/quotes.json'}: ${error.message}`);
        });
}

// Load the initial quote
populateQuote();

// Listen for click events on the "New Quote" button
document.querySelector('.btn').addEventListener('click', populateQuote);
