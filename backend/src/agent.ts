import { v4 as uuidv4 } from 'uuid';
import { Task } from './task';
import { OpenAIService } from './services/openaiService';
import { MCPService } from './services/mcpService';

export interface AgentCapabilities {
  canAnalyze: boolean;
  canSearch: boolean;
  canCode: boolean;
  canGenerateImages: boolean;
  canAccessFiles: boolean;
  canQueryDatabase: boolean;
}

export class Agent {
  public readonly id: string;
  public tasks: Task[] = [];
  public capabilities: AgentCapabilities;
  private openaiService: OpenAIService;
  private mcpService: MCPService;

  constructor(public role: string) {
    this.id = uuidv4();
    this.openaiService = new OpenAIService();
    this.mcpService = new MCPService();
    this.capabilities = this.defineCapabilities(role);
  }

  private defineCapabilities(role: string): AgentCapabilities {
    const baseCapabilities = {
      canAnalyze: true,
      canSearch: true,
      canCode: false,
      canGenerateImages: false,
      canAccessFiles: false,
      canQueryDatabase: false,
    };

    switch (role.toLowerCase()) {
      case '数据分析师':
        return {
          ...baseCapabilities,
          canAnalyze: true,
          canQueryDatabase: true,
          canAccessFiles: true,
        };
      case '搜索专家':
        return {
          ...baseCapabilities,
          canSearch: true,
          canAnalyze: true,
        };
      case '程序员':
        return {
          ...baseCapabilities,
          canCode: true,
          canAnalyze: true,
          canAccessFiles: true,
        };
      case '设计师':
        return {
          ...baseCapabilities,
          canGenerateImages: true,
          canAnalyze: true,
        };
      case '研究员':
        return {
          ...baseCapabilities,
          canSearch: true,
          canAnalyze: true,
          canAccessFiles: true,
          canQueryDatabase: true,
        };
      default:
        return baseCapabilities;
    }
  }

  async runTask(task: Task): Promise<Task> {
    try {
      task.status = 'running';
      console.log(`智能体 ${this.role} (${this.id}) 开始执行任务: ${task.description}`);

      // 分析任务类型并执行相应的功能
      const result = await this.executeTaskByType(task.description);
      
      task.status = 'done';
      task.result = result;
      
      console.log(`智能体 ${this.role} 完成任务: ${task.description}`);
      return task;
    } catch (error) {
      console.error(`智能体 ${this.role} 执行任务失败:`, error);
      task.status = 'done';
      task.result = `任务执行失败: ${error instanceof Error ? error.message : '未知错误'}`;
      return task;
    }
  }

  private async executeTaskByType(taskDescription: string): Promise<string> {
    const lowerDescription = taskDescription.toLowerCase();
    
    // 搜索相关任务
    if (this.capabilities.canSearch && this.containsSearchKeywords(lowerDescription)) {
      return await this.handleSearchTask(taskDescription);
    }
    
    // 数据分析任务
    if (this.capabilities.canAnalyze && this.containsAnalysisKeywords(lowerDescription)) {
      return await this.handleAnalysisTask(taskDescription);
    }
    
    // 代码执行任务
    if (this.capabilities.canCode && this.containsCodeKeywords(lowerDescription)) {
      return await this.handleCodeTask(taskDescription);
    }
    
    // 图像生成任务
    if (this.capabilities.canGenerateImages && this.containsImageKeywords(lowerDescription)) {
      return await this.handleImageTask(taskDescription);
    }
    
    // 文件操作任务
    if (this.capabilities.canAccessFiles && this.containsFileKeywords(lowerDescription)) {
      return await this.handleFileTask(taskDescription);
    }
    
    // 数据库查询任务
    if (this.capabilities.canQueryDatabase && this.containsDatabaseKeywords(lowerDescription)) {
      return await this.handleDatabaseTask(taskDescription);
    }
    
    // 默认使用AI分析
    return await this.openaiService.executeTask(taskDescription, this.role);
  }

  private containsSearchKeywords(description: string): boolean {
    const keywords = ['搜索', '查找', '查询', '获取', '爬取', '收集', 'research', 'search', 'find'];
    return keywords.some(keyword => description.includes(keyword));
  }

