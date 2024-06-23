import useGetRandomWikiVals from "@/Hooks/useGetRandomWikiVals";
import i18n from "@/i18n";
import "../GameArea.css";
import useGameContext from "@/Hooks/useGameContext";
import Loading from "@/components/SharedArea/Interact/Loading";

import CardsContainer from "../CardsContainer";
import { useTranslation } from "react-i18next";
import WikiObj from "@/Models/WikiObj";
import useSetStoredWikisToSession from "@/Hooks/useSetStoredWikisToSession";

function Wiki(): JSX.Element {
  const { session, setSession } = useGameContext();

  const { t } = useTranslation();

  useSetStoredWikisToSession(
    i18n.language === "en-US" ? "en" : "he",
    session,
    setSession
  );

  const { isLoading, isError } = useGetRandomWikiVals(
    t("configurations.wikiLangName"),
    30
  ); // retrieves random values from wikipedia in English, go to 'Hooks/' to learn more.

  if (isLoading) return <Loading isWikiLoading />; // display loading component.
  if (isError) return <div>Error</div>; // display error component.NOTE TO SELF: create error component.
  if ((session.cards[0] as WikiObj)?.pageid)
    return <CardsContainer cardsType="WikiObj" isCaptain={false} />;
}

export default Wiki;
