var type; //订购类型
var typeString; // 订购类型文字 如月，年，半年
var typeMoney; //订购金额
var moneyConfig = [14.9, 10, 7] //订购金额配置 对应月，年，半年 
var buyparams; // 订购参数
var sureText; // 确认订购文字
var sureTextConfig = [
    '上网加速器月包，14.9/月，每月自动续订，订购首月优惠1个月功能费，每个用户仅限办理一次。',
    '上网加速器半年包（6个月合约），原价12元/月，从本月起每月可享受2元优惠，优惠后价格10元/月，连续享受6个月，合约期6个月，合约期满后将按12元/月收费。合约期内需使用由中国移动通信集团四川有限公司提供的相关通信服务，不能过户、报停、销号，若提前解除活动，需至营业厅退还已享受优惠。',
    '上网加速器年包（12个月合约），原价10元/月，从本月起每月可享受3元优惠，优惠后价格7元/月，连续享受12个月，合约期12个月，合约期满后将按10元/月收费。合约期内需使用由中国移动通信集团四川有限公司提供的相关通信服务，不能过户、报停、销号，若提前解除活动，需至营业厅退还已享受优惠。'
] // 正在发起确认订购   对应月，半年，年
var setTime; //定时器
var $currentDom;//当前获取验证码dom
var channel = GetQueryString('channel')
var regPhone = /^1\d{10}$/; //电话号码正则表达式
var regVerify = /^\d{4}(\d{2})?$/; //验证码正则表达式   
var acceleRateUrl = "https://wap.sc.10086.cn/index.html?channel=SCZT55&WT.mc_id=SCZT61";

(function (doc, win) {
    var docEl = win.document.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    /**
     * ================================================
     * 设置根元素font-size
     * 当设备宽度为375(iPhone6)时，根元素font-size=16px;
     × ================================================
     */
    var refreshRem = function () {
        var clientWidth = win.innerWidth ||
            doc.documentElement.clientWidth ||
            doc.body.clientWidth;

        if (!clientWidth) return;
        var fz;
        var width = clientWidth;
        fz = 100 * width / 750;
        docEl.style.fontSize = fz + 'px';
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, refreshRem, false);
    doc.addEventListener('DOMContentLoaded', refreshRem, false);
    refreshRem();

    $(win).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(doc).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            addVisitLogs(channel, 6);
        }
    });

})(document, window);

function clearTimeout () {
    if ($currentDom) {
        $currentDom.removeClass('gotNumber')
        $currentDom.text('获取验证码')
        $currentDom.removeAttr('disabled')
        clearInterval(setTime)
    }
}
$(document).off('click', '.togglePopwin').on('click', '.togglePopwin', function () {
    //lau 点击“立刻订购”（分情况）
    type = $(this).attr('data-type')
    if (type == 1) {
        typeString = '月'
        typeMoney = moneyConfig[0]
        addVisitLogs(channel, 1); //记录日志接口
    } else if (type == 2) {
        typeString = '半年'
        typeMoney = moneyConfig[1]
        addVisitLogs(channel, 2);
    } else if (type == 3) {
        typeString = '年'
        typeMoney = moneyConfig[2]
        addVisitLogs(channel, 3);
    }
    $('.popwinShadow .orderType').text(typeString)
    $('.popwinShadow .orderMoney').text(typeMoney)
    $('.popwinShadow .phoneNumber').val('')
    $('.popwinShadow .inputNumber').val('')
    $('.popwinShadow').show()
})
$(document).off('click', '.blockThree .useInfo .button').on('click', '.blockThree .useInfo .button', function () {
    window.open(acceleRateUrl);
    addVisitLogs(channel, 5);
})
// 确认订购弹框关闭
$(document).off('click', '.orderSuccessPop .close').on('click', '.orderSuccessPop .close', function () {
    $('.orderSuccessPop').hide()
})
// 确认订购弹框取消
$(document).off('click', '.orderSuccessPop .cancelBtn').on('click', '.orderSuccessPop .cancelBtn', function () {
    $('.orderSuccessPop').hide()
})

// 我知道弹框关闭
$(document).off('click', '.iknowPop .close').on('click', '.iknowPop .close', function () {
    $('.iknowPop').hide()
})
// 我知道弹框我知道了
$(document).off('click', '.iknowPop .submitBtn').on('click', '.iknowPop .submitBtn', function () {
    $('.iknowPop').hide()
})
// 订购成功弹框关闭
$(document).off('click', '.successTipsPop .close').on('click', '.successTipsPop .close', function () {
    $('.successTipsPop').hide()
})
// 订购成功弹框我知道了
$(document).off('click', '.successTipsPop .submitBtn').on('click', '.successTipsPop .submitBtn', function () {
    $('.successTipsPop').hide()
})
// 在合约期弹框关闭
$(document).off('click', '.inPeriodPop .close').on('click', '.inPeriodPop .close', function () {
    $('.inPeriodPop').hide()
})
// 在合约期弹框我知道了
$(document).off('click', '.inPeriodPop .submitBtn').on('click', '.inPeriodPop .submitBtn', function () {
    $('.inPeriodPop').hide()
})

