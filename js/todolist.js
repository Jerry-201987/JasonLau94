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
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        <style>
        i {
            font-style: normal;
            cursor: pointer;
        }
        .ban {
            cursor: not-allowed; 
            background-color: #ccc;
        }
        .page {
            text-align: center;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    </style>
</head>
<body class="">
<div class="panel-body" style="padding-bottom:0;">
    <div class="col-sm-12 text-center">
        <h2>共性问题列表</h2>
    </div>
    <div id="toolbar" class="btn-group">
        <button id="btn_add" type="button" class="btn btn-default">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增共性问题
        </button>
        <button id="btn_delete" type="button" class="btn btn-default">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
        </button>
    </div>
    <table id="contact">
    </table>
    <!-- 分页栏 -->
    <div class="page">
        共<b style="font-weight: 400;" class="total"></b>条数据
        <!-- <select name="" id="select">
            <option value="15">15条/页</option>
            <option value="20">20条/页</option>
            <option value="50">50条/页</option>
        </select> -->
        <input type="number" id="pgSize">条/页
        <i id="prev">◀</i>
        &nbsp;&nbsp;第<input type="text" style="width: 30px;" id="ipt">页&nbsp;&nbsp;
        <i id="next">▶</i>
    </div>
</div>
                    
<!-- 新增共性问题 模态框（Modal） -->
<div class="modal fade bs-example-modal-lg" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true" style="display: none;">
     <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="modal_label">新增共性问题记录</h4>
            </div>
            <div class="modal-body col-sm-12">
                <div class="col-sm-12">
                    <div class="form-group col-sm-12">
                        <label for="brief_description">简要描述</label>
                        <input type="text" name="brief_description" class="form-control" id="brief_description" placeholder="一句话简要描述">
                    </div>
                    <div class="form-group col-sm-12">
                        <label for="description">问题描述</label>
                        <input type="text" name="description" class="form-control" id="description" placeholder="问题背景及影响">
                    </div>
                    <div class="form-group col-sm-12">
                        <label for="form_group">项目名称</label>
                        <select id="proj" name="form_group" class="form-control">
                            <!-- 项目名称 -->
                            <option></option>
                        </select>
                    </div>
                    <div class="form-group col-sm-12">
                        <label for="form_group">执行器名称</label>
                        <select id="exec" name="form_group" class="form-control">
                            <!-- 执行器名称 -->
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button type="button" class="btn btn-primary" id="btn_submit">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
     </div><!-- /.modal -->
</div>
<!-- 修改共性问题 模态框（Modal） -->
<div class="modal fade bs-example-modal-lg" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true" style="display: none;">
     <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="modal_labelEdit">修改共性问题记录</h4>
            </div>
            <div class="modal-body col-sm-12">
                <div class="col-sm-12">
                    <div class="form-group col-sm-12">
                        <label for="brief_description">简要描述</label>
                        <input type="text" name="brief_description" class="form-control" id="brief_descriptionE" placeholder="一句话简要描述">
                    </div>
                    <div class="form-group col-sm-12">
                        <label for="description">问题描述</label>
                        <input type="text" name="description" class="form-control" id="descriptionE" placeholder="问题背景及影响">
                    </div>
                    <div class="form-group col-sm-12">
                        <label for="form_group">项目名称</label>
                        <select id="projE" name="form_group" class="form-control">
                            <!-- 项目名称 -->
                            <option></option>
                        </select>
                    </div>
                    <div class="form-group col-sm-12">
                        <label for="form_group">执行器名称</label>
                        <select id="execE" name="form_group" class="form-control">
                            <!-- 执行器名称 -->
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button type="button" class="btn btn-primary" id="btn_submitE">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
     </div><!-- /.modal -->
</div>
</body>
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // 设置jQuery Ajax全局的参数
$.ajaxSetup({
    error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === (403)) {
            location.href = -1 === location.pathname.indexOf("Darwin") ?
                location.origin + "/Account/Login.aspx?ReturnUrl=" + location.href:
                location.origin + "/Darwin/Account/Login.aspx?ReturnUrl=" + location.href;
        }
    },
});
let g_cookieArray = [];
let g_dataId;
let postdata = {}
let delId
let delExecutorId
let delBrDescription
let delDescription
let pageSize = 15
let pageNumber = 1
let tota
let projData
let execData
let subTemp = {}
let sub_table = {}
LoadRecordTable(postdata);
RecordAppVisit("访问主界面");

