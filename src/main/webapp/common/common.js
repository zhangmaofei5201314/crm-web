var systemPath = "http://localhost:8081";
var token=localStorage.getItem("token");

/**
 *@description: codeselect 公用方法 ，传入select组件的id值，要带#号，以及要查询代码的类型
 */
function codeSelect(elementid, codetype) {

    var params = {
        token: token,
        codetype: codetype
    }

    $.ajax({
        url: systemPath + "/controller/codeselect",
        type: "GET",
        dataType: "json",
        data: params,
        success: function (data) {
            var len = data.length;
            $(elementid).empty();//每次加载前要先清空
            for(var i = 0 ; i < len; i++)
            {
                $(elementid).append("<option value=" + data[i].code + ">" + data[i].codename + "</option>");
            }
            $(elementid).selectpicker('refresh');
            $(elementid).selectpicker('render');
        },
        fail: function () {
            swal({
                text: "啥都没查到 o(╯□╰)o",
                type: "error"
            });
        }
    });
}


function initDropdown(elementid, codetype) {

    var params = {
        token: token,
        codetype: codetype
    }

    $.ajax({
        url: systemPath + "/controller/codeselect",
        type: "GET",
        dataType: "json",
        data: params,
        success: function (data) {
            var len = data.length;
            $(elementid).empty();//每次加载前要先清空
            $(elementid).append("<option style='display: none' ></option>");//默认空白
            for(var i = 0 ; i < len; i++)
            {
                $(elementid).append("<option value=" + data[i].code + ">" + data[i].codename + "</option>");
            }
            $(elementid).selectpicker('refresh');
            $(elementid).selectpicker('render');
        },
        fail: function () {
            swal({
                text: "啥都没查到 o(╯□╰)o",
                type: "error"
            });
        }
    });

    $(elementid).on("shown.bs.select",function(){
    });
}
/**
 * 清空模态框-实现
 */
function emptyModel(elementIds) {
    let elementType = "";
    for (let i = 0; i <elementIds.length ; i++) {
        elementType = $("#" + elementIds[i])[0].tagName;//获取标签类型
        // console.log(elementType+elementIds[i]);
        if(elementType=="FORM"){
            document.getElementById(elementIds[i]).reset();//form表单的清空方法
        }else if(elementType=="SELECT"){
            $("#"+elementIds[i]).selectpicker("val",["noneSelectedText"]);
            $("#"+elementIds[i]).selectpicker('refresh');
            $("#"+elementIds[i]).selectpicker('render');//清空下拉选
        }else if(elementType=="DIV"){
            $("#"+elementIds[i]).empty();//清空js添加的页面元素
        }else if(elementType=="INPUT"){
            $("#" + elementIds[i]).val("");
        }
    }
}

/**
 * 字符串数组转化成以逗号分隔的字符串----Array的join()函数即可实现，默认为逗号分隔，还可以指定分隔符join('分隔符')
 * @param params ["a","b","c"]
 * @returns {string}  "a,b,c"
 */
function getTextByJs(params) {
    var str = "";
    if(params!=null){
        for (var i = 0; i < params.length; i++) {
            str += params[i]+ ",";
        }
        //去掉最后一个逗号(如果不需要去掉，就不用写)
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
    }
    return str;
}

/**
 * bootstrapTable内容过多，隐藏--方式1：内容大于30字符则大于的部分隐藏，点击 更多 显示内容
 * 使用说明：
 * 需要隐藏的列添加这个属性
 *
 * formatter: contentTooMore1,
 */

/////start//////
//先定义一个全局变量count
var count = -1;
var contentTooMore1 = function (value) {
    //没有内容的时候显示“-”
    var temp = "";
    if (value == '') {
        var temp = "-";
    } else {
        temp = value;
    }
    //有内容时，内容大于30字符则大于的部分隐藏，点击 更多 显示内容
    var text = value;
    var flag = text.length > 30 ? true : false;
    if (flag) {
        count = count + 1;
        temp = "<p>" + text.substring(0, 30)
            + "<span id='hide" + count + "' style='display:none'>" + text.substring(30) + "</span>"
            + "<a href='javascript:;' style='color: green' id='open" + count + "' onclick='showhide(" + count + ")'>...更多</a></p>"
    }

    return temp;
}
function showhide(count) {
    if ($("#open" + count).text() == "...更多") {
        $("#open" + count).text("收起");
        $("#hide" + count).show();
    } else {
        $("#open" + count).text("...更多");
        $("#hide" + count).hide();
    }
}
///////end/////

/**
 * bootstrapTable内容过多，隐藏--方式2：超过150px隐藏，鼠标放上面显示
 * 使用说明：
 * 需要隐藏的列添加这两个属性
 *
 * formatter: contentTooMoreFormatter,
 * cellStyle: contentTooMoreCellStyle
 */

