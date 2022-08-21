import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Item from "../models/Item";

const inventoryRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

inventoryRouter.get("/", async (req, res) => {
  try {
    const maxPrice = parseInt(req.query["max-price"] as string);
    const product = req.query.product;
    const pageSize = parseInt(req.query["page-size"] as string);
    const query = {
      ...(maxPrice ? { price: { $lte: maxPrice } } : {}),
      ...(product ? { product: new RegExp(`${product}`, "i") } : {}),
    };
    const client = await getClient();
    const cursor = client.db().collection<Item>("inventory").find(query);
    if (pageSize) {
      cursor.limit(pageSize);
    }
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

inventoryRouter.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Item>("inventory")
      .findOne({ _id: new ObjectId(id) });
    if (result) {
      res.status(200);
      res.json(result);
    } else {
      res.status(404);
      res.send(`ID Not Found`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

inventoryRouter.post("/", async (req, res) => {
  try {
    const client = await getClient();
    const newItem: Item = req.body;
    await client.db().collection<Item>("inventory").insertOne(newItem);
    res.status(200);
    res.json(newItem);
  } catch (error) {
    errorResponse(error, res);
  }
});

inventoryRouter.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Item>("inventory")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send("No ID found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

inventoryRouter.put("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const replacement: Item = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Item>("inventory")
      .replaceOne({ _id: new ObjectId(id) }, replacement);
    if (result.modifiedCount) {
      res.status(200);
      res.json(replacement);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

export default inventoryRouter;