$(function () {
    $.post("../Process/ProjectManagerHandler.ashx?action=InitProject", {},
        function (result) {
            if (result.code === 0) {
                projData = JSON.parse(result.data)
            } else {
                swal("加载参数错误！", result.msg, "error");
            }
    });
    // 【删除】
    $("#btn_delete").click(function () {
        RecordAppVisit("点击删除记录");
        let id = $("#contact").bootstrapTable('getSelections')?.[0]?.id;
        if (!id) {
            toastr.warning('请选择有效数据');
            return;
        }
        swal({
            title: `是否确认删除id为${id}的行`,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickOutside: true,
            timer: 8000
        }, function (isConfirm) {
            if (isConfirm) {
                $.post("../Process/CommonIssueHandler.ashx?action=DeleteCommonIssueData", {id: id},
                function (result, status) {
                    if (result.code !== 0) {
                        swal({
                            title: "删除共性问题记录失败！",
                            text: result.msg,
                            type: "error",
                            showConfirmButton: true,
                            closeOnClickOutside: true,
                            timer: 10000
                        });
                    } else {
                        swal({
                            title: `id为${id}的行已删除`,
                            type: "success",
                            showConfirmButton: true,
                            closeOnClickOutside: true,
                            timer: 10000
                        });
                        $('#modal').modal("hide");
                        LoadRecordTable(postdata);
                    }
                }); 
            }
        });
    })
    // 输入 pageSize
    $('#pgSize').on('keypress', function (e) {
        pageSize = $('#pgSize').val()
        if (e.keyCode >= 48 && e.keyCode <= 57) {
            return true
        } else if (e.keyCode === 13) {
          if (Number(pageSize) <= tota) {
            $('#next').removeClass('ban')
            pageSize = Number(pageSize)
            LoadRecordTable(postdata)
          } else {
            pageSize = tota
            nextStyle()
            LoadRecordTable(postdata)
            toastr.warning('数字大于总长度');
            $('#prev').addClass('ban')
            // !/^0+/.test('0')
          }
        } else {
          toastr.warning('请输入数字')
          return false
        }       
    })
    // 翻页操作
    $('#prev').on('click', function () {
        pageNumber--
        if (tota > pageSize) {
            $('#next').removeClass('ban')
            if (pageNumber <= 1) {
                pageNumber = 1
                $('#prev').addClass('ban')
            }
            $('#ipt').val(pageNumber)
            LoadRecordTable(postdata)
        } else {
            $('#next').addClass('ban')
        }
    })
    $('#next').on('click', function () {
        maxPage = Math.ceil(tota / pageSize)
        pageNumber++
        if (tota > pageSize) {
            $('#prev').removeClass('ban')
            if (pageNumber >= maxPage) {
                pageNumber = maxPage
                $('#next').addClass('ban')
            }
            $('#ipt').val(pageNumber)
            LoadRecordTable(postdata)
        } else {
            $('#next').addClass('ban')
        }
    })
    $('#select').on('change', function() {
        let val = parseInt($('#select option:selected').val())
        pageSize = val
        pageNumber = 1
        maxPage = Math.ceil(tota / pageSize)
        $('#prev').addClass('ban')
        nextStyle()
        $('#ipt').val(pageNumber)
        LoadRecordTable(postdata)
    })

    // 点击【新增】按钮
    $("#btn_add").click(function () {
        RecordAppVisit("点击新增记录");
        $("#modal").modal({
            keyboard: true
        });
        $("#brief_description").val('');
        $("#description").val('');
        $("#proj").val('');
        $("#exec").val('');
        $("#proj option").remove();
        $.each(projData, function(key, val) {
            $('#proj').append("<option value='" + val.id + "'>" + val.project_name + "</option>");
        }); 
    });
    // 【项目名称】下拉框 （新增共性问题记录）
    $('#proj').on('change', function() {
        $("#exec option").remove();
        let project_id = $("#proj").val()
        if (project_id) {
            $.post("../Process/ProjectManagerHandler.ashx?action=InitExecutor", {project_id},
                function (result) {
                    if (result.code === 0) {
                        execData = JSON.parse(result.data)
                        for (var i = 0; i < execData.length; i++) {
                            $('#exec').append("<option value='" + execData[i].id + "'>" + execData[i].executor_name + "</option>");
                        }
                    } else {
                        swal("加载参数错误！", result.msg, "error");
                    }
            });
        }
    })
    // 【项目名称】下拉框 （修改共性问题记录）
    $('#projE').on('change', function() {
        console.log($("#projE").val(), '$("#projE").val()');

        $("#execE option").remove();
        let project_id = $("#projE").val()
        if (project_id) {
            $.post("../Process/ProjectManagerHandler.ashx?action=InitExecutor", {project_id},
                function (result) {
                    if (result.code === 0) {
                        execData = JSON.parse(result.data)
                        for (var i = 0; i < execData.length; i++) {
                            $('#execE').append("<option value='" + execData[i].id + "'>" + execData[i].executor_name + "</option>");
                        }
                    } else {
                        swal("加载参数错误！", result.msg, "error");
                    }
            });
        }

    })
    // 新增【提交】
    $("#btn_submit").click(function () {
        let brief_description = $("#brief_description").val();
        let description = $("#description").val();
        let proj = $("#proj").val(); // 项目  project_id
        let exec = $("#exec").val(); // 执行器 id
        let adddata = {};
        if ("" === brief_description) {
            toastr.warning('简要描述不能为空');
            return;
        }
        if ("" === description) {
            toastr.warning('问题描述不能为空');
            return;
        }
        if ("" === proj) {
            toastr.warning('项目名称不能为空');
            return;
        }
        if ("" === exec) {
            toastr.warning('执行器名称不能为空');
            return;
        }
        adddata.brief_description = brief_description;
        adddata.description = description;
        adddata.executor_id = exec;
        $.post("../Process/CommonIssueHandler.ashx?action=CreateCommonIssueData", adddata,
        function (result, status) {
            if (result.code !== 0) {
                swal({
                    title: "新增共性问题记录失败！",
                    text: result.msg,
                    type: "error",
                    showConfirmButton: true,
                    closeOnClickOutside: true,
                    timer: 10000
                });
            } else {
                swal({
                    title: "新增共性问题记录成功！",
                    type: "success",
                    showConfirmButton: true,
                    closeOnClickOutside: true,
                    timer: 10000
                });
                $('#modal').modal("hide");
                LoadRecordTable(postdata);
                
            }
            });
    })
    // 修改【提交】
    $("#btn_submitE").click(function () {
        let editdata = {};
        let brief_description_E = $("#brief_descriptionE").val();
        let description_E = $("#descriptionE").val();
        let project_id_E = $("#projE").val();
        let executor_id_E = $("#execE").val();
        console.log(brief_description_E, description_E, project_id_E, executor_id_E, '修改提交');
        if (!brief_description_E) {
            toastr.warning('简要描述不能为空');
            return;
        }
        if (!description_E) {
            toastr.warning('问题描述不能为空');
            return;
        }
        if ("" === project_id_E) {
            toastr.warning('项目名称不能为空');
            return;
        }
        if ("" === executor_id_E) {
            toastr.warning('执行器名称不能为空');
            return;
            // return false;
        }
        editdata.brief_description = brief_description_E;
        editdata.description = description_E;
        editdata.executor_id = executor_id_E;
        editdata.id = delId;
        $.post("../Process/CommonIssueHandler.ashx?action=ModifyCommonIssueData", editdata,
        function (result, status) {
            if (result.code !== 0) {
                swal({
                    title: "编辑共性问题记录失败！",
                    text: result.msg,
                    type: "error",
                    showConfirmButton: true,
                    closeOnClickOutside: true,
                    timer: 10000
                });
            } else {
                swal({
                    title: "编辑共性问题记录成功！",
                    type: "success",
                    showConfirmButton: true,
                    closeOnClickOutside: true,
                    timer: 10000
                });
                $('#modal').modal("hide");
                LoadRecordTable(postdata);
                
            }
        });  
    })
});
// 登录超时检测
function CheckLoginValid() {
    //获取页面cookie
    g_cookieArray = document.cookie.match(/userName=([^;]+)(;|$)/);
    if (g_cookieArray && 3 !== g_cookieArray.length){
        location.href = -1 === location.pathname.indexOf("Darwin") ?
            location.origin + "/Account/Login.aspx?ReturnUrl=" + location.href:
            location.origin + "/Darwin/Account/Login.aspx?ReturnUrl=" + location.href;
    }
}

