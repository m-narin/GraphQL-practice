// データベースにアクセスするためのクライアントライブラリ
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// migrationの初期化のためのコード
async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: "UdemyでGraphQLを学ぶ",
            url: "www-udemy-graphql-tutorial.com"
        },
    });
    const allLinks = await prisma.link.findMany();
    console.log(allLinks)
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {

        // データベースを閉じる
        prisma.$disconnect;
    })