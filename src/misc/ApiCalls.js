let apiInfo = {
    url: "https://us-central1-js-capstone-backend.cloudfunctions.net/api/",
    headers: {
        'Content-Type': 'application/json'
    },
    gameID: "1504TZsX2gyehoKXvxL4"
}

export const postScore = async (playerName, score) => {
    try {
        const rawResult = await fetch(`${apiInfo.url}games/:${apiInfo.gameID}/scores/`, {
            method: 'POST',
            headers: apiInfo.headers,
            body: JSON.stringify({"user": playerName, "score": score})
        })
        await rawResult.json()
        return true
    } catch(err) {
        alert(error)
        return false
    }
    
}

export const getGameScores = async () => {
    const rawResult = await fetch(`${apiInfo.url}games/:${apiInfo.gameID}/scores/`)
    const scoreBoard = await rawResult.json()
    return scoreBoard
}