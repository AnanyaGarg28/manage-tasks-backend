import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://admin:ananya123@cluster0.ycawnnl.mongodb.net/?retryWrites=true&w=majority";
let client;

export const initializeDbConnection = async () => {
    client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
}

export const getDbConnection = dbName => {
    const connection = client.db(dbName);
    return connection;
}