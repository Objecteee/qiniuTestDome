# 豆包简历解析器

使用豆包1.5 Vision Pro模型解析PDF简历文件，自动提取关键信息。

## 功能特性

- 📄 支持PDF格式简历解析
- 🔍 自动提取个人信息（姓名、手机、邮箱等）
- 🎓 识别教育经历
- 💼 提取工作经历
- 🛠️ 技能识别
- ✅ 数据格式验证
- 📊 JSON格式输出

## 安装依赖

```bash
# 确保已安装Node.js (版本 >= 14)
node --version

# 安装依赖（如果需要）
npm install
```

## 使用方法

### 1. 命令行使用

```bash
# 解析单个PDF文件
node resume-parser.js <PDF文件路径>

# 示例
node resume-parser.js ./resume.pdf
```

### 2. 编程方式使用

```javascript
const { parseResume } = require('./resume-parser');

async function main() {
    try {
        const result = await parseResume('./resume.pdf');
        console.log('解析结果:', result);
    } catch (error) {
        console.error('解析失败:', error.message);
    }
}

main();
```

### 3. 运行测试

```bash
# 运行测试脚本
node test-resume-parser.js
```

## 输出格式

解析结果以JSON格式返回，包含以下字段：

```json
{
  "personalInfo": {
    "name": "张三",
    "phone": "13800138000",
    "email": "zhangsan@example.com",
    "gender": "男",
    "age": "28",
    "location": "北京市"
  },
  "education": [
    {
      "school": "北京大学",
      "major": "计算机科学与技术",
      "degree": "本科",
      "graduationYear": "2020"
    }
  ],
  "workExperience": [
    {
      "company": "腾讯科技",
      "position": "前端开发工程师",
      "duration": "2020-2023",
      "description": "负责前端开发工作"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js"],
  "summary": "具有3年前端开发经验"
}
```

## 配置说明

### API配置

在 `resume-parser.js` 中修改以下配置：

```javascript
const DOUBAO_API_URL = 'https://openai.qiniu.com/v1/chat/completions';
const API_KEY = 'your-api-key-here';
```

### 模型参数

可以调整以下参数：

- `max_tokens`: 最大返回token数（默认2000）
- `temperature`: 创造性程度（0.1-1.0，默认0.1）
- `detail`: 图像分析详细程度（'low'/'high'，默认'high'）

## 错误处理

脚本包含完整的错误处理机制：

- 文件不存在检查
- 文件格式验证
- API调用错误处理
- 数据格式验证
- 网络超时处理

## 注意事项

1. **API限制**: 确保API密钥有效且有足够的配额
2. **文件大小**: 建议PDF文件不超过10MB
3. **网络连接**: 需要稳定的网络连接访问豆包API
4. **数据准确性**: AI解析结果可能存在误差，建议人工验证

## 故障排除

### 常见问题

1. **"文件不存在"错误**
   - 检查文件路径是否正确
   - 确保文件存在且有读取权限

2. **"API请求失败"错误**
   - 检查API密钥是否正确
   - 确认网络连接正常
   - 验证API配额是否充足

3. **"JSON解析失败"错误**
   - 可能是API返回格式异常
   - 检查PDF文件是否损坏
   - 尝试使用其他PDF文件测试

### 调试模式

在代码中添加更多日志输出：

```javascript
console.log('API响应:', JSON.stringify(apiResult, null, 2));
```

## 更新日志

- v1.0.0: 初始版本，支持基本简历解析功能
- 支持PDF文件读取和Base64编码
- 集成豆包Vision Pro模型
- 实现数据验证和错误处理

## 许可证

MIT License
