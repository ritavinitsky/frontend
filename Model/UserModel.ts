import apiClient from '../api/ClientApi';

export interface User {
    id: string;
    name: string;
    age: number;
    email: string;
    dailyCal: string;
}

const getUserById = async (userId: string, refreshToken: string): Promise<{ currentUser: User } | null> => {
  try {
    console.log("trying get user")
    const response = await apiClient.get(/user/${userId}, {
      headers: {
        'authorization': Bearer ${refreshToken}
      }
    });

    if (response.ok && response.data) {
      const currentUser = response.data as User;
      return { currentUser };
    } else {
      console.error("Failed to fetch user:", response.problem);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export default { getUserById };