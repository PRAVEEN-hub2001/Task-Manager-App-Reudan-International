import { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import { Button, Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import TaskList from './components/TaskList';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  const onOpen = () => setShowModal(true);

  const onClose = () => {
    setShowModal(false)
    setSelectedTask(null);
  };

  const onEdit = (task: any) => {
    setSelectedTask(task);
    setShowModal(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Task Manager App
        </h1>
      </header>

      <Navbar className="bg-body-tertiary py-3 rounded-3">
        <Container>
          <Row className="w-100 align-items-center justify-content-end g-2">
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={e => setSearch(e.target.value.trim())}
              />
            </Col>
            <Col md={1}>
              <Button onClick={onOpen}>+</Button>
            </Col>
            <Col md={2}>
              <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </Navbar>

      <TaskList show={showModal} onEdit={onEdit} search={search} statusFilter={statusFilter} />
      
      {showModal &&
        <TaskForm onClose={onClose} show={showModal} selectedTask={selectedTask} />}

    </div>
  );
}

export default App;
