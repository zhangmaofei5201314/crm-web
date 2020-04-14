/**
 * 纯js实现多div拖拽
 * @param bar, 拖拽触柄
 * @param target, 可拖动窗口
 * @param inWindow, 为true时只能在屏幕范围内拖拽
 * @param callback, 拖拽时执行的回调函数。包含两个参数，target的left和top
 * @returns {*}
 * @private
 */

var dragleft;
var dragtop;

//清单ID
var listcode;

//指标
var par1 = [];
//维度
var par2 = [];

//arr/arr2 存放非时间条件值
//条件
var arr = [];
//值
var arr2 = [];

//存放时间条件值
//条件
var timeName = [];
//值
var timeValue = [];


//指标
var title1 = [];
//维度
var title2 = [];

//全局results，存放筛选条件
var results = [];
//必填
var subflag = [];
function init_js() {
    $("#btn_list_exl").hide();
}


function init_angularjs($scope, LisGridService) {

    //下拉列表
    function select(index, id) {
        $scope.pgcode = {"codeName": results[index].typeparam, "refresh": "1"};
        // console.log(1);
        // console.log(results[index].typeparam);
        // console.log(id);
        // console.log(1);
        LisGridService.readSubmit("../common/CodeQuery.do", $scope.pgcode).then(function (result) {
            var list = result.data.data;
            var data = [];
            for (var i = 0; i < list.length; i++) {
                var arr = {"id": list[i][0], "text": list[i][0] + " - " + list[i][1]};
                data.push(arr);
            }
            $("#" + id).select2({data: data, placeholder: '请选择...', allowClear: true});
        });
    }


    $scope.pg.listcode = listcode;
    //初始化拖拽区域列表
    LisGridService.readSubmit("../CustomListInit/QUERY||MAIN.do", $scope.pg).then(function (resl) {


        var top = 50;
        var top2 = 50;

        var result = resl.data.data;
        results = resl.data.data;
        //存放a的div个数
        var k = 0;
        //存放b的div个数
        var j = 0;
        for (var i = 0; i < result.length; i++) {

            if (result[i].fieldkind == "0") {

                if (result[i].inputflag == "1") {
                    var t = {
                        "fieldtype": result[i].fieldtype,
                        "fieldcode": result[i].fieldcode,
                        "fieldname": result[i].fieldname,
                        "checkrule": result[i].checkrule
                    };
                    subflag.push(t);
                }
                $("#a").append("<li>"
                    + " <div id='" + result[i].fieldkind + result[i].fieldtype + result[i].fieldcode + i + "' class='box1' style='top:" + (top = top + 25) + "px;'>"
                    + "<div id='atest" + k + "' class='test'>"
                    + " <div id='abar" + k + "' draggable='true' class='bar' >" + result[i].fieldname + "</div>"
                    + " </div>"
                    + "  </div>"
                    + "   </li>");
                startDrag(document.getElementById("abar" + k), document.getElementById(result[i].fieldkind + result[i].fieldtype + result[i].fieldcode + i));
                k++;
            }
            if (result[i].fieldkind == "1") {
                $("#b").append("<li>"
                    + " <div id='" + result[i].fieldkind + result[i].fieldtype + result[i].fieldcode + i + "' class='box2' style='top:" + (top2 = top2 + 25) + "px;'>"
                    + "<div id='btest" + j + "' class='test'>"
                    + " <div id='bbar" + j + "' draggable='true' class='bar' >" + result[i].fieldname + "</div>"
                    + " </div>"
                    + "  </div>"
                    + "   </li>");
                startDrag(document.getElementById("bbar" + j), document.getElementById(result[i].fieldkind + result[i].fieldtype + result[i].fieldcode + i));
                j++;
            }
        }


    });

    //导出CSV
    $scope.btn_list_exl_click = function () {

        if ($scope.transFormGridOpts.data == "") {
            LisInfo.alert("您还未生成清单");
            return;
        }

        //获取拖拽目标区域DIV内容
        for (var i = 0; i < arr.length; i++) {
            arr2[i] = $("#" + arr[i]).val();
        }
        for (var i = 0; i < timeName.length; i++) {
            timeValue[i] = $("#" + timeName[i]).val();
        }

        //select字段
        var par = [];
        var index = 0;
        for (var i = 0; i < par1.length; i++) {
            par[index] = par1[i];
            index++;
        }
        for (var i = 0; i < par2.length; i++) {
            par[index] = par2[i];
            index++;
        }
        //标题
        var title = [];
        var tindex = 0;
        for (var i = 0; i < title1.length; i++) {
            title[tindex] = title1[i];
            tindex++;
        }
        for (var i = 0; i < title2.length; i++) {
            title[tindex] = title2[i];
            tindex++;
        }
        if ("1" == results[0].listflag) {
            var data = {
                "param1": par,
                "title": title,
                "param2": arr,
                "param3": arr2,
                "timeName": timeName,
                "timeValue": timeValue
            };
        } else {
            var data = {
                "param1": par,
                "title": title,
                "param2": arr,
                "param3": arr2,
                "timeName": timeName,
                "timeValue": timeValue,
                "tablecode": results[0].tablecode
            };
        }


        var result = [];
        $.ajax({
            type: "POST",
            url: "../" + results[0].dealclass + "/EXPORT||MAIN.do",
            data: data,
            dataType: "json",
            async: false,
            traditional: true,
            success: function (jsonObj) {
                result = jsonObj;
            }
        });

        if ('success' == result.status) {
            LisFile.download(result.data);
        } else {
            LisInfo.alert("下载失败，请稍后重试。");
            return;
        }
    }

    //重置并隐藏GRID 清空筛选条件 隐藏导出CSV
    $scope.btn_list_reset_click = function () {


        for (var i = 0; i < par1.length; i++) {
            $("#" + par1[i]).parent().parent().remove();
        }
        for (var i = 0; i < par2.length; i++) {
            $("#" + par2[i]).parent().remove();
        }
        for (var i = 0; i < timeName.length; i++) {
            $("#" + timeName[i]).parent().parent().remove();
        }
        par1 = [];
        par2 = [];


        arr = [];
        arr2 = [];

        timeName = [];
        timeValue = [];

        title1 = [];
        title2 = [];

        var transFormGridColDefs = "[{ displayName: '', name: 'name', enableCellEdit: true, allowCellFocus: true, visible: true ,enableColumnMenu:false}]";
        $scope.transFormGridOpts.columnDefs = eval('(' + transFormGridColDefs + ')');
        $scope.pg.transFormGridColDefs = JSON.stringify($scope.transFormGridOpts.columnDefs);

        $scope.transFormGridOpts.data = [];

        $("#transFormGrid").hide();
        $("#btn_list_exl").hide();
    }

    //生成自定义清单
    $scope.btn_list_add_click = function () {
        var rdata = [];

        if (par1.length == 0) {
            LisInfo.alert("您还未拖拽维度筛选条件");
            return;
        }
        if (par2.length == 0) {
            LisInfo.alert("您还未拖拽字段");
            return;
        }
        for (var i = 0; i < subflag.length; i++) {
            var flag;
            if (subflag[i].fieldtype == "2") {
                var v1 = $("#" + subflag[i].fieldcode + "1").val();
                var v2 = $("#" + subflag[i].fieldcode + "2").val();
                if (typeof (v1) == "undefined" || typeof (v2) == "undefined") {
                    LisInfo.alert("该清单必须有" + subflag[i].fieldname + "筛选条件！请在维度筛选条件中拖拽" + subflag[i].fieldname + "。");
                    return;
                }
                if (v1 == "" || v2 == "") {
                    LisInfo.alert(subflag[i].fieldname + "填写不完整！请重新填写。");
                    return;
                }
                var d1 = new Date(v1);
                var d2 = new Date(v2);
                flag = (d2 - d1) / 1000 / 60 / 60 / 24;
                if (flag > 31) {
                    LisInfo.alert("仅能查询31天内的清单数据，请重新输入日期。");
                    return;
                }
                if(flag < 0) {
                    LisInfo.alert("起始日期大于结束日期，请重新输入日期。");
                    return;
                }
            } else {
                var v1 = $("#" + subflag[i].fieldcode ).val();

                if (typeof (v1) == "undefined" ) {
                    LisInfo.alert("该清单必须有" + subflag[i].fieldname + "筛选条件！请在维度筛选条件中拖拽" + subflag[i].fieldname + "。");
                    return;
                }
                if (v1 == "") {
                    LisInfo.alert(subflag[i].fieldname + "填写不完整！请重新填写。");
                    return;
                }
            }
        }
        var index = 0;
        var par = [];
        for (var i = 0; i < par1.length; i++) {
            par[index] = par1[i];
            index++;
        }
        for (var i = 0; i < par2.length; i++) {
            par[index] = par2[i];
            index++;
        }
        var tindex = 0;
        var title = [];
        for (var i = 0; i < title1.length; i++) {
            title[tindex] = title1[i];
            tindex++;
        }
        for (var i = 0; i < title2.length; i++) {
            title[tindex] = title2[i];
            tindex++;
        }


        for (var i = 0; i < arr.length; i++) {
            arr2[i] = $("#" + arr[i]).val();
        }
        for (var i = 0; i < timeName.length; i++) {
            timeValue[i] = $("#" + timeName[i]).val();
        }
        for(var i = 0; i < timeValue.length; i++) {
            var t1 = timeValue[i];
            var t2 = timeValue[i+1];
            var d1 = new Date(t1);
            var d2 = new Date(t2);
            var day = (d2 - d1) / 1000 / 60 / 60 / 24;
            if(day<0) {
                LisInfo.alert("起始日期大于结束日期，请重新输入日期。");
                return;
            }
        }

        var data = {};
        if ("1" == results[0].listflag) {
            data = {
                "param1": par,
                "title": title,
                "param2": arr,
                "param3": arr2,
                "timeName": timeName,
                "timeValue": timeValue
            };
        } else {
            data = {
                "param1": par,
                "title": title,
                "param2": arr,
                "param3": arr2,
                "timeName": timeName,
                "timeValue": timeValue,
                "tablecode": results[0].tablecode
            };
        }

        $.ajax({
            type: "POST",
            url: "../" + results[0].dealclass + "/QUERY||MAIN.do",
            data: data,
            dataType: "json",
            async: false,
            traditional: true,
            success: function (jsonObj) {
                rdata = jsonObj;
            }
        });
        if (rdata.data == "error") {
            LisInfo.gritter("错误");
            return;
        }

        if (rdata.data.length == 0) {
            LisInfo.gritter("未查询到数据");
            var transFormGridColDefs = "[{ displayName: '', name: 'name', enableCellEdit: true, allowCellFocus: true, visible: true ,enableColumnMenu:false}]";
            $scope.transFormGridOpts.columnDefs = eval('(' + transFormGridColDefs + ')');
            $scope.pg.transFormGridColDefs = JSON.stringify($scope.transFormGridOpts.columnDefs);

            $scope.transFormGridOpts.data = [];

            $("#transFormGrid").hide();
            $("#btn_list_exl").hide();
            return;
        }
        //显示GRID及导出CSV按钮
        $("#transFormGrid").show();
        $("#btn_list_exl").show();
        //生成GRID
        var transFormGridColDefs = "[";

        var titlePage = rdata.title;
        for (var i = 0; i < titlePage.length; i++) {
            transFormGridColDefs = transFormGridColDefs + "{ 'displayName':'" + titlePage[i] + "', 'name': '" + titlePage[i] + "' ,'width': '10%', 'enableCellEdit': false, 'allowCellFocus': true, 'visible': true ,'enableColumnMenu':false},";
        }
        transFormGridColDefs = transFormGridColDefs.substring(0, transFormGridColDefs.length - 1) + "]";

        $scope.transFormGridOpts.columnDefs = eval('(' + transFormGridColDefs + ')');
        $scope.pg.transFormGridColDefs = JSON.stringify($scope.transFormGridOpts.columnDefs);

        $scope.transFormGridOpts.data = rdata.data;
    };

    //拖拽事件
    var startDrag = function (bar, target, /* optional */inWindow, /* optional */callback) {
        (function (bar, target, callback) {
            var D = document,
                DB = document.body,
                params = {
                    left: 0,
                    top: 0,
                    currentX: 0,
                    currentY: 0
                };

            if (typeof bar == "string") {
                bar = D.getElementById(bar);

            }
            if (typeof target == "string") {
                target = D.getElementById(target);
            }
            bar.style.cursor = "move";

            bindHandler(bar, "mousedown", function (e) {
                e.preventDefault();
                //获取拖拽组件的初始位置
                dragleft = target.offsetLeft;
                dragtop = target.offsetTop;
                // console.log(dragtop)
                // console.log(dragleft)
                params.left = target.offsetLeft;
                params.top = target.offsetTop;
                if (!e) {
                    e = window.event;
                    bar.onselectstart = function () {
                        return false;
                    }
                }
                params.currentX = e.clientX;
                params.currentY = e.clientY;

                var stopDrag = function () {
                    removeHandler(DB, "mousemove", beginDrag);
                    removeHandler(DB, "mouseup", stopDrag);
                    var div1 = document.getElementById(target.id);//拖拽组件1
                    //取到拖拽div的文本
                    var text = div1.innerText.trim();
                    var divleft = div1.offsetLeft;
                    var divtop = div1.offsetTop;
                    // console.log("拖拽div左边距" + divleft);
                    // console.log("拖拽div上边距" + divtop);

                    //判断拖拽组件是否覆盖在文本框上
                    if (divleft >= 120 && divtop >= 0) {
                        var sq = div1.id;

                        sq = sq.substring(0, 1);

                        // console.log(div1.id);
                        var tempid = div1.id.substring(div1.id.length - 2, div1.id.length);

                        var n = parseInt(tempid);

                        var id;
                        var index;
                        if (!isNaN(n)) {
                            id = div1.id.substring(2, div1.id.length - 2);
                            index = div1.id.substring(div1.id.length - 2, div1.id.length);
                        } else {
                            id = div1.id.substring(2, div1.id.length - 1);
                            index = div1.id.substring(div1.id.length - 1, div1.id.length);
                        }


                        if ('0' == sq) {
                            var tp = div1.id.substring(1, 2);
                            if (tp == "2") {
                                var id1 = id + "1";
                                var id2 = id + "2";
                                if ($.inArray(id1, timeName) == -1 && $.inArray(id2, timeName) == -1) {
                                    timeName.push(id1);
                                    timeName.push(id2);
                                    par1.push(id);
                                    title1.push(text);
                                    $("#dimension").append("<div class='col-sm-12'><div class='col-sm-3 '> <label class='btn btn-primary btn-lis ' id='" + text + "' title='"+text+"'> " + text + " </label> </div>  <div class='col-sm-7 input-group'><input id='" + id1 + "' class='form-control'  data-date-format='yyyy-mm-dd' placeholder='yyyy-mm-dd'/>     <span class='input-group-addon'>-</span><input id='" + id2 + "' class='form-control' data-date-format='yyyy-mm-dd' placeholder='yyyy-mm-dd'/>    </div></div>");
                                    // $("#dimension").append("<div class='col-sm-12'><div class='col-sm-2 '> <label class='btn btn-primary btn-lis ' id='" + text + "'> " + text + " </label> </div>  <div class='col-sm-7 input-group'><input id='" + id1 + "' class='form-control ng-valid ng-dirty ng-valid-parse ng-touched'  data-date-format='yyyy-mm-dd' placeholder='yyyy-mm-dd' ng-model='ngModel'/>  <div class='datepicker-addon ng-hide' ng-show='ngModel' ng-click='removeData()'><i class='fa fa-close'></i></div>   <span class='input-group-addon'>-</span><input id='" + id2 + "' class='form-control ng-valid ng-dirty ng-valid-parse ng-touched' data-date-format='yyyy-mm-dd' placeholder='yyyy-mm-dd'/>    </div></div>");
                                    $("#" + id1).datepicker({language:'zh-CN', autoclose: true,
                                        todayHighlight: true});
                                    $("#" + id2).datepicker({language:'zh-CN', autoclose: true,
                                        todayHighlight: true});
                                    $('#' + text).click(function () {
                                        $("#" + text).parent().parent().remove();
                                        timeName.splice($.inArray(id1, timeName), 1);
                                        timeName.splice($.inArray(id2, timeName), 1);
                                        par1.splice($.inArray(id, par1), 1);
                                        title1.splice($.inArray(text, title1), 1);
                                    })
                                } else {
                                    {
                                        LisInfo.alert("您已拖拽过" + '“' + text.trim() + '”' + "标签")
                                    }
                                }
                            }
                            if (tp == "1") {
                                if ($.inArray(id, par1) == -1) {
                                    arr.push(id);
                                    par1.push(id);
                                    title1.push(text);
                                    $("#dimension").append('<div class="col-sm-12">    <div class="col-sm-3 "> <label class="btn btn-primary btn-lis" id="' + text + '" title="'+text+'"> ' + text + ' </label></div>   <div class="col-sm-7 input-group "> <input id="' + id + '" class="form-control"/>   </div>    </div>');

                                    $('#' + text).click(function () {
                                        $("#" + text).parent().parent().remove();
                                        arr.splice($.inArray(id, arr), 1);
                                        par1.splice($.inArray(id, par1), 1);
                                        title1.splice($.inArray(text, title1), 1);
                                    })
                                } else {
                                    {
                                        LisInfo.alert("您已拖拽过" + '“' + text.trim() + '”' + "标签")
                                    }
                                }
                            }
                            if (tp == "3") {
                                if ($.inArray(id, par1) == -1) {
                                    arr.push(id);
                                    par1.push(id);
                                    title1.push(text);
                                    $("#dimension").append('<div class="col-sm-12">    <div class="col-sm-3 "> <label class="btn btn-primary btn-lis" id="' + text + '" title="'+text+'"> ' + text + ' </label></div>   <div class="col-sm-7 input-group "> <input id="' + id + '" class="form-control"/>   </div>    </div>');

                                    $('#' + text).click(function () {
                                        $("#" + text).parent().parent().remove();
                                        arr.splice($.inArray(id, arr), 1);
                                        par1.splice($.inArray(id, par1), 1);
                                        title1.splice($.inArray(text, title1), 1);
                                    });
                                    select(index, id);
                                } else {
                                    {
                                        LisInfo.alert("您已拖拽过" + '“' + text.trim() + '”' + "标签")
                                    }
                                }
                            }
                        }
                        if ('1' == sq) {
                            if ($.inArray(id, par2) == -1) {
                                par2.push(id);
                                title2.push(text);
                                $("#quota").append('<div class="col-sm-3">    <label class="btn btn-primary btn-lis " id="' + id + '"  title="'+text+'"> ' + text + ' </label>         </div>');
                                $('#' + id).click(function () {
                                    $("#" + id).parent().remove();
                                    par2.splice($.inArray(id, par2), 1);
                                    title2.splice($.inArray(text, title2), 1);
                                })
                            } else {
                                {
                                    LisInfo.alert("您已拖拽过" + '“' + text.trim() + '”' + "标签")
                                }
                            }
                        }
                    } else {
                        console.log("没有拖拽到指定区域");
                    }
                    //拖拽后回到原点
                    target.style.position = "absolute";
                    target.style.left = dragleft + "px";
                    target.style.top = dragtop + "px";
                }, beginDrag = function (e) {
                    var evt = e ? e : window.event,
                        nowX = evt.clientX,
                        nowY = evt.clientY,
                        disX = nowX - params.currentX, disY = nowY - params.currentY,
                        left = parseInt(params.left) + disX,
                        top = parseInt(params.top) + disY;

                    if (inWindow) {
                        var maxTop = DB.offsetHeight - target.offsetHeight,
                            maxLeft = DB.offsetWidth - target.offsetWidth;
                        if (top < 0) top = 0;
                        if (top > maxTop) top = maxTop;
                        if (left < 0) left = 0;
                        if (left > maxLeft) left = maxLeft;
                    }
                    target.style.left = left + "px";
                    target.style.top = top + "px";

                    if (typeof callback == "function") {
                        callback(left, top);
                    }
                };

                bindHandler(DB, "mouseup", stopDrag);
                bindHandler(DB, "mousemove", beginDrag);
            });

            function bindHandler(elem, type, handler) {
                if (window.addEventListener) {
                    //false表示在冒泡阶段调用事件处理程序
                    elem.addEventListener(type, handler, false);
                } else if (window.attachEvent) {
                    // IE浏览器
                    elem.attachEvent("on" + type, handler);
                }
            }

            function removeHandler(elem, type, handler) {
                // 标准浏览器
                if (window.removeEventListener) {
                    elem.removeEventListener(type, handler, false);
                } else if (window.detachEvent) {
                    // IE浏览器
                    elem.detachEvent("on" + type, handler);
                }
            }

        })(bar, target, inWindow, callback);
    };
}
/*-------------------以上是源代码------------------*/
/*-------------------以下是临时凑的------------------*/

