import React from 'react';

export default function AgentList({ agents }: { agents: any[] }) {
  return (
    <div>
      <h2 className="card-title">
        <span>👥</span>
        智能体列表
        <span className="status-badge status-pending">{agents.length}</span>
      </h2>
      {agents.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
          <p>暂无智能体，请先创建一个</p>
        </div>
      ) : (
        <ul className="list">
          {agents.map((agent) => (
            <li key={agent.id} className="list-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{agent.role}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#718096', marginTop: '4px' }}>
                    ID: {agent.id.slice(0, 8)}...
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#48bb78' }}>
                  <span>🟢</span> 在线
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 