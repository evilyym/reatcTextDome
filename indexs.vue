<style lang="less" scoped>
.initiateApplication {
    /deep/.van-overlay {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        -webkit-appearance: none !important;
    }

    /deep/.van-picker__cancel {
        font-size: 32px;
        color: #999;
    }

    /deep/.van-picker__confirm {
        font-size: 32px;
        color: #61c5c1;
    }

    width: 100vw;

    .head_div {
        height: 200px;
        background: url(../assets/bg.png) no-repeat;
        background-size: 100%;
        display: flex;
        padding: 0 74px;
        align-items: center;
        position: relative;

        .img1 {
            position: absolute;
            top: 27px;
            right: 64px;
            z-index: 12;
            height: 230px;
        }

        .header_title {
            height: 50px;
        }

        .head_title_div {
            font-size: 40px;
            font-weight: bold;
            margin-bottom: 10px;

            .record {
                position: absolute;
                right: 0;
                top: 34px;
                width: 160px;
                height: 64px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 100px 0px 0px 100px;
                font-size: 28px;
                font-weight: bold;
                color: #ffffff;
                line-height: 64px;
                padding-right: 20px;
                text-align: right;
                z-index: 20;
            }
        }

        .head_inf_div {
            font-size: 32px;
            position: relative;
        }

        .head_link_div {
            font-size: 32px;
            text-decoration: underline;
        }
    }

    .inf_div {
        padding: 0 30px 150px 30px;
        box-shadow: 0px -8px 20px 0px rgba(0, 0, 0, 0.04);
        border-radius: 24px 24px 0px 0px;
        background: #ffffff;
        position: absolute;
        top: 176px;
        width: calc(100vw - 60px);
        overflow: hidden;
        z-index: 2;

        .inf_title_div {
            height: 116px;
            display: flex;
            align-items: center;
            font-size: 36px;
            font-weight: 600;
            color: #4487ed;
        }
    }

    .form_div {
        .form_item {
            position: relative;

            .code {
                position: absolute;
                font-size: 28px;
                font-weight: 600;
                right: 0;
                top: 40px;
            }

            .can_send {
                color: #4487ed;
            }

            .cannt {
                color: #cccccc;
            }

            &:last-child {
                border-bottom: 0px solid #eeeeee;
            }

            border-bottom: 1px solid #eeeeee;

            .form_title {
                display: flex;
                align-items: center;
                font-size: 28px;
                color: #666666;
                margin-top: 30px;

                span {
                    width: 16px;
                    color: #f46767;
                    margin-right: 12px;
                }
            }

            .form_select {
                .select {
                    width: 100%;
                    height: 86px;
                    font-size: 36px;
                    padding: 0 0 0 24px;
                    border: 0px solid #e6e6e6;
                    display: flex;
                    font-weight: 400;
                    align-items: center;
                    position: relative;
                }

                .icon-you {
                    position: absolute;
                    font-size: 36px;
                    color: #cccccc;
                    right: 30px;
                }

                .placeholder {
                    color: #ccc;
                }
            }

            .form_input {
                input {
                    width: 100%;
                    height: 86px;
                    font-size: 36px;
                    padding: 0 0 0 24px;
                    border: 0px solid #e6e6e6;
                }

                input::-webkit-input-placeholder {
                    /* WebKit browsers */
                    color: #ccc;
                }

                input:-moz-placeholder {
                    /* Mozilla Firefox 4 to 18 */
                    color: #ccc;
                }

                input::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    color: #ccc;
                }

                input:-ms-input-placeholder {
                    /* Internet Explorer 10+ */
                    color: #ccc;
                }
            }

            .form_radio {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 70px;
                font-size: 28px;
                color: #2a2a2a;

                .radio_item {
                    width: 310px;
                    height: 70px;
                    line-height: 70px;
                    background: #ffffff;
                    border-radius: 8px;
                    border: 1px solid #e6e6e6;
                    text-align: center;
                }

                .choise_radio {
                    color: #fff;
                    background: #61c5c1;
                }
            }

            /deep/.form_upImg {
                display: flex;

                .van-uploader__wrapper .van-uploader__preview:nth-child(3n) {
                    margin-right: 0px;
                }

                .van-uploader__preview {
                    width: 200px;
                    height: 200px;
                    margin-right: 20px;
                    margin-bottom: 0;

                    .van-image {
                        width: 200px;
                        height: 200px;
                        margin: 0;
                    }
                }

                .van-uploader__upload {
                    width: 200px;
                    height: 200px;
                    margin-bottom: 0;
                    margin-right: 0px;
                }
            }

            .tip {
                margin-top: 20px;
                padding: 0 24px;
                height: 48px;
                background: #fff7e5;
                border-radius: 28px;
                font-size: 24px;
                font-weight: bold;
                color: #875906;
                line-height: 48px;
            }
        }
    }

    .but_box {
        border-top: 1px solid #e6e6e6;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 24px;
        width: calc(100vw - 48px);

        .but_div {
            background: #4487ed;
            color: #ffffff;
            border-radius: 49px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 36px;
            font-weight: bold;
            height: 98px;
        }
    }
}
</style>
<template>
    <div class="initiateApplication">
        <div class="head_div">
            <img src="../../assets/newImg/bg2.png" class="header_title" alt="">
            <img src="../../assets/newImg/1.png" class="img1" alt="">
        </div>
        <div class="inf_div">
            <div class="form_div">
                <div class="form_item" v-for="(item, index) of form1" :key="index">

                    <div v-if="item.type != 'title' && item.notShow != 1">
                        <div class="form_title">
                            <span v-if="item.required">*</span>
                            <span v-else></span>
                            <div>{{ item.name }}</div>
                        </div>
                        <div class="form_input" v-if="item.type == 'input'">
                            <input type="text" :maxlength="item.max" v-model="fromInf[item.prop]"
                                :placeholder='item.placeholder' />

                        </div>
                        <div class="form_select" v-if="item.type == 'select'">
                            <div class="select" @click="item.showPicker = true"
                                :class="[fromInf[item.prop] ? '' : 'placeholder']">
                                {{ fromInf[item.prop] ? item.show : item.placeholder }}
                                <i class="iconfont icon-you"></i>
                            </div>

                            <van-popup v-model="item.showPicker" round position="bottom">
                                <van-picker show-toolbar :columns="formList[item.list]" @cancel="item.showPicker = false"
                                    @confirm="(value) => {
                                        fromInf[item.prop] = value.id; item.show = value.text;
                                        item.showPicker = false
                                    }" />
                            </van-popup>

                        </div>
                        <div class="form_select" v-if="item.type == 'data'">
                            <div class="select" @click="item.showPicker = true"
                                :class="[fromInf[item.prop] ? '' : 'placeholder']">
                                {{ fromInf[item.prop] ? fromInf[item.prop] : item.placeholder }}
                                <i class="iconfont icon-you"></i>
                            </div>

                            <van-popup v-model="item.showPicker" round position="bottom">
                                <van-datetime-picker type="date" title="选择年月日" :min-date="item.minDate"
                                    :max-date="item.maxDate" show-toolbar @cancel="item.showPicker = false" @confirm="(value) => {
                                        fromInf[item.prop] = dateConvert('yyyy-MM-dd', value)
                                            ;
                                        item.showPicker = false
                                    }" />
                            </van-popup>

                        </div>
                        <div class="form_radio" v-if="item.type == 'radio'">
                            <div class="radio_item" :class="[fromInf[item.prop] == radioItem.id ? 'choise_radio' : '']"
                                v-for="(radioItem, radioIndex) of item.itemList" @click="fromInf[item.prop] = radioItem.id"
                                :key="radioIndex">
                                {{ radioItem.name }}
                            </div>
                        </div>

                        <div v-if="item.type == 'upImg'" class="">
                            <div class="form_upImg">
                                <van-uploader v-model="fromInf[item.prop]" :after-read="item.afterRead"
                                    :max-count="item.maxCount" />
                            </div>

                            <div class="tip" v-if="item.tip">
                                {{ item.tip }}</div>
                        </div>
                    </div>
                    <div v-if="item.type == 'title' && item.notShow != 1">
                        <div class="inf_title_div">
                            {{ item.title }}</div>
                    </div>
                    <div class="code" v-if="item.code == 1" :class="time == 0 ? 'can_send' : 'cannt'" @click="send">
                        {{ time == 0 ? '获取验证码' : `重新发送(${time}s)` }}
                    </div>

                </div>
            </div>
            <div class="but_box">
                <div class="but_div" @click="submit">提交 </div>
            </div>
        </div>
        <van-overlay :show="show" z-index='1000'>
            <van-loading color="#fff" vertical>提交中...
            </van-loading>
        </van-overlay>
    </div>
