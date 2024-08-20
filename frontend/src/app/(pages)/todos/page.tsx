"use client";

import { Main } from "@/components/Main/Main";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getAllTodos } from "@/lib/features/todoSlice";
import { useEffect } from "react";
import { CreateTodoForm } from "@/components/CreateTodoForm/CreateTodoForm";
import { DisplayTodo } from "@/components/DisplayTodo/DisplayTodo";
export default function Todos() {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  return (
    <div className="py-5">
      <Main title="Welcome to your todos page!">
        <h1>Your todos</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-900">{error.message}</p>}
        <CreateTodoForm />
        <ul className="grid grid-cols-3 gap-20">
          {todos.map((todo) => {
            return (
              <DisplayTodo
                id={todo._id}
                title={todo.title as string}
                description={todo.description as string}
                dispatch={dispatch}
              />
            );
          })}
        </ul>
      </Main>
    </div>
  );
}
