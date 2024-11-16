import { create } from 'zustand';
import { User } from '../types/user';
import { fetchUsers } from '../utils/api';

interface UserStore {
    users: User[];
    selectedUser: User | null;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    setSelectedUser: (user: User | null) => void;
    addUser: (user: User) => void;
    updateUser: (updatedUser: User) => void;
    deleteUser: (id: number) => void;
    fetchUsers: (page: number) => void;
    isLoading: boolean;
    error: string | null;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    selectedUser: null,
    isModalOpen: false,
    isLoading: false,
    error: null,
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
    setSelectedUser: (user) => set({ selectedUser: user }),
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    updateUser: (updatedUser) => set((state) => ({
        users: state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        ),
    })),
    deleteUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id),
    })),
    fetchUsers: async (page: number) => {
        set({ isLoading: true, error: null });
        try {
            const data = await fetchUsers(page);
            set({ users: data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch users' });
        }
    },
}));
