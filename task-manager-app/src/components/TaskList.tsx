import React, { useEffect, useMemo, useState } from 'react';
import { deleteTask, getTasks, updateTask } from '../api/tasks';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
    show: boolean;
    search: string | null;
    statusFilter: string;
    onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ show, search, statusFilter, onEdit }) => {
    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        fetchTasks();
    }, [show]);

    const fetchTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res?.data || []);
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
        }
    };

    const onDelete = async (id: number) => {
        try {
            await deleteTask(id);
            await fetchTasks();
        } catch (err) {
            console.error('Failed to delete task:', err);
        }
    };
    const statusHandler = async (task: any) => {
        try {
            const payload = { title: task.title, description: task.description, status: "completed" };
            await updateTask(task.ROWID, payload);
            await fetchTasks();
        } catch (err) {
            console.error(err)
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task =>
            (task.title ?? '').toLowerCase().includes((search ?? '').toLowerCase()) &&
            (statusFilter === 'all' || task?.status === statusFilter)
        );
    }, [tasks, search, statusFilter]);

    if (!filteredTasks.length) return <h4 className='no-found'>No tasks available.</h4>;

    return (
        <div className='task-list'>
            {filteredTasks.map((task: Task, index) =>
                <TaskItem key={index} task={task} onEdit={onEdit} onDelete={onDelete} statusHandler={statusHandler} index={index} />
            )}
        </div>
    );
};

export default TaskList;
