import "./questions.css";
import { sendAnswer } from "../Game.js";

function Questions({ questions, roundId }) {
  async function handleSendAnswer(questionId, op) {
    await sendAnswer(localStorage.getItem("gameId"), roundId, questionId, op);
  }

  return (
    <div className="questions-container">
      {questions.map((q) => {
        return (
          <div className="question-card" key={q.id}>
            <div className="question-text">{q.question}</div>

            {q.media_url && (
              <img
                className="question-image"
                src={q.media_url}
                alt="question media"
              />
            )}

            {q.type === "multiple_choice" && (
              <div className="options">
                {q.options.map((op, i) => (
                  <button
                    key={i}
                    className="option-btn"
                    onClick={() => {
                      handleSendAnswer(q.id, op);
                    }}
                  >
                    {op}
                  </button>
                ))}
              </div>
            )}

            {(q.type === "short_answer" || q.type === "open_ended") && (
              <div className="short-answer-container">
                <input
                  className="answer-input"
                  type="text"
                  placeholder="Escribe tu respuesta..."
                  id={`answer-${q.id}`}
                />

                <button
                  className="send-btn"
                  onClick={() => {
                    const value = document.getElementById(
                      `answer-${q.id}`,
                    ).value;
                    handleSendAnswer(q.id, value);
                  }}
                ></button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Questions;
