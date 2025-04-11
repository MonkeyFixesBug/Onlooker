const requestHandler = {
    * beforeSendRequest(requestDetail) {
        try {
            // console.log('请求:', requestDetail)
            if (requestDetail && requestDetail.requestOptions && requestDetail.requestOptions.headers) {
                requestDetail.requestOptions.headers['Accept-Encoding'] = '' // 去掉压缩
            }
            return requestDetail;
        } catch (error) {
            console.error('请求处理错误:', error);
            return requestDetail; // 发生错误时也要返回原始请求，确保网络能继续
        }
    }
};

module.exports = requestHandler; 