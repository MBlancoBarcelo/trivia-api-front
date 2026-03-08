import "./questions.css"

function Questions({ questions }) {

    return (
        <div className="questions-container">
            {questions.map((q) => {

                return (
                    <div className="question-card" key={q.id}>

                        <div className="question-text">
                            {q.question}
                        </div>

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
                                    <button key={i} className="option-btn">
                                        {op}
                                    </button>
                                ))}
                            </div>
                        )}

                        {(q.type === "short_answer" || q.type === "open_ended") && (
                            <input
                                className="answer-input"
                                type="text"
                                placeholder="Escribe tu respuesta..."
                            />
                        )}

                    </div>
                )
            })}
        </div>
    )
}

export default Questions