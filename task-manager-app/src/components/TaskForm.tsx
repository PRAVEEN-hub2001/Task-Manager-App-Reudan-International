import React, { useState, useEffect } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { createTask, updateTask } from "../api/tasks";

interface TaskFormProps {
    selectedTask?: any | null;
    onClose: () => void;
    show: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ selectedTask, show, onClose }) => {
    const [form, setForm] = useState({ title: "", description: "" });
    const [status, setStatus] = useState({ error: "", success: "", loading: false });

    useEffect(() => {
        setForm({
            title: selectedTask?.title || "",
            description: selectedTask?.description || ""
        });
        setStatus({ error: "", success: "", loading: false });
    }, [selectedTask, show]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setStatus(prev => ({ ...prev, error: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) return setStatus(prev => ({ ...prev, error: "Title is required." }));

        setStatus({ error: "", success: "", loading: true });
        try {
            const payload = { title: form.title.trim(), description: form.description.trim() };
            const res: any = selectedTask?.ROWID
                ? await updateTask(selectedTask.ROWID, payload)
                : await createTask(payload);

            setStatus({ error: "", success: res?.data?.message || "Success", loading: false });

            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: "" }))
                selectedTask?.ROWID && onClose();
            }, 1500);

            setForm({
                title: "",
                description: ""
            });

        } catch (err: any) {
            console.error(err);
            setStatus({ error: err?.response?.data?.message || "Failed to save task.", success: "", loading: false });
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedTask ? "Update Task" : "Add Task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Title"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                    </Form.Group>
                    {status.error && <Alert variant="danger">{status.error}</Alert>}
                    {status.success && <Alert variant="success">{status.success}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" disabled={status.loading}>
                        {status.loading ? "Saving..." : selectedTask ? "Update" : "Add"}
                    </Button>
                    <Button variant="secondary" onClick={onClose} disabled={status.loading}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default TaskForm;
