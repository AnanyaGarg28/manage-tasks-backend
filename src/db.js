import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.DB_URI;
let client;

export const initializeDbConnection = async () => {
    client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
}

export const getDbConnection = dbName => {
    const connection = client.db(dbName);
    return connection;
}