function operateTeamatter(value, row, index) {
    return [
        '<a class="role-edit" href="javascript:void(0);" ><img title="编辑" src="../../../Image/new%20ICON/edit_doc.svg" style="height: 20px;width: 20px"></a>',
    ].join('');
}

// 加载初始表格
function LoadRecordTable(postdata) {
    postdata.pageSize = pageSize
    postdata.pageNumber = pageNumber
    CheckLoginValid();
    $.get(
        "../Process/CommonIssueHandler.ashx?action=InitCommonIssueData", postdata,
        function (result) {
            if (result.code === 0) {
                ShowChipCiRecordsTable(result);
                if (pageNumber === 1) {
                    $('#prev').addClass('ban')
                } else {
                    $('#prev').removeClass('ban')
                }
                tota = JSON.parse(result.data).total;
                $('.total').text(tota)
                $('#ipt').val(pageNumber)
                $('#pgSize').val(pageSize)
            } else {
                swal("加载参数错误！", result.msg, "error");
            }
        });
}

// 在前端显示任务配置
function ShowChipCiRecordsTable(result) {
    let oTableInit = {};
    $('#contact').bootstrapTable('load', JSON.parse(result.data))
    $('#contact').bootstrapTable({
        data: JSON.parse(result.data).rows,
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: true,                        //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false,                   //是否显示分页（*）
        sidePagination: "server",           //分页方式:client客户端分页，server服务端分页（*）
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: false,                //是否启用点击选中行
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: true,					//父子表
        columns: [
            {checkbox: true},
            {field: 'id', title: 'ID', align: 'center', width: '20', valign: 'middle', visible: false},
            {field: 'executor_id', title: '执行器ID', align: 'center', width: '20', valign: 'middle', visible: false},
            // {field: 'executor_id', title: '执行器ID', align: 'center', width: '200', valign: 'middle'},
            {field: 'brief_description', title: '简要描述', align: 'center', width: '200', valign: 'middle'},
            {field: 'description', title: '问题描述', align: 'center', width: '200', valign: 'middle'},
            {field: 'owner', title: '提出人', align: 'center', width: '200', valign: 'middle'},
            {field: 'employee_id', title: '提出人工号', align: 'center', width: '200', valign: 'middle'},
            {field: 'propose_time', title: '提出时间', align: 'center', width: '200', valign: 'middle'},
            {field: 'status', title: '状态', align: 'center', width: '200', valign: 'middle'},
            {field: 'project_name', title: '项目名称', align: 'center', width: '200', valign: 'middle'},
            {field: 'executor_name', title: '执行器名称', align: 'center', width: '200', valign: 'middle'},
            {
                field: '', title: '操作', align: 'center', width: '200', valign: 'middle', events: {
                    'click .role-edit': function (e, value, row, index) {
                        updateTeam(row);
                    },
                },
                formatter: operateTeamatter
            }
        ],
        onExpandRow: function (index, row, $detail) {
            oTableInit.InitSubTable(index, row, $detail);
        }
    });

    // 子表 查看本问题在各执行器的确认情况和意见
    oTableInit.InitSubTable = function (index, row, $detail) {
        let issueId = row.id;
        let cur_table = $detail.html('<table></table>').find('table');
        $(cur_table).bootstrapTable({
            ajax: function (request) {                    //使用ajax请求
                $.ajax({
                    type: "GET",
                    url: '../Process/ExecutorIssueHandler.ashx?action=GetExecutorIssuesByIssueId',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    data: request.data,
                    success: function (result) {
                        if (result.code === 0) {
                            subTemp.rows = JSON.parse(result.data)
                            request.success({row: subTemp});
                            $(cur_table).bootstrapTable('load', subTemp);
                            sub_table["'" + project_id + "'"] = cur_table;
                        }
                    }
                })
            },
            striped: true,                      //是否显示行间隔色
            pagination: false,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            // queryParams: {'issueId': issueId},
            queryParams: {issueId},
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: false,                //是否启用点击选中行
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            columns: [
                {checkbox: true},
                {field: 'id', title: 'ID', align: 'center', width: '20', valign: 'middle', visible: false},
                {field: 'executor_id', title: '执行器ID', align: 'center', width: '200', valign: 'middle', visible: false},
                {field: 'issue_id', title: '版本ID', align: 'center', width: '200', valign: 'middle', visible: false},
                {field: 'project_id', title: '项目ID', align: 'center', width: '200', valign: 'middle', visible: false},
                {field: 'accept_or_not', title: '是否接受', align: 'center', width: '200', valign: 'middle'}, // 0未处理 1接受 2不接受
                {field: 'brief_description', title: '简要描述', align: 'center', width: '200', valign: 'middle'},
                {field: 'description', title: '问题描述', align: 'center', width: '200', valign: 'middle'},
                {field: 'employee_id1', title: '提出人工号', align: 'center', width: '200', valign: 'middle'},
                {field: 'executor_name', title: '执行器名称', align: 'center', width: '200', valign: 'middle'},
                {field: 'handling_suggestions', title: '处理意见', align: 'center', width: '200', valign: 'middle'},
                {field: 'owner1', title: '提出人', align: 'center', width: '200', valign: 'middle'},
                {field: 'remark', title: '描述', align: 'center', width: '200', valign: 'middle'},
                {field: 'status', title: '状态', align: 'center', width: '200', valign: 'middle'}, // 0失败 1成功
            ],
        });
    };
    
    // } 
}

