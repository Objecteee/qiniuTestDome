const axios = require('axios');

// 接口配置
const API_URL = 'https://openapi.italent.cn/RecruitV6/api/v1/Job/GetJobListByCodes';
const ACCESS_TOKEN = "X4eTEiMr-8fNUY8i6BlQ130Qu7e9mkTd-rCPbK0fcQhJcorHK-NgJswxkFUH3aMMHXt5YlSUA"

// 测试数据 - 职位编码列表(最多100个)
const jobCodes = ["J10237"]; // 替换为实际职位编码

// 发送请求
async function getJobList() {
  try {
    const response = await axios.post(API_URL, {
      jobCodes: jobCodes
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });

    console.log('请求成功:', response.data);
    
    if(response.data.code === 200) {
      console.log('获取到的职位列表:', response.data.data);
      // 检查面试官和评价表信息
      response.data.data.forEach(job => {
        console.log(`职位${job.jobCode}的面试官模式:`, job.jobOfficerBindType);
        console.log(`职位${job.jobCode}的评价表模式:`, job.interviewEvaluationBindType);
      });
    } else {
      console.error('请求失败:', response.data.message);
    }
    
    return response.data;
  } catch (error) {
    console.error('请求出错:', error.response?.data || error.message);
    
    // 处理特定错误码
    if(error.response?.status === 400) {
      console.error('参数错误，请检查jobCodes格式');
    } else if(error.response?.status === 417) {
      console.error('业务逻辑错误:', error.response.data.message);
    } else if(error.response?.status === 500) {
      console.error('系统异常，请联系北森技术人员');
    }
    
    throw error;
  }
}
// e05aac44-f191-4d4c-9c2b-79e131a504a7 产品经理

