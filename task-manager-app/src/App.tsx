import { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import { Button, Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import TaskList from './components/TaskList';

declare global {
  interface Window {
    catalyst: any;
  }
}
const redirectURL = "/__catalyst/auth/login";

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

  const logout = () => {
    window.catalyst.auth.signOut(redirectURL);
  }

  useEffect(() => {
    const initCatalyst = async () => {
      try {
        const result: any = await window.catalyst.auth.isUserAuthenticated();
        if (!result.content)
          window.location.href = redirectURL;
      } catch (error) {
        window.location.href = redirectURL;
        console.error('Catalyst initialization failed:', error);
      }
    };

    initCatalyst();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Task Manager App
        </h1>
        <Button onClick={logout} title='logout' className='position-absolute end-0'>
          <i className="bi bi-box-arrow-right"></i>
        </Button>
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
