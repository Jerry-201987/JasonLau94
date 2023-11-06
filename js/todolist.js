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
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/handsontable.full.css" />
    <script src="js/handsontable.full.js"></script>
    <script src="js/jquery.min.js"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .tabs {
        display: flex;
      }

      .tabs li {
        width: 100px;
        height: 50px;
        text-decoration: none;
        list-style-type: none;
        border: 1px solid #ccc;
        margin-left: 10px;
      }

      .hide {
        width: 330px;
        background-color: burlywood;
        height: 100px;
        display: none;
      }

      .active {
        background-color: steelblue;
        color: #fff;
      }

      .show {
        display: block;
      }
    </style>
  </head>
  <body>
    <ul class="tabs">
      <li class="active">0</li>
      <li>1</li>
      <li>2</li>
      <li class="aaa">3</li>
    </ul>
    <div class="boxs">
      <div class="hide show" id="content-main0"></div>
      <div class="hide" id="content-main1">1</div>
      <div class="hide" id="content-main2">2</div>
      <div class="hide" id="content-main3">3</div>
    </div>

    <div id="example"></div>

    <script>
          let xxxxx = "{\"total\":32,\"rows\":[{\"id\":37,\"brief_description\":\"简要描述123\",\"description\":\"问题描述123\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-22 11:18:42\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":36,\"brief_description\":\"简要描述123\",\"description\":\"问题描述123\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-22 11:04:41\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":35,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-22 11:00:07\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":34,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:40:18\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":33,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:33:55\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":32,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:30:54\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":31,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:30:00\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":30,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:29:24\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":29,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:28:05\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":28,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:27:12\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":27,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:14:23\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":26,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:09:31\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":25,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:04:49\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":24,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:04:40\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":23,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:04:16\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":22,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:03:19\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":21,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:59:35\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":20,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:59:10\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":19,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:57:43\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":18,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:56:42\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":17,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:54:53\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":16,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:54:53\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":15,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:54:07\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":14,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:54:07\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":13,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:40\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":12,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:39\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":11,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:38\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":10,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:38\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":9,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:38\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":8,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:37\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":7,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:36\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":3,\"brief_description\":\"修改简要描述\",\"description\":\"修改问题描述\",\"executor_id\":2,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:16:20\",\"status\":null,\"executor_name\":\"测试执行器1\",\"project_name\":null,\"total\":32}]}"
    let dta = $.parseJSON(xxxxx).rows
    let ep = document.getElementById('example')
    let hot = Handsontable(ep, {
      data: dta,
      licenseKey: "non-commercial-and-evaluation",  // 非商业用途声明
      // colHeaders: ['id', '简要描述', '问题描述', '执行器id', '提出人', '提出人工号', '提出时间', '状态', '执行器名称', '项目名称'],
      colHeaders: ['id', '简要描述', '问题描述', '执行器id', '提出人', '提出人工号', '提出时间', '状态', '执行器名称', '项目名称', '操作'],
      colWidths: [50, 200, 200, 100, 200, 200, 200, 50, 200, 200],
      wordWrap: true,
      manualColumnFreeze: true,
      manualColumnResize: true,
      manualRowResize: true,
      hiddenColumns: {
        // columns: [Object.keys(dta[0])?.indexOf('total')],
        indicators: true,
      },
      columns: [
        { data: 'id', type: 'numeric' },
        { data: 'brief_description', type: 'text' },
        { data: 'description', type: 'text' },
        { data: 'executor_id', type: 'numeric' },
        { data: 'owner', type: 'text' },
        { data: 'employee_id', type: 'text' },
        { data: 'propose_time', type: 'date', dateFormat: 'YYYY-MM-DD hh:mm:ss' },
        { data: 'status', type: 'numeric' },
        { data: 'executor_name', type: 'text' },
        { data: 'project_name', type: 'text' },
        { data: null, type: 'checkbox' },
      ],
      // cells: function (row, col, prop) {
      //   var cellProperties = {};
      //   cellProperties.renderer = 'negativeValueRenderer';
      //   return cellProperties;
      // }
    })
      $(function () {

      // hot.loadData()

        // let obj = {
        //   0: getIndex0(),
        //   1: getIndex1(),
        //   2: getIndex2(),
        //   3: getIndex3(),
        // };
        getIndex0();
        // console.log($('.tabs li').index());
        // console.log($('.tabs').find('.active').index());
        $(".tabs li").on("click", function () {
          let idx = $(this).index();
          console.log(idx, "++++++++++++");
          $(this).addClass("active").siblings().removeClass("active");
          $(".boxs").children().eq(idx).show().siblings().hide();
          // idx ? obj[idx] : obj[0];

          // 附加始
          if (idx) {
            $(".boxs").children().eq(0).removeClass("show")
          }
          // 附加终

        });
      });
      function getIndex0() {
        $("#content-main0").text("晁盖");
      }
      function getIndex1() {
        $("#content-main1").text("宋江");
      }
      function getIndex2() {
        $("#content-main2").text("卢俊义");
      }
      function getIndex3() {
        $("#content-main3").text("吴用");
      }
    </script>
  </body>
