import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Logic for a method that accepts some content and adds it to the database
// function to PUT to database
export const putDb = async (id, content) => {
  console.log("Accepting content and adding to database");

  // database connection
  const jateDb = await openDB("jate", 1);

  // new transaction
  const tx = jateDb.transaction("jate", "readwrite");

  // open object store
  const store = tx.objectStore("jate");

  // ADD data to store
  const request = store.put({ id: 1, jate: content });

  //confirm request
  const result = await request;
  console.log("data saved to database", result);
};

// Logic for a method that gets all the content from the database
// GET ALL to retrieve data from the IndexedDB database.
// trying a get one instead of get all
export const getDb = async () => {
  console.log("Getting from database");

  //database connection
  const jateDb = await openDB("jate", 1);

  // new transaction
  const tx = jateDb.transaction("jate", "readonly");

  // open object store
  const store = tx.objectStore("jate");

  // get all to retrieve all data from database
  const request = store.get(1);

  //confirm request
  const result = await request;
  console.log("result.value", result);
  return result.value;
};

initdb();
