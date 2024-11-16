import { FC, useEffect, useState } from 'react';
import { useUserStore } from '../hooks/useZustandStore';
import { User } from '../types/user';

const UserFormModal: FC<{ onAddNewUser: (user: User) => void; selectedUser: User | null }> = ({ onAddNewUser, selectedUser }) => {
  const { isModalOpen, setIsModalOpen, updateUser } = useUserStore();
  const [userData, setUserData] = useState<User | null>(selectedUser);
  useEffect(() => {
    setUserData(selectedUser);
  }, [selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData) {
      if (userData.id) {
        console.log('Updating user:', userData);
        updateUser(userData); 
      } else {
        console.log('Adding new user:', userData);
        onAddNewUser({ ...userData, id: Date.now() }); 
      }
      setIsModalOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => (prev ? { ...prev, [name]: value } : { [name]: value }));
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{userData?.id ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData?.name || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-black" 
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData?.email || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-black" 
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-black">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={userData?.role || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {userData?.id ? 'Update User' : 'Add User'}
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-black hover:text-gray-700"
        >
        </button>
      </div>
    </div>
  );
};

export default UserFormModal;