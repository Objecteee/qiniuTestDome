const axios = require('axios');

// 接口配置
const API_URL = 'https://openapi.italent.cn/RecruitV6/api/v1/Channel/GetChannelList';
const ACCESS_TOKEN = 'X4eTEiMr-2MumLXhF4KIpJ8JviRYBA56ogIOsfGyroIfGIQscnVixVzN42iYklITcOGSrBFjA'; // 替换为实际访问令牌

// 测试数据 - 可根据需要修改
const requestData = {
  channelName: "测试test", // 渠道名称
/*   channelType: 1,         // 渠道类型
  channelSourceState: 1,   // 渠道状态
  isSystem: 1,            // 渠道属性
  channelId: 2,           // 渠道Int Id
  batchId: ""             // 批次Id，首次查询传空 */
};

// 发送请求
async function getChannelList() {
  try {
    const response = await axios.post(API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });

    console.log('请求成功:', response.data);
    
    if(response.data.code === 200) {
      console.log('获取到的渠道总数:', response.data.data.total);
      console.log('当前批次渠道列表:', response.data.data.items);
      
      // 检查是否有更多批次数据
      if(!response.data.data.isLastBatch) {
        console.log('还有更多批次数据，NextBatchId:', response.data.data.nextBatchId);
      }
    } else {
      console.error('请求失败:', response.data.message);
    }
    
    return response.data;
  } catch (error) {
    console.error('请求出错:', error.response?.data || error.message);
    
    // 处理特定错误码
    if(error.response?.status === 400) {
      console.error('参数错误:', error.response.data.message);
    } else if(error.response?.status === 417) {
      console.error('业务逻辑错误:', error.response.data.message);
    } else if(error.response?.status === 500) {
      console.error('系统异常，请联系北森技术人员');
    }
    
    throw error;
  }
}
// 350012867 渠道ID
// 8696bcc8-0c02-47c1-8cdc-ba8c48392d2e 渠道Kind

/* 请求成功: {
    data: {
      total: 1,
      nextBatchId: 'MTc1NjgyNTkxNjAwMA==_Mzg0ODI0ODk5Mzk1MDYyOTE4OA==',
      isLastBatch: true,
      items: [ [Object] ]
    },
    code: 200,
    message: ''
  }
  获取到的渠道总数: 1
  当前批次渠道列表: [
    {
      channelGuid: '1f041f88-d9a4-45c5-941b-2eb4a29f8e6a',
      channelName: '测试test',
      channelId: 350012867,
      channelType: '10',
      channelKind: '8696bcc8-0c02-47c1-8cdc-ba8c48392d2e',
      channelSourceState: '1',
      isSystem: '0',
      orgnization: '0'
    }
  ] */
// 执行测试
getChannelList();