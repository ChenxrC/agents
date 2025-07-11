import React, { useState } from 'react';
import axios from 'axios';

export default function TaskPanel({ tasks, onCreated }: { tasks: any[]; onCreated: () => void }) {
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    if (!description) return;
    await axios.post('/tasks', { description });
    setDescription('');
    onCreated();
  };

  return (
    <div>
      <h2>任务</h2>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="任务描述"
      />
      <button onClick={handleCreate}>创建任务</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.description} - {t.status} {t.result && `: ${t.result}`}
          </li>
        ))}
      </ul>
    </div>
  );
} 