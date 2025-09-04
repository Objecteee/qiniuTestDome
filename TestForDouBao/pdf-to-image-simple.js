const fs = require('fs');
const path = require('path');

// 使用pdf-poppler库进行PDF转图片
// 需要先安装: npm install pdf-poppler

class SimplePDFToImageConverter {
    constructor() {
        this.pdfPoppler = null;
        this.init();
    }
    
    async init() {
        try {
            // 动态导入pdf-poppler
            this.pdfPoppler = require('pdf-poppler');
        } catch (error) {
            console.error('pdf-poppler库未安装，请运行: npm install pdf-poppler');
            console.error('注意: pdf-poppler需要安装poppler-utils');
            console.error('Windows: 下载并安装 poppler for Windows');
            console.error('Mac: brew install poppler');
            console.error('Linux: sudo apt-get install poppler-utils');
            throw error;
        }
    }
    
    async convertPDFToImages(pdfPath, outputDir = './output') {
        try {
            // 确保输出目录存在
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            
            console.log('开始转换PDF...');
            
            // 配置转换选项
            const options = {
                format: 'png',          // 输出格式
                out_dir: outputDir,     // 输出目录
                out_prefix: 'page',     // 文件名前缀
                page: null              // null表示转换所有页面
            };
            
            // 执行转换
            const results = await this.pdfPoppler.convert(pdfPath, options);
            
            console.log('转换结果:', results);
            console.log('结果类型:', typeof results);
            console.log('是否为数组:', Array.isArray(results));
            
            // 处理不同的返回格式
            let resultArray = [];
            
            if (Array.isArray(results)) {
                resultArray = results;
            } else if (results && typeof results === 'object') {
                // 如果是对象，可能包含多个属性
                resultArray = Object.values(results);
            } else {
                // 如果返回空字符串，检查输出目录中的文件
                console.log('返回结果为空，检查输出目录中的文件...');
                const files = fs.readdirSync(outputDir);
                const pngFiles = files.filter(file => file.endsWith('.png'));
                
                resultArray = pngFiles.map((file, index) => ({
                    path: path.join(outputDir, file),
                    name: file
                }));
            }
            
            console.log(`转换完成，共生成 ${resultArray.length} 张图片`);
            
            // 返回结果信息
            return resultArray.map((result, index) => ({
                pageNumber: index + 1,
                filePath: result.path || result,
                fileName: result.name || `page-${index + 1}.png`
            }));
            
        } catch (error) {
            console.error('PDF转换失败:', error);
            throw error;
        }
    }
    
    async convertPDFBase64ToImages(base64PDF, outputDir = './output') {
        try {
            // 将Base64转换为临时PDF文件
            const tempPdfPath = path.join(outputDir, 'temp.pdf');
            
            // 确保输出目录存在
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            
            // 写入临时PDF文件
            const pdfBuffer = Buffer.from(base64PDF, 'base64');
            fs.writeFileSync(tempPdfPath, pdfBuffer);
            
            console.log('临时PDF文件已创建');
            
            // 转换PDF为图片
            const results = await this.convertPDFToImages(tempPdfPath, outputDir);
            
            // 删除临时PDF文件
            fs.unlinkSync(tempPdfPath);
            console.log('临时PDF文件已删除');
            
            return results;
            
        } catch (error) {
            console.error('Base64 PDF转换失败:', error);
            throw error;
        }
    }
}

// 使用示例
async function main() {
    try {
        const converter = new SimplePDFToImageConverter();
        
        // 示例1: 转换本地PDF文件
        const pdfPath = '李庆援-智能前端开发-19861022505.pdf'; 
        if (fs.existsSync(pdfPath)) {
            console.log('转换本地PDF文件...');
            const results = await converter.convertPDFToImages(pdfPath);
            console.log('转换结果:', results);
        } else {
            console.log('PDF文件不存在，请检查路径');
        }
        
        // 示例2: 转换Base64 PDF
        // const base64PDF = 'your-base64-string-here';
        // const results = await converter.convertPDFBase64ToImages(base64PDF);
        // console.log('转换结果:', results);
        
    } catch (error) {
        console.error('转换失败:', error.message);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = SimplePDFToImageConverter;
