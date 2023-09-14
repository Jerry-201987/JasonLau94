// 案例介绍：
// 1. 文本框里面输入内容，按下回车，就可以生成待办事项。
// 2. 点击待办事项复选框，就可以把当前数据添加到已完成事项里面。
// 3. 点击已完成事项复选框，就可以把当前数据添加到待办事项里面。
// 4. 但是本页面内容刷新页面不会丢失。

// 步骤：
// 1-todolist按下回车读取本地存储数据
// 2-todolist按下回车保存最新数据到本地存储
// 3-todolist本地存储数据渲染加载到页面中
// 4-todolist点击删除按钮获取当前索引号
// 5-todolist点击删除按钮完成删除操作

// 6-点击复选框修改相应数据done属性
// 7-todolist正在进行和已经完成事项制作
// 8-todolist统计正在进行和已经完成事项个数

$(function() {
    // alert(11);
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组local 存储给本地存储
                saveDate(local);

                // 2. toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });

    // 3. toDoList 删除操作
    $("ol, ul").on("click", "a", function() {
        // alert(11);
        // 先获取本地存储
        var data = getDate();
        // console.log(data);
        // 修改数据
        var index = $(this).attr("data-id");
        console.log(index);
        data.splice(index, 1);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });

    // 4. toDoList 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function() {
        // alert(11);
        // 先获取本地存储的数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("data-id");
        console.log(index);
        // data[?].done = ?
        data[index].done = $(this).prop("checked");
        console.log(data);

        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });


    // 读取本地存储的数据 
    // 返回值的类型 数组对象
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }


    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data)); // 存的是字符串类型
    }


    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data, function(i, n) {
            // console.log(n);
            // console.log(n.done);  // 当前遍历到的元素的 done属性
            if (n.done) {
                // 元素done的值如果为真，表示 该事项已经完成，添加到ul中
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' data-id=" + i + " ></a></li>");
                doneCount++;
            } else {
                // 元素done的值如果为false，表示 该事项没有 完成，添加到ol中
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' data-id=" + i + " ></a></li>");
                todoCount++;
            }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }

});

+++++++++++++++++++
    <style>
      button {
        width: 160px;
        height: 30px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        background: dodgerblue;
        border: none;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <button id="btn">点击</button>
  </body>
    <script>
      let arr = [
        { cn: "焦糖色", rgb: "160,85,0" },
        { cn: "酱色", rgb: "199,107,0" },
        { cn: "糖果粉色", rgb: "249,212,221" },
        { cn: "果糖仁糖巧克力", rgb: "201,132,117" },
        { cn: "梦想蓝色", rgb: "112,196,219" },
        { cn: "玫紫红", rgb: "222,59,186" },
        { cn: "轻雾蓝", rgb: "224,237,255" },
        { cn: "公主粉", rgb: "255,99,150" },
        { cn: "杨妃粉", rgb: "220,158,176" },
        { cn: "白蓝色", rgb: "209,227,232" },
        { cn: "珊瑚粉", rgb: "232,178,247" },
        { cn: "甜蜜粉", rgb: "245,181,250" },
        { cn: "浅黄色", rgb: "242,244,194" },
        { cn: "浅蓝色", rgb: "186,224,221" },
        { cn: "浓粉色", rgb: "236,109,136" },
        { cn: "浅粉色", rgb: "238,201,183" },
        { cn: "嫩绿色", rgb: "168,209,130" },
        // { cn: "水蓝色", rgb: "#ccc" },
      ];
      let btn = document.getElementById('btn')
      btn.addEventListener('click', () => {
        let xxx = Math.floor(Math.random()*arr.length)
        console.log(xxx);
        btn.innerHTML = arr[xxx].cn
        document.body.style.background = `rgb(${arr[xxx].rgb})`
      })
