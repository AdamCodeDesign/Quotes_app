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
    const cursor = await collection.find();
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

    if (ObjectId.isValid(id)) {
      try {
        const result = await collection.findOne({ _id: new ObjectId(id) });
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Document not found"));
        }
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error("Invalid ID format"));
    }
  });
}

export function deleteById(id) {
  return new Promise(async (resolve, reject) => {
    const collection = await MongoSingleton.getCollection();
    const result = await collection.deleteMany({ _id: new ObjectId(id) });

    if (result && result.deletedCount > 0) {
      resolve(result);
    } else {
      reject("Can not find this quote by ID" + id);
    }
  });
}

export function updateById(id, updateFields) {
  return new Promise(async (resolve, reject) => {
    const collection = await MongoSingleton.getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result && result.matchedCount > 0) {
      resolve(result);
    } else {
      reject("Can't update quote by Id: " + id);
    }
  });
}

export function insertOne(quote) {
  return new Promise(async (resolve, reject) => {
    const collection = await MongoSingleton.getCollection();
    const result = await collection.insertOne(quote);

    if (result && result.insertedId) {
      resolve(result);
    } else {
      reject("Can't insert new quote");
    }
  });
}
