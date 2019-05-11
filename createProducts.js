const fs = require('fs');
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ProductSearchClient({
  keyFilename: './image-similar-d6506a89caaf.json'
});

const projectId = 'image-similar';
const location = 'europe-west1';
const productSetId = 'PS_PLANT_051119';
const productSetDisplayName = 'PLANT';

const imgFolder = './assignment/images';

const locationPath = client.locationPath(projectId, location);
const result = fs.readdirSync(imgFolder)
createProducts(result)

async function createProducts(files) {
  let nameImg, productName, productId, url;
  for (var i = 0; i < files.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => { resolve() }, 200)
    })
    url = files[i];
    nameImg = files[i].split('.').shift();
    productName = `product-${nameImg}`
    productId = `${productSetId}-${nameImg}`
    console.log(nameImg, productId, productName)

    //  await createProduct(productName, productId);
    //  await addProductToProductSet(productId);
    //  await addImageToProduct(productId, url);
  }
}

async function createProduct(productDisplayName, productId) {

  const request = {
    parent: locationPath,
    product: {
      displayName: productDisplayName,
      productCategory: 'homegoods',
    },
    productId: productId,
  };

  const [createdProduct] = await client.createProduct(request);
  console.log(`Product name: ${createdProduct.name}`);
}

async function addProductToProductSet(productId) {
  const productPath = client.productPath(projectId, location, productId);
  const productSetPath = client.productSetPath(
    projectId,
    location,
    productSetId
  );

  const request = {
    name: productSetPath,
    product: productPath,
  };

  await client.addProductToProductSet(request);
  console.log(`Product added to product set.`);
}

async function addImageToProduct(productId, image) {

  const formattedParent = client.productPath(projectId, location, productId);

  const referenceImage = {
    uri: 'gs://plants-051119/' + image,
  };

  const request = {
    parent: formattedParent,
    referenceImage: referenceImage,
    referenceImageId: `${productId}-img`,
  };

  const [response] = await client.createReferenceImage(request);
  console.log(`response.name: ${response.name}`);
  console.log(`response.uri: ${response.uri}`);
}