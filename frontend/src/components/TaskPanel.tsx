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

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'done': return 'done';
      case 'running': return 'running';
      default: return '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done': return <span className="status-badge status-done">完成</span>;
      case 'running': return <span className="status-badge status-running">执行中</span>;
      default: return <span className="status-badge status-pending">等待中</span>;
    }
  };

  return (
    <div>
      <h2 className="card-title">
        <span>📋</span>
        任务管理
        <span className="status-badge status-pending">{tasks.length}</span>
      </h2>
      
      <div className="form-group">
        <input
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="输入任务描述，如：分析用户数据、搜索相关信息..."
          onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
        />
      </div>
      <button className="btn" onClick={handleCreate}>
        <span>🚀</span> 创建任务
      </button>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>任务列表</h3>
        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <p>暂无任务，请创建一个新任务</p>
          </div>
        ) : (
          <ul className="list">
            {tasks.map((task) => (
              <li key={task.id} className={`list-item ${getStatusClass(task.status)}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <strong>{task.description}</strong>
                      {getStatusBadge(task.status)}
                    </div>
                    {task.result && (
                      <div style={{ 
                        fontSize: '0.9rem', 
                        color: '#4a5568', 
                        background: '#f7fafc', 
                        padding: '8px', 
                        borderRadius: '6px',
                        marginTop: '8px'
                      }}>
                        <strong>结果:</strong> {task.result}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 