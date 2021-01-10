// 初始化插件
$(function () {
    $('#fullpage').fullpage({
        // 设置每屏的背景颜色
        sectionsColor: ['#f00', '#0f0', '#00f', '#f0f'],
        //显示右侧的导航圆点
        navigation: false,
        // 给每一屏设置对应的锚点
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
        // 绑定菜单，设定的相关属性与 anchors 的值对应后，菜单可以控制滚动
        menu: '#menu',
        // 设置效果循环滚动
        continuousVertical: true,
        // 内容是否垂直居中
        verticalCentered: true,
        // 设置页面加载运动方式easingcss3设置cubic-bezier拜塞尔曲线
        // cubic-bezier(x1,y1,x2,y2)
        easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 2)',
        //当加载某一屏的时候去执行一个函数，link代表锚点名称,index代表当前的屏幕，index从1开始计算
        afterLoad: function (link, index) {
            // 第1屏
            if (index == 1) {
                $('.t_br').addClass('animated bounceInDown');
                $('p').addClass('animated bounceIn');
                $('.b_br').addClass('animated bounceInUp');
            }
            // 第2屏
            if (index == 2) {
                $('.tit_bg').addClass('animated bounceInRight');
                $('.tit_img').addClass('animated bounceInLeft');
                $('.poh').addClass('animated bounceInUp');
                $('.about .txt').addClass('animated bounceInRight');
            }
            // 第3屏
            if (index == 3) {
                $('.tit_bg').addClass('animated bounceInRight');
                $('.tit_img').addClass('animated bounceInLeft');
                $('.por h3').addClass('animated bounceIn');
                $('.por .lines').addClass('animated bounceIn');
                $('.por p').addClass('animated bounceInLeft');
            }
            // 第4屏
            if (index == 4) {
                $('.zp').addClass('animated flipInX');
            }
            // 第5屏
            if (index == 5) {
                $('.tag').addClass('animated bounceInDown');
                $('.line').addClass('animated bounceInUp');
                $('.list div:nth-child(1)').addClass('animated bounceInLeft');
                $('.list div:nth-child(2)').addClass('animated bounceInRight');
                $('.list div:nth-child(3)').addClass('animated bounceInLeft');
            }
        },
        //当从index（当前的所在的屏幕）屏幕去往nextIndex（要从当前去往的屏幕）屏幕，dir当前滚动的方向
        onLeave: function (index, nextIndex, dir) {
            // 第1屏
            if (index == 1) {
                $('.t_br').removeClass('animated bounceInDown');
                $('p').removeClass('animated bounceIn');
                $('.b_br').removeClass('animated bounceInUp');
            }
            // 第2屏
            if (index == 2) {
                $('.tit_bg').removeClass('animated bounceInRight');
                $('.tit_img').removeClass('animated bounceInLeft');
                $('.poh').removeClass('animated bounceInUp');
                $('.about .txt').removeClass('animated bounceInRight');
            }
            // 第3屏
            if (index == 3) {
                $('.tit_bg').removeClass('animated bounceInRight');
                $('.tit_img').removeClass('animated bounceInLeft');
                $('.por h3').removeClass('animated bounceIn');
                $('.por .lines').removeClass('animated bounceIn');
                $('.por p').removeClass('animated bounceInLeft');
            }
            // 第4屏
            if (index == 4) {
                $('.zp').removeClass('animated flipInX');
            }
            // 第5屏
            if (index == 5) {
                $('.tag').removeClass('animated bounceInDown');
                $('.line').removeClass('animated bounceInUp');
                $('.list div:nth-child(1)').removeClass('animated bounceInLeft');
                $('.list div:nth-child(2)').removeClass('animated bounceInRight');
                $('.list div:nth-child(3)').removeClass('animated bounceInLeft');
            }
        }
    });
})