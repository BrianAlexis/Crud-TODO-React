import { useState } from 'react';
import type { Todo } from '../types/todo';
import { useSound } from './useSound';

export const useTodos = () => {
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState<Todo[]>([]);
    const keyboardTypingSound = useSound('/sounds/keyboard_typing.mp3');
    const addNewTodoSound = useSound('/sounds/success.mp3');
    const trashSound = useSound('/sounds/trash.mp3');
    const checkSound = useSound('/sounds/check.mp3');


    const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        keyboardTypingSound();
    }

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() === "") return

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: input,
            completed: false
        }

        setTodos([...todos, newTodo])
        setInput("")
        addNewTodoSound();
    }

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
        trashSound()
    }

    const toggleTodo = (id: string) => {
        const newTodo = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo
        })

        setTodos(newTodo)
        checkSound()
    }

    const counterPendingTasks = todos.filter(todo => !todo.completed).length;

    const deletePendingTask = () => {
        const activeTodos = todos.filter(todo => !todo.completed);
        setTodos(activeTodos);
        trashSound();
    }

    // Devolvemos todo lo que la UI necesita usar
    return {
        input,
        todos,
        inputText,
        addTodo,
        deleteTodo,
        toggleTodo,
        counterPendingTasks,
        deletePendingTask
    };
};