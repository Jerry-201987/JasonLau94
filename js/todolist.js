let keyObj = {
        Avg: [
          "internalAvg",
          "externalAvg",
          "totalAvg",
          "targetAvg",
          "salesVolumeAvg",
          "lossRateAvg",
        ],
        Sum: [
          "internalSum",
          "externalSum",
          "totalSum",
          "targetSum",
          "salesVolumeSum",
          "lossRateSum",
        ],
        Code: ["aaa", "bbb", "ccc", "ddd", "eee", "fff"], // 后续新增
      };
      let arr = Object.keys(keyObj);
      let sec = Object.values(keyObj);
      console.log(arr);
      console.log(sec);
      let internalLossCost = {};
      let externalLossCost = {};
      let totalLoss = {};
      let targetValue = {};
      let sales = {};
      let qualityLossRate = {};
      let v = {};

      for (let idx = 0; idx < sec.length; idx++) {
        for (let i = 0; i < sec[idx].length; i++) {
          internalLossCost[arr[idx]] = sec[idx][0];
          externalLossCost[arr[idx]] = sec[idx][1];
          totalLoss[arr[idx]] = sec[idx][2];
          targetValue[arr[idx]] = sec[idx][3];
          sales[arr[idx]] = sec[idx][4];
          qualityLossRate[arr[idx]] = sec[idx][5];
        }
      }
      console.log(internalLossCost, "11");
      console.log(externalLossCost, "22");
      console.log(totalLoss, "33");
      console.log(targetValue, "44");
      console.log(sales, "55");
      console.log(qualityLossRate, "66");
      console.log(sec, "00000");
***************************************************************************************************************
import os
import random
import time
import openpyxl
import pyqtgraph as pg
from functools import partial

from PySide2.QtCore import QTimer, QEvent, QObject
from PySide2.QtCore import Qt
from PySide2 import QtGui
from PySide2.QtWidgets import QGraphicsDropShadowEffect, QTableWidget, QHeaderView, QMessageBox, QFileDialog
from PySide2.QtWidgets import QPushButton, QLineEdit, QLabel
from PySide2.QtWidgets import QWidget, QTableWidgetItem
from PySide2.QtGui import QColor

from script.turnable_angle.detector_normalization.ui.detector_normalization_ui import Ui_Form
from testbot.adt_base.adt_presenter import ADTPresenter
from testbot.base.result_show import GraphicResultWindow


