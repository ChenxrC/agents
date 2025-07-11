import dotenv from 'dotenv';

dotenv.config();

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
  },
  mcp: {
    serverUrl: process.env.MCP_SERVER_URL || 'http://localhost:3001',
    enabled: process.env.MCP_ENABLED === 'true',
  },
  server: {
    port: process.env.PORT || 4000,
  }
};

// 验证必要的配置
if (!config.openai.apiKey) {
  console.warn('警告: 未设置 OPENAI_API_KEY，AI功能将不可用');
} 