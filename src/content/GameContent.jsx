import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getRoundsOfGame, getQuestionsOfRound } from "../Game.js";
import Timer from "../componente/timer.jsx";
import Questions from "../componente/Questions.jsx";

function GameContent() {
  const navigate = useNavigate();

  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState();

  useEffect(() => {
    const getRounds = async () => {
      const arrayofrounds = await getRoundsOfGame(
        localStorage.getItem("gameId"),
      );
      console.log(arrayofrounds);

      setRounds(arrayofrounds);
    };

    getRounds();
  }, []);

  useEffect(() => {
    if (rounds.length === 0 || currentRound >= rounds.length) return;

    const now = new Date();
    const roundStart = new Date(rounds[currentRound].createdAt);

    if (now < roundStart) return;

    console.log("asdjvahsafjhsafjsfgjh");

    const loadQuestions = async () => {
      try {
        const questions = await getQuestionsOfRound(
          localStorage.getItem("gameId"),
          rounds[currentRound].id,
        );
        setQuestions(questions);
      } catch (err) {
        console.error("No se pueden cargar las preguntas aún:", err);
      }
    };

    loadQuestions();
  }, [currentRound, rounds]);

  const nextRound = () => {
    
    
    setCurrentRound((prev) => prev + 1);

  };


  return (
    <>
      {rounds.length === 0 ? (
        <h1>Cargando...</h1>
      ) : currentRound >= rounds.length ? (
        <h1>Juego terminado</h1>
      ) : (
        <>
          <h1>Ronda {currentRound + 1}</h1>
          <Timer endedAt={rounds[currentRound].endedAt} onFinish={nextRound} />
          <Questions questions={questions} roundId={rounds[currentRound].id} />
        </>
      )}
    </>
  );
}

export default GameContent;
