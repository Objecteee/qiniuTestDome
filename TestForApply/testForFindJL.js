const axios = require('axios'); // 确保已安装 axios: npm install axios

// 配置
const API_URL = 'https://openapi.italent.cn/RecruitV6/api/v1/Apply/GetApplyIdsBySyncIds';
// 注意：根据实际认证方式，你可能需要在 headers 中添加 Token 或其它认证信息
const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer X4eTEiMr-uwEz8RCSKJsyaxzObG4qk4nk_k97oE8307pijFAH_vLZ2umcdaTXAGS-8nk16Eyc' // 如果接口需要，请取消注释并替换
};

// 测试用的同步 ID 数组 (请替换成你实际调用 CreateApply 后得到的 syncIds)
const testSyncIds = [
    "67edd0a9-2819-4c6d-9697-e3dace040dc2",
];

async function testGetApplyIdsBySyncIds() {
    console.log(`开始测试 GetApplyIdsBySyncIds 接口...`);
    console.log(`请求URL: ${API_URL}`);
    console.log(`请求参数: ${JSON.stringify(testSyncIds)}`);

    try {
        const response = await axios.post(API_URL, {
            syncIds: testSyncIds
        }, {
            headers: HEADERS,
            timeout: 10000 // 10秒超时
        });

        console.log('\n✅ 请求成功！');
        console.log(`HTTP 状态码: ${response.status}`);
        console.log('响应体:');
        console.log(JSON.stringify(response.data, null, 2)); // 格式化输出

        // 验证响应结构
        if (response.data && response.data.code === 200) {
            console.log('\n✅ 响应 Code 为 200 (成功)');

            if (response.data.data && Array.isArray(response.data.data)) {
                console.log(`✅ 成功返回 ${response.data.data.length} 条数据`);

                // 遍历检查每条数据的结构
                response.data.data.forEach((item, index) => {
                    console.log(`\n--- 检查第 ${index + 1} 条数据 ---`);
                    console.log(`SyncId: ${item.syncId}`);
                    console.log(`ImportStatus: ${item.importStatus}`);
                    console.log(`ApplyId: ${item.applyId}`);
                    console.log(`ApplicantId: ${item.applicantId}`);

                    // 根据 ImportStatus 给出提示
                    if (item.importStatus === 2) {
                        console.log('✅ 该记录导入成功，可以正常使用 ApplyId');
                    } else {
                        console.warn(`⚠️  该记录导入状态异常 (Status: ${item.importStatus})，请检查 failedReason: ${item.failedReason}`);
                    }
                });
            } else {
                console.warn('⚠️  响应中 data 字段不是数组或不存在');
            }
        } else {
            console.warn(`⚠️  响应 Code 非 200: ${response.data?.code}, 消息: ${response.data?.message}`);
        }

    } catch (error) {
        console.error('\n❌ 请求失败:');

        // 处理不同类型的错误
        if (error.response) {
            // 服务器返回了错误状态码 (4xx, 5xx)
            console.error(`错误状态码: ${error.response.status}`);
            console.error(`错误响应体: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            // 请求已发出但没有收到响应
            console.error('网络错误: 无法连接到服务器或服务器无响应');
        } else {
            // 其它错误
            console.error(`错误信息: ${error.message}`);
        }
    }
}

// 执行测试
testGetApplyIdsBySyncIds();

/* 开始测试 GetApplyIdsBySyncIds 接口...
请求URL: https://openapi.italent.cn/RecruitV6/api/v1/Apply/GetApplyIdsBySyncIds
请求参数: ["ac2c9feb-f8d3-4e26-8467-0567c7e83d73"]

 请求成功！
HTTP 状态码: 200
响应体:
{
  "data": [
    {
      "importStatus": 2,
      "syncId": "ac2c9feb-f8d3-4e26-8467-0567c7e83d73",
      "applyId": "a7c33dd7-ea2c-4798-b4be-6b2c9ecfd261",
      "applicantId": "e0f803f9-ea88-4b09-a306-723266fc9afd",
      "failedReason": null
    }
  ],
  "code": 200,
  "message": ""
}

 响应 Code 为 200 (成功)
 成功返回 1 条数据

--- 检查第 1 条数据 ---
SyncId: ac2c9feb-f8d3-4e26-8467-0567c7e83d73
ImportStatus: 2
ApplyId: a7c33dd7-ea2c-4798-b4be-6b2c9ecfd261
ApplicantId: e0f803f9-ea88-4b09-a306-723266fc9afd
 该记录导入成功，可以正常使用 ApplyId */