</template>

<script>
import httpApi from "../api/index.js"
import Vue from 'vue'
export default {
    data() {
        return {
            show: false,
            canSubmit: true,
            form: [
                {
                    type: 'title',
                    no_audit_show: 1,
                    title: '完善访客信息'
                },
                {
                    type: 'input',
                    name: '访客姓名',
                    required: true,
                    list: '',
                    placeholder: '请输入访客姓名',
                    no_audit_show: 1,
                    prop: 'name'
                },
                {
                    type: 'input',
                    name: '访客单位',
                    required: true,
                    list: '',
                    placeholder: '请输入您所属单位的完整名称',
                    no_audit_show: 1,
                    prop: 'visitor_unit'
                },
                {
                    type: 'input',
                    name: '手机号码',
                    required: true,
                    code: 1,
                    list: '',
                    placeholder: '请输入手机号码',
                    no_audit_show: 1,
                    prop: 'phone'
                },
                {
                    type: 'input',
                    name: '短信验证码',
                    required: true,
                    list: '',
                    placeholder: '请输入短信验证码',
                    no_audit_show: 1,
                    prop: 'code',
                    max: 4
                },
                {
                    type: 'input',
                    name: '身份证号码',
                    required: true,
                    list: '',
                    placeholder: '请输入18位身份证号码',
                    prop: 'id_card',
                    no_audit_show: 1,
                    max: 18
                },
                {
                    type: 'data',
                    showPicker: false,
                    name: '拜访时间',
                    required: true,
                    list: 'testList',
                    minDate: new Date(),
                    maxDate: new Date(2030, 10, 1),
                    placeholder: '请选择拜访时间',
                    no_audit_show: 1,
                    prop: 'visitor_at'
                },
                {
                    type: 'input',
                    name: '车牌号码',
                    required: false,
                    list: '',
                    placeholder: '请输入车牌号码',
                    no_audit_show: 1,
                    prop: 'car_number'
                },
                // {
                //   type: 'title',
                //   title: '防疫信息'
                // },
                // {
                //   type: 'radio',
                //   name: '是否为高危地区、密切接触者、疑似及确诊病例',
                //   required: true, placeholder: '请选择是否为高危地区、密切接触者、疑似及确诊病例',
                //   prop: 'health_status',
                //   itemList: [
                //     {
                //       name: '否',
                //       id: '0'
                //     },
                //     {
                //       name: '是',
                //       id: '1'
                //     },
                //   ]
                // },
                // {
                //   type: 'upImg',
                //   name: '请上传行程卡图片（可上传3张）',
                //   required: true,
                //   dataList: 'img_list2',
                //   prop: 'imgList',
                //   afterRead: async (file) => {
                //     file.status = 'uploading';
                //     file.message = '上传中...';
                //     const files = new FormData()
                //     file.file = await this.$compressImg.compressImg(file.file)
                //     files.append("file", file.file)
                //     files.append("type", 0)
                //     httpApi.upload(files).then(res => {
                //       if (res.code == 200) {
                //         // this.fromInf.imgList.push(res.data.url)
                //         file.url = res.data.url
                //         file.status = 'done';
                //       }
                //     })
                //   },
                //   maxCount: '3',
                // },
                // {
                //   type: 'upImg',
                //   name: '请上传健康码图片（可上传3张）',
                //   required: true,
                //   dataList: 'img_list2_1',
                //   prop: 'imgList2',
                //   afterRead: async (file) => {
                //     file.status = 'uploading';
                //     file.message = '上传中...';
                //     const files = new FormData()
                //     file.file = await this.$compressImg.compressImg(file.file)
                //     files.append("file", file.file)
                //     files.append("type", 0)
                //     httpApi.upload(files).then(res => {
                //       if (res.code == 200) {
                //         file.url = res.data.url
                //         file.status = 'done';
                //       }
                //     })
                //   },
                //   maxCount: '3',
                // },
                // {
                //   type: 'upImg',
                //   tip: '注:请提供7天内核酸阴性证明!',
                //   name: '请上传核酸报告图片（可上传3张）',
                //   required: true,
                //   dataList: 'img_list2_2',
                //   prop: 'imgList3',
                //   afterRead: async (file) => {
                //     file.status = 'uploading';
                //     file.message = '上传中...';
                //     const files = new FormData()
                //     file.file = await this.$compressImg.compressImg(file.file)
                //     files.append("file", file.file)
                //     files.append("type", 0)
                //     httpApi.upload(files).then(res => {
                //       if (res.code == 200) {
                //         file.url = res.data.url
                //         file.status = 'done';
                //       }
                //     })
                //   },
                //   maxCount: '3',
                // },
                {
                    type: 'title',
                    no_audit_show: 1,
                    title: '拜访信息'
                },
                {
                    type: 'select',
                    showPicker: false,
                    name: '拜访地点',
                    required: true,
                    list: 'depList',
                    no_audit_show: 1,
                    placeholder: '请选择拜访地点',
                    prop: 'dep_id',
                    show: ''
                },
                {
                    type: 'input',
                    name: '被访人姓名',
                    required: true,
                    list: '',
                    no_audit_show: 1,
                    placeholder: '请输入被访人姓名',
                    prop: 'visited_name'
                },
                {
                    type: 'input',
                    name: '被访人手机号码',
                    required: false,
                    list: '',
                    no_audit_show: 1,
                    placeholder: '请输入被访人手机号码',
                    prop: 'visited_phone'
                },
                {
                    type: 'select',
                    showPicker: false,
                    name: '入园事由',
                    required: true,
                    list: 'subjectList',
                    no_audit_show: 1,
                    placeholder: '请选择入园事由',
                    prop: 'subject_id',
                    show: ''
                },
                {
                    type: 'input',
                    name: '备注',
                    required: true,
                    max: 80,
                    list: '',
                    notShow: 1,
                    no_audit_show: 1,
                    placeholder: '请输入备注',
                    prop: 'remarks'
                },
                {
                    type: 'title',
                    no_audit_show: 1,
                    title: '健康信息'
                },
                {
                    type: 'select',
                    showPicker: false,
                    name: '目前健康状况',
                    required: true,
                    list: 'healthList',
                    no_audit_show: 1,
                    placeholder: '请选择目前健康状况',
                    prop: 'health',
                    show: ''
                },
                {
                    type: 'input',
                    name: '备注',
                    required: true,
                    list: '',
                    notShow: 1,
                    no_audit_show: 1,
                    placeholder: '请输入备注',
                    prop: 'health_remarks'
                },
            ],
            time: 0,
            fromInf: {
                code: '',
                health: '',
                health_remarks: '',
                name: '',
                visitor_unit: '',
                phone: '',
                id_card: '',
                visitor_at: '',
                car_number: '',
                health_status: '',
                dep_id: '',
                visited_name: '',
                visited_phone: '',
                subject_id: '',
                remarks: '',
                // img_list: '',
                health_code: '',
                // report_img: '',
                imgList: [],
                imgList2: [],
                // imgList3: [],
            },
            formList: {
                subjectList: [],
                depList: [],
                healthList: [
                    { text: '健康', id: '健康' },
                    { text: '有发烧，咳嗽，乏力等症状', id: '有发烧，咳嗽，乏力等症状' },
                    { text: '其它', id: '其它' },
                ]
            },

        }
    },
    watch: {
        // 'fromInf.visited_phone': function (val) {
        //   if (val.length == 11) {
        //     const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        //     if (!myreg.test(val)) {
        //       this.$toast("手机号格式错误，请重新输入")
        //     }
        //   }
        // },
        // 'fromInf.phone': function (val) {
        //   if (val.length == 11) {
        //     const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        //     if (!myreg.test(val)) {
        //       this.$toast("手机号格式错误，请重新输入")
        //     }
        //   }
        // },
        // 'fromInf.id_card': function (val) {
        //   if (val.length == 18) {
        //     if (!this.isIdCard(val)) {
        //       this.$toast("身份证格式错误，请重新输入")
        //     }
        //   }
        // },
        'fromInf.subject_id': function (val) {
            console.log(val)
            for (let i of this.formList.subjectList) {
                if (i.id == val) {// prop: 'remarks'
                    console.log(i.content, i.content == '其它', 'i.content')
                    if (i.content == '其它' || i.content == '其他') {
                        console.log(123)
                        for (let j in this.form) {

                            if (this.form[j].prop == 'remarks') {
                                this.form[j].notShow = 0
                            }
                        }
                    } else {
                        for (let j in this.form) {
                            if (this.form[j].prop == 'remarks') {

                                this.form[j].notShow = 1
                            }
                        }
                    }
                }
            }

        },
        'fromInf.health': function (val) {
            console.log(val, this.formList.healthList)
            for (let i of this.formList.healthList) {
                if (i.id == val) {// prop: 'remarks'
                    console.log(i.content, i.content == '其它', 'i.content')
                    if (i.text == '其它' || i.text == '其他') {
                        console.log(123)
                        for (let j in this.form) {

                            if (this.form[j].prop == 'health_remarks') {
                                this.form[j].notShow = 0
                            }
                        }
                    } else {
                        for (let j in this.form) {
                            if (this.form[j].prop == 'health_remarks') {

                                this.form[j].notShow = 1
                            }
                        }
                    }
                }
            }

        },
    },
    computed: {
        form1() {
            return this.form.filter(i => { return i.no_audit_show == 1 && i.notShow != 1 })
        }
    },
    methods: {
        async send() {
            if (this.time == 0) {
                if (!this.fromInf.phone) {
                    this.$toast("请输入手机号")
                    return
                } else if (this.fromInf.phone.length != 11) {
                    this.$toast("手机号格式错误，请重新输入")
                    return
                } else {
                    const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
                    if (!myreg.test(this.fromInf.phone)) {
                        this.$toast("手机号格式错误，请重新输入")
                        return
                    }
                }
                const { code, data } = await httpApi.sendCode({ mobile: this.fromInf.phone })
                if (code == 200) {
                    this.time = 60
                    this.setTime()
                }

            }
        },
        setTime() {
            if (this.time > 0) {
                this.time = this.time - 1
                setTimeout(() => {
                    this.setTime()
                }, 1000);
            }
        },
        goRecord() {
            this.$router.push({
                path: '/record',
                query: {
                    back: this.$route.query.back ? this.$route.query.back : 0,
                    record_type: 2
                }
            })
        },
        isIdCard(idCard) {
            // 15位和18位身份证号码的正则表达式
            var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            // 如果通过该验证，说明身份证格式正确，但准确性还需计算
            if (regIdCard.test(idCard)) {
                if (idCard.length == 18) {
                    var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10,
                        5, 8, 4, 2); // 将前17位加权因子保存在数组里
                    var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
                    var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
                    for (var i = 0; i < 17; i++) {
                        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                    }

                    var idCardMod = idCardWiSum % 11;// 计算出校验码所在数组的位置
                    var idCardLast = idCard.substring(17);// 得到最后一位身份证号码

                    // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                    if (idCardMod == 2) {
                        if (idCardLast == "X" || idCardLast == "x") {
                            //alert("恭喜通过验证啦！");
                            return true;
                        } else {
                            //alert("身份证号码错误！");
                            return false;
                        }
                    } else {
                        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                        if (idCardLast == idCardY[idCardMod]) {
                            //alert("恭喜通过验证啦！");
                            return true;
                        } else {
                            //alert("身份证号码错误！");
                            return false;
                        }
                    }
                } else {
                    return true;
                }
            } else {
                //alert("身份证格式不正确!");
                return false;
            }
        },
        dateConvert(format, value) {
            var date = value
            var o = {
                "M+": date.getMonth() + 1,     //月份
                "d+": date.getDate(),     //日
                "h+": date.getHours(),     //小时
                "m+": date.getMinutes(),     //分
                "s+": date.getSeconds(),     //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds()    //毫秒
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return format;
        },
        async getListData() {
            let url = decodeURI(location.href)

            // if (url.indexOf('dep_id') > -1 ) let dep_id = url.split('dep_id=')[1].split('&')[0]


            await httpApi.getDep({ type: 2 }).then(res => {
                if (res.code == 200 && res.data) {
                    for (let i of res.data) {
                        i.text = i.name
                    }
                    this.formList.depList = res.data
                }
            })
            await httpApi.getSubject({}).then(res => {
                if (res.code == 200 && res.data) {
                    for (let i of res.data) {
                        i.text = i.content
                    }
                    this.formList.subjectList = res.data
                }
            })

            console.log("🚀 ~ file: index.vue:1019 ~ mounted ~ url:", url)
            if (url.indexOf('dep_id') > -1) {
                let dep_id = url.split('dep_id=')[1].split('&')[0], name = ''
                this.fromInf.dep_id = dep_id
                this.formList.depList.map(i => {
                    if (i.id == dep_id) {
                        name = i.name
                    }
                })
                this.fromInf.visitor_at = this.getNowTimeFull()
                this.form.map(i => {
                    if (i.prop == 'dep_id' || i.prop == 'visitor_at') {
                        i.show = name
                        i.notShow = 1
                    }
                    return i
                })


            }
            if (url.indexOf('name') > -1 && (sessionStorage.getItem('tenantCode') == 'S10101' || sessionStorage.getItem('tenantCode') == 'S10109')) {
                let name = url.split('name=')[1].split('&')[0]
                let bjArr = ['lide', 'liye', 'lizhi']
                if (bjArr.indexOf(name) > -1) {
                    if (name == 'lide') {
                        name = '立德园'
                    } else if (name == 'liye') {
                        name = '立业园'
                    } else if (name == 'lizhi') {
                        name = '立志园'
                    }
                    this.formList.depList.map(i => {
                        if (i.name == name) {
                            this.fromInf.dep_id = i.id
                        }
                    })
                    this.fromInf.visitor_at = this.getNowTimeFull()
                    console.log("🚀 ~ file: index.vue:818 ~ getListData ~ this.fromInf.visitor_at:", this.fromInf.visitor_at)
                    this.form.map(i => {
                        if (i.prop == 'dep_id' || i.prop == 'visitor_at') {
                            i.show = name
                            i.notShow = 1
                        }
                        return i
                    })
                    console.log("🚀 ~ file: index.vue:1021 ~ mounted ~ name:", name)
                    console.log(name, 12321312312)
                }

            }

            if (this.$route.query.item) {
                this.setData()
            }
        },
        getNowTimeFull() {
            var myDate = new Date;
            var year = myDate.getFullYear(); //获取当前年
            var mon = myDate.getMonth() + 1 < 10 ? "0" + (myDate.getMonth() + 1) : myDate.getMonth() + 1; //获取当前月
            var date = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate(); //获取当前日
            return year + "-" + mon + "-" + date
        },
        submit() {
            console.log(this.fromInf)
            for (let i in this.fromInf) {
                if (i.indexOf('img') == -1 && !this.fromInf[i]) {
                    for (let j of this.form) {
                        if (j.prop == i && j.required && !j.notShow && j.no_audit_show == 1) {
                            this.$toast(j.placeholder)
                            return false
                        }
                    }
                }
            }

            // let imgsList = []
            // for (let i of this.fromInf.imgList) {
            //   imgsList.push(i.url)
            // }
            let imgsList2 = []
            // for (let i of this.fromInf.imgList2) {
            //   imgsList2.push(i.url)
            // }
            // let imgsList3 = []
            // for (let i of this.fromInf.imgList3) {
            //   imgsList3.push(i.url)
            // }
            // this.fromInf.img_list = JSON.stringify(imgsList)
            // this.fromInf.health_code = JSON.stringify(imgsList2)
            // this.fromInf.report_img = JSON.stringify(imgsList3)
            // console.log(this.fromInf.imgList, this.fromInf.img_list)
            // if (!imgsList[0]) {
            //   this.$toast('请上传行程卡图片');
            //   return
            // }
            // if (!imgsList2[0]) {
            //   this.$toast('请上传健康码图片');
            //   return
            // }
            // if (!imgsList3[0]) {
            //   this.$toast('请上传核酸报告图片');
            //   return
            // }


            // const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            // if (!myreg.test(this.fromInf.phone)) {
            //   this.$toast("手机号格式错误，请重新输入")
            //   return false
            // }
            // if (this.fromInf.visited_phone && !myreg.test(this.fromInf.visited_phone)) {
            //   this.$toast("被拜访人手机号格式错误，请重新输入")
            //   return false
            // }



            // if (!this.isIdCard(this.fromInf.id_card)) {
            //   this.$toast("身份证格式错误，请重新输入")
            //   return false
            // }

            this.show = true

            let data = JSON.parse(JSON.stringify(this.fromInf))
            if (!this.canSubmit) {
                return false
            }
            this.canSubmit = false
            delete data.imgList
            delete data.imgList2
            // delete data.imgList3
            httpApi.addAudit(data).then(res => {
                console.log("🚀 ~ file: index.vue:776 ~ httpApi.addAudit ~ res", res)
                this.canSubmit = true
                this.show = false
                if (res.code == 200) {
                    this.$toast(res.msg)
                    setTimeout(() => {
                        this.$router.push(
                            {
                                name: 'applicationResults'
                            }
                        )
                    }, 1000);
                } else {
                    // this.$toast(res.msg)
                    this.$dialog({
                        message:
                            ` <i class="iconfont icon-guanbi"></i>
            <div class='text-dialog'>${res.msg}</div>`,
                        showConfirmButton: false,
                        closeOnClickOverlay: true,
                        width: 200
                    })
                }
            }).catch(err => {
                this.canSubmit = true
                this.show = false
                this.$toast('服务器错误，请联系管理员或者请稍后再试！')
            })
        },
        getJsapi() {
            let data = {
                callUrl: location.href.split('#')[0],
            }
            httpApi.sdk(data).then(res => {
                if (res.code == 200) {
                    console.log(res)
                    this.wx.config({
                        debug: location.href.indexOf('debug') == -1 ? false : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: String(res.data.appId), // 必填，公众号的唯一标识
                        timestamp: String(res.data.timestamp), // 必填，生成签名的时间戳
                        nonceStr: String(res.data.nonceStr), // 必填，生成签名的随机串
                        signature: String(res.data.signature), // 必填，签名
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 必填，需要使用的JS接口列表
                        openTagList: ['wx-open-launch-weapp']
                    })
                }
            })
        },
        record() {
            httpApi.record({}).then(res => {
                if (res.code == 200 && res.data.status == 2 && this.$route.query.back != 1) {
                    location.replace('/res')
                }
            })

        },
        setData() {
            let data = JSON.parse(this.$route.query.item)
            console.log("🚀 ~ file: index.vue ~ line 834 ~ setData ~ data", data)
            //包含访客姓名、访客单位、手机号码、身份证号码、拜访时间为当天时间、车牌号码也引用上次记录
            this.fromInf.name = data.name
            this.fromInf.car_number = data.car_number
            this.fromInf.phone = data.phone
            this.fromInf.id_card = data.id_card
            this.fromInf.visitor_unit = data.visitor_unit
            this.fromInf.visited_phone = data.visited_phone
            this.fromInf.visited_name = data.visited_name
            this.fromInf.dep_id = data.dep_id
            for (let i of this.form) {

                if (i.name == "拜访地点") {
                    for (let j of this.formList.depList) {
                        if (j.id == data.dep_id) {
                            i.show = j.text
                        }
                    }
                }
            }

            // this.fromInf.subject_id = data.subject_id
            // this.fromInf.remarks = data.remarks

        },
        async fieleList() {
            const healthTitle = (val) => {
                this.form.map(i => {
                    if (i.title == '健康信息') {
                        i.no_audit_show = val
                    }
                })
            }
            const { code, data } = await httpApi.fieleList({})
            console.log("🚀 ~ file: index.vue:963 ~ fieleList ~ code, data:", code, data)
            if (code == 200) {
                for (let i of this.form) {
                    for (let j of data) {
                        if (i.prop == j.field_sub_name) {
                            i.required = j.no_audit_status == 1 ? true : false
                            i.no_audit_show = j.no_audit_show
                            if (i.prop == 'health') {
                                healthTitle(i.no_audit_show)
                            }
                        }
                    }
                }


            }

        }
    },
    // beforeRouteEnter (to, from, next) {
    //   let u = navigator.userAgent
    //   let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    //   //XXX: 修复iOS版微信HTML5 History兼容性问题
    //   if (isiOS) {
    //     if (to.path !== location.pathname) {
    //       location.assign(to.fullPath)

    //     } else {
    //       if (sessionStorage.getItem('isIosEnter')) {
    //         next()
    //       } else {
    //         sessionStorage.setItem('isIosEnter', true)
    //         location.assign(to.fullPath)
    //       }

    //     }
    //     // 此处不可使用location.replace
    //   } else {
    //     next()
    //   }
    // },
    mounted() {
        // this.record()
        this.fieleList()
        Vue.config.ignoredElements = ['wx-open-launch-weapp']
        this.getJsapi()
        this.getListData()
    }

}
</script>