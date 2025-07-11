import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AgentForm from './components/AgentForm';
import AgentList from './components/AgentList';
import TaskPanel from './components/TaskPanel';
import './App.css';

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
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🤖</span>
            多智能体控制台
          </h1>
          <p className="app-subtitle">AI Agent Management Platform</p>
        </div>
      </header>
      
      <main className="app-main">
        <div className="dashboard">
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <AgentForm onCreated={fetchData} />
            </div>
            <div className="dashboard-card">
              <AgentList agents={agents} />
            </div>
            <div className="dashboard-card full-width">
              <TaskPanel tasks={tasks} onCreated={fetchData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 