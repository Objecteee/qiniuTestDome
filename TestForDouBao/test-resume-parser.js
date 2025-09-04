const { parseResume } = require('./resume-parser');
// 测试函数
async function testResumeParser() {
    console.log('=== 豆包简历解析器测试 ===\n');
    
    // 测试用例1：使用现有的PDF文件
    const testPdfPath = './image.png'; // 请替换为实际的PDF文件路径
    
    try {
        console.log('测试1: 解析简历PDF文件');
        console.log(`文件路径: ${testPdfPath}`);
        
        const result = await parseResume(testPdfPath);
        
        console.log('\n=== 测试结果摘要 ===');
        if (result.personalInfo) {
            console.log(`姓名: ${result.personalInfo.name || '未找到'}`);
            console.log(`手机: ${result.personalInfo.phone || '未找到'}`);
            console.log(`邮箱: ${result.personalInfo.email || '未找到'}`);
        }
        
        if (result.workExperience && result.workExperience.length > 0) {
            console.log(`工作经历: ${result.workExperience.length} 条`);
        }
        
        if (result.education && result.education.length > 0) {
            console.log(`教育经历: ${result.education.length} 条`);
        }
        
        console.log('\n✅ 测试完成');
        
    } catch (error) {
        console.error('❌ 测试失败:', error.message);
        
        // 提供一些调试建议
        console.log('\n调试建议:');
        console.log('1. 确保PDF文件存在且可读');
        console.log('2. 检查API密钥是否有效');
        console.log('3. 确认网络连接正常');
        console.log('4. 验证PDF文件格式正确');
    }
}

// 运行测试
if (require.main === module) {
    testResumeParser();
}

module.exports = { testResumeParser };
