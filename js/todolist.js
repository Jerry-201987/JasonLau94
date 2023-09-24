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
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>handsontable案例</title>
    <link rel="stylesheet" href="./css/handsontable.full.css" />
    <script src="./js/handsontable.full.js"></script>
    <script src="./js/jquery.min.js"></script>
    <style>
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      #example {
      }
      .page {
        margin-top: 40px;
      }
      i {
        font-style: normal;
        cursor: pointer;
        /* border: 1px solid #ccc; */
      }
      .ban {
        cursor: not-allowed; 
        background-color: #ccc;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div id="example"></div>
      <!-- <div style="text-align: center;"> -->
      <div class="page">
        共<b style="font-weight: 400;"></b>页
        <select name="" id="select">
          <option value="15">15条/页</option>
          <option value="20">20条/页</option>
          <option value="50">50条/页</option>
          <option value="60">60条/页</option>
        </select>
        <i id="prev">◀</i>
        &nbsp;&nbsp;第<input type="text" style="width: 30px;" id="ipt">页&nbsp;&nbsp;
        <i id="next">▶</i>
      </div>
    </div>

  </body>
  <script>
    let xxxxx = "{\"total\":32,\"rows\":[{\"id\":37,\"brief_description\":\"简要描述123\",\"description\":\"问题描述123\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-22 11:18:42\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":36,\"brief_description\":\"简要描述123\",\"description\":\"问题描述123\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-22 11:04:41\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":35,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-22 11:00:07\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":34,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:40:18\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":33,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:33:55\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":32,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:30:54\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":31,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:30:00\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":30,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:29:24\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":29,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:28:05\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":28,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:27:12\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":27,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:14:23\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":26,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:09:31\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":25,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:04:49\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":24,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:04:40\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":23,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:04:16\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":22,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 15:03:19\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":21,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:59:35\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":20,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:59:10\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":19,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:57:43\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":18,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:56:42\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":17,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:54:53\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":16,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:54:53\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":15,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:54:07\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":14,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-20 14:54:07\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":13,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:40\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":12,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:39\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":11,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:38\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":10,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:38\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":9,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:38\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":8,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:37\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":7,\"brief_description\":\"简要描述6\",\"description\":\"问题描述6\",\"executor_id\":1,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:31:36\",\"status\":null,\"executor_name\":\"测试执行器0\",\"project_name\":\"测试项目\",\"total\":32},{\"id\":3,\"brief_description\":\"修改简要描述\",\"description\":\"修改问题描述\",\"executor_id\":2,\"owner\":\"董坤\",\"employee_id\":\"dwx1160680\",\"propose_time\":\"2023-09-19 16:16:20\",\"status\":null,\"executor_name\":\"测试执行器1\",\"project_name\":null,\"total\":32}]}"
    let dta = $.parseJSON(xxxxx).rows
    let ep = document.getElementById('example')
    let hot = new Handsontable(ep, {
      data: dta,
      licenseKey: "non-commercial-and-evaluation",  // 非商业用途声明
      colHeaders: ['id', '简要描述', '问题描述', '执行器id', '提出人', '提出人工号', '提出时间', '状态', '执行器名称', '项目名称', 'total'],
      colWidths: [50, 200, 200, 100, 200, 200, 200, 50, 200, 200],
      wordWrap: true,
      manualColumnFreeze: true,
      manualColumnResize: true,
      manualRowResize: true,
    })

    function paginate(data, pageSize, curPage) {
      let startIndex = (curPage - 1) * pageSize;
      let endIndex = startIndex + pageSize;
      return data.slice(startIndex, endIndex);
    }

    // const data = [...] // 初始数据
    let pageSize = 15 // 15 20 50
    let curPage = 1
    let maxPage = Math.ceil(dta?.length / pageSize)
    console.log(maxPage, 'maxPage0');

    $('input').val(curPage)

    function updateTable () {
      const paginatedData = paginate(dta, pageSize, curPage)
      hot.loadData(paginatedData)
      $('b').text(maxPage)
    }

    // 翻页操作
      $('#prev').on('click', function() {
        curPage--
        if (dta?.length > pageSize) {
          $('#next').removeClass('ban')
          if (curPage <= 1) {
            curPage = 1
            $('#prev').addClass('ban')
          }
          $('input').val(curPage)
          updateTable()
        } else {
          $('#next').addClass('ban')
        }
      })
  
      $('#next').on('click', function() {
        curPage++
        if (dta?.length > pageSize) {
          $('#prev').removeClass('ban')
          if (curPage >= maxPage) {
            console.log(maxPage, 'maxPage1');
            curPage = maxPage
            $('#next').addClass('ban')
          }
          $('input').val(curPage)
          updateTable()
        } else {
          $('#next').addClass('ban')
        }
      })

    $('#select').on('change', () => {
      let val = parseInt($('#select option:selected').val())
      pageSize = val
      curPage = 1
      maxPage = Math.ceil(dta?.length / pageSize)
      console.log(maxPage, 'maxPage2');
      $('#prev').addClass('ban')
      nextStyle()
      $('input').val(curPage)
      updateTable()
    })

    function nextStyle () {
      if (dta?.length <= pageSize) {
        $('#next').addClass('ban')
      } else {
        $('#next').removeClass('ban')
      }
    }

    $('#ipt').on('keypress', function (e) { // keydown input blur
      iptVal = $('#ipt').val() // iptVal类型为string
      // if (!/^\d+$/.test(iptVal)) {
      if (e.keyCode >= 48 && e.keyCode <= 57) {
          return true
      } else if (e.keyCode === 13) {
        if (Number(iptVal) <= maxPage) {
          curPage = Number(iptVal)
          updateTable()
        } else {
          alert('数字大于总页数')
          curPage = 1
          $('input').val(curPage)
          updateTable()
          nextStyle()
          $('#prev').addClass('ban')
        }
      } else {
        alert('请输入数字')
        return false
      }
    })

    // 初始化
    $(function () {
      updateTable() // 初始化表格
      $('#prev').addClass('ban')
    })
  </script>
</html>
