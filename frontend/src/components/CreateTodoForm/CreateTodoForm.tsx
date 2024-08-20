"use client";

import { createTodo } from "@/lib/features/todoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const CreateTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state) => state.todo);

  const handleCreateTodo = (userId: string, e: React.FormEvent) => {
    e.preventDefault();

    if (title && description) {
      dispatch(createTodo({ userId, title, description }));
      setTitle("");
      setDescription("");
    }
  };

  return (
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
  );
};