function updateTeam(row) {
    $("#modalEdit").modal()
    $("#brief_descriptionE").val(row.brief_description);
    $("#descriptionE").val(row.description);
    $("#projE option").remove();
    $.each(projData, function(key, val) {
        $('#projE').append("<option value='" + val.id + "'>" + val.project_name + "</option>");
    });
    // $("#projE").get(0).value = row.project_id;

    $("#projE").val(row.project_id);
    // $("#execE option").remove();
    // // $("#execE").get(0).value = row.executor_id;

    // let project_id = $("#projE").val()
    // if (project_id) {
    //     $.post("../Process/ProjectManagerHandler.ashx?action=InitExecutor", {project_id},
    //         function (result) {
    //             if (result.code === 0) {
    //                 execData = JSON.parse(result.data)
    //                 for (var i = 0; i < execData.length; i++) {
    //                     $('#execE').append("<option value='" + execData[i].id + "'>" + execData[i].executor_name + "</option>");
    //                 }
    //             } else {
    //                 swal("加载参数错误！", result.msg, "error");
    //             }
    //     });
    // }

    // // $("#projE").val(row.project_id);
    // $("#execE").val(row.executor_id);
    delId = row.id;
}

//增加日期格式化函数
Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};
// 操作记录
function RecordAppVisit(remark) {
    $.post("../Process/ChipCiRecordsOpHandler.ashx?action=AppVisitRecord", {
        remark: remark,
    });
}

function nextStyle () {
    if (tota <= pageSize) {
      $('#next').addClass('ban')
    } else {
      $('#next').removeClass('ban')
    }
}
