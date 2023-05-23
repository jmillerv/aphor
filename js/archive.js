// Function to load authors and quotes from the JSON file
async function loadAuthorsAndQuotes() {
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

    // Process tags
    const tagsCount = processTags(quotes);

    // Display tags
    displayTags(tagsCount, quotes);

    // Create a set to store unique author names
    const authorSet = new Set(quotes.map((quote) => quote.author));

    // Sort authors alphabetically
    const sortedAuthors = Array.from(authorSet).sort();

    // Get the authors container element
    const authorsContainer = document.querySelector('.authors');

    // Create and append author sections
    sortedAuthors.forEach((author) => {
        const authorSection = createAuthorSection(author, quotes);
        authorsContainer.appendChild(authorSection);
    });


}
// processTags runs through each tag to generate a count
function processTags(quotes) {
    const tagsCount = {};

    quotes.forEach((quote) => {
        if (quote.tags && Array.isArray(quote.tags)) {
            quote.tags.forEach((tag) => {
                if (tagsCount[tag]) {
                    tagsCount[tag]++;
                } else {
                    tagsCount[tag] = 1;
                }
            });
        }
    });

    return tagsCount;
}


// displayTags add the tags to the tag container
function displayTags(tagsCount, quotes) {
    const quoteTags = document.querySelector('.quote-tags');

    // Convert tagsCount object to an array
    const tagsArray = Object.entries(tagsCount);

    // Sort tags array alphabetically by tag name
    tagsArray.sort((a, b) => a[0].localeCompare(b[0]));

    // Sort tags array by highest count
    tagsArray.sort((a, b) => b[1] - a[1]);

    // Iterate over the sorted tags array and display the tags
    tagsArray.forEach(([tag, count]) => {
        const tagItem = document.createElement('li');
        tagItem.textContent = `${tag} (${count})`;
        tagItem.dataset.tag = tag;
        // Add event listener to tagItem
        tagItem.addEventListener('click', () => {
            displayQuotesByTag(quotes, tag);
        });
        quoteTags.appendChild(tagItem);
    });
}

function displayQuotesByTag(quotes, tag) {
    // Clear the existing quotes
    const authorsContainer = document.querySelector('.authors');
    while (authorsContainer.firstChild) {
        authorsContainer.firstChild.remove();
    }

    // get quotes for selected tag
    const filteredQuotes = quotes.filter(quote => quote.tags && quote.tags.includes(tag));

    // Create a set to store unique author names from the filtered quotes
    const authorSet = new Set();
    filteredQuotes.forEach((quote) => {
        authorSet.add(quote.author);
    });

    // Sort authors alphabetically
    const sortedAuthors = Array.from(authorSet).sort();

    // Create and append author sections
    sortedAuthors.forEach((author) => {
        const authorSection = createAuthorSection(author, quotes);
        authorsContainer.appendChild(authorSection);
    });
}




// createAuthorSection generates the div for each author in the archive
function createAuthorSection(author, quotes) {
    const authorSection = document.createElement('div');
    const authorName = document.createElement('h5');
    const quoteList = document.createElement('ul');

    authorName.textContent = author;
    authorSection.appendChild(authorName);
    authorSection.appendChild(quoteList);

    // Start with the quote list hidden
    quoteList.classList.add('hidden');

    // Add event listener to toggle quote list visibility
    authorName.addEventListener('click', () => {
        quoteList.classList.toggle('hidden');
    });

    // Add quotes for the current author
    const authorQuotes = quotes.filter((quote) => quote.author === author);

    authorQuotes.forEach((quote) => {
        const listItem = document.createElement('li');
        const quoteText = document.createTextNode(`${quote.quote} ${quote.citation}`);

        listItem.appendChild(quoteText);
        quoteList.appendChild(listItem);
    });

    return authorSection;
}


loadAuthorsAndQuotes();