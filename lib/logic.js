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
            return Promise.all([userRegistry.update(voter), userRegistry.update(contestant)]);
        })
}