$(document).off('click', '.popwinShadow .close').on('click', '.popwinShadow .close', function () {
    $('.popwinShadow').hide()
    $('.popwinShadow .phoneNumber').val('')
    $('.popwinShadow .inputNumber').val('')
    clearTimeout()
})

$(document).off('click', '.popwinShadow .getVerify').on('click', '.popwinShadow .getVerify', function () {
    var phoneNumber = $('.popwinShadow .phoneNumber').val()
    if (!regPhone.test(phoneNumber)) {
        $('.tips').text('手机号错误，请重新填写').show(300).delay(3000).hide(300)
        return
    }
    $currentDom = $(this)
    if (!($currentDom.attr('disabled') == 'disabled')) {
        var textParams = {
            cellPhoneNum: phoneNumber,
            channelId: channel
        }
        $(this).addClass('gotNumber')
        $currentDom.attr('disabled', 'disabled')
        //验证码
        $.ajax({
            type: 'POST',
            contentType: "application/json;charset=UTF-8",
            url: '/mbb/v1/marketing/getShortMsgCode',
            data: JSON.stringify(textParams),
            success: function (param) {
                var time = 60
                $currentDom.text(time + '秒后重新获取')
                setTime = setInterval(function () {
                    $currentDom.text(--time + '秒后重新获取')
                    if (time == 0) {
                        clearTimeout()
                    }
                }, 1000)
                if (param.resultCode === '0000') {
                    $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
                } else if (param.resultCode === '10002') {
                    $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
                }
            },
            error: function (param) {
                if (param.resultCode === '9999') {
                    $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
                }
            }
        })
    }
})
// lau 立即订购完成，发起确认订购（分情况）
$(document).off('click', '.popwinShadow .submitBtn').on('click', '.popwinShadow .submitBtn', function () {
    var phoneNumber = $('.popwinShadow .phoneNumber').val()
    var verifyNumber = $('.popwinShadow .inputNumber').val()
    if (!regPhone.test(phoneNumber)) {
        $('.tips').text('手机号错误，请重新填写').show(300).delay(3000).hide(300)
        return
    } else if (!regVerify.test(verifyNumber)) {
        $('.tips').text('验证码错误，请重新填写').show(300).delay(3000).hide(300)
        return
    }
    buyparams = {
        prodPrcid: type,
        channel: channel,
        cellPhoneNum: phoneNumber,
        smsPwd: verifyNumber
    }
    if (buyparams.prodPrcid == 1) {
        sureText = sureTextConfig[0]
        $('.orderSuccessPop .popwinWrap').addClass('MonthSuccess')
    } else if (buyparams.prodPrcid == 2) {
        $('.orderSuccessPop .popwinWrap').removeClass('MonthSuccess')
        sureText = sureTextConfig[1]
    } else if (buyparams.prodPrcid == 3) {
        $('.orderSuccessPop .popwinWrap').removeClass('MonthSuccess')
        sureText = sureTextConfig[2]
    }
    $('.popwinShadow').hide()
    $('.orderSuccessPop .orderContent').text(sureText)

    $('.orderSuccessPop').show()
})

// lau 确认订购弹框确定，订购成功（分情况）
$(document).off('click', '.orderSuccessPop .submitBtn').on('click', '.orderSuccessPop .submitBtn', function () {
    $('.orderSuccessPop').hide()
    ajaxBuy()
})
function ajaxBuy () {
    $('.loading').show()
    //点击完成的接口
    $.ajax({
        type: 'POST',
        contentType: "application/json;charset=UTF-8",
        url: '/mbb/v1/marketing/packageOrder',
        data: JSON.stringify(buyparams),
        success: function (param) {
            $('.loading').hide()
            if (param.resultCode === '0000') {
                if (buyparams.prodPrcid == 1) {
                    typeString = '月'
                } else if (buyparams.prodPrcid == 2) {
                    typeString = '半年'
                } else if (buyparams.prodPrcid == 3) {
                    typeString = '年'
                }
                $('.successTipsPop .orderType').text(typeString)
                $('.successTipsPop').show()
            } else if (param.resultCode === '10002') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            } else if (param.resultCode === '1002') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            } else if (param.resultCode === '2000') {
                $('.inPeriodPop').show()
            } else if (param.resultCode === '2022') {
                $('.iknowPop').show()
            } else if (param.resultCode === '2002') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            } else if (param.resultCode === '3000') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            } else if (param.resultCode === '3002') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            } else if (param.resultCode === '3003') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            } else if (param.resultCode === '3004') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            } else if (param.resultCode === '3007') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            } else if (param.resultCode === '3008') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            } else if (param.resultCode === '3009') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            }
        },
        error: function (param) {
            $('.loading').hide()
            if (param.resultCode === '9999') {
                $('.tips').text(param.resultInfo).show(300).delay(3000).hide(300)
            }
        }
    })
}

function GetQueryString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var url = decodeURI(window.location.search);
    var r = url.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context.trim();
}

function addVisitLogs (channelId, visitType) {
    var param = { "channelId": channelId, "visitType": visitType };
    $.ajax({
        type: 'POST',
        contentType: "application/json;charset=UTF-8",
        url: '/mbb/v1/marketing/addVisitLog',
        data: JSON.stringify(param),
        success: function (param) {

        },
        error: function (param) {

        }
    });
}
