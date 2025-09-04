const axios = require('axios');

/**
 * 应聘者投递简历接口测试用例
 * 接口地址：openapi.italent.cn/RecruitV6/api/v1/Apply/CreateApply
 * 更新时间：2023/11/03 22:50:49
 */

// 接口配置
const API_CONFIG = {
  url: 'https://openapi.italent.cn/RecruitV6/api/v1/Apply/CreateApply',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer X4eTEiMr-2MumLXhF4KIpJ8JviRYBA56ogIOsfGyroIfGIQscnVixVzN42iYklITcOGSrBFjA'
  }
};

/**
 * 发送请求的通用方法
 * @param {Object} requestData - 请求参数
 * @returns {Promise} - 返回Promise对象
 */
async function sendRequest(requestData) {
  try {
    const response = await axios.post(API_CONFIG.url, requestData, {
      headers: API_CONFIG.headers
    });
    return response.data;
  } catch (error) {
    return {
      data: error.response?.data?.data || null,
      code: error.response?.status || 500,
      message: error.response?.data?.message || error.message
    };
  }
}

/**
 * 测试用例1：正常创建应聘申请 - 完整简历信息
 */
async function testCreateApplyWithFullResume() {
  console.log('\n=== 测试用例1：完整简历信息创建应聘申请 ===');
  
  const requestData = {
    "standardResume": {
      "personProfile": {
        "Name": {
          "value": "张三"
        }
      },
      "additionalInfo": [{
        "Honor": {
          "value": "获得校级优秀奖学金",
          "file": null
        },
        "Interest": {
          "value": "看书、写作",
          "file": null
        }
      }],
      "addressInfo": [{
        "EmailAddress": {
          "value": "zhangsan@example.com",
          "file": null
        }
      }],
      "education": [{
        "OgMajorRank": {
          "value": "第一名",
          "file": null
        }
      }],
      "family": [{
        "FamilyLocaltion": {
          "value": "北京市朝阳区",
          "file": null
        }
      }],
      "internship": [],
      "lang": [],
      "objective": [{
        "ExpectWorkAreas": {
          "value": "3100,1100",
          "file": null
        }
      }],
      "payCardInfo": [],
      "project": [],
      "relativesDeclaration": [],
      "schoolCadre": [],
      "skill": [],
      "teamManager": [],
      "train": [],
      "workExperience": [],
      "writings": [],
      "attachments": [],
      "resumeFile": [],
      "question": []
    },
    "jobId": "e05aac44-f191-4d4c-9c2b-79e131a504a7",
    "channelId": "350012867",
    "acquireMannerId": 1
  };
  
  console.log('请求参数：', JSON.stringify(requestData, null, 2));
  
  const result = await sendRequest(requestData);
  console.log('响应结果：', JSON.stringify(result, null, 2));
  
  if (result.code === 200) {
    console.log('✅ 测试通过：成功创建应聘申请');
    console.log(`📋 同步ID：${result.data}`);
    return result.data; // 返回同步ID用于后续测试
  } else {
    console.log('❌ 测试失败：', result.message);
    return null;
  }
}

/**
 * 测试用例2：最小参数创建应聘申请
 */
async function testCreateApplyWithMinimalParams() {
  console.log('\n=== 测试用例2：最小参数创建应聘申请 ===');
  
  const requestData = {
    "jobId": "e05aac44-f191-4d4c-9c2b-79e131a504a7",
    "channelId": "350012867",
  };
  
  console.log('请求参数：', JSON.stringify(requestData, null, 2));
  
  const result = await sendRequest(requestData);
  console.log('响应结果：', JSON.stringify(result, null, 2));
  
  if (result.code === 200) {
    console.log('✅ 测试通过：最小参数创建成功');
    console.log(`📋 同步ID：${result.data}`);
  } else {
    console.log('❌ 测试失败：', result.message);
  }
}

