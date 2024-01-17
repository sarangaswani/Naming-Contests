import express from "express";
import cors from "cors";
import { connectClient } from "./db";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("/contests", async (req, res) => {
  const client = await connectClient();
  const contests = await client
    .collection("contests")
    .find()
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1,
      _id: 0,
    })
    .toArray();
  res.send({ contests });
});

router.get("/contest/:contestId", async (req, res) => {
  const client = await connectClient();
  const contest = await client
    .collection("contests")
    .findOne({ id: req.params.contestId });
  res.send({ contest });
});

router.post("/contest/:contestId", async (req, res) => {
  const client = await connectClient();
  const { name } = req.body;
  const doc = await client
    .collection("contests")
    .findOneAndUpdate(
      { id: req.params.contestId },
      {
        $push: {
          names: {
            id: name.toLowerCase().replace(/\s/g, "-"),
            name: name,
            timestamp: new Date(),
          },
        },
      },
      { returnDocument: "after" },
    );

  res.send({ updatedContest: doc });
});

router.post("/contests/", async (req, res) => {
  const client = await connectClient();
  const { categoryName, contestDesc, contestName } = req.body;
  const doc = await client.collection("contests").insertOne({
    id: contestName.toLowerCase().replace(/\s/g, "-"),
    contestName,
    categoryName,
    description: contestDesc,
    names: [],
  });

  const contest = await client
    .collection("contests")
    .findOne({ _id: doc.insertedId });

  res.send({ contest });
});

export default router;
