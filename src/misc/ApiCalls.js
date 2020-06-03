let apiInfo = {
    url: "https://us-central1-js-capstone-backend.cloudfunctions.net/api/",
    headers: {
        'Content-Type': 'application/json'
    },
    gameID: "1504TZsX2gyehoKXvxL4"
}
/*
export const postScore = async () => {
    const rawResult = await fetch(`${apiInfo.url}games/:${apiInfo.gameID}/scores/`, {
        method: 'POST',
        headers: apiInfo.headers,
        body: JSON.stringify({"user": "Bruna", "score": 100})
    })
    const result = await rawResult.json()
}

export const getGameScores = async () => {
    const rawResult = await fetch(`${apiInfo.url}games/:${apiInfo.gameID}/scores/`)
    const scoreBoard = await rawResult.json()
}
*/