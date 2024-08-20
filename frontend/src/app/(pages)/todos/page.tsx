"use client";

import { Main } from "@/components/Main/Main";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getAllTodos, deleteTodo, createTodo } from "@/lib/features/todoSlice";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function Todos() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const handleCreateTodo = (userId: string, e: React.FormEvent) => {
    e.preventDefault();

    if (title && description) {
      dispatch(createTodo({ userId, title, description }));
      setTitle("");
      setDescription("");
    }
  };
  return (
    <div className="py-5">
      <Main title="Welcome to your todos page!">
        <h1>Your todos</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-900">{error.message}</p>}
        <form onSubmit={(e) => handleCreateTodo(uuid(), e)} className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mr-2"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 mr-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Todo
          </button>
        </form>
        <ul className="grid grid-cols-3 gap-20">
          {todos.map((todo) => {
            return (
              <div
                key={todo._id}
                className="flex gap-10 shadow-md p-4 rounded-md"
              >
                <li>
                  <h2 className="text-xl">Title: {todo.title}</h2>
                  <p>Description: {todo.description}</p>
                </li>
                <div>
                  <button
                    type="button"
                    className="bg-red-900 text-white px-6 py-1 rounded-full"
                    onClick={(e) => dispatch(deleteTodo(todo._id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </Main>
    </div>
  );
}
