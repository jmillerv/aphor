import  Fuse  from './fuse.js';

let fuse;

export function initializeSearchIndex(quotes) {
    // full list of options: https://fusejs.io/api/options.html
    let options = {
        keys: ['quote', 'author', 'citation'],
        findAllMatches: true,
        distance: 500, // how many characters will be searched from the initial location
        threshold: 0.3 // fuzziness threshold: https://fusejs.io/concepts/scoring-theory.html
    };
    const quoteIndex = Fuse.createIndex(options.keys, quotes);
    fuse = new Fuse(quotes, options, quoteIndex);
}

export function performSearch(searchTerm) {
    return fuse.search(searchTerm);
}