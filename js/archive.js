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
    displayTags(tagsCount);

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
function displayTags(tagsCount) {
    const quoteTags = document.querySelector('.quote-tags');

    for (const tag in tagsCount) {
        const tagItem = document.createElement('li');
        tagItem.textContent = `${tag} (${tagsCount[tag]})`;
        tagItem.dataset.tag = tag;
        quoteTags.appendChild(tagItem);
    }
}

// createAuthorSection generates the div for each author in the archive
function createAuthorSection(author, quotes) {
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

    return authorSection;
}


loadAuthorsAndQuotes();