import { useEffect, useState, useRef } from "react";
import {
  getRoundsOfGame,
  getQuestionsOfRound,
  getCorrectAnswer,
} from "../Game.js";
import Timer from "../componente/timer.jsx";
import Questions from "../componente/Questions.jsx";

function GameContent() {
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [questions, setQuestions] = useState([]);
  const questionsRef = useRef([]);

  const teamsObject = JSON.parse(localStorage.getItem("teamsObject"));
  const [teamsScore, setTeamsScore] = useState(() => teamsObject);

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

    const loadQuestions = async () => {
      try {
        const questionsData = await getQuestionsOfRound(
          localStorage.getItem("gameId"),
          rounds[currentRound].id,
        );
        setQuestions(questionsData);
        questionsRef.current = questionsData;
      } catch (err) {
        console.error("No se pueden cargar las preguntas aún:", err);
      }
    };

    loadQuestions();
  }, [currentRound, rounds]);

  async function getPlayerAnswers(gameId, roundId, questions) {
    const playerAnswers = {};

    for (const q of questions) {
      const answers = await getCorrectAnswer(gameId, roundId, q.id);
      answers.forEach((a) => {
        if (!playerAnswers[a.playerId]) playerAnswers[a.playerId] = [];
        playerAnswers[a.playerId].push({ questionId: q.id, answer: a.answer });
      });
    }
    return playerAnswers;
  }

  function calculateTeamScores(playerAnswers, correctAnswers) {
    const updatedTeams = { ...teamsScore };

    Object.entries(playerAnswers).forEach(([playerId, answers]) => {
      const team = Object.values(updatedTeams).find((t) =>
        t.players.some((p) => p.id === Number(playerId)),
      );

      if (!team) return;

      answers.forEach((answer) => {
        if (correctAnswers[answer.questionId] === answer.answer) {
          const members = team.players.length;
          team.score += 1 / members;
        }
      });
    });

    setTeamsScore(updatedTeams);
  }

  const nextRound = async () => {
    const gameId = localStorage.getItem("gameId");
    const roundId = rounds[currentRound].id;

    await sleep(2000);

    const questionsData = await getQuestionsOfRound(gameId, roundId);

    const correctAnswers = {};
    questionsData.forEach((q) => {
      correctAnswers[q.id] = q.correctAnswers[0];
    });

    console.log(correctAnswers);

    console.log(questionsData);

    await new Promise((res) => setTimeout(res, 1000));

    const playerAnswers = await getPlayerAnswers(
      gameId,
      roundId,
      questionsRef.current,
    );

    calculateTeamScores(playerAnswers, correctAnswers);

    setCurrentRound((prev) => prev + 1);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <>
      {rounds.length === 0 ? (
        <h1>Cargando...</h1>
      ) : currentRound >= rounds.length ? (
        <>
          <h1>Juego terminado</h1>
          <h2>Puntajes finales:</h2>
          <ul>
            {Object.values(teamsScore).map((team, idx) => (
              <li key={idx}>
                Equipo {idx + 1}: {team.score.toFixed(2)}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1>Ronda {currentRound + 1}</h1>
          <Timer endedAt={rounds[currentRound].endedAt} onFinish={nextRound} />
          <Questions questions={questions} roundId={rounds[currentRound].id} />
          <h3>Puntajes actuales:</h3>
          <ul>
            {Object.values(teamsScore)
              .sort((a, b) => b.score - a.score)
              .map((team, idx) => (
                <li key={idx}>
                  Equipo {team.teamId}: {team.score.toFixed(2)}
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  );
}

export default GameContent;
