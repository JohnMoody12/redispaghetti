const { tempData } = require("../data");
const { Escalation, Comment } = require("../db/schemas");
const redis = require("redis");

exports.productEscalations = async (req, res) => {
  const { productGroup } = req.params;

  const filteredData = tempData.filter(
    (escalation) =>
      escalation.productGroup.toLowerCase() == productGroup.toLowerCase()
  );
  res.json(filteredData);
};

//cacheKey syntax?
//the json(JSON.parse())
//redis on its own endpoint/express server

const redisCalls = async (productGroup, req, res) => {
  const cacheKeyPattern = `escalation:${productGroup}:*`;

  // Get all keys matching the pattern
  const escalationKeys = await req.redisClient.keys(cacheKeyPattern);

  if (escalationKeys.length > 0) {
    // Fetch all values for the matching keys
    const cachedEscalations = await Promise.all(
      escalationKeys.map((key) => req.redisClient.get(key))
    );

    // Parse the JSON strings into objects
    const escalationsWithComments = cachedEscalations.map(JSON.parse);
    console.log("Redis returned!!!!");
    return escalationsWithComments;
  }
  return false;
};

exports.productEscalationsMongo = async (req, res) => {
  try {
    const { productGroup } = req.params;
    const escalationsWithCommentsRedis = await redisCalls(
      productGroup,
      req,
      res
    );
    if (escalationsWithCommentsRedis) {
      return res.status(200).json(escalationsWithCommentsRedis);
    }

    const escalations = await Escalation.find({ productGroup });

    const escalationsWithComments = await Promise.all(
      escalations.map(async (escalation) => {
        const comments = await Comment.find({ escalationId: escalation._id });

        // Convert the Mongoose document to a plain JavaScript object
        const escalationObject = escalation.toObject();

        // Add the comments to the escalation object
        return {
          ...escalationObject,
          comments: comments,
        };
      })
    );

    escalationsWithComments.forEach(async (escalation) => {
      await req.redisClient.setEx(
        `escalation:${escalation.productGroup}:${escalation._id}`,
        5000,
        JSON.stringify(escalation)
      );
    });

    console.log("plain ole mongo");
    res.status(200).json(escalationsWithComments);
  } catch (err) {
    console.log("err retrieving escalation", err.message);
    res.status(500).json("no go");
  }
};

exports.createEscalation = async (req, res) => {
  try {
    const { productGroup } = req.params;
    const { title, body, date } = req.body;

    const newEscalation = new Escalation({
      productGroup,
      title,
      body,
      date,
    });

    const savedEscalation = await newEscalation.save();

    const comments = [
      {
        user: "bob",
        date: "123",
        commentBody: `this is a comment ${Math.round(Math.random() * 1000000)}`,
        escalationId: savedEscalation._id,
      },
      {
        user: "bob",
        date: "123",
        commentBody: `this is a comment ${Math.round(Math.random() * 1000000)}`,
        escalationId: savedEscalation._id,
      },
    ];

    const savedComments = await Comment.insertMany(comments);
    let escObj = savedEscalation.toObject();
    const fullEscalation = { ...escObj, comments };
    console.log(fullEscalation);

    await req.redisClient.setEx(
      `escalation:${fullEscalation.productGroup}:${fullEscalation._id}`,
      360,
      JSON.stringify(fullEscalation)
    );

    res.json("YAS QUEEN");
  } catch (err) {
    console.error("Error creating escalation:", error);
    res
      .status(500)
      .json({ message: "Error creating escalation", error: error.message });
  }
};

// exports.newEscalation = async (req, res) => {
//   const { productGroup } = req.params;
//   const { title, body } = req.body;
//   const id = Math.round(Math.random() * 1000000);

//   console.log(req.body);
//   let newEsc = req.body;
//   newEsc.comments = [
//     {
//       user: "bob",
//       date: "123",
//       commentBody: `this is a comment ${Math.round(Math.random() * 1000000)}`,
//       id: Math.round(Math.random() * 1000000),
//     },
//     { user: "asdfs", date: "123", commentBody: "this is a comment 4", id: 6 },
//   ];
//   let anId = +tempData[tempData.length - 1].id + 1;
//   newEsc.id = anId;
//   tempData.push(newEsc);
//   console.log(tempData);

//   res.json("YAS QUEEN");
// };

// req.redisClient.get(cacheKey, async (err, cachedData) => {
//   if (err) {
//     console.log("Redis error", err);
//   }
//   if (cachedData) {
//     return res.status(200).json(JSON.parse(cachedData));
//   }
// });
