const { MongoClient, ObjectId } = require('mongodb')
const uri = require('./atlas_url')
const client = new MongoClient(uri)

//DB name
const dbname = 'test'
const db = client.db(dbname)

//Collections
const collection_name = 'account'
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

const smapleAccount = [
  {
    account_holder: 'Charan ',
    account_id: 'nfdln23',
    account_type: 'checking',
    balance: 2049238,
    last_updated: new Date(),
  },
  {
    account_holder: 'likitha rai',
    account_id: 'nfdn23',
    account_type: 'completed',
    balance: 204938,
    last_updated: new Date(),
  },
]
// const documenntofind = { balance: { $gt: 700 } } //find many
const documenntofind = {
  _id: new ObjectId('668185c2781c2a5cb25c3342'),
}
const main = async () => {
  try {
    await connectToDatabase()

    //INSERT

    // let result = await accountCollection.insertOne(smapleAccount)

    // let result = await accountCollection.insertMany(smapleAccount)

    //FIND ONE

    // let result = await accountCollection.findOne()

    //FIND MANY

    // let result = await accountCollection.find(documenntofind).toArray()

    //UPDATE

    let updatefilter = { _id: new ObjectId('668185c2781c2a5cb25c3342') }
    // let updateQuery={$inc :{balance :10000}} // FOR UPDATE ONE

    let updateQuery = { $push: { transfer_complete: '38hbfdjb39u' } }

    //UPDATE ONE
    // let result = await accountCollection.updateOne(updatefilter,updateQuery)

    //UPDATE MANY
    let result = await accountCollection.updateMany(updatefilter, updateQuery)

    //check
    result.modifiedCount > 0
      ? console.log(`updated ${result.modifiedCount}`)
      : console.log('not done')
    console.log(result)
  } catch (err) {
    console.error(`Error in main function: ${err}`)
  } finally {
    await client.close()
  }
}

main()
