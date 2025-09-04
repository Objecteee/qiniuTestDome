const fs = require('fs');
const path = require('path');

// 豆包API配置
const DOUBAO_API_URL = 'https://openai.qiniu.com/v1/chat/completions';
const API_KEY = 'sk-044a134c2c7ca3794b952d77137f212dd4479fe4980c8fae1071e15289f15289';

/**
 * 将图片文件转换为Base64编码
 * @param {string} filePath - 图片文件路径
 * @returns {string} Base64编码的字符串
 */
function imageToBase64(filePath) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const base64String = fileBuffer.toString('base64');
        return base64String;
    } catch (error) {
        throw new Error(`读取图片文件失败: ${error.message}`);
    }
}

/**
 * 调用豆包Vision Pro模型解析简历图片
 * @param {string} base64Image - Base64编码的图片内容
 * @param {string} fileName - 文件名
 * @returns {Promise<Object>} 解析结果
 */
async function parseResumeWithDoubao(base64Image, fileName) {
    const prompt = `请仔细分析这张简历图片，识别并提取以下关键信息，以JSON格式返回：

{
  "personalInfo": {
    "name": "姓名",
    "phone": "手机号",
    "email": "邮箱地址",
    "gender": "性别",
    "age": "年龄",
    "location": "居住地"
  },
  "education": [
    {
      "school": "学校名称",
      "major": "专业",
      "degree": "学历",
      "graduationYear": "毕业年份"
    }
  ],
  "workExperience": [
    {
      "company": "公司名称",
      "position": "职位",
      "duration": "工作时间",
      "description": "工作描述"
    }
  ],
  "skills": ["技能1", "技能2"],
  "summary": "个人简介或自我评价"
}

重要要求：
1. 仔细识别图片中的文字内容，特别是手机号和邮箱
2. 手机号必须是11位数字，格式如：13800138000
3. 邮箱必须包含@符号，格式如：example@email.com
4. 如果图片中找不到某些信息，请设置为null
5. 只返回JSON格式，不要包含任何其他文字说明
6. 确保JSON格式正确，可以被解析`;

    try {
        const response = await fetch(DOUBAO_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stream: false,
                model: 'doubao-1.5-vision-pro',
                messages: [
                    {
                        role: 'system',
                        content: '你是一个专业的简历解析助手，能够准确提取简历中的关键信息。'
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: prompt
                            },
                                                         {
                                 type: 'image_url',
                                 image_url: {
                                     url: `data:image/png;base64,${base64Image}`,
                                     detail: 'high'
                                 }
                             }
                        ]
                    }
                ],
                max_tokens: 2000,
                temperature: 0.1
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.error) {
            throw new Error(`API错误: ${result.error.message}`);
        }

        return result;
    } catch (error) {
        throw new Error(`调用豆包API失败: ${error.message}`);
    }
}

/**
 * 解析豆包返回的JSON内容
 * @param {string} content - 豆包返回的内容
 * @returns {Object} 解析后的简历信息
 */
function parseDoubaoResponse(content) {
    try {
        // 尝试直接解析JSON
        return JSON.parse(content);
    } catch (error) {
        // 如果直接解析失败，尝试提取JSON部分
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch (parseError) {
                console.warn('JSON解析失败，返回原始内容');
                return { rawContent: content };
            }
        }
        throw new Error('无法从响应中提取有效的JSON数据');
    }
}

/**
 * 验证提取的信息
 * @param {Object} resumeData - 简历数据
 */
function validateResumeData(resumeData) {
    const issues = [];
    
    if (resumeData.personalInfo) {
        const { phone, email } = resumeData.personalInfo;
        
        // 验证手机号
        if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
            issues.push(`手机号格式不正确: ${phone}`);
        }
        
        // 验证邮箱
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            issues.push(`邮箱格式不正确: ${email}`);
        }
    }
    
    if (issues.length > 0) {
        console.warn('数据验证警告:');
        issues.forEach(issue => console.warn(`- ${issue}`));
    }
    
    return issues.length === 0;
}

/**
 * 主函数：解析简历图片
 * @param {string} imagePath - 图片文件路径
 */
async function parseResume(imagePath) {
    try {
        console.log(`开始解析简历图片: ${imagePath}`);
        
        // 检查文件是否存在
        if (!fs.existsSync(imagePath)) {
            throw new Error(`文件不存在: ${imagePath}`);
        }
        
        // 检查文件扩展名
        const ext = path.extname(imagePath).toLowerCase();
        const supportedFormats = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
        if (!supportedFormats.includes(ext)) {
            throw new Error(`不支持的文件格式: ${ext}，支持的格式: ${supportedFormats.join(', ')}`);
        }
        
        // 转换为Base64
        console.log('正在读取图片文件...');
        const base64Image = imageToBase64(imagePath);
        console.log(`图片文件大小: ${Math.round(base64Image.length / 1024)} KB`);
        
        // 调用豆包API
        console.log('正在调用豆包Vision Pro模型...');
        const apiResult = await parseResumeWithDoubao(base64Image, path.basename(imagePath));
        
        if (!apiResult.choices || !apiResult.choices[0]) {
            throw new Error('API返回格式异常');
        }
        
        const content = apiResult.choices[0].message.content;
        console.log('豆包API调用成功，正在解析结果...');
        
        // 解析返回的JSON
        const resumeData = parseDoubaoResponse(content);
        
        // 验证数据
        const isValid = validateResumeData(resumeData);
        
        // 输出结果
        console.log('\n=== 简历解析结果 ===');
        console.log(JSON.stringify(resumeData, null, 2));
        
        if (isValid) {
            console.log('\n✅ 数据验证通过');
        } else {
            console.log('\n⚠️ 数据验证发现问题，请检查上述警告');
        }
        
        // 保存结果到文件
        const outputPath = imagePath.replace(path.extname(imagePath), '_parsed.json');
        fs.writeFileSync(outputPath, JSON.stringify(resumeData, null, 2), 'utf8');
        console.log(`\n结果已保存到: ${outputPath}`);
        
        return resumeData;
        
    } catch (error) {
        console.error(`❌ 解析失败: ${error.message}`);
        throw error;
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    const imagePath = process.argv[2];
    
    if (!imagePath) {
        console.log('使用方法: node resume-parser.js <图片文件路径>');
        console.log('示例: node resume-parser.js ./resume.png');
        console.log('支持的格式: PNG, JPG, JPEG, GIF, BMP, WEBP');
        process.exit(1);
    }
    
    parseResume(imagePath)
        .then(() => {
            console.log('\n✅ 简历解析完成');
        })
        .catch((error) => {
            console.error('\n❌ 简历解析失败:', error.message);
            process.exit(1);
        });
}

module.exports = {
    parseResume,
    imageToBase64,
    parseResumeWithDoubao,
    parseDoubaoResponse,
    validateResumeData
};
