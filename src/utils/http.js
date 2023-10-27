import Fetch from './requestHttp';

class Request extends Fetch {
    constructor(config) {
        super(config);
    }
    //获取拜访地点
    getDep(config) {
        return this.request({
            url: "/api/wap/visitor/dep-list",
            method: "POST",
            data: config
        })
    }
    //token 获取userCode
    getUserCode(config) {
        return this.request({
            url: "/api/wap/visitor/get-user-code",
            method: "POST",
            data: config
        })
    }
    //获取拜访事由
    getSubject(config) {
        return this.request({
            url: "/api/wap/visitor/subject-list",
            method: "POST",
            data: config
        })
    }
    //根据身份证获取健康码
    qrcode(config) {
        return this.request({
            url: "/api/wap/visitor/qrcode",
            method: "POST",
            data: config
        })
    }
    //访客登记
    add(config) {
        return this.request({
            url: "/api/wap/visitor/add",
            method: "POST",
            data: config
        })
    }
    addAudit(config) {
        return this.request({
            url: "/api/wap/visitor/add-no-audit",
            method: "POST",
            data: config
        })
    }
    //OSS 上传
    upload(config) {
        return this.saasRequest({
            url: "/api/common/oss/upload",
            method: "POST",
            data: config
        })
    }
    //用户访客登记详情
    record(config) {
        return this.request({
            url: "/api/wap/visitor/record",
            method: "POST",
            data: config
        })
    }
    //记录取消
    cancel(config) {
        return this.request({
            url: "/api/wap/visitor/cancel",
            method: "POST",
            data: config
        })
    }
    //根据审批中心订单号获取访客登记详情
    detail(config) {
        return this.request({
            url: "/api/wap/visitor/detail",
            method: "POST",
            data: config
        })
    }
    //码是否被使用
    useQrcode(config) {
        return this.request({
            url: "/api/wap/visitor/useQrcode",
            method: "POST",
            data: config
        })
    }
    //码是否被使用
    useQrcodePC(config) {
        return this.request({
            url: "/api/wap/visitor/useQrcodePC",
            method: "POST",
            data: config
        })
    }
    //jssdk
    sdk(config) {
        return this.saasRequest({
            url: "/api/wechat/js/sdk",
            method: "GET",
            params: config
        })

    }

    userEvent(config) {
        return this.saasRequest({
            url: "/api/wap/vcard/user-event/record",
            method: 'POST',
            data: config,
        })
    }

    getRecordList(config) {
        return this.request({
            url: "/api/wap/visitor/useList",
            method: 'POST',
            data: config,
        })
    }
    sendCode(config) {
        return this.request({
            url: "/api/wap/visitor/send-code",
            method: 'POST',
            data: config,
        })
    }
    //移动端字段配置列表
    fieleList(config) {
        return this.request({
            url: "/api/wap/visitor/fiele-list",
            method: "GET",
            params: config
        })
    }
}
export default new Request();
