async function getSimilarProductsFile() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  const fs = require('fs');
  // Creates a client
  const productSearchClient = new vision.ProductSearchClient({
    keyFilename: './image-similar-d6506a89caaf.json'
  });
  const imageAnnotatorClient = new vision.ImageAnnotatorClient({
    keyFilename: './image-similar-d6506a89caaf.json'
  });

  const projectId = 'image-similar';
  const location = 'europe-west1';
  const productSetId = 'PS_PLANT_051119';
  const productCategory = 'homegoods';
  const filePath = './assignment/images/1.jpg';
  // const filePath = './tomato.jpg';
  const filter = '';
  const productSetPath = productSearchClient.productSetPath(
    projectId,
    location,
    productSetId
    );
  const content = fs.readFileSync(filePath, 'base64');
  const request = {
    image: {content: content},
    features: [{type: 'PRODUCT_SEARCH', model: 'builtin/latest'}],
    imageContext: {
      productSearchParams: {
        productSet: productSetPath,
        productCategories: [productCategory],
        includeGeoResults: true

      },
    },
  };
  const [response] = await imageAnnotatorClient.batchAnnotateImages({
    requests: [request],
  });
  console.log('Search Image:', filePath);
  console.log(response['responses'][0].error);
  const results = response['responses'][0]['productSearchResults']['results'];
  console.log('\nSimilar product information:');
  results.forEach(result => {
    console.log('Product id:', result['product'].name.split('/').pop(-1));
    console.log('Product display name:', result['product'].displayName);
    console.log('Product description:', result['product'].description);
    console.log('Product category:', result['product'].productCategory);
  });
}

getSimilarProductsFile();