class DetectorNormalizationPresenter(QWidget, Ui_Form, ADTPresenter):
    def __init__(self, name):
        """
        初始化
        """
        super(DetectorNormalizationPresenter, self).__init__()
        ADTPresenter.__init__(self, first_dir="cpd", second_dir="detector_normalization", file_name=name)
        self.setupUi(self)
        # 按钮绑定
        self.button_init()
        # 输入框范围限定
        self.adt_input_range_init()
        self.pulse_validator()
        # 输入框范围
        self._input_range = {
            "start": {
                "left": -3,
                "right": 3
            },
            "end": {
                "left": -4,
                "right": 4
            },
            "step": {
                "left": -5,
                "right": 5
            },
            "pulse": {
                "left": 0,
                "right": 9999999
            }
        }
        # 准备状态
        self._prepare_status = False
        # 表格数据
        self.all_lst = []
        # 固定表头
        self.para_name = ['Calibration time']
        # 动态表头 接口假数据
        self.nm_name = ["12.5nm", "12.52nm", "14.46nm", "14.48nm", "14.5nm"]
        self.get_table_data()
        self.set_name()

        self.Date_PD1 = list()
        self.Date_PD2 = list()
        self.Date_PD3 = list()
        self.Date_PD4 = list()
        self.Date_PD5 = list()
        # 数据加载
        self.test_data()
        # 画布
        self.gridLayout_list = {self.line_chart: {'x_label': "Num. (a.u.)",
                                                  'y_label': "Intensity (a.u.)",
                                                  'curve_name1': "12.5nm",
                                                  'curve_name2': "12.52nm",
                                                  'curve_name3': "14.46nm",
                                                  'curve_name4': "14.48nm",
                                                  'curve_name5': "14.5nm"}}
        # 图表加载
        # self.show_chart()
        self.draw_line()

    def test_data(self):
        self.Date_PD1 = self.all_lst[1]
        self.Date_PD2 = self.all_lst[2]
        self.Date_PD3 = self.all_lst[3]
        self.Date_PD4 = self.all_lst[4]
        self.Date_PD5 = self.all_lst[5]

    # 图表展示
    def show_chart(self):
        for key, value in self.gridLayout_list.items():
            self.set_graphic_line_widget_fig(gridLayout_name=key, x_label=value.get('x_label'), y_label=value.get('y_label'), 
                                             data_1=self.Date_PD1, data_2=self.Date_PD2, data_3=self.Date_PD3, data_4=self.Date_PD4, 
                                             data_5=self.Date_PD5, curve_name1=value.get('curve_name1'), curve_name2=value.get('curve_name2'), 
                                             curve_name3=value.get('curve_name3'), curve_name4=value.get('curve_name4'), curve_name5=value.get('curve_name5'))

    # 随机颜色
    @staticmethod
    def get_color():
        r = random.randint(0, 255)
        g = random.randint(0, 255)
        b = random.randint(0, 255)
        return QColor(r, g, b)

    def draw_line(self):
        self.line_chart.setLabel('left', 'Intensity (a.u.)')
        self.line_chart.setLabel('bottom', 'Num. (a.u.)')
        self.line_chart.setBackground('w')
        curve1 = self.line_chart.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD1))), y=self.Date_PD1)
        curve2 = self.line_chart.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD2))), y=self.Date_PD2)
        curve3 = self.line_chart.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD3))), y=self.Date_PD3)
        curve4 = self.line_chart.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD4))), y=self.Date_PD4)
        curve5 = self.line_chart.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD5))), y=self.Date_PD5)
        # 绑定复选框槽函数
        self.checkBox.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox, curve1))
        self.checkBox_2.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox_2, curve2))
        self.checkBox_3.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox_3, curve3))
        self.checkBox_4.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox_4, curve4))
        self.checkBox_5.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox_5, curve5))


    def set_graphic_line_widget_fig(self, gridLayout_name=None, x_label=None, y_label=None, data_1=None, data_2=None, data_3=None, data_4=None, 
                                    data_5=None, curve_name1=None, curve_name2=None, curve_name3=None, curve_name4=None, curve_name5=None):
        """
        图表设置
        """
        self.graphic_line_plot_widget = pg.PlotWidget()
        gridLayout_name.addWidget(self.graphic_line_plot_widget, 0, 0)
        GraphicResultWindow.plot_widget_ui(self.graphic_line_plot_widget, title="", x_label=x_label,
                                           y_label=y_label)
        self.legend = pg.LegendItem(offset=(0, 1))
        self.legend.setParentItem(self.graphic_line_plot_widget.graphicsItem())

        self.legend.clear()
        curve1 = self.graphic_line_plot_widget.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD1))), y=self.Date_PD1)
        curve2 = self.graphic_line_plot_widget.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD2))), y=self.Date_PD2)
        curve3 = self.graphic_line_plot_widget.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD3))), y=self.Date_PD3)
        curve4 = self.graphic_line_plot_widget.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD4))), y=self.Date_PD4)
        curve5 = self.graphic_line_plot_widget.plot(pen=pg.mkPen({'color': self.get_color(), 'width': 2}),
                                                    x=list(range(len(self.Date_PD5))), y=self.Date_PD5)
        self.legend.addItem(curve1, curve_name1)
        self.legend.addItem(curve2, curve_name2)
        self.legend.addItem(curve3, curve_name3)
        self.legend.addItem(curve4, curve_name4)
        self.legend.addItem(curve5, curve_name5)
        # 绑定复选框槽函数
        self.checkBox.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox, curve1))
        self.checkBox_2.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox_2, curve2))
        self.checkBox_3.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox_3, curve3))
        self.checkBox_4.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox_4, curve4))
        self.checkBox_5.stateChanged.connect(lambda: self.checkbox_slot(self.checkBox_5, curve5))


    def checkbox_slot(self, checkbox, line):
        '''
        绑定复选框槽函数
        '''
        if checkbox.isChecked():
            self.line_chart.addItem(line)
        else:
            self.line_chart.removeItem(line)

    def button_init(self):
        '''
        绑定按钮槽函数
        '''
        # Start
        self.Start_Btn.clicked.connect(self.start_event)
        # Abort
        self.Abort_Btn.clicked.connect(self.abort_event)

    def start_event(self):
        '''
        start
        '''
        if not self._prepare_status:
            QMessageBox.warning(self, "警告", "Calibration is not ready yet!")
            return
        QMessageBox.warning(self, "提示", "Start!")

    def abort_event(self):
        '''
        abort
        '''
        abort = QMessageBox.question(self, "确认", "Abort?", QMessageBox.Yes | QMessageBox.No)
        if abort == QMessageBox.Yes:
            # 终止流程
            # pass
            return

    def adt_input_no_focus(self, check_type, input):
        '''
        单个输入框失去焦距时限定操作
        '''
        if check_type not in self._input_range:
            input.clear()
            return
        # 取出边界
        left = self._input_range[check_type]["left"]
        right = self._input_range[check_type]["right"]
        # 获取text
        num = input.text()
        # 如果有小数点
        try:
            if "." in num:
                num = float(num)
            else:
                num = int(num)
        except ValueError:
            input.clear()
            return
        # 超标
        if num < left:
            input.setText(str(left))
        if num > right:
            input.setText(str(right))

    def pulse_validator(self):
        self.Mea_Edit.setValidator(QtGui.QIntValidator())

    def adt_input_range_init(self):
        '''
        输入框范围限定
        '''
        # 焦点设置
        self.Start_Edit.editingFinished.connect(
            lambda: self.adt_input_no_focus("start", self.Start_Edit)
        )
        self.End_Edit.editingFinished.connect(
            lambda: self.adt_input_no_focus("end", self.End_Edit)
        )
        self.Step_Edit.editingFinished.connect(
            lambda: self.adt_input_no_focus("step", self.Step_Edit)
        )
        self.Mea_Edit.editingFinished.connect(
            lambda: self.adt_input_no_focus("pulse", self.Mea_Edit)
        )

    @staticmethod
    def time_factory(start_time=(2023, 1, 1, 0, 0, 0, 0, 0, 0), end_time=(2023, 11, 8, 23, 59, 59, 0, 0, 0)):
        start = time.mktime(start_time)  # 生成开始时间戳
        end = time.mktime(end_time)  # 生成结束时间戳
        t = random.randint(start, end)  # 在开始和结束时间戳中随机取出一个
        date_tuple = time.localtime(t)  # 将时间戳生成时间元组
        date = time.strftime("%Y-%m-%d %H:%M:%S", date_tuple)  # 将时间元组转成格式化字符串
        return date

    def get_table_data(self):
        time_lst = []
        for i in range(10):
            time_lst.append(self.time_factory())

        for i in range(len(self.nm_name)):
            line_lst = []
            for j in range(10):
                line_lst.append(round(random.uniform(10, 18), 2))
            # print(line_lst, 'line_lst+++++++++++++')
            self.all_lst.append(line_lst)
        self.all_lst.insert(0, time_lst)

        row = len(self.all_lst[0])
        col = len(self.all_lst)
        for i in range(row):   # 行循环
            for j in range(col):  # 列循环
                self.tableWidget.setRowCount(row)  # 设置表格行数
                self.tableWidget.setColumnCount(col)  # 设置表格列数
                self.tableWidget.setHorizontalHeaderLabels(
                    self.para_name + self.nm_name)  # 给tableWidget设置行列表头
                table_item = str(self.all_lst[j][i])
                # 该字符串类型的数据新建为tableWidget元素
                new_item = QTableWidgetItem(table_item)
                new_item.setTextAlignment(
                    Qt.AlignHCenter | Qt.AlignVCenter)  # 显示为水平居中、垂直居中
                # 在表格第i行第j列显示newItem元素
                self.tableWidget.setItem(i, j, new_item)

        # 按照第1列排序，默认降序
        self.tableWidget.sortItems(0, Qt.DescendingOrder)
        # print(self.all_lst, 'line_lst--------------------')

    def set_name(self):
        self.time_value.setText(self.tableWidget.item(0, 0).text())

    def export_to_excel(self):
        right_len = len(self.nm_name)
        # 创建工作簿对象
        book = openpyxl.Workbook()
        sheet = book.active
        sheet.title = "Normalization Raw Data"
        sheet.column_dimensions['A'].width = 22
        alignment = openpyxl.styles.Alignment(horizontal='center', vertical="center")

        data = {
            "Calibration time": self.time_value.text(),
            "Measurement pulse": self.Mea_Edit.text(),
            "Wavelength(nm)": self.nm_name,
            "D1": [1 for _ in range(right_len)],
            "D2": [self.tableWidget.item(0, i + 1).text() for i in range(right_len)],
            "Standard Reflectivity": [1 for _ in range(right_len)],
            "D2/D1": [self.tableWidget.item(0, i + 1).text() for i in range(right_len)]
        }

        # 往表中写入内容
        row, col = 1, 1

        for title, value in data.items():
            sheet.cell(row=row, column=col).alignment = alignment
            sheet.cell(row=row, column=col).value = title
            if isinstance(value, str):
                col += 1
                sheet.cell(row=row, column=col).value = value
                sheet.cell(row=row, column=col).alignment = alignment
            if isinstance(value, list):
                for v in value:
                    col += 1
                    sheet.cell(row=row, column=col).value = v
                    sheet.cell(row=row, column=col).alignment = alignment
            row += 1
            col = 1
        # 合并单元格
        sheet.merge_cells(f"B1:{chr(ord('B')+right_len-1)}{1}")
        sheet.merge_cells(f"B2:{chr(ord('B')+right_len-1)}{2}")
        file_directory = QFileDialog.getExistingDirectory(self, "选择导出该文件的文件夹")
        # 保存表格
        book.save(os.path.join(file_directory, "Normalization Raw Data.xlsx"))