/* 请求成功: {
  data: [
    {
      jobId: 'e05aac44-f191-4d4c-9c2b-79e131a504a7',
      jobIntId: 270656441,
      jobCode: 10237,
      modifiedDate: '2025-09-02T13:48:54.1793116',
      createDate: '2025-09-02T13:48:54.1793116',
      require_en_US: '',
      duty_en_US: '',
      jobTitle: '产品经理',
      headCount: 0,
      jobType: [Array],
      orgId: 1117470,
      kind: 1,
      category: 2,
      locId: [Array],
      salaryType: 1,
      minSalary: 10000,
      maxSalary: 15000,
      detailedAddress: '',
      workExperience: '',
      educationInfo: '',
      duty: '岗位职责\n' +
        '1.分析行业动态、竞品策略及客户需求，输出研究报告。\n' +
        '2.基于数据分析，提出相关业务产品的优化建议。 \n' +
        '3.撰写产品需求文档（PRD），参与功能原型设计，并跟进开发进度。 \n' +
        '4.维护产品文档、帮助中心及内部培训材料，支持售前方案中的技术问题解答。',
      require: '职位要求\n' +
        '1.毕业2年以内或应届，本科及以上学历，计算机、软件工程等理工类相关专业优先。\n' +
        '2.了解计算机基础知识，有一定编程能力。  \n' +
        '3.具备一定数据分析能力，熟练使用Excel/SQL/Axure/XMind，掌握Python/Tableau者加分。\n' +
        '4.拥有严密的逻辑分析能力和系统思考能力，能高效地分析复杂问题并给出解决方案。\n' +
        '5.对创造优秀产品有极大的热情和好奇心。具备出色的同理心，能站在用户角度思考问题，敏锐地捕捉用户痛点。\n' +
        '6.出色的沟通表达和团队协作能力，善于整合资源，推动项目前进。',
      hrDutyUser: 613386666,
      busiDutyUser: 0,
      shareUserIds: [Array],
      processId: '77b13d17-4e5b-46ce-ac51-d15c141643bf',
      applyFormId: '00000000-0000-0000-0000-000000000000',
      wechatApplyFormId: '11111111-1111-1111-1111-111111111111',
      emailIds: [Array],
      interviewEvaluationGuids: [],
      requireKind: 0,
      availableDate: '1900-01-01T00:00:00',
      status: 1,
      createBy: 613386666,
      modifyBy: 613386666,
      openWechatApplyForm: true,
      job_Officers: [],
      inMicroRecommendRuleId: '00000000-0000-0000-0000-000000000000',
      exMicroRecommendRuleId: '00000000-0000-0000-0000-000000000000',
      schoolMicroRecommendRuleId: '00000000-0000-0000-0000-000000000000',
      jobApprovalStatus: 0,
      inviteUpdateResumeTemplateGuid: '29729dfc-95d3-4888-b909-d3be26c43608',
      recruitmentStandard: '00000000-0000-0000-0000-000000000000',
      customProperties: {},
      bizNumber: '',
      bizId: 0,
      jobScreeners: null,
      jobOfficerBindType: 0,
      jobOfficerBindDatas: null,
      interviewEvaluationBindType: 0,
      interviewEvaluationBindData: null
    }
  ],
  code: 200,
  message: ''
}
获取到的职位列表: [
  {
    jobId: 'e05aac44-f191-4d4c-9c2b-79e131a504a7',
    jobIntId: 270656441,
    jobCode: 10237,
    modifiedDate: '2025-09-02T13:48:54.1793116',
    createDate: '2025-09-02T13:48:54.1793116',
    require_en_US: '',
    duty_en_US: '',
    jobTitle: '产品经理',
    headCount: 0,
    jobType: [ '' ],
    orgId: 1117470,
    kind: 1,
    category: 2,
    locId: [ '3100' ],
    salaryType: 1,
    minSalary: 10000,
    maxSalary: 15000,
    detailedAddress: '',
    workExperience: '',
    educationInfo: '',
    duty: '岗位职责\n' +
      '1.分析行业动态、竞品策略及客户需求，输出研究报告。\n' +
      '2.基于数据分析，提出相关业务产品的优化建议。 \n' +
      '3.撰写产品需求文档（PRD），参与功能原型设计，并跟进开发进度。 \n' +
      '4.维护产品文档、帮助中心及内部培训材料，支持售前方案中的技术问题解答。',
    require: '职位要求\n' +
      '1.毕业2年以内或应届，本科及以上学历，计算机、软件工程等理工类相关专业优先。\n' +
      '2.了解计算机基础知识，有一定编程能力。  \n' +
      '3.具备一定数据分析能力，熟练使用Excel/SQL/Axure/XMind，掌握Python/Tableau者加分。\n' +
      '4.拥有严密的逻辑分析能力和系统思考能力，能高效地分析复杂问题并给出解决方案。\n' +
      '5.对创造优秀产品有极大的热情和好奇心。具备出色的同理心，能站在用户角度思考问题，敏锐地捕捉用户痛点。\n' +
      '6.出色的沟通表达和团队协作能力，善于整合资源，推动项目前进。',
    hrDutyUser: 613386666,
    busiDutyUser: 0,
    shareUserIds: [ 613386666, 613760125, 613386667, 633433801, 613763855 ],
    processId: '77b13d17-4e5b-46ce-ac51-d15c141643bf',
    applyFormId: '00000000-0000-0000-0000-000000000000',
    wechatApplyFormId: '11111111-1111-1111-1111-111111111111',
    emailIds: [ '7bfadf06-3fe9-4b5d-9b63-5c18dcb53fcc' ],
    interviewEvaluationGuids: [],
    requireKind: 0,
    availableDate: '1900-01-01T00:00:00',
    status: 1,
    createBy: 613386666,
    modifyBy: 613386666,
    openWechatApplyForm: true,
    job_Officers: [],
    inMicroRecommendRuleId: '00000000-0000-0000-0000-000000000000',
    exMicroRecommendRuleId: '00000000-0000-0000-0000-000000000000',
    schoolMicroRecommendRuleId: '00000000-0000-0000-0000-000000000000',
    jobApprovalStatus: 0,
    inviteUpdateResumeTemplateGuid: '29729dfc-95d3-4888-b909-d3be26c43608',
    recruitmentStandard: '00000000-0000-0000-0000-000000000000',
    customProperties: {},
    bizNumber: '',
    bizId: 0,
    jobScreeners: null,
    jobOfficerBindType: 0,
    jobOfficerBindDatas: null,
    interviewEvaluationBindType: 0,
    interviewEvaluationBindData: null
  }
]
职位10237的面试官模式: 0
职位10237的评价表模式: 0 */
// 执行测试
getJobList();