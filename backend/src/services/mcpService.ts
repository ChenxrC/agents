import axios from 'axios';
import { config } from '../config';

export interface MCPTool {
  name: string;
  description: string;
  parameters: any;
}

export interface MCPCallResult {
  success: boolean;
  result?: any;
  error?: string;
}

export class MCPService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.mcp.serverUrl;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/health`, { timeout: 5000 });
      return response.status === 200;
    } catch (error) {
      console.warn('MCP服务不可用:', error);
      return false;
    }
  }

  async listTools(): Promise<MCPTool[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/tools`);
      return response.data.tools || [];
    } catch (error) {
      console.error('获取MCP工具列表失败:', error);
      return [];
    }
  }

  async callTool(toolName: string, parameters: any): Promise<MCPCallResult> {
    try {
      const response = await axios.post(`${this.baseUrl}/tools/${toolName}`, {
        parameters
      }, { timeout: 30000 });

      return {
        success: true,
        result: response.data.result
      };
    } catch (error: any) {
      console.error(`调用MCP工具 ${toolName} 失败:`, error);
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  }

  async webSearch(query: string): Promise<MCPCallResult> {
    return this.callTool('web_search', { query });
  }

  async fileRead(filePath: string): Promise<MCPCallResult> {
    return this.callTool('file_read', { path: filePath });
  }

  async fileWrite(filePath: string, content: string): Promise<MCPCallResult> {
    return this.callTool('file_write', { path: filePath, content });
  }

  async codeExecution(code: string, language: string = 'python'): Promise<MCPCallResult> {
    return this.callTool('code_execution', { code, language });
  }

  async databaseQuery(query: string, database: string): Promise<MCPCallResult> {
    return this.callTool('database_query', { query, database });
  }

  async imageGeneration(prompt: string, size: string = '1024x1024'): Promise<MCPCallResult> {
    return this.callTool('image_generation', { prompt, size });
  }
} 