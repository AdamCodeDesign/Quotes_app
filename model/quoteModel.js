import MongoSingleton from "../data/mongoDbSIngleton.js";
import { ObjectId } from "mongodb";

export function saveAll(quotes) {
  return new Promise(async (resolve, reject) => {
    const collection = await MongoSingleton.getCollection();
    const result = await collection.insertMany(quotes);

    if (result.insertedCount) {
      resolve(result);
    } else {
      reject("Could not save quotes");
    }
  });
}

export function getAll() {
  return new Promise(async (resolve, reject) => {
    const collection = await MongoSingleton.getCollection();
    const cursor = collection.find();
    const results = await cursor.toArray();

    if (results.length > 0) {
      resolve(results);
    } else {
      reject("Could not get all quotes");
    }
  });
}

export function getById(id) {
  return new Promise(async (resolve, reject) => {
    const collection = await MongoSingleton.getCollection();
    const result = await collection.findOne({ _id: ObjectId(id) });

    if (result) {
      resolve(result);
    } else {
      reject("Could not get quote by Id:" + id);
    }
  });
}
