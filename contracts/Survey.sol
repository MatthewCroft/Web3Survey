// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Survey {
    mapping(bytes32 => PollCard) public surveys;

    struct PollCard {
        address owner;
        mapping(bytes32 => uint) votes;
        mapping(address => bool) voted;
        bytes32[] options;
    }

    function createVoteCard(bytes32[] calldata options_, bytes32 surveyName) external {
        PollCard storage poll = surveys[surveyName];
        poll.owner = msg.sender;
        poll.options = options_;
    }

    function vote(bytes32 survey, bytes32 option) external {
        PollCard storage poll = surveys[survey];
        
        require(!poll.voted[msg.sender], "You have already voted in this Poll");

        poll.votes[option] = poll.votes[option] + 1;
        poll.voted[msg.sender] = true;
    }

    function getPollOptions(bytes32 survey) external view returns(bytes32[] memory) {
        return surveys[survey].options;
    }

    function getPollVotedUser(bytes32 survey, address user) external view returns(bool) {
        return surveys[survey].voted[user];
    }

    function getSurveyOptionResult(bytes32 survey, bytes32 option) external view returns(uint) {
        return surveys[survey].votes[option];
    }
}