  private containsAnalysisKeywords(description: string): boolean {
    const keywords = ['分析', '统计', '报告', '总结', '评估', 'analyze', 'analysis', 'report', 'summary'];
    return keywords.some(keyword => description.includes(keyword));
  }

  private containsCodeKeywords(description: string): boolean {
    const keywords = ['代码', '编程', '开发', '脚本', '程序', 'code', 'program', 'script', 'develop'];
    return keywords.some(keyword => description.includes(keyword));
  }

  private containsImageKeywords(description: string): boolean {
    const keywords = ['图片', '图像', '生成', '设计', 'image', 'picture', 'generate', 'design'];
    return keywords.some(keyword => description.includes(keyword));
  }

  private containsFileKeywords(description: string): boolean {
    const keywords = ['文件', '读取', '写入', '保存', 'file', 'read', 'write', 'save'];
    return keywords.some(keyword => description.includes(keyword));
  }

  private containsDatabaseKeywords(description: string): boolean {
    const keywords = ['数据库', '查询', '数据', 'database', 'query', 'data'];
    return keywords.some(keyword => description.includes(keyword));
  }

  private async handleSearchTask(description: string): Promise<string> {
    const mcpAvailable = await this.mcpService.isAvailable();
    if (!mcpAvailable) {
      return await this.openaiService.executeTask(description, this.role);
    }

    // 提取搜索关键词
    const searchQuery = this.extractSearchQuery(description);
    const searchResult = await this.mcpService.webSearch(searchQuery);
    
    if (searchResult.success) {
      return await this.openaiService.searchAndSummarize(searchQuery, [searchResult.result]);
    } else {
      return `搜索失败: ${searchResult.error}`;
    }
  }

  private async handleAnalysisTask(description: string): Promise<string> {
    return await this.openaiService.executeTask(description, this.role);
  }

  private async handleCodeTask(description: string): Promise<string> {
    const mcpAvailable = await this.mcpService.isAvailable();
    if (!mcpAvailable) {
      return await this.openaiService.executeTask(description, this.role);
    }

    // 使用AI生成代码
    const codePrompt = `请为以下任务生成代码：${description}。请只返回代码，不要其他解释。`;
    const generatedCode = await this.openaiService.generateResponse(codePrompt);
    
    // 执行代码
    const executionResult = await this.mcpService.codeExecution(generatedCode);
    
    if (executionResult.success) {
      return `代码执行成功！\n\n生成的代码：\n\`\`\`\n${generatedCode}\n\`\`\`\n\n执行结果：\n${executionResult.result}`;
    } else {
      return `代码执行失败：${executionResult.error}\n\n生成的代码：\n\`\`\`\n${generatedCode}\n\`\`\``;
    }
  }

  private async handleImageTask(description: string): Promise<string> {
    const mcpAvailable = await this.mcpService.isAvailable();
    if (!mcpAvailable) {
      return await this.openaiService.executeTask(description, this.role);
    }

    const imageResult = await this.mcpService.imageGeneration(description);
    
    if (imageResult.success) {
      return `图像生成成功！\n\n图像URL: ${imageResult.result.url || imageResult.result}`;
    } else {
      return `图像生成失败: ${imageResult.error}`;
    }
  }

  private async handleFileTask(description: string): Promise<string> {
    const mcpAvailable = await this.mcpService.isAvailable();
    if (!mcpAvailable) {
      return await this.openaiService.executeTask(description, this.role);
    }

    // 这里可以根据具体需求实现文件操作
    return await this.openaiService.executeTask(description, this.role);
  }

  private async handleDatabaseTask(description: string): Promise<string> {
    const mcpAvailable = await this.mcpService.isAvailable();
    if (!mcpAvailable) {
      return await this.openaiService.executeTask(description, this.role);
    }

    // 这里可以根据具体需求实现数据库查询
    return await this.openaiService.executeTask(description, this.role);
  }

  private extractSearchQuery(description: string): string {
    // 简单的关键词提取逻辑
    const searchKeywords = ['搜索', '查找', '查询', '获取', 'research', 'search', 'find'];
    for (const keyword of searchKeywords) {
      const index = description.indexOf(keyword);
      if (index !== -1) {
        return description.substring(index + keyword.length).trim();
      }
    }
    return description;
  }
} 