'use strict';

/**
 * Voting function
 * @param {org.bhanu.io.CommitVote} CommitVote
 * @transaction
 */
function CommitVote(Vote) {
    var voter = Vote.voter;
    var contestant = Vote.contestant;
    if (voter.votes <= 0) {
        throw new Error('User already voted.');
    }
    voter.votes -= 1;
    contestant.votes += 1;
    return getAssetRegistry('org.bhanu.io.User')
        .then(function (userRegistry) {
            return userRegistry.update(voter);
        }).then(function () {
            return getAssetRegistry('org.bhanu.io.Candidate');
        })
        .then(function (candidateRegistry) {
            return candidateRegistry.update(contestant);
        });
}