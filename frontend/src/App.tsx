import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AgentForm from './components/AgentForm';
import AgentList from './components/AgentList';
import TaskPanel from './components/TaskPanel';

export default function App() {
  const [agents, setAgents] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchData = async () => {
    const [agentsRes, tasksRes] = await Promise.all([
      axios.get('/agents'),
      axios.get('/tasks')
    ]);
    setAgents(agentsRes.data);
    setTasks(tasksRes.data);
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>多智能体控制台</h1>
      <AgentForm onCreated={fetchData} />
      <AgentList agents={agents} />
      <TaskPanel tasks={tasks} onCreated={fetchData} />
    </div>
  );
} 