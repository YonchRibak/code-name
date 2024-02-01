import useGetWords from "@/Hooks/useGetWords";

import { useState } from "react";
import GameCard from "../GameCard";
import { setNewItemInArrAtIndex } from "@/Utils/setNewItemInArrAtIndex";
import RandomWord from "@/Models/randomWord";
import "../GameArea.css";
import useDisplayCards from "@/Hooks/useDisplayCards";
import useGameContext from "@/Hooks/useGameContext";
import Loading from "@/components/SharedArea/Interact/Loading";

function Family(): JSX.Element {
  const [showCards, setShowCards] = useState<boolean[]>(Array(25).fill(false)); // 25 states defaulted to 'false' for the display of the cards.
  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const { session, setSession } = useGameContext();

  const { randomWords, isError, isLoading } = useGetWords(true);

  useDisplayCards<RandomWord>(randomWords, setShowCards); // visit 'Hooks/' to learn more what the hook does.

  if (isLoading) return <Loading />; // display loading component.
  if (isError) return <div>Error</div>; // display error component.NOTE TO SELF: create error component.

  return (
    <div className="cards-container">
      {session.cards?.length &&
        session.cards.map((_, index) => (
          <GameCard
            showCard={showCards[index]}
            wordType="RandomWord"
            isFamily
            team={session.teamAscription[index]}
            key={(session.cards[index] as RandomWord).id}
            word={session.cards[index]}
            onReplaceBtnClick={() => {
              setSession((prevSession) => {
                return {
                  ...prevSession,
                  cards: [
                    ...prevSession.cards.slice(0, index),
                    prevSession.spareCards[
                      currIndexForReplacement
                    ] as RandomWord,
                    ...prevSession.cards.slice(index + 1),
                  ],
                };
              });

              setCurrIndexForReplacement((prev) => prev + 1);
              // increase currIndexForReplacement so that the next card change will bring a different word from spare words array.
            }}
          />
        ))}
    </div>
  );
}

export default Family;
