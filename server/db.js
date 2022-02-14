const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://gaelle:0000@cluster0.s0fw2.mongodb.net/clearfashion?retryWrites=true&w=majority'
const db_name = 'clearfashion'
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

async function connect(){
    try{
        // Connection to the data base
        const client = await MongoClient.connect(url, connectionParams);
        console.log('Connected to database')
        const db = client.db(db_name)
        
    } catch(err) {
        console.error(`Error connecting to the database. \n${err}`);
    }
}

connect() 