window.onload=function()//用window的onload事件，窗体加载完毕的时候
{
	startDrag_1(document.getElementById("abar1"),document.getElementById("01Animal"));
	startDrag_1(document.getElementById("abar2"),document.getElementById("01Star"));
	startDrag_1(document.getElementById("abar3"),document.getElementById("01Nation"));
	startDrag_1(document.getElementById("abar4"),document.getElementById("01Age"));
	
	startDrag_1(document.getElementById("bbar1"),document.getElementById("11Name"));
	startDrag_1(document.getElementById("bbar2"),document.getElementById("11Sex"));
	startDrag_1(document.getElementById("bbar3"),document.getElementById("11Birthday"));
	startDrag_1(document.getElementById("bbar4"),document.getElementById("11DocumentType"));
	startDrag_1(document.getElementById("bbar5"),document.getElementById("11DocumentNo"));
	
}


function clickReset(){
	for (var i = 0; i < par1.length; i++) {
        $("#" + par1[i]).parent().parent().remove();
    }
    for (var i = 0; i < par2.length; i++) {
        $("#" + par2[i]).parent().remove();
    }
    for (var i = 0; i < timeName.length; i++) {
        $("#" + timeName[i]).parent().parent().remove();
    }
    par1 = [];
    par2 = [];


    arr = [];
    arr2 = [];

    timeName = [];
    timeValue = [];

    title1 = [];
    title2 = [];
}

