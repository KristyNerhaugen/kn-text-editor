import { openDB } from "idb";

// added export so initdb can be inported into index.js
export const initdb = async () =>
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

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error("putDb not implemented");

// TODO: Add logic for a method that gets all the content from the database
// GET and GET ALL to retrieve data from the IndexedDB database.
export const getDb = async () => {
  console.log("Getting from database");

  //database connection
  const jate = await openDB("jate", 1);

  // new transaction
  const tx = jate.transaction("jate", "readonly");

  // open object store
  const store = tx.objectStore("jate");

  // get all to retrieve all data from database
  const request = store.getAll();

  //confirm request
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
