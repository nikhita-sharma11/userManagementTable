import { create } from 'zustand';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}