function newLinkSubscribe(parent, args, context){

    // 非同期で処理を繰り返すの意
    return context.pubsub.asyncIterator("NEW_LINK");
}

const newLink = {
    subscribe: newLinkSubscribe,
    resolve: (payload) => {
        return payload;
    }
}

function newVoteSubscribe(parent, args, context){

    // 非同期で処理を繰り返すの意
    return context.pubsub.asyncIterator("NEW_VOTE");
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: (payload) => {
        return payload;
    }
}

module.exports = {
    newLink,
    newVote
}