import { getRandomQuote, fetchQuotes } from './quote';

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


describe('fetchQuotes', () => {
    it('should return an array of quotes', async () => {
        const quotes = await fetchQuotes();
        expect(Array.isArray(quotes)).toBe(true);
    });

    it('should throw an error if the server returns an error status', async () => {
        // Mock a failed fetch response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                statusText: 'Not Found',
            }),
        );

        try {
            await fetchQuotes();
        } catch (error) {
            expect(error.message).toBe('Server returned 404 Not Found');
        }

        // Restore the original fetch function
        global.fetch.mockRestore();
    });

    it('should throw an error if the data structure is invalid', async () => {
        // Mock an invalid fetch response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            }),
        );

        try {
            await fetchQuotes();
        } catch (error) {
            expect(error.message).toBe('Invalid data structure: missing quotes array');
        }

        // Restore the original fetch function
        global.fetch.mockRestore();
    });
});