var mongoose = require("mongoose");
require("dotenv").config();
var password = process.env.DB_PASS;

mongoose.connect(`mongodb://tigigti:${password}@angeloscluster-shard-00-00-7hfsi.mongodb.net:27017,angeloscluster-shard-00-01-7hfsi.mongodb.net:27017,angeloscluster-shard-00-02-7hfsi.mongodb.net:27017/test?ssl=true&replicaSet=angelosCluster-shard-0&authSource=admin`);