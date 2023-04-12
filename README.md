# aphor
Static Website for Displaying Quotes

This simple website takes in a JSON file and displays quotes that have been collected. 

## Schema 

The schema of the json is as follows 

```
{
      "author": "Cory Doctorow",
      "quote": "A private realm is necessary for human progress.",
      "citation": "How to Destroy Surveillance Capitalism",
      "link": "https://bookshop.org/p/books/how-to-destroy-surveillance-capitalism-cory-doctorow/16078317?ean=9781736205907"
}
```

**Note** currently the code only supports the `author` and `quote` fields, but I intend to update the website to add a citation and a link to
where to find the text being quoted. 

## Deployment

I built this to be easily deployed using any of the many static website deployment services that exist today. 

DigitalOcean allows individuals to deploy three static websites for free using their app platform and they provided [a guide](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-static-website-to-the-cloud-with-digitalocean-app-platform). 

fly.io [provides similar services](https://fly.io/docs/languages-and-frameworks/static/) 

[Github pages](https://docs.github.com/en/pages/quickstart) 