/**
 * 测试用例3：异常测试 - 缺少必需参数jobId
 */
async function testCreateApplyWithoutJobId() {
  console.log('\n=== 测试用例3：缺少jobId参数测试 ===');
  
  const requestData = {
    "channelId": "19287b8a-5762-4b4a-83ef-b6e8d498e3c5"
  };
  
  console.log('请求参数：', JSON.stringify(requestData, null, 2));
  
  const result = await sendRequest(requestData);
  console.log('响应结果：', JSON.stringify(result, null, 2));
  
  if (result.code === 400) {
    console.log('✅ 测试通过：正确返回400错误码');
  } else {
    console.log('❌ 测试失败：期望返回400错误码，实际返回：', result.code);
  }
}

/**
 * 测试用例4：异常测试 - 缺少必需参数channelId
 */
async function testCreateApplyWithoutChannelId() {
  console.log('\n=== 测试用例4：缺少channelId参数测试 ===');
  
  const requestData = {
    "jobId": "06250960-24c1-41ce-9fe1-c726df3c1a31"
  };
  
  console.log('请求参数：', JSON.stringify(requestData, null, 2));
  
  const result = await sendRequest(requestData);
  console.log('响应结果：', JSON.stringify(result, null, 2));
  
  if (result.code === 400) {
    console.log('✅ 测试通过：正确返回400错误码');
  } else {
    console.log('❌ 测试失败：期望返回400错误码，实际返回：', result.code);
  }
}

/**
 * 测试用例5：异常测试 - 无效的GUID格式
 */
async function testCreateApplyWithInvalidGuid() {
  console.log('\n=== 测试用例5：无效GUID格式测试 ===');
  
  const requestData = {
    "jobId": "e05aac44-f191-4d4c-9c2b-79e131a504a7",
    "channelId": "350012867",
  };
  
  console.log('请求参数：', JSON.stringify(requestData, null, 2));
  
  const result = await sendRequest(requestData);
  console.log('响应结果：', JSON.stringify(result, null, 2));
  
  if (result.code === 400) {
    console.log('✅ 测试通过：正确返回400错误码');
  } else {
    console.log('❌ 测试失败：期望返回400错误码，实际返回：', result.code);
  }
}

/**
 * 测试用例6：包含获取方式的创建申请
 */
async function testCreateApplyWithAcquireManner() {
  console.log('\n=== 测试用例6：包含获取方式创建申请 ===');
  
  const requestData = {
    "standardResume": {
      "personProfile": {
        "Name": {
          "value": "李四"
        }
      },
      "additionalInfo": [],
      "addressInfo": [{
        "EmailAddress": {
          "value": "lisi@example.com",
          "file": null
        }
      }],
      "education": [],
      "family": [],
      "internship": [],
      "lang": [],
      "objective": [],
      "payCardInfo": [],
      "project": [],
      "relativesDeclaration": [],
      "schoolCadre": [],
      "skill": [],
      "teamManager": [],
      "train": [],
      "workExperience": [],
      "writings": [],
      "attachments": [],
      "resumeFile": [],
      "question": []
    },
    "jobId": "e05aac44-f191-4d4c-9c2b-79e131a504a7",
    "channelId": "350012867",
    "acquireMannerId": 2
  };
  
  console.log('请求参数：', JSON.stringify(requestData, null, 2));
  
  const result = await sendRequest(requestData);
  console.log('响应结果：', JSON.stringify(result, null, 2));
  
  if (result.code === 200) {
    console.log('✅ 测试通过：包含获取方式创建成功');
    console.log(`📋 同步ID：${result.data}`);
  } else {
    console.log('❌ 测试失败：', result.message);
  }
}

/**
 * 测试用例7：空简历信息创建申请
 */
