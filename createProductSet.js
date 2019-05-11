const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ProductSearchClient({
  keyFilename: './image-similar-d6506a89caaf.json'
});

const projectId = 'image-similar';
const location = 'europe-west1';
const productSetId = 'PS_PLANT_051119';
const productSetDisplayName = 'PLANT';

// Resource path that represents Google Cloud Platform location.
const locationPath = client.locationPath(projectId, location);

const productSet = {
  displayName: productSetDisplayName,
};

const request = {
  parent: locationPath,
  productSet: productSet,
  productSetId: productSetId,
};

client.createProductSet(request).then(results => {
  const [createdProductSet] = results;
  console.log(`Product Set name: ${createdProductSet.name}`);
});