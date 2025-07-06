import axios from "axios";
import { Task } from "../types/Task";

const API_URL = `${window.location.origin}/server/taskapi`;

export const getTasks = () => axios.get<Task[]>(API_URL + '/tasks', { withCredentials: true });
export const createTask = (task: Omit<Task, "id">) => axios.post<Task>(API_URL + '/tasks', task, { withCredentials: true });
export const updateTask = (id: number, task: Omit<Task, "id">) => axios.put<Task>(`${API_URL}/tasks/${id}`, task);
export const deleteTask = (id: number) => axios.delete(`${API_URL}/tasks/${id}`);
