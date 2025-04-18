import React, { useEffect, useState } from "react";

function QuestionHistory({ onBackToMenu }) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/question-history")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setQuestions(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching question history:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-6"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="p-6"><p>Error: {error}</p></div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4">Question History</h1>
            {questions.length === 0 ? (
                <p className ="text-white">No questions found.</p>
            ) : (
                <ul className="space-y-2">
                    {questions.map((q, index) => (
                        <li key={index} className="p-4 border rounded-lg">
                            <p className=" text-white font-semibold">Prompt:</p>
                            <p className ="text-white">{q.prompt}</p>
                            <p className="text-white mt-2">
                                Result: {q.correct ? "Correct" : "Incorrect"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={onBackToMenu}
                className="mt-4 p-3 bg-blue-500 text-white rounded-lg"
            >
                Back to Menu
            </button>
        </div>
    );
}

export default QuestionHistory;