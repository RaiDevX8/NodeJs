const { MongoClient } = require('mongodb')
const uri = require('./atlas_url')
const client = new MongoClient(uri)


//DB name
const dbname = 'test'
const db = client.db(dbname)

//Collections
const collection_name ="account"
const accountCollection = db.collection(collection_name)



//Connect to DB
const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log(`connected successfully to database`)
  } catch (error) {
    console.error('error')
  }
}

//insert one method

const smapleAccount = {
  account_holder: 'Charan rai',
  account_id: 'nfdln23',
  account_type: 'checking',
  balance: 2049238,
  last_updated: new Date(),
}



const main = async () => {
  try {
    await connectToDatabase()
    let result =await accountCollection.insertOne(smapleAccount)
  } catch (err) {
    console.error(`Error in main function: ${err}`)
  } finally {
    await client.close()
  }
}

main()