</html>
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/handsontable.full.css" />
    <script src="js/handsontable.full.js"></script>
    <script src="js/jquery.min.js"></script>
  </head>
  <body>
    <div>
      <form action="" >
        <div class="form-group" id="modal">
          <div class="col-sm-2">
            <label class="control-label" for="brief_description"
              >简要描述*</label
            >
          </div>
          <div class="col-sm-10">
            <textarea
              class="form-control text-area-control"
              id="brief_description"
              rows="2"
              placeholder="一句话简要描述"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
    <script>
      // let str = ''
      let sum = 0;
      let colParam = [
        {
          column_header: "brief_description",
          column_description: "简要描述",
          column_width: "235",
          column_type: "text",
          select_count: "",
          mandatory_or_not: 1,
          show_or_not: 1,
        },
        {
          column_header: "description",
          column_description: "描述",
          column_width: "50",
          column_type: "text",
          select_count: "",
          mandatory_or_not: 1,
          show_or_not: 1,
        },
        {
          column_header: "owner",
          column_description: "创建人",
          column_width: "50",
          column_type: "text",
          select_count: "",
          mandatory_or_not: 1,
          show_or_not: 1,
        },
        {
          column_header: "employee_id",
          column_description: "工号",
          column_width: "50",
          column_type: "text",
          select_count: "",
          mandatory_or_not: 1,
          show_or_not: 1,
        },
        {
          column_header: "propose_time",
          column_description: "创建时间",
          column_width: "50",
          column_type: "text",
          select_count: "",
          mandatory_or_not: 1,
          show_or_not: 1,
        },
        {
          column_header: "executor_id",
          column_description: "执行器id",
          column_width: "50",
          column_type: "text",
          select_count: "",
          mandatory_or_not: 1,
          show_or_not: 0,
        },
        {
          column_header: "project_id",
          column_description: "项目id",
          column_width: "50",
          column_type: "text",
          select_count: "",
          mandatory_or_not: 1,
          show_or_not: 0,
        },
        {
          column_header: "project_name",
          column_description: "项目名称",
          column_width: "235",
          column_type: "text",
          select_count: "",
          mandatory_or_not: 1,
          show_or_not: 1,
        },
        {
          column_header: "executor_name",
          column_description: "执行器名称",
          column_width: "235",
          column_type: "text",
          select_count: "",
          mandatory_or_not: 1,
          show_or_not: 1,
        },
        {
          column_header: "test",
          column_description: "测试字段",
          column_width: "235",
          column_type: "text",
          select_count: null,
          mandatory_or_not: 1,
          show_or_not: 0,
        },
        {
          column_header: "test3",
          column_description: "测试字段3",
          column_width: "235",
          column_type: "select",
          select_count: null,
          mandatory_or_not: 1,
          show_or_not: 0,
        },
      ];
      let textStr
      let selStr
      console.log(colParam, colParam?.length, "++++++++++++++++++++++");
      for (let i = 7; i < colParam?.length; i++) {
          if (colParam[i]?.column_type === "text") {
              if (colParam[i]?.show_or_not) {
                  sum += i * 10
                  textStr = `
                      <div class="col-sm-2">
                          <label class="control-label" for=${colParam[i]?.column_header}>${colParam[i]?.column_description}*</label>
                      </div>
                      <div class="col-sm-10">
                          <textarea class="form-control text-area-control" id=${colParam[i]?.column_header} rows="2"
                                  placeholder="请输入${colParam[i]?.column_description}"></textarea>
                      </div>
                  `
                  $('#modal').append(textStr)
              }
            //   $('#modal').append(textStr)
          } else if (colParam[i]?.column_type === "select") {
              if (colParam[i]?.show_or_not) {
                  sum += i * 100
                  selStr = `
                      <div class="col-sm-2">
                          <label class="control-label" for=${colParam[i]?.column_header}>${colParam[i]?.column_description}*</label>
                      </div>
                      <div class="col-sm-10">
                          <select class="form-control" id=${colParam[i]?.column_header}>
                              <option></option>
                          </select>
                      </div>
                  `
                  $('#modal').append(selStr)
              }
            //   $('#modal').append(selStr)
          }
          console.log(sum);
      }

    //   $('#modal').append(textStr)
    //   $('#modal').append(selStr)

      console.log(sum);
    </script>
  </body>
</html>
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
import json
import os
from threading import Thread

project_path = os.path.split(os.path.realpath(__file__))[0] + '/..'


def load_json(file_name):
    """
    加载json文件
    :file_name : 文件名
    """
    with open(os.path.join(project_path, 'config', file_name), 'r', encoding='UTF-8') as result:
        return json.load(result)


def async_call(f):
    def wrapper(*args, **kwargs):
        thr = Thread(target=f, args=args, kwargs=kwargs)
        thr.start()

    return wrapper

def write_to_config_json(content_name,data):
    with open(os.path.join(get_project_rootpath(),'config',content_name,'goniometer','axis_config.json'), "w", encoding="utf-8") as fd:
        # indent=2 格式化json文件, ensure_ascii=False中文识别
        json.dump(data, fd, indent=2, ensure_ascii=False)
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# 无放回抽样
# list_unique = random.sample([_ for _ in range(10)], 10)
# 有放回抽样
# list_repeatable = random.choices([_ for _ in range(10)], k=10)
list_repeatable2 = random.choice([str(_) for _ in range(10)])
print(list_repeatable2, type(list_repeatable2))


self.list_repeatable2 = [str(_) for _ in range(10)]
self.label.setText(random.choice(self.list_repeatable2))

# for i in range(len(lst)):
#     print(i, lst[i])

# for i, n in enumerate(lst):
#     print(i, n)

# for i, n in enumerate(lst, 1):
#     print(i, n)

# 序列解压
num_tup = (1, 2)
try:
    x, y, z, zz = num_tup

except Exception as ex:
    print(f'出错了，出错原因：{ex}')