async function testCreateApplyWithEmptyResume() {
  console.log('\n=== 测试用例7：空简历信息创建申请 ===');
  
  const requestData = {
    "standardResume": {},
    "jobId": "e05aac44-f191-4d4c-9c2b-79e131a504a7",
    "channelId": "350012867",
  };
  
  console.log('请求参数：', JSON.stringify(requestData, null, 2));
  
  const result = await sendRequest(requestData);
  console.log('响应结果：', JSON.stringify(result, null, 2));
  
  if (result.code === 200) {
    console.log('✅ 测试通过：空简历信息创建成功');
    console.log(`📋 同步ID：${result.data}`);
  } else {
    console.log('❌ 测试失败：', result.message);
  }
}

/**
 * 性能测试 - 测试接口响应时间
 */
async function testPerformance() {
  console.log('\n=== 性能测试 ===');
  
  const requestData = {
    "jobId": "e05aac44-f191-4d4c-9c2b-79e131a504a7",
    "channelId": "350012867",
  };
  
  const startTime = Date.now();
  const result = await sendRequest(requestData);
  const endTime = Date.now();
  
  const responseTime = endTime - startTime;
  
  console.log(`响应时间：${responseTime}ms`);
  console.log('响应结果：', JSON.stringify(result, null, 2));
  
  if (responseTime < 5000) { // 5秒内响应
    console.log('✅ 性能测试通过：响应时间在可接受范围内');
  } else {
    console.log('⚠️ 性能警告：响应时间较长');
  }
}

/**
 * 运行所有测试用例
 */
async function runAllTests() {
  console.log('🚀 开始执行应聘者投递简历接口测试用例...\n');
  
  try {
    await testCreateApplyWithFullResume();
    await testCreateApplyWithMinimalParams();
    await testCreateApplyWithoutJobId();
    await testCreateApplyWithoutChannelId();
    await testCreateApplyWithInvalidGuid();
    await testCreateApplyWithAcquireManner();
    await testCreateApplyWithEmptyResume();
    await testPerformance();
    
    console.log('\n🎉 所有测试用例执行完成！');
    console.log('\n📝 注意事项：');
    console.log('1. 接口返回同步ID，需要每隔5秒调用GetApplyIdBySyncId接口检查创建状态');
    console.log('2. 手机号或邮箱一致会自动查重更新');
    console.log('3. 标准简历信息和原始简历文件重叠时，优先使用标准简历信息');
    console.log('4. 接口限制：50次/秒/企业，1500次/分钟/企业');
  } catch (error) {
    console.error('❌ 测试执行过程中发生错误：', error.message);
  }
}

/**
 * 单独运行某个测试用例
 * @param {string} testName - 测试用例名称
 */
async function runSingleTest(testName) {
  const tests = {
    'full': testCreateApplyWithFullResume,
    'minimal': testCreateApplyWithMinimalParams,
    'noJobId': testCreateApplyWithoutJobId,
    'noChannelId': testCreateApplyWithoutChannelId,
    'invalidGuid': testCreateApplyWithInvalidGuid,
    'acquireManner': testCreateApplyWithAcquireManner,
    'emptyResume': testCreateApplyWithEmptyResume,
    'performance': testPerformance
  };
  
  if (tests[testName]) {
    console.log(`🎯 执行单个测试用例：${testName}`);
    await tests[testName]();
  } else {
    console.log('❌ 未找到指定的测试用例');
    console.log('可用测试用例：', Object.keys(tests).join(', '));
  }
}

// 导出函数供外部调用
module.exports = {
  runAllTests,
  runSingleTest,
  sendRequest,
  testCreateApplyWithFullResume,
  testCreateApplyWithMinimalParams,
  testCreateApplyWithoutJobId,
  testCreateApplyWithoutChannelId,
  testCreateApplyWithInvalidGuid,
  testCreateApplyWithAcquireManner,
  testCreateApplyWithEmptyResume,
  testPerformance
};

// 如果直接运行此文件，则执行所有测试
if (require.main === module) {
  runAllTests();
}
