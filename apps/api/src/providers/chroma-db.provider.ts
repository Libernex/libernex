import { ChromaClient } from "chromadb";
import { LOGGER } from "@repo/logger";

const ChromaDbProvider = () => {
  const client = (): ChromaClient => {
    return new ChromaClient({
      path: "http://localhost:8000",
    });
  };

  const test = async (): Promise<void> => {
    const client: ChromaClient = new ChromaClient({
      path: "http://localhost:8000",
    });

    let collection;

    try {
      collection = await client.getCollection({ name: "demo" });
      LOGGER("Collection 'demo' exists. Fetching existing collection.");
    } catch (error) {
      LOGGER("Collection 'demo' does not exist. Creating new collection.");
      collection = await client.createCollection({
        name: "demo",
      });

      await collection.add({
        documents: [
          "This is a document about pineapple",
          "This is a document about oranges",
        ],
        ids: ["id1", "id2"],
      });
    }

    const results = await collection.query({
      queryTexts: ["This is a query document about hawaii"], // Chroma will embed this for you
      nResults: 2, // how many results to return
    });
    LOGGER(results);
  };

  return {
    test,
    client,
  };
};

export default ChromaDbProvider;
