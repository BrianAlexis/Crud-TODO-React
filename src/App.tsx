import React from 'react';
import { useTodos } from "./hooks/useTodo";


const App: React.FC = () => {
  const { input, todos, inputText, addTodo, deleteTodo, toggleTodo, counterPendingTasks, deletePendingTask } = useTodos();

  return (
    <div className="min-h-screen bg-indigo-900 flex items-center justify-center p-4">
      {/* Contenedor Principal */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

        {/* Header */}
        <div className="bg-pink-500-600 p-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className='text-black'>Listado de Tareas</span>
          </h1>
        </div>

        <div className="p-6">
          {/* Formulario de Entrada */}
          <form
            onSubmit={addTodo}
            className="flex gap-2 mb-8">
            <input
              type="text"
              placeholder="¿Qué tareas tienes pendiente?"
              value={input}
              onChange={inputText}
              className="flex-1 px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700"
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-200"
            >
              Añadir
            </button>
          </form>

          {/* Lista de Tareas */}
          <div className="space-y-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-3">
                  {/* Botón de Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed ? 'bg-indigo-500 border-indigo-500' : 'text-indigo-500 hover:border-indigo-700'
                      }`}
                  >
                    {todo.completed && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  {/* Texto de la tarea dinámico */}
                  <span className={`font-medium ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {todo.text}
                  </span>
                </div>

                {/* Botón de eliminar */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-600 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}

            {/* Mensaje si no hay tareas */}
            {todos.length === 0 && (
              <p className="text-center text-slate-400 text-sm italic">No hay tareas pendientes. ¡A descansar!</p>
            )}
          </div>

          {/* Footer / Stats */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-sm text-slate-400">
            {counterPendingTasks === 0 ? (
              <p>¡Todo listo! No hay tareas.</p>
            ) : (
              <p>Tienes {counterPendingTasks} tareas pendientes</p>
            )}
            <button
              onClick={deletePendingTask}
              className="hover:text-indigo-600 transition-colors">Limpiar completadas</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;