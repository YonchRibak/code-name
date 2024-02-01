import useGetRandomWikiVals from "@/Hooks/useGetRandomWikiVals";
import i18n from "@/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GameCard from "../GameCard";
import { setNewItemInArrAtIndex } from "@/Utils/setNewItemInArrAtIndex";
import WikiObj from "@/Models/WikiObj";

import "../GameArea.css";
import useGameContext from "@/Hooks/useGameContext";
import Loading from "@/components/SharedArea/Interact/Loading";

function Wiki(): JSX.Element {
  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array
  const [showCards, setShowCards] = useState<boolean[]>(Array(25).fill(false)); // 25 states defaulted to 'false' for the display of the cards.

  const { session, setSession } = useGameContext();

  const { t } = useTranslation();

  useEffect(() => {
    if (
      //  if there are already target items on local storage, set wikis' and spareWikis' states to them.
      localStorage.getItem(`${i18n.language}-initWikis`) ||
      localStorage.getItem(`${i18n.language}-spareWikis`)
    ) {
      setSession((prevSession) => ({
        ...prevSession,
        cards: JSON.parse(localStorage.getItem(`${i18n.language}-initWikis`)),
      }));
      setSession((prevSession) => ({
        ...prevSession,
        spareCards: JSON.parse(
          localStorage.getItem(`${i18n.language}-spareWikis`)
        ),
      }));
    }
  }, []);

  const doneFetch = useGetRandomWikiVals(t("configurations.wikiLangName"), 30); // retrieves random values from wikipedia, go to 'Hooks/' to learn more.

  useEffect(() => {
    if (doneFetch) {
      setSession((prevSession) => ({
        ...prevSession,
        cards: JSON.parse(localStorage.getItem(`${i18n.language}-initWikis`)),
      }));
      setSession((prevSession) => ({
        ...prevSession,
        spareCards: JSON.parse(
          localStorage.getItem(`${i18n.language}-spareWikis`)
        ),
      }));
    }
  }, [doneFetch]);

  useEffect(() => {
    if (session.cards?.length > 0) {
      const showDelay = 100;

      for (let i = 0; i < 25; i++) {
        //change state of each showCard props to 'true' on a delay.
        window.setTimeout(() => {
          setShowCards((prev) => {
            const newShowCards = [...prev];
            newShowCards[i] = true;
            return newShowCards;
          });
        }, i * showDelay);
      }
    }
  }, [session.cards]);

  if (!doneFetch && !session.cards?.length) {
    return <Loading />; // display loading component.
  }

  return (
    <div className="cards-container">
      {session.cards?.length &&
        session.cards.map((_, index) => (
          <GameCard
            showCard={showCards[index]}
            key={(session.cards[index] as WikiObj).pageid}
            wordType="WikiObj"
            isFamily={false}
            team={session.teamAscription[index]}
            word={session.cards[index]}
            onReplaceBtnClick={() => {
              setSession((prevSession) => {
                return {
                  ...prevSession,
                  cards: [
                    ...prevSession.cards.slice(0, index),
                    prevSession.spareCards[currIndexForReplacement] as WikiObj,
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

export default Wiki;
