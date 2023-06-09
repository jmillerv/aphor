import { getRandomQuote } from './quote';

describe('getRandomQuote', () => {
    test('returns a random quote from an array of quotes', () => {
        const sampleQuotes = [
            { quote: "Quote 1", author: "Author 1", citation: "Citation 1" },
            { quote: "Quote 2", author: "Author 2", citation: "Citation 2" },
            { quote: "Quote 3", author: "Author 3", citation: "Citation 3" }
        ];
        const randomQuote = getRandomQuote(sampleQuotes);
        expect(sampleQuotes).toContain(randomQuote);
    });
});