const axios = require('axios'); // 需要先安装axios: npm install axios

// 接口配置
const API_URL = 'https://openapi.italent.cn/RecruitV6/api/v1/Job/CreateJob';

// 请求数据 - 只包含必填字段
const requestData = {
  "jobTitle": "测试开发工程师",
  "headCount": 10,
  "orgId": 4638021,
  "kind": 1,
  "category": 1,
  "locId": ["201", "202"],
  "salaryType": 1,
  "require": "1~2年工作经验\n掌握C#、Java、Python一种或几种编程语言",
  "hrDutyUser": 108371187,
  "status": 1,
  "createBy": 108371187
};

// 发送请求
async function createJob() {
  try {
    const response = await axios.post(API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
          'Authorization': 'Bearer X4eTEiMr-JHTe4tKO54o9IFF_ES0A8ZefOxrNALuRU-0T4jLqf8xuacECVytR82ndXMJ2NvPs' // 添加认证头
      }
    });

    console.log('创建成功:', response.data);
    return response.data;
  } catch (error) {
    if(error.response?.status === 401) {
      console.error('认证失败: 请检查ACCESS_TOKEN是否有效');
    } else {
      console.error('创建失败:', error.response?.data || error.message);
    }
    throw error;
  }
}

// 执行测试
createJob();