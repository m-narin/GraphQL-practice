// どのユーザーから投稿されたかのリゾルバ
function postedBy(parent, args, context){
    return context.prisma.link
        .findUnique({
            // リゾルバ階層は2段階に分かれている
            // parentは{id: xx, description: xx, ,,}を表している。
            where: {id: parent.id},
        })
        .postedBy()
}

function votes(parent,args,contect){
    return context.prisma.link
        .findUnique({
            where: {id:parent.id}
        })
        .votes()
}

module.exports = {
    postedBy,
    votes,
}