import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHistory } from 'react-icons/fa';

const GameHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGameHistory();
  }, []);

  const fetchGameHistory = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No authentication token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/history/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const historyData = Array.isArray(response.data) ? response.data : response.data.history;
      setHistory(historyData);
      setError(null);
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError('Session expired or invalid. Please log in again.');
            break;
          case 403:
            setError('You do not have permission to view this data.');
            break;
          default:
            setError(`Error fetching game history: ${error.response.data.message || 'Unknown error'}`);
        }
      } else {
        setError('Network error occurred. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-200 min-h-screen p-6 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <FaHistory className="mr-2 text-2xl" />
            <h1 className="text-2xl font-bold">Game History</h1>
          </div>
          <button
            onClick={fetchGameHistory}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm shadow-md transition duration-300"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 mx-6 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 text-lg">Loading game history...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-yellow-300 text-yellow-900 text-sm">
                  <th className="py-3 px-6 font-medium">Date</th>
                  <th className="py-3 px-6 font-medium">Total Questions</th>
                  <th className="py-3 px-6 font-medium">Score</th>
                  <th className="py-3 px-6 font-medium">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {history && history.length > 0 ? (
                  history.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className={`${
                        index % 2 === 0 ? 'bg-yellow-50' : 'bg-yellow-100'
                      } hover:bg-yellow-200 transition duration-200`}
                    >
                      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
                        {formatDate(item.gamedate)}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
                        {item.total_questions}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
                        {item.score}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
                        {item.remarks}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-6 px-6 text-center text-gray-500">
                      No game history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHistory;
