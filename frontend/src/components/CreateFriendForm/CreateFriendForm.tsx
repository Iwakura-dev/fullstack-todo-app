import { createFriends } from "@/lib/features/friendsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const CreateFriendForm = () => {
  const [friendsTag, setFriendsTag] = useState("");

  const dispatch = useAppDispatch();
  const { friends, loading, error } = useAppSelector((state) => state.friends);

  const handleCreateFriends = (friendsId: string, e: React.FormEvent) => {
    e.preventDefault();

    if (friendsTag && friendsId) {
      dispatch(createFriends({ userId: friendsId, tag: friendsTag }));
      setFriendsTag("");
    }
  };
  return (
    <form onSubmit={(e) => handleCreateFriends(uuid(), e)} className="mb-4">
      <input
        type="text"
        placeholder="Friends tag"
        value={friendsTag}
        onChange={(e) => setFriendsTag(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Friends
      </button>
    </form>
  );
};
