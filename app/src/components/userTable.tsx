import { FC } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useUserStore } from '../hooks/useZustandStore';
import { User } from '../types/user';

interface UsersTableProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UsersTable: FC<UsersTableProps> = ({ page, setPage, onEdit, onDelete }) => {
  const { users, isLoading, error } = useUserStore();
  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);

  return (
    <div>
      {!isLoading && !error && (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => onEdit(user)}
                    >
                      <PencilIcon className="h-5 w-5 inline" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 ml-2"
                      onClick={() => onDelete(user.id)} 
                    >
                      <TrashIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 bg-black rounded"
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-black rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersTable;