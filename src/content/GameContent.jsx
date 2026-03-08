import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  getRoundsOfGame,
  getQuestionsOfRound,
  getCorrectAnswer,
} from "../Game.js";
import Timer from "../componente/timer.jsx";
import Questions from "../componente/Questions.jsx";

function GameContent() {
  const navigate = useNavigate();

  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const questionsRef = useRef([]);

  useEffect(() => {
    const getRounds = async () => {
      const arrayofrounds = await getRoundsOfGame(
        localStorage.getItem("gameId"),
      );

      setRounds(arrayofrounds);
    };

    getRounds();
  }, []);

  useEffect(() => {
    if (rounds.length === 0 || currentRound >= rounds.length) return;

    const now = new Date();
    const roundStart = new Date(rounds[currentRound].createdAt);

    if (now < roundStart) return;

    const loadQuestions = async () => {
      try {
        const questions = await getQuestionsOfRound(
          localStorage.getItem("gameId"),
          rounds[currentRound].id,
        );
        setQuestions(questions);
        questionsRef.current = questions;
      } catch (err) {
        console.error("No se pueden cargar las preguntas aún:", err);
      }
    };

    loadQuestions();
  }, [currentRound, rounds]);

  async function getAnswers() {
    const gameId = localStorage.getItem("gameId"); 
    const roundId = rounds[currentRound].id;
    console.log("questions:", questionsRef.current);

    const results = {};
    for (const q of questionsRef.current) {
      try {
        const correctAnswer = await getCorrectAnswer(gameId, roundId, q.id);
        console.log(correctAnswer)
        results[q.id] = correctAnswer;
      } catch (err) {
        console.error("Error obteniendo respuesta", err);
      }
    }
    setAnswers(results);
  }

  const nextRound = async () => {
    await sleep(2000);



    await getAnswers();

    setCurrentRound((prev) => prev + 1);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