***************************************************************************************************
all_lst = []

para_name = ['Calibration time']
nm_name = ["12.5nm", "12.52nm", "14.46nm", "14.48nm", "14.5nm"]
para_name += nm_name
# print(para_name)

# 我需要10行5列    
# [[1,2],[3,4],[5,6]] 3*2

def time_factory(start_time=(2023, 1, 1, 0, 0, 0, 0, 0, 0), end_time=(2023, 11, 8, 23, 59, 59, 0, 0, 0)):
    start = time.mktime(start_time)  # 生成开始时间戳
    end = time.mktime(end_time)  # 生成结束时间戳
    # print(start, 'start')
    # print(end, 'end')
    t = random.randint(start, end)  # 在开始和结束时间戳中随机取出一个
    # print(t, 't')
    date_touple = time.localtime(t)  # 将时间戳生成时间元组
    # print(date_touple, type(date_touple))
    date = time.strftime("%Y-%m-%d %H:%M:%S", date_touple)  # 将时间元组转成格式化字符串
    # print(date, type(date))
    return date
    # print(date)

def get_table_data(rag=10):
    time_lst = []
    for i in range(rag):
        time_lst.append(time_factory())
    # print(time_lst)

    for i in range(len(nm_name)):
        line_lst = []
        for j in range(rag):
            # line_lst.append(f'lst{j + 1}')
            line_lst.append(round(random.uniform(10, 18), 2))
            # print(line_lst, 'xxxx')
        all_lst.append(line_lst)

    all_lst.insert(0, time_lst)

    return all_lst

print(get_table_data())

for i in range(len(all_lst[0])):  #行循环
    for j in range(len(all_lst)):  #列循环
        table_item = str(all_lst[j][i])
        print(table_item)
***************************************************************************************************
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
