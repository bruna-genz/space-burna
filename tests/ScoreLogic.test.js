global.fetch = require('jest-fetch-mock');

import "babel-polyfill"
import * as ScoreLogic from "../src/helpers/ScoreLogic";

describe("Post score function", () => {
    beforeEach(() => {
        fetch.resetMocks();
      });
    
    test("returns true if API completes successfully", async () => {
        fetch.mockResponseOnce(JSON.stringify('fake successful message'));
        let result = await ScoreLogic.postScore("John", 10)
        expect(result).toBe(true)
    })
    
    test("returns false if API fails", async () => {
        fetch.mockRejectOnce(new Error('fake error message'))
        let result = await ScoreLogic.postScore("John", 10)
        expect(result).toBe(false)
    })
    
    test("calls API with correct arguments", async () => {
        fetch.mockResponseOnce(JSON.stringify('fake successful message'));
        await ScoreLogic.postScore("John", 10);
    
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({"user": "John", "score": 10}))
    })
})

describe("Get game scores", () => {
    beforeEach(() => {
        fetch.resetMocks();
      });
    
      test("returns an array of objects if API completes successfully", async () => {
        fetch.mockResponseOnce(JSON.stringify([{"user": "John", "score": 10}]));
        let scoreBoard = await ScoreLogic.getGameScores("John", 10);
        
        expect(scoreBoard).toEqual([{"user": "John", "score": 10}])
    })

    test("returns error message if API fails", async () => {
        fetch.mockRejectOnce(new Error('fake error message'))
        let scoreBoard = await ScoreLogic.getGameScores("John", 10);
        expect(scoreBoard).toBe('Sorry, something went wrong.')
    })
})