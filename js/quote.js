// quote.js
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const quoteCitation = document.getElementById("quote-citation");

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
            const citation = data.quotes[randomIndex].citation;

            // modify elements within container
            quoteText.textContent = quote;
            quoteAuthor.textContent = author;
            quoteCitation.textContent = citation;

            // Scale the text based on the amount of text relative to the page
            const scaleText = () => {
                const containerWidth = document.querySelector(".quote-container").clientWidth;
                const textWidth = quoteText.clientWidth;
                const scaleFactor = containerWidth / textWidth;

                if (scaleFactor < 1) {
                    quoteText.style.transform = `scale(${scaleFactor})`;
                } else {
                    quoteText.style.transform = "scale(1)";
                }
            };

            // Delay scaling until DOM loads
            requestAnimationFrame(scaleText);

            window.addEventListener("resize", scaleText);
        })
        .catch(error => {
            console.error(`Error loading quotes from ${'data/quotes.json'}: ${error.message}`);
        });
}

// Load the initial quote
populateQuote();

// Listen for click events on the "New Quote" button
document.querySelector('.btn').addEventListener('click', populateQuote);
