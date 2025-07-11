import React, { useState } from 'react';
import axios from 'axios';

export default function AgentForm({ onCreated }: { onCreated: () => void }) {
  const [role, setRole] = useState('');

  const handleCreate = async () => {
    if (!role) return;
    await axios.post('/agents', { role });
    setRole('');
    onCreated();
  };

  return (
    <div>
      <h2>创建智能体</h2>
      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="角色"
      />
      <button onClick={handleCreate}>创建</button>
    </div>
  );
} 