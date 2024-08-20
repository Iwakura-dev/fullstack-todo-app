"use client";

import { Main } from "@/components/Main/Main";
import { createFriends, getAllFriends } from "@/lib/features/friendsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function Friends() {
  const [friendsTag, setFriendsTag] = useState("");

  const dispatch = useAppDispatch();
  const { friends, loading, error } = useAppSelector((state) => state.friends);

  useEffect(() => {
    dispatch(getAllFriends());
  }, [dispatch]);

  const handleCreateFriends = (friendsId: string, e: React.FormEvent) => {
    e.preventDefault();

    if (friendsTag && friendsId) {
      dispatch(createFriends({ userId: friendsId, tag: friendsTag }));
      setFriendsTag("");
    }
  };

  return (
    <div className="py-5">
      <Main title="Welcome to yout friends page!">
        <h1>Your friends</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-900">{error.message}</p>}
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
            Add Todo
          </button>
        </form>
        <ul className="grid grid-cols-3 gap-20">
          {friends.map((friend) => {
            return (
              <div
                key={friend._id}
                className="flex gap-10 shadow-md p-4 rounded-md"
              >
                <li>
                  <h2 className="text-xl">Friend tag: {friend.tag}</h2>
                  <p>Friend id: {friend._id}</p>
                </li>
              </div>
            );
          })}
        </ul>
      </Main>
    </div>
  );
}
