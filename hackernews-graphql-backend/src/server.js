const { ApolloServer,gql } =require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const { getUserId }  = require("./utils");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Link = require("./resolvers/Link");
const User = require("./resolvers/User");
const Vote = require("./resolvers/Vote");

// サブスクリプションの実装
// publisher(送信者)/Subscriber(受信者)
const { PubSub } = require("apollo-server");

const prisma = new PrismaClient();
const pubsub = new PubSub();


// リゾルバ関数
// リゾルバは、queryを実行する際、上で定義した型に実際に操作する(値を入れるなど)ことを意味する
const resolvers = {
    Query,
    Mutation,
    Subscription,
    Link,
    User,
    Vote,
}

// serverのインスタンスを作成
const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers,

    // 以下の変数はどのリゾルバーでも使えるもの
    // reqはヘッダー情報などを含むもの
    context:({req}) =>{
        return {
            ...req,
            prisma,
            pubsub,
            userId: req && req.headers.authorization ? getUserId(req) : null,
        }
    },
});

// serverを起動
server
    .listen()
    .then(({url}) => console.log(`${url}でサーバーを起動・・・`))