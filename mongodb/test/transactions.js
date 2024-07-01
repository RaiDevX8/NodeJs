const { MongoClient, ObjectId } = require('mongodb')
const uri = require('./atlas_url')
const client = new MongoClient(uri)

// DB name
const dbname = 'test'
const db = client.db(dbname)

// Collections
const collection_name = 'account'
const accountCollection = db.collection(collection_name)

const transaction = 'transfers'
const transactionCollection = db.collection(transaction)

// Account Information
let senderAccount_id = 'nfdlndd23'
let receiverAccount_id = 'nfdn23'
let Amount = 200

// Connect to DB
const connectToDatabase = async () => { 
  try {
    await client.connect()
    console.log(`Connected successfully to database`)
  } catch (error) {
    console.error('Error connecting to the database', error)
  }
}

const sampleAccount = [
  {
    account_holder: 'Charan Rai',
    account_id: 'nfdlndd23',
    account_type: 'checking',
    balance: 20492238,
    last_updated: new Date(),
  },
  {
    account_holder: 'Charan',
    account_id: 'nfdln23',
    account_type: 'checking',
    balance: 2049238,
    last_updated: new Date(),
  },
  {
    account_holder: 'Likitha Rai',
    account_id: 'nfdn23',
    account_type: 'completed',
    balance: 204938,
    last_updated: new Date(),
  },
]

// Main function
const main = async () => {
  const session = client.startSession()

  try {
    await connectToDatabase()

    // Uncomment to insert sample accounts
    // await accountCollection.insertMany(sampleAccount);

    const transactionResult = await session.withTransaction(async () => {
      // Step 1: Check sender's balance
      const senderAccount = await accountCollection.findOne(
        { account_id: senderAccount_id },
        { session }
      )
      if (!senderAccount) {
        throw new Error(`Sender account with ID ${senderAccount_id} not found`)
      }
      if (senderAccount.balance < Amount) {
        throw new Error('Insufficient funds')
      }

      // Step 2: Update the sender's account balance
      const update_sender = await accountCollection.updateOne(
        { account_id: senderAccount_id },
        { $inc: { balance: -Amount }, $set: { last_updated: new Date() } },
        { session }
      )
      if (update_sender.modifiedCount !== 1) {
        throw new Error('Failed to update sender balance')
      }

      // Step 3: Update the receiver's account balance
      const update_receiver = await accountCollection.updateOne(
        { account_id: receiverAccount_id },
        { $inc: { balance: Amount }, $set: { last_updated: new Date() } },
        { session }
      )
      if (update_receiver.modifiedCount !== 1) {
        throw new Error('Failed to update receiver balance')
      }

      // Step 4: Insert a transaction record
      const transferRecord = {
        from: senderAccount_id,
        to: receiverAccount_id,
        amount: Amount,
        date: new Date(),
      }
      const insertTransaction = await transactionCollection.insertOne(
        transferRecord,
        { session }
      )
      if (!insertTransaction.acknowledged) {
        throw new Error('Failed to record transaction')
      }
    })

    if (transactionResult) {
      console.log('Transaction committed successfully')
    } else {
      console.log('Transaction aborted')
    }
  } catch (err) {
    console.error(`Error in main function: ${err}`)
  } finally {
    await session.endSession()
    await client.close()
  }
}

main()
