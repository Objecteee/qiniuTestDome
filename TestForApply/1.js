const axios = require('axios');

// 测试创建应聘申请
async function testCreateApply() {
  try {
    const response = await axios.post(
      'https://openapi.italent.cn/RecruitV6/api/v1/Apply/CreateApply',
      {
                 
          "jobId": "e05aac44-f191-4d4c-9c2b-79e131a504a7",
          "channelId": "1f041f88-d9a4-45c5-941b-2eb4a29f8e6a",
          "acquireMannerId": 1
        },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer X4eTEiMr-2MumLXhF4KIpJ8JviRYBA56ogIOsfGyroIfGIQscnVixVzN42iYklITcOGSrBFjA'
        }
      }
    );

    console.log('响应数据:', response.data);
    
    if(response.data.code === 200) {
      console.log('测试通过: 成功创建应聘申请');
      console.log('同步ID:', response.data.data);
    } else {
      console.error('测试失败:', response.data.message);
    }
  } catch (error) {
    console.error('请求出错:', error.response?.data || error.message);
  }
}

// 执行测试
testCreateApply();