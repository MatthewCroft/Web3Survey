const Survey = artifacts.require("Survey")
const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
  } = require('@openzeppelin/test-helpers');
const { assertion } = require('@openzeppelin/test-helpers/src/expectRevert');

  contract("Survey", (accounts) => {
        let survey;
        let voter1;
        let voter2;
        let surveyName;

        before(async () => {
            survey = await Survey.new();
            voter1 = accounts[0]
            voter2 = accounts[1]
            surveyName = web3.utils.asciiToHex("test")
        })

        it("createVoteCard can create Survey", async() => {
            var options = [web3.utils.asciiToHex("option 1"), web3.utils.asciiToHex("option 2")]

            await survey.createVoteCard(options, surveyName);

            var resultOptions = await survey.getPollOptions(surveyName)

            assert.equal(web3.utils.toUtf8(resultOptions[0]), web3.utils.toAscii(options[0]))
            assert.equal(web3.utils.toUtf8(resultOptions[1]), web3.utils.toAscii(options[1]))
            assert.equal(resultOptions.length, options.length)
        })

        it("voters can call vote on a survey", async() => {
            await survey.vote(surveyName, web3.utils.asciiToHex("option 1"), {
                from: voter1
            })

            await survey.vote(surveyName, web3.utils.asciiToHex("option 1"), {
                from: voter2
            })

            var voter1voted = await survey.getPollVotedUser.call(surveyName, voter1)
            var voter2voted = await survey.getPollVotedUser.call(surveyName, voter2)
            var surveyOption1votes = await survey.getSurveyOptionResult(surveyName, web3.utils.asciiToHex("option 1"))

            assert.equal(voter1voted, true)
            assert.equal(voter2voted, true)
            assert.equal(surveyOption1votes, 2)
        })

        it("same user cannot vote twice", async() => {
            await expectRevert.unspecified(survey.vote(surveyName, web3.utils.asciiToHex("option 1"), {
                from: voter2
            }))
        })

  })