function clickListAdd(){
//	$("#transFormGrid").show();
    var rdata = [];

    if (par1.length == 0) {
        alert("您还未拖拽维度筛选条件");
        return;
    }
    if (par2.length == 0) {
        alert("您还未拖拽字段");
        return;
    }
//    $("#quota").append('');
    
    
}

/**
 * 推拽事件
 * 说明：target的id的前两位：01-时间框；02-普通输入框；03下拉选框
 */
function startDrag_1(bar, target, /* optional */inWindow, /* optional */callback) {
    (function (bar, target, callback) {
        var D = document,
            DB = document.body,
            params = {
                left: 0,
                top: 0,
                currentX: 0,
                currentY: 0
            };

        if (typeof bar == "string") {
            bar = D.getElementById(bar);

        }
        if (typeof target == "string") {
            target = D.getElementById(target);
        }
        bar.style.cursor = "move";

        bindHandler(bar, "mousedown", function (e) {
            e.preventDefault();
            //获取拖拽组件的初始位置
            dragleft = target.offsetLeft;
            dragtop = target.offsetTop;
            // console.log(dragtop)
            // console.log(dragleft)
            params.left = target.offsetLeft;
            params.top = target.offsetTop;
            if (!e) {
                e = window.event;
                bar.onselectstart = function () {
                    return false;
                }
            }
            params.currentX = e.clientX;
            params.currentY = e.clientY;

            var stopDrag = function () {
                removeHandler(DB, "mousemove", beginDrag);
                removeHandler(DB, "mouseup", stopDrag);
                var div1 = document.getElementById(target.id);//拖拽组件1
                //取到拖拽div的文本
                var text = div1.innerText.trim();
                var divleft = div1.offsetLeft;
                var divtop = div1.offsetTop;
//                 console.log("拖拽div左边距" + divleft);
//                 console.log("拖拽div上边距" + divtop);

                //判断拖拽组件是否覆盖在文本框上
                if (divleft >= 120 && divtop >= 0) {
                    var sq = div1.id;

                    sq = sq.substring(0, 1);

                     console.log(div1.id);
                    var tempid = div1.id.substring(div1.id.length - 2, div1.id.length);

                    var n = parseInt(tempid);

                    var id;
                    var index;
                    if (!isNaN(n)) {
                        id = div1.id.substring(2, div1.id.length - 2);
                        index = div1.id.substring(div1.id.length - 2, div1.id.length);
                    } else {
                        id = div1.id.substring(2, div1.id.length - 1);
                        index = div1.id.substring(div1.id.length - 1, div1.id.length);
                    }


                    if ('0' == sq) {
                        var tp = div1.id.substring(1, 2);
                        if (tp == "2") {
                            var id1 = id + "1";
                            var id2 = id + "2";
                            if ($.inArray(id1, timeName) == -1 && $.inArray(id2, timeName) == -1) {
                                timeName.push(id1);
                                timeName.push(id2);
                                par1.push(id);
                                title1.push(text);
                                $("#dimension").append("<div class='col-sm-12'><div class='col-sm-3 '> <label class='btn btn-primary btn-lis ' id='" + text + "' title='"+text+"'> " + text + " </label> </div>  <div class='col-sm-7 input-group'><input id='" + id1 + "' class='form-control'  data-date-format='yyyy-mm-dd' placeholder='yyyy-mm-dd'/>     <span class='input-group-addon'>-</span><input id='" + id2 + "' class='form-control' data-date-format='yyyy-mm-dd' placeholder='yyyy-mm-dd'/>    </div></div>");
                                // $("#dimension").append("<div class='col-sm-12'><div class='col-sm-2 '> <label class='btn btn-primary btn-lis ' id='" + text + "'> " + text + " </label> </div>  <div class='col-sm-7 input-group'><input id='" + id1 + "' class='form-control ng-valid ng-dirty ng-valid-parse ng-touched'  data-date-format='yyyy-mm-dd' placeholder='yyyy-mm-dd' ng-model='ngModel'/>  <div class='datepicker-addon ng-hide' ng-show='ngModel' ng-click='removeData()'><i class='fa fa-close'></i></div>   <span class='input-group-addon'>-</span><input id='" + id2 + "' class='form-control ng-valid ng-dirty ng-valid-parse ng-touched' data-date-format='yyyy-mm-dd' placeholder='yyyy-mm-dd'/>    </div></div>");
                                $("#" + id1).datepicker({language:'zh-CN', autoclose: true,
                                    todayHighlight: true});
                                $("#" + id2).datepicker({language:'zh-CN', autoclose: true,
                                    todayHighlight: true});
                                $('#' + text).click(function () {
                                    $("#" + text).parent().parent().remove();
                                    timeName.splice($.inArray(id1, timeName), 1);
                                    timeName.splice($.inArray(id2, timeName), 1);
                                    par1.splice($.inArray(id, par1), 1);
                                    title1.splice($.inArray(text, title1), 1);
                                })
                            } else {
                                {
                                    alert("您已拖拽过" + '“' + text.trim() + '”' + "标签")
                                }
                            }
                        }
                        if (tp == "1") {
                            if ($.inArray(id, par1) == -1) {
                                arr.push(id);
                                par1.push(id);
                                title1.push(text);
                                $("#dimension").append('<div class="col-sm-12">    <div class="col-sm-3 "> <label class="btn btn-primary btn-lis" id="' + text + '" title="'+text+'"> ' + text + ' </label></div>   <div class="col-sm-7 input-group "> <input id="' + id + '" class="form-control"/>   </div>    </div>');

                                $('#' + text).click(function () {
                                    $("#" + text).parent().parent().remove();
                                    arr.splice($.inArray(id, arr), 1);
                                    par1.splice($.inArray(id, par1), 1);
                                    title1.splice($.inArray(text, title1), 1);
                                })
                            } else {
                                {
                                    alert("您已拖拽过" + '“' + text.trim() + '”' + "标签")
                                }
                            }
                        }
                        if (tp == "3") {
                            if ($.inArray(id, par1) == -1) {
                                arr.push(id);
                                par1.push(id);
                                title1.push(text);
                                $("#dimension").append('<div class="col-sm-12">    <div class="col-sm-3 "> <label class="btn btn-primary btn-lis" id="' + text + '" title="'+text+'"> ' + text + ' </label></div>   <div class="col-sm-7 input-group "> <input id="' + id + '" class="form-control"/>   </div>    </div>');

                                $('#' + text).click(function () {
                                    $("#" + text).parent().parent().remove();
                                    arr.splice($.inArray(id, arr), 1);
                                    par1.splice($.inArray(id, par1), 1);
                                    title1.splice($.inArray(text, title1), 1);
                                });
                                select(index, id);
                            } else {
                                {
                                    alert("您已拖拽过" + '“' + text.trim() + '”' + "标签")
                                }
                            }
                        }
                    }
                    if ('1' == sq) {
                        if ($.inArray(id, par2) == -1) {
                            par2.push(id);
                            title2.push(text);
                            $("#quota").append('<div class="col-sm-3">    <label class="btn btn-primary btn-lis " id="' + id + '"  title="'+text+'"> ' + text + ' </label>         </div>');
                            $('#' + id).click(function () {
                                $("#" + id).parent().remove();
                                par2.splice($.inArray(id, par2), 1);
                                title2.splice($.inArray(text, title2), 1);
                            })
                        } else {
                            {
                                alert("您已拖拽过" + '“' + text.trim() + '”' + "标签")
                            }
                        }
                    }
                } else {
                    console.log("没有拖拽到指定区域");
                }
                //拖拽后回到原点
                target.style.position = "absolute";
                target.style.left = dragleft + "px";
                target.style.top = dragtop + "px";
            }, beginDrag = function (e) {
                var evt = e ? e : window.event,
                    nowX = evt.clientX,
                    nowY = evt.clientY,
                    disX = nowX - params.currentX, disY = nowY - params.currentY,
                    left = parseInt(params.left) + disX,
                    top = parseInt(params.top) + disY;

                if (inWindow) {
                    var maxTop = DB.offsetHeight - target.offsetHeight,
                        maxLeft = DB.offsetWidth - target.offsetWidth;
                    if (top < 0) top = 0;
                    if (top > maxTop) top = maxTop;
                    if (left < 0) left = 0;
                    if (left > maxLeft) left = maxLeft;
                }
                target.style.left = left + "px";
                target.style.top = top + "px";

                if (typeof callback == "function") {
                    callback(left, top);
                }
            };

            bindHandler(DB, "mouseup", stopDrag);
            bindHandler(DB, "mousemove", beginDrag);
        });

        function bindHandler(elem, type, handler) {
            if (window.addEventListener) {
                //false表示在冒泡阶段调用事件处理程序
                elem.addEventListener(type, handler, false);
            } else if (window.attachEvent) {
                // IE浏览器
                elem.attachEvent("on" + type, handler);
            }
        }

        function removeHandler(elem, type, handler) {
            // 标准浏览器
            if (window.removeEventListener) {
                elem.removeEventListener(type, handler, false);
            } else if (window.detachEvent) {
                // IE浏览器
                elem.detachEvent("on" + type, handler);
            }
        }

    })(bar, target, inWindow, callback);
}



