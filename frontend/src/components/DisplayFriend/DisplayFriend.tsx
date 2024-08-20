export const DisplayFriend = ({ id, tag }: { id: string; tag: string }) => {
  return (
    <div key={id} className="flex gap-10 shadow-md p-4 rounded-md">
      <li>
        <h2 className="text-xl">Friend tag: {tag}</h2>
        <p>Friend id: {id}</p>
      </li>
    </div>
  );
};
