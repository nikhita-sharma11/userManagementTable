'use client'

import { useEffect, useState } from 'react';
import UsersTable from './src/components/userTable';
import UserFormModal from './src/components/userFormModal';
import { useUserStore } from './src/hooks/useZustandStore';
import { QueryClient, QueryClientProvider } from 'react-query';


const Home = () => {
  const [page, setPage] = useState(1);
  const { 
    isModalOpen, 
    setIsModalOpen, 
    selectedUser, 
    setSelectedUser, 
    addUser, 
    users, 
    deleteUser, 
    fetchUsers, 
    isLoading, 
    error 
  } = useUserStore();
  const queryClient = new QueryClient();
  useEffect(() => {
    fetchUsers(page); 
  }, [fetchUsers, page]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleNewUserAdded = (newUser) => {
    addUser(newUser); 
  };

  const handleEditUser = (user) => {
    setSelectedUser(user); 
    setIsModalOpen(true); 
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">User Management Table</h1>
        <button
          onClick={handleAddUser}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        <UsersTable
          page={page}
          setPage={setPage}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
        {isModalOpen && <UserFormModal onAddNewUser={handleNewUserAdded} selectedUser={selectedUser} />}
      </div>
    </QueryClientProvider>
  );
};

export default Home;