const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE_URL;
const dbName = 'YOUR_DATABASE_NAME';
const collectionName = 'YOUR_COLLECTION_NAME';
const mockDataDir = path.join(__dirname, 'PATH_TO_YOUR_JSON_FILES');

async function loadMockData() {
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
    const files = fs.readdirSync(mockDataDir);

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const filePath = path.join(mockDataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        for (const document of data) {
          await collection.updateOne(
            { _id: document._id },
            { $set: document },
            { upsert: true },
          );
          console.log(`Upserted document with _id ${document._id}`);
        }
      }
    }

    console.log('All mock data loaded successfully');
  } catch (error) {
    console.error('Error loading mock data:', error);
  } finally {
    await client.close();
  }
}

loadMockData();
