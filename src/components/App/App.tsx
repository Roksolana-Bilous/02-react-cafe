import css from "./App.module.css";

import CafeInfo from "../CafeInfo/CafeInfo.tsx";

import Notification from "../Notification/Notification.tsx";

import VoteOptions from "../VoteOptions/VoteOptions.tsx";

import VoteStatus from "../VoteStats/VoteStats.tsx";

import type { Votes, VoteType } from "../../types/votes.ts";

import { useState } from "react";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0 ? true : false}
      />
      {totalVotes ? (
        <VoteStatus
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}