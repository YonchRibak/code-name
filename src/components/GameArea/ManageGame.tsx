import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import useGameContext from "@/Hooks/useGameContext";

function ManageGame(): JSX.Element {
  const { t } = useTranslation();
  const { session, setSession } = useGameContext();
  return (
    <div className="h-full flex flex-col justify-around">
      <div className="flex flex-col">
        <span>{t("manageGame.blueScore") + session.blueScore}</span>
        <span>{t("manageGame.redScore") + session.redScore}</span>
      </div>

      <Button
        className="text-4xl h-40 bg-primary w-full "
        onClick={() =>
          setSession((prevSession) => ({
            ...prevSession,
            turnsPlayed: prevSession.turnsPlayed + 1,
          }))
        }
      >
        {t("manageGame.submitBtn")}
      </Button>
      <Button
        className="text-4xl h-40 bg-destructive w-full"
        onClick={() => {
          setSession((prevSession) => ({
            ...prevSession,
            gameStarted: false,
            turnsPlayed: 0,
            blueScore: 0,
            redScore: 0,
          }));
        }}
      >
        {t("manageGame.abortBtn")}
      </Button>
    </div>
  );
}

export default ManageGame;
