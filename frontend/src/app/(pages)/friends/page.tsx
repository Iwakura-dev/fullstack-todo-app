"use client";

import { CreateFriendForm } from "@/components/CreateFriendForm/CreateFriendForm";
import { DisplayFriend } from "@/components/DisplayFriend/DisplayFriend";
import { Main } from "@/components/Main/Main";
import { getAllFriends } from "@/lib/features/friendsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useEffect } from "react";

export default function Friends() {
  const dispatch = useAppDispatch();
  const { friends, loading, error } = useAppSelector((state) => state.friends);

  useEffect(() => {
    dispatch(getAllFriends());
  }, [dispatch]);

  return (
    <div className="py-5">
      <Main title="Welcome to yout friends page!">
        <h1>Your friends</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-900">{error.message}</p>}
        <CreateFriendForm />
        <ul className="grid grid-cols-3 gap-20">
          {friends.map((friend) => {
            return (
              <DisplayFriend
                key={friend._id}
                id={friend._id as string}
                tag={friend.tag}
              />
            );
          })}
        </ul>
      </Main>
    </div>
  );
}
