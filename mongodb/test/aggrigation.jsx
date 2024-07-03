const { MongoClient } = require('mongodb')

const uri = require('./atlas_url')
const client = new MongoClient(uri)

const pipeline = [
  {
    $match: {
      balance: { $lt: 1000 },
    },
  },
  {
    $lookup: {
      from: 'transfers',
      localField: 'account_id',
      foreignField: 'to',
      as: 'transactions',
    },
  },
  {
    $group: {
      _id: '$account_type',
      total_balance: { $sum: '$balance' },
      avg_balance: { $avg: '$balance' },
      transactions: { $push: '$transactions' },
    },
  },
]

const main = async () => {
  try {
    await client.connect()
    console.log('connected to database')
    let account = client.db('test').collection('account')
    let result = await account.aggregate(pipeline).toArray()
    result.forEach((item,index)=>
    {
      console.log(item.transactions);
    })
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}
main()
