const stitch = require("mongodb-stitch")
const clientPromise = stitch.StitchClientFactory.create('faasos-rmruc');
clientPromise.then(client => {
  const db = client.service('mongodb', 'mongodb-atlas').db('faasos');
  client.login().then(() =>
    db.collection('order').updateOne({owner_id: client.authedId()}, {$set:{number:42}}, {upsert:true})
  ).then(() =>
    db.collection('order').find({owner_id: client.authedId()}).limit(100).execute()
  ).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
  }).catch(err => {
    console.error(err)
  });
});
