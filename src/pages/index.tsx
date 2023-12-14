/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";

import { api } from "~/utils/api";

export default function Home() {
  //add constants
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  //add functions
  const fetchAllUsers = api.example.getAll.useQuery();
  const fetchOne = api.example.getOne.useQuery({id: userId})

  const createUserMutation = api.example.createUser.useMutation();
  const updateUserMutation = api.example.updateUser.useMutation();
  const deleteUserMutation = api.example.deleteUser.useMutation();

  //add handlers
  const handleCreateUser = async () => {
    try{
      await createUserMutation.mutateAsync({
        name: name,
        email: email,
      });
      setName("");
      setEmail("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,
      });
      setNameToUpdate("");
      setEmailToUpdate("");
      setUserIdToUpdate("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.asyncMutate({
        id: userIdToDelete,
      });
      setUserIdToDelete("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="mx-auto p-8">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Get All Users</h2>
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover"
            onClick={() => fetchAllUsers.refetch()}
          >
            Get All Users
          </button>
          <div className="text- mb-4 mt-4 grid grid-cols-3 gap-4 font-bold">
            <p>Id</p>
            <p>Name</p>
            <p>Email</p>
          </div>
          {fetchAllUsers.data && 
            fetchAllUsers.data.map((user) => (
              <div key={user.id}
                className="my-4 grid grid-cols-3 gap-4 rounded border"
              >
                <p>{user.id}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
