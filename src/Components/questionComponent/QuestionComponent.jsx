import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  const fetchQuestionImage = async () => {
    try {
      const response = await axios.get('https://marcconrad.com/uob/banana/api.php');
      
      if (response.data && response.data.question && response.data.solution) {
        setImageUrl(response.data.question);
        setCorrectAnswer(response.data.solution);
        setTimeLeft(30); // Reset timer for new question
        setUserAnswer(''); // Clear previous answer
        setFeedback(''); // Clear previous feedback
      } else {
        setError('Data not found in response.');
      }
    } catch (err) {
      setError('Could not fetch the question image.');
    }
  };

  useEffect(() => {
    fetchQuestionImage(); // Initial question load
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsGameOver(true); // Show modal when time is up
    }
  }, [timeLeft]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userAnswer === correctAnswer) {
      setFeedback('Correct answer! 🎉');
    } else {
      setFeedback('Incorrect answer. Try again.');
    }
  };

  const handleResetGame = () => {
    setIsGameOver(false); // Close modal
    fetchQuestionImage(); // Fetch a new question
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700">Question Image</h2>

      {error && <p className="text-red-500">{error}</p>}

      {imageUrl ? (
        <motion.img
          src={imageUrl}
          alt="Question"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}

      <p className={`text-lg font-semibold ${timeLeft <= 5 ? 'text-red-500' : 'text-blue-700'}`}>
        Time Left: {timeLeft} seconds
      </p>

      {timeLeft > 0 ? (
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="border-2 border-gray-300 p-2 rounded-lg w-full max-w-xs focus:border-blue-500 focus:outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg"
          >
            Check Answer
          </motion.button>
        </form>
      ) : null}

      {feedback && (
        <motion.p
          className={`mt-4 text-lg font-semibold ${
            feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {feedback}
        </motion.p>
      )}

      {/* Hint Text with Solution */}
      {correctAnswer && (
        <motion.div
          className="mt-6 text-gray-700 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p>Hint: The answer is "{correctAnswer}".</p>
        </motion.div>
      )}

      {/* Game Over Modal */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-red-600">Game Over!</h3>
              <p className="mt-4 text-gray-700">Time is up. Would you like to try again?</p>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={handleResetGame}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg"
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsGameOver(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-lg"
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionImage;
