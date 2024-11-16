import { MongoClient } from "mongodb";

export default (function () {
  const url = "mongodb://127.0.0.1:27017";
  let client;
  let db;
  let collection;

  function getInstance() {
    return new Promise(async function (resolve, reject) {
      if (client) return resolve(client);

      try {
        client = new MongoClient(url);
        await client.connect();

        db = client.db("quotesDB");
        collection = db.collection("quotes");

        return resolve(client);
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  }

  async function getDB() {
    if (!db) await getInstance();
    return db;
  }

  async function getCollection() {
    if (!collection) await getInstance();
    return collection;
  }

  return {
    getInstance,
    getDB,
    getCollection,
  };
})();
