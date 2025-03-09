import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Moon, Sun, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newTask, setNewTask] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [lastDeleted, setLastDeleted] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleTyping = useCallback((e) => {
    setNewTask(e.target.value);
    setIsTyping(true);
    setError('');

    // Clear typing indicator after 1 second of no typing
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => setIsTyping(false), 1000);
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      setError("Task can't be empty!");
      return;
    }

    if (trimmedTask.length < 3) {
      setError('Task is too short!');
      return;
    }

    if (tasks.some(task => task.text.toLowerCase() === trimmedTask.toLowerCase())) {
      setError('This task already exists!');
      return;
    }

    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        text: trimmedTask,
        completed: false,
        createdAt: new Date().toISOString()
      }
    ]);
    setNewTask('');
    setError('');
  };

  const toggleTask = (id) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id 
        ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null }
        : task
    ));
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setLastDeleted(taskToDelete);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

    // Clear undo option after 5 seconds
    setTimeout(() => {
      setLastDeleted(null);
    }, 5000);
  };

  const undoDelete = () => {
    if (lastDeleted) {
      setTasks(prevTasks => [...prevTasks, lastDeleted]);
      setLastDeleted(null);
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Task Tracker
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          <form onSubmit={addTask} className="mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newTask}
                  onChange={handleTyping}
                  placeholder="Add a new task..."
                  className={`w-full px-4 py-2 border rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    dark:bg-gray-700 dark:text-white transition-colors
                    ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                />
                {isTyping && (
                  <span className="absolute right-3 top-2.5 text-xs text-gray-400">
                    typing...
                  </span>
                )}
                {error && (
                  <div className="absolute -bottom-6 left-0 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                  transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                disabled={!!error}
              >
                <PlusCircle className="w-5 h-5" />
                Add
              </button>
            </div>
          </form>

          <div className="space-y-3 mt-8">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-4 rounded-lg 
                  transition-all duration-200 animate-fade-in
                  ${task.completed 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'} 
                  border border-gray-200 dark:border-gray-600`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`rounded-full p-1 transition-colors
                      ${task.completed 
                        ? 'text-green-500 hover:text-green-600' 
                        : 'text-gray-400 hover:text-gray-500'}`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col">
                    <span
                      className={`text-lg transition-all duration-200
                        ${task.completed 
                          ? 'line-through text-gray-500 dark:text-gray-400' 
                          : 'text-gray-800 dark:text-white'}`}
                    >
                      {task.text}
                    </span>
                    <span className="text-xs text-gray-500">
                      {task.completed 
                        ? `Completed ${getTimeAgo(task.completedAt)}`
                        : `Created ${getTimeAgo(task.createdAt)}`}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600 transition-colors p-1 
                    opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No tasks yet. Add one to get started!
              </div>
            )}
          </div>

          {lastDeleted && (
            <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg 
              flex items-center gap-3 animate-fade-in">
              <span>Task deleted!</span>
              <button
                onClick={undoDelete}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Undo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;