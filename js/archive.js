// Function to load authors and quotes from the JSON file
export async function loadAuthorsAndQuotes() {
    const directLink = window.QUOTE_STORAGE;
    const response = await fetch(directLink);
    if (!response.ok) {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data.quotes)) {
        throw new Error('Invalid data structure: missing quotes array');
    }
    const quotes = data.quotes;

    // Create a set to store unique author names
    const authorSet = new Set();

    // Populate the authorSet with unique authors from the quotes data
    quotes.forEach((quote) => {
        authorSet.add(quote.author);
    });

    // Sort authors alphabetically
    const sortedAuthors = Array.from(authorSet).sort();

    // Get the authors container element
    const authorsContainer = document.querySelector('.authors');

    // Create and append author sections
    sortedAuthors.forEach((author) => {
        const authorSection = document.createElement('div');
        const authorName = document.createElement('h3');
        const quoteList = document.createElement('ul');

        authorName.textContent = author;
        authorSection.appendChild(authorName);
        authorSection.appendChild(quoteList);

        // Add event listener to toggle quote list visibility
        authorName.addEventListener('click', () => {
            quoteList.classList.toggle('hidden');
        });

        // Add quotes for the current author
        const authorQuotes = quotes.filter((quote) => quote.author === author);

        authorQuotes.forEach((quote) => {
            const listItem = document.createElement('li');
            const quoteText = document.createTextNode(`${quote.quote}. ${quote.citation}`);

            listItem.appendChild(quoteText);
            quoteList.appendChild(listItem);
        });

        // Add the author section to the authors container
        authorsContainer.appendChild(authorSection);
    });
}

loadAuthorsAndQuotes();