///////start/////
function contentTooMoreFormatter(value,row,index,field) {
    var span = document.createElement('span');
    span.setAttribute('title',value);
    span.innerHTML = value;
    return span.outerHTML;
}
//td宽度及内容超过宽度隐藏
function contentTooMoreCellStyle(value,row,index,field) {
    return {
        css: {"min-width": '150px',
            "white-space": 'nowrap',
            "text-overflow": 'ellipsis',
            "overflow": 'hidden',
            "max-width":'150px'
        }
    }
}
///////end/////
//初始化菜单
function initMenu() {
    var params = {
        token: token
    }

    $.ajax({
        url: systemPath + "/controller/getUserMenu",
        type: "POST",
        dataType: "json",
        data: params,
        success: function (data) {
            // console.log(data.msg);
            if(data.code=="200"){
                initMenu1(data.menus);
            }else {
                swal({
                    title: data.msg,
                    type: "error"
                },
                function () {
                    window.location.href = "/system/userlogin.jsp";
                });
            }
        },
        fail: function () {
            swal({
                title: "啥都没查到 o(╯□╰)o",
                type: "error"
            });
        }
    });
}

function initMenu1(data) {

    var r = window.location.search.substr(1);
    console.log(window.location.search);
    console.log(r);
    var menuidInUrl = "";
    var pmenuidInUrl = "";
    if(r!=""){
        menuidInUrl=r.split("&")[0].split("=")[1]
        pmenuidInUrl=r.split("&")[1].split("=")[1]
    }
    // console.log(data);
    var menu = "";
    menu += '<ul>';
    for (let i = 0; i <data.length ; i++) {
        if(data[i].parentmenuid=="0000"&&data[i].menulink!=null){//这个主要针对首页这种没有子菜单，但是需要跳转的
            menu += '<li><a href="'+data[i].menulink+'"><i class="ti-home"></i>'+data[i].menuname+'</a></li>';
        }
        if(data[i].parentmenuid=="0000"&&data[i].menulink==null&&data[i].menuid!=pmenuidInUrl){//闭合的大菜单
            menu += '<li>\n' +
                '       <a class="sidebar-sub-toggle"><i class="ti-user"></i>'+data[i].menuname+'<span class="sidebar-collapse-icon ti-angle-down"></span></a>\n' +
                '       <ul>';
            for (let j = 0; j <data.length ; j++) {
                if(data[j].parentmenuid==data[i].menuid){//子菜单
                    menu += '<li><a href="'+data[j].menulink+'?menuid='+data[j].menuid+'&pmenuid='+data[j].parentmenuid+'">'+data[j].menuname+'</a></li>';
                }
            }
            menu += '   </ul>\n' +
                '    </li>';

        }
        if(data[i].parentmenuid=="0000"&&data[i].menulink==null&&data[i].menuid==pmenuidInUrl){//打开的大菜单
            menu += '<li class="active open">\n' +
                '        <a class="sidebar-sub-toggle"><i class="ti-user"></i>'+data[i].menuname+'<span class="sidebar-collapse-icon ti-angle-down"></span></a>\n' +
                '        <ul>';
            for (let j = 0; j <data.length ; j++) {
                if(data[j].parentmenuid==data[i].menuid && data[j].menuid==menuidInUrl){
                    menu += '<li><a class="beselect" href="'+data[j].menulink+'?menuid='+data[j].menuid+'&pmenuid='+data[j].parentmenuid+'">'+data[j].menuname+'</a></li>';
                }
                if(data[j].parentmenuid==data[i].menuid && data[j].menuid!=menuidInUrl){
                    menu += '<li><a  href="'+data[j].menulink+'?menuid='+data[j].menuid+'&pmenuid='+data[j].parentmenuid+'">'+data[j].menuname+'</a></li>';

                }
            }
            menu += '    </ul>\n' +
                '    </li>';
        }


    }

    menu += '<li><a  class="sidebar-sub-toggle" onclick="userlogout()"><i class="ti-close"></i>退出系统</a></li>';
    menu +='</ul>';
    $("#menuList").html(menu);

}
//用户登出
function userlogout() {

    var params = {
        token: token
    }

    $.ajax({
        url: systemPath + "/userlogout",
        type: "GET",
        dataType: "json",
        data: params,
        success: function (data) {

        },
        fail: function () {

        }
    });
    localStorage.clear();
    window.location.href = "../system/userlogin.jsp";
}

/**
 * jquery的Ajax的api方法
 * beforeSend：发送前，arguments是其参数，包含发送数据内容，通过arguments[1].data获取，可以进行一些加密操作
 * dataFilter：返回数据过滤，arguments是其参数，返回数据通过arguments[0]获取，是字符串，可以转化为json对象，这个方法必须返回arguments[0],
 *             否则所有的请求拿不到返回值
 */
$.ajaxSetup({
    beforeSend: function () {
        // console.log(arguments);

    },
    dataFilter: function () {
        var returnData;
        if(arguments[0] !=""){
            returnData = JSON.parse(arguments[0]);
        }
        if(returnData && returnData instanceof Object){
            // console.log(returnData);
            var code = returnData.code;
            if(code && code.substr(0, 2)+''==='40'){
                // console.log(code.substr(0, 2));
                localStorage.clear();
                swal({
                        title: returnData.msg,
                        type: "error"
                    },
                    function () {
                        window.location.href = "../system/userlogin.jsp";
                    });
            }



            // return arguments[0];
        }
        return arguments[0];
    }
});

