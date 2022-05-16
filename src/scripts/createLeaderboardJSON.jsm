uuid = require("uuid");
gen = require("unique-names-generator");
fs = require("fs");

res = { users: {} };
numEntries = 100;
maxScore = 50;
filepath = "/Users/christoffer.sorensen/leaderboardJson.json";
for (i = 0; i < numEntries; i++) {
  res["users"][uuid.v4()] = {
    name: gen.uniqueNamesGenerator({
      dictionaries: [gen.adjectives, gen.colors, gen.animals],
      style: "capital",
      separator: "",
    }),
    score: Math.floor(Math.random() * (maxScore + 1)),
  };
}

json = JSON.stringify(res);
// console.log(filepath);
// console.log(json);
fs.writeFileSync(filepath, json, "utf8", () => {});
