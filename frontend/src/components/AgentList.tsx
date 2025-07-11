import React from 'react';

export default function AgentList({ agents }: { agents: any[] }) {
  return (
    <div>
      <h2>智能体列表</h2>
      <ul>
        {agents.map((a) => (
          <li key={a.id}>
            {a.id.slice(0, 8)} - {a.role}
          </li>
        ))}
      </ul>
    </div>
  );
} 