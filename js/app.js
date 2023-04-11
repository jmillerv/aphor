// app.js

// Fetch the data from the JSON file
fetch('data/quotes.json')
    .then(response => response.json())
    .then(data => {
        // Set up the Alpine.js component
        Alpine.data('quote', {
            // Set the initial data
            authors: data.authors,
            currentQuote: '',
            currentAuthor: '',
            // Define the methods
            methods: {
                // Get a random quote from the data
                getRandomQuote() {
                    // Select a random author from the data
                    const author = this.authors[Math.floor(Math.random() * this.authors.length)];
                    // Select a random quote from the author
                    const quote = author.text[Math.floor(Math.random() * author.text.length)];
                    // Set the current quote and author
                    this.currentQuote = quote;
                    this.currentAuthor = author.author;
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });