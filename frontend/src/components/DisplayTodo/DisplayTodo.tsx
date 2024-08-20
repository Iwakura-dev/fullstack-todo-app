import { deleteTodo } from "@/lib/features/todoSlice";

export const DisplayTodo = ({
  id,
  title,
  description,
  dispatch,
}: {
  id: string;
  title: string;
  description: string;
  dispatch: any;
}) => {
  return (
    <div key={id} className="flex gap-10 shadow-md p-4 rounded-md">
      <li>
        <h2 className="text-xl">Title: {title}</h2>
        <p>Description: {description}</p>
      </li>
      <div>
        <button
          type="button"
          className="bg-red-900 text-white px-6 py-1 rounded-full"
          onClick={(e) => dispatch(deleteTodo(id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
