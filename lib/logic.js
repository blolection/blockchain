'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Voting function
 * @param {org.bhanu.io.CommitVote} CommitVote
 * @transaction
 */
function CommitVote(Vote) {
    var voter = Vote.voter;
    var contestant = Vote.contestant;
    var election = Vote.contestant;
    voter.votes -= 1;
    contestant.votes += 1;
    return getAssetRegistry('org.bhanu.io.User')
        .then(function(userRegistry) {
            return userRegistry.update(voter);
        })
        .then(function(userRegistry) {
            return userRegistry.update(contestant);
        });
}