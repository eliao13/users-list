/**
 * Instructions:
 * Your task is to create a React component that displays a sorted list of users.
 * This component fetches user data from the API and displays the result.
 * The API endpoint is provided as `API_ENDPOINT` and returns an array of 5 users.
 * The User type describes the shape of a single user.
 *
 * Acceptance Criteria:
 * - users are sorted by their `createdAt` property in descending order
 * - show each user's name, creation date and avatar image
 *
 * Notes:
 * Don't worry about styling or complicated layouts. Any clear and readable presentation is acceptable.
 * This is a Typescript project but feel free to use vanilla JavaScript.
 * Include any added dependencies in `package.json` file.
 * The estimated time to complete this challenge is 30 minutes.
 *
 */

import { useEffect, useState } from "react";

const API_ENDPOINT = "https://66f44b0177b5e88970990f5f.mockapi.io/users";

type User = {
  id: string;
  createdAt: string; // This is an ISO string eg. "2023-01-01T00:00:00.000Z"
  name: string;
  avatar: string; // This is a URL to an image
};

function Users() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unexpected error.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const sortedUserList = users.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      {sortedUserList.map((user) => (
        <div key={user.id}>
          <img src={user.avatar} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{new Date(user.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;
