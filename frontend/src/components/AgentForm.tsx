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
      <h2 className="card-title">
        <span>🤖</span>
        创建智能体
      </h2>
      <div className="form-group">
        <input
          className="form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="输入智能体角色，如：数据分析师、搜索专家..."
          onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
        />
      </div>
      <button className="btn" onClick={handleCreate}>
        <span>✨</span> 创建智能体
      </button>
    </div>
  );
} 