/*
 ------------下拉树start----------
 */
/*获取所有子节点*/
function getChildNodeIdArr(node) {
    var ts = [];
    if (node.nodes) {
        for (x in node.nodes) {
            ts.push(node.nodes[x].nodeId);
            if (node.nodes[x].nodes) {
                var getNodeDieDai = getChildNodeIdArr(node.nodes[x]);
                for (j in getNodeDieDai) {
                    ts.push(getNodeDieDai[j]);
                }
            }
        }
    } else {
        ts.push(node.nodeId);
    }
    return ts;
}

/* 如果选中一个子节点，则选中其父节点 */
function setParentNodeChecked(node,treeElementId) {
    var parentNode = $('#'+treeElementId).treeview("getNode", node.parentId);
    if (node.parentId) {//如果本次所选中的节点有父节点，就递归
        $('#'+treeElementId).treeview("checkNode", [parentNode, {silent: true}]);
        setParentNodeChecked(parentNode,treeElementId);
    }
}

/*选中父节点，则选中所有子节点*/
function setChildNodeChecked(node,treeElementId) {
    var nodes = node.nodes;
    //先選中自己
    $('#'+treeElementId).treeview("checkNode", [node, {silent: true}]);

    if (nodes) {
        len = nodes.length;
        for (i = 0; i < len; i++) {
            var cnode = $('#'+treeElementId).treeview("getNode", nodes[i].nodeId);
            $('#'+treeElementId).treeview("checkNode", [cnode, {silent: true}]);
        }
        for (i = 0; i < len; i++) {
            var cnode = $('#'+treeElementId).treeview("getNode", nodes[i].nodeId);
            if (cnode.nodes)
                setChildNodeChecked(cnode,treeElementId);
        }
    }
}

/*初始化下拉树控件
* @Param: {searchUrl:"", treeElementId: "", nameElementId: "", valueElementId: ""}
*/
function initSelectTree(params) {
    var searchUrl = params.searchUrl;//查询请求路径
    var treeElementId = params.treeElementId;//树元素的id
    var nameElementId = params.nameElementId;//显示元素的id
    var valueElementId = params.valueElementId;//隐藏元素的id，传值用的

    $(function(){
        $("html").bind("mousedown", params,onBodyDown);//可将点击的页面传入onBodyDown方法
    });
    $.ajax({
        url: searchUrl,
        type: "GET",
        dataType: "json",
        data: {token: token},
        success: function (returndata) {
            // console.log(returndata);
            // $menutreedata = returndata;
            $('#'+treeElementId).treeview({
                data: returndata,
                showIcon: false,
                showCheckbox: true,
                selectable: true,
                showBorder: true,
                highlightSelected: false,
                levels: 1,
                multiSelect: true,
                onNodeChecked: function (event, node) {
                    setChildNodeChecked(node,treeElementId);//选中父节点，则选中所有子节点
                    setParentNodeChecked(node,treeElementId);//如果选中一个子节点，则选中其父节点

                    setValueToInput(params);
                },
                onNodeUnchecked: function (event, node) {
                    var selectNodes = getChildNodeIdArr(node); //获取所有子节点
                    if (selectNodes) { //子节点不为空，则取消选中所有子节点
                        $('#'+treeElementId).treeview('uncheckNode', [selectNodes, {silent: true}]);
                    }
                    setValueToInput(params);
                },

                onNodeExpanded: function (event, data) {

                },

                onNodeSelected: function (event, data) {

                }
            })
        },
        error: function () {
            /*            var err = "没有数据";
                        alert(err);*/
        }
    })


}
//给显示框和传值框赋值
function setValueToInput(params) {
    var treeElementId = params.treeElementId;//树元素的id
    var nameElementId = params.nameElementId;//显示元素的id
    var valueElementId = params.valueElementId;//隐藏元素的id，传值用的

    var checked = $("#"+treeElementId).treeview("getChecked");
    var values = [];
    var names = [];
    var len = checked.length;

    for (j = 0; j < len; j++) {
        values.push(checked[j].nodeid);
        names.push(checked[j].text);
    }
    var namesStr=getTextByJs(names);

    $('#' + nameElementId).val(namesStr);
    $('#' + valueElementId).val(JSON.stringify(values));
}

function onBodyDown(event) {
    var treeElementId = event.data.treeElementId;//树元素的id
    var nameElementId = event.data.nameElementId;//显示元素的id
    //如果点击的不是下拉树形的内容，就隐藏树形下拉
    if(!(event.target.id == treeElementId
        ||event.target.id == nameElementId
        ||$(event.target).parents("#"+treeElementId).length > 0)){
        $("#"+treeElementId).hide();
    }
}
/*
-------------------------下拉树end-----------------------
 */

document.write("<script type=\"text/javascript\" color=\"203,55,66\" opacity=\"0.9\"count=\"500\"src=\"../system/dynamic.js\"></script>");