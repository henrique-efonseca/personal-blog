const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const uri = 'YOUR_MONGODB_CONNECTION_STRING';
const dbName = 'YOUR_DATABASE_NAME';
const collectionName = 'YOUR_COLLECTION_NAME';
const mockDataDir = path.join(__dirname, 'PATH_TO_YOUR_JSON_FILES');

async function reloadMockData() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    const collections = await db
      .listCollections({ name: collectionName })
      .toArray();
    if (collections.length === 0) {
      console.log(
        `Collection ${collectionName} does not exist. Creating collection...`,
      );
      await db.createCollection(collectionName);
      console.log(`Collection ${collectionName} created.`);
    }

    const collection = db.collection(collectionName);

    // Delete all existing documents
    await collection.deleteMany({});
    console.log('Deleted all existing documents from the collection.');

    // Insert mock data
    const files = fs.readdirSync(mockDataDir);
    for (const file of files) {
      if (path.extname(file) === '.json') {
        const filePath = path.join(mockDataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        await collection.insertMany(data);
        console.log(`Inserted data from ${file}`);
      }
    }

    console.log('All mock data reloaded successfully');
  } catch (error) {
    console.error('Error reloading mock data:', error);
  } finally {
    await client.close();
  }
}

reloadMockData();
