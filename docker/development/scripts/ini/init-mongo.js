// Init script for MongoDB container

// Log the beginning of the process
print('Starting MongoDB initialization script.');

// Set the database to the admin database
db = db.getSiblingDB('admin');

// Switch to the specified database
const userDB = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

print('Adding root user to the admin database.');

// Create the root user with full administrative privileges
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    { role: 'root', db: 'admin' },
    { role: 'readWrite', db: process.env.MONGO_INITDB_DATABASE },
  ],
});

print(`Creating database: ${process.env.MONGO_INITDB_DATABASE}`);

// Create initial collections to initialize the database
userDB.createCollection('Account');
userDB.createCollection('Session');
userDB.createCollection('User');
userDB.createCollection('VerificationToken');
userDB.createCollection('Category');
userDB.createCollection('Post');
userDB.createCollection('PostCategory');
userDB.createCollection('Comment');

// Insert a document into each collection to ensure the database is created
userDB.Account.insertOne({ initialized: true });
userDB.Session.insertOne({ initialized: true });
userDB.User.insertOne({ initialized: true });
userDB.VerificationToken.insertOne({ initialized: true });
userDB.Category.insertOne({ initialized: true });
userDB.Post.insertOne({ initialized: true });
userDB.PostCategory.insertOne({ initialized: true });
userDB.Comment.insertOne({ initialized: true });

// Log the end of the process
print('MongoDB initialization script completed.');
