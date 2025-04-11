const axios = require('axios');

// 发送数据到Python后端的函数
async function sendToPython(data) {
    try {
        const response = await axios.post('http://localhost:5000/process', data);
        return response;
    } catch (error) {
        console.error('发送请求失败:', error.message);
        // 不抛出错误，避免影响代理功能
        return null;
    }
}

function bodyToJson(body) {
    // 提取JSON数据
    try {
        const leftBracket = body.indexOf('(');
        const rightBracket = body.lastIndexOf(')');
        
        if (leftBracket !== -1 && rightBracket !== -1) {
            // 提取括号内的内容
            const jsonStr = body.substring(leftBracket + 1, rightBracket);
            try {
                // 解析JSON
                const jsonData = JSON.parse(jsonStr);
                console.log('成功提取JSON数据');
                return jsonData;
            } catch (e) {
                console.log('JSON解析失败:', e.message);
                return null;
            }
        } else {
            console.log('未找到括号');
            return null;
        }
    } catch (error) {
        console.error('bodyToJson处理错误:', error.message);
        return null;
    }
}

const responseHandler = {
    *beforeSendResponse(requestDetail, responseDetail) {
        try {
            // 确保返回的响应有效
            if (!responseDetail || !responseDetail.response) {
                return responseDetail;
            }

            // 拦截指定的URL
            if (requestDetail.url.indexOf('mtop.relationrecommend.wirelessrecommend.recommend') !== -1
                && responseDetail.response.statusCode === 200
                && responseDetail.response.body) {
                // 提取数据和清洗数据
                let body = responseDetail.response.body.toString();
                let s = body.substring(0, 11);
                if (s.indexOf("mtopjsonp") != -1) {
                    let json = bodyToJson(body);
                    // 发送数据到Python后端
                    if (json) {
                        // 使用Promise处理，不阻塞响应
                        sendToPython(json)
                            .then(response => {
                                if (response) {
                                    console.log('数据已发送到Python后端');
                                }
                            })
                            .catch(error => {
                                console.error('发送数据到Python后端失败:', error.message);
                            });
                    }
                }
            }
            
            // 无论如何都要返回响应，确保浏览器正常工作
            return responseDetail;
        } catch (error) {
            console.error('响应处理错误:', error.message);
            // 发生错误时也要返回原始响应，确保网络能继续
            return responseDetail;
        }
    }
};

module.exports = responseHandler; 