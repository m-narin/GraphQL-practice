const jwt = require("jsonwebtoken");
APP_SECRET = "Graphql-is-aw3some";

// トークンを復号するための関数
function getTokenPayload(token){
    // トークン化された物の前の情報(user.id)を秘密鍵で復号する
    return jwt.verify(token, APP_SECRET);
}

// ユーザーIDを取得するための関数
function getUserId(req, authToken) {
    if(req){
        // ヘッダーから認証権限があるか確認する
        const authHeader = req.headers.authorization;

        // 権限があるなら
        if(authHeader){

            // tokenだけの文字列に修正
            const token = authHeader.replace("Bearer", "")
            if(!token){
                throw new Error("トークンが見つかりませんでした")
            }

            // そのトークンを復号する。
            const { userId } = getTokenPayload(token);
            return userId;
        }
    } else if(authToken){
        const {userId} = getTokenPayload(authToken);
        return userId;
    }

    throw new Error("認証権限がありません");
}

module.exports = {
    APP_SECRET,
    getUserId,
}