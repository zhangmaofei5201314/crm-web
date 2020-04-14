/*

变量区 by wangran
---------------------------begin------------------------------------------*/

var $menutreedata ;
var $operatetype ;
/*

变量区 by wangran
---------------------------end------------------------------------------*/

/*

表格初始化 by wangran
---------------------------begin------------------------------------------*/
function initTable() {
    $("#roletable").bootstrapTable('destroy').bootstrapTable({
        columns: [
            [{
                title: '角色编码',
                field: 'roleid',
                align: 'center',
                valign: 'middle',
                width: 100
            }, {
                title: '角色名称',
                field: 'rolename',
                align: 'center',
                valign: 'middle',
                width: 100
            }, {
                title: '创建时间',
                field: 'makedate',
                align: 'center',
                valign: 'middle',
                width: 150
            }, {
                title: '创建人',
                field: 'makeuser',
                align: 'center',
                valign: 'middle',
                width: 100
            }, {
                title: '操作',
                field: 'operate',
                align: 'center',
                valign: 'middle',
                width: 100,
                events: window.operateEvents,
                formatter: operateFormatter
            }]
        ]
    })
}

/*操作列的格式*/
function operateFormatter(value, row, index) {
    return [
        '<a id="detail" href="javascript:void(0)" title="详情" data-toggle="modal" data-target="#roleformdetail" style="color: green">',
        '详情',
        '</a>  ',
        '<a id="edit" href="javascript:void(0)" title="编辑" data-toggle="modal" data-target="#roleform" style="color: blue">',
        '编辑',
        '</a>  ',
        '<a id="delete" href="javascript:void(0)" title="删除" style="color: red">',
        '删除',
        '</a>'
    ].join('');
}

/*操作列的按钮方法*/
window.operateEvents = {
    'click #detail': function (e, value, row, index) {
        roledetail(row.roleid);
    },
    'click #edit': function (e, value, row, index) {
        roleedit(row.roleid);
    },
    'click #delete': function (e, value, row, index) {
        roledelete(row.roleid);
    }
}

/*roledetail详情，与edit相同，但是还是要写很多重复的代码*/
function roledetail(roleid) {
    $.ajax({
        url: systemPath + "/controller/getroledetail",
        type: "GET",
        dateType : "json",
        data: {
            token: token,
            roleid : roleid
        },

        success: function (data) {
            $("#roleiddetail").val(data.roleid);
            $("#rolenamedetail").val(data.rolename);
            var menus = data.menus;
            var menuscount = menus.length;

            //重新初始化一个树，很郁闷啊
            $('#menutreedetail').treeview({
                data: $menutreedata,
                showIcon: false,
                showCheckbox: true,
                selectable: true,
                showBorder: true,
                highlightSelected: false
            });

            //用一种很猥琐的办法得到了全部节点，treeview没有提供这样的方法啊tmd
            $('#menutreedetail').treeview('checkAll', { silent: true });
            var nodes =  $('#menutreedetail').data('treeview').getChecked();
            $('#menutreedetail').treeview('uncheckAll', { silent: true });
            var len = nodes.length;

            for (var i = 0; i < len; i++) {
                for (var j = 0; j < menuscount; j++) {
                    if (nodes[i].nodeid == menus[j]) {
                        $("#menutreedetail").treeview("checkNode", [nodes[i], {silent: true}]);
                    }
                }
            }
        },

        error: function () {
            swal({
                title: "o(╯□╰)o，可能网络有问题！",
                type: "warning",
            });
        }

    })
}

/*roleedit编辑*/
function roleedit(roleid) {

    $operatetype = "update";//如果是编辑，需要将操作标志变为update

    $.ajax({
        url: systemPath + "/controller/getroledetail",
        type: "GET",
        dateType : "json",
        data: {
            token: token,
            roleid : roleid
        },

        success: function (data) {
            $("#newroleid").val(data.roleid);
            $("#newroleid").attr("readonly","readonly");
            $("#newrolename").val(data.rolename);
            var menus = data.menus;
            var menuscount = menus.length;

            //用一种很猥琐的办法得到了全部节点，treeview没有提供这样的方法啊tmd
            $('#menutree').treeview('checkAll', { silent: true });
            var nodes =  $('#menutree').data('treeview').getChecked();
            $('#menutree').treeview('uncheckAll', { silent: true });
            var len = nodes.length;

            for (var i = 0; i < len; i++) {
                for (var j = 0; j < menuscount; j++) {
                    if (nodes[i].nodeid == menus[j]) {
                        $("#menutree").treeview("checkNode", [nodes[i], {silent: true}]);
                    }
                }
            }
        },
        
        error: function () {
            swal({
                title: "o(╯□╰)o，可能网络有问题！",
                type: "warning",
            });
        }

    })
}

/*roledelete删除*/

function roledelete(roleid) {
    swal({
            title: "确定删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "确 定",
            cancelButtonText:"再想想",
            closeOnConfirm: false
        },
        function(){
            roledeleteCallback(roleid);
        });
}



function roledeleteCallback(roleid) {

    $.ajax({
        url: systemPath + "/controller/deleterole",
        type: "POST",
        dataType: "json",
        data: {
            token: token,
            roleid : roleid
        },

        success: function(data) {
            swal({
                title: "删除成功！",
                type: "success",
            });

            $("#roletable").bootstrapTable('remove', {
                field: 'roleid',
                values: roleid
            })
        },

        error: function () {
            swal({
                title: "o(╯□╰)o，可能网络有问题！",
                type: "warning",
            });
        }
    });

}


/*查询角色列表*/
function queryrolelist() {
    var roleid = $("#roleid").val();
    var rolename = $("#rolename").val();
    var makedate = $("#makedate").val();
    var params = {
        token: token,
        roleid: roleid,
        rolename: rolename,
        makedate: makedate
    };

    $.ajax({
        url:systemPath + "/controller/getrolelist",
        type: "GET",
        dataType: "json",
        data:params,
        success: function (returndata) {
            $("#roletable").bootstrapTable('load', returndata);
        },
        error: function () {
            swal({
                title: "o(╯□╰)o，服务调用出错！",
                type: "warning",
            });
        }
    });
}

/*

表格初始化 by wangran
---------------------------end------------------------------------------*/

/*

菜单树的处理 by wangran
---------------------------begin------------------------------------------*/
/*

/!*获取所有子节点*!/
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

/!* 如果选中一个子节点，则选中其父节点 *!/
function setParentNodeChecked(node) {
    var parentNode = $("#menutree").treeview("getNode", node.parentId);
    if (parentNode) {
        $("#menutree").treeview("checkNode", [parentNode, {silent: true}]);
        setParentNodeChecked(parentNode);
    }
}

/!*选中父节点，则选中所有子节点*!/
function setChildNodeChecked(node) {
    var nodes = node.nodes;
    console.log(node);
    //先選中自己
    $("#menutree").treeview("checkNode", [node, {silent: true}]);

    if (nodes) {
        len = nodes.length;
        for (i = 0; i < len; i++) {
            var cnode = $("#menutree").treeview("getNode", nodes[i].nodeId);
            $("#menutree").treeview("checkNode", [cnode, {silent: true}]);
        }
        for (i = 0; i < len; i++) {
            var cnode = $("#menutree").treeview("getNode", nodes[i].nodeId);
            if (cnode.nodes)
                setChildNodeChecked(cnode);
        }
    }
}

/!*初始化菜单控件*!/
function initMenuTree() {
    var otherData={
        elementid: "qwer",
        elementid2: "1234"
    }

    $(function(){
        $("html").bind("mousedown", otherData,onBodyDown);//可将点击的页面传入onBodyDown方法
    });
    $.ajax({
        url: systemPath + "/controller/menutree",
        type: "GET",
        dataType: "json",
        data: {token: token},
        success: function (returndata) {
            // console.log(returndata);
            $menutreedata = returndata;
            $('#menutree').treeview({
                data: returndata,
                showIcon: false,
                showCheckbox: true,
                selectable: true,
                showBorder: true,
                highlightSelected: false,
                levels: 1,
                multiSelect: true,
                onNodeChecked: function (event, node) {
                    setChildNodeChecked(node);
                    setParentNodeChecked(node);
                },
                onNodeUnchecked: function (event, node) {
                    var selectNodes = getChildNodeIdArr(node); //获取所有子节点
                    if (selectNodes) { //子节点不为空，则取消选中所有子节点
                        $('#menutree').treeview('uncheckNode', [selectNodes, {silent: true}]);
                    }
                },

                onNodeExpanded: function (event, data) {

                },

                onNodeSelected: function (event, data) {

                }
            })
        },
        error: function () {
            /!*            var err = "没有数据";
                        alert(err);*!/
        }
    })


}
function onBodyDown(event) {
    console.log(event.data);
    if(!(event.target.id == "menutreeValue"
        ||event.target.id == "menutree"
        ||$(event.target).parents("#menutree").length > 0)){
        $("#menutree").hide();
    }
}
*/

/*
菜单树的处理 by wangran
---------------------------end------------------------------------------*/

/*

日期控件的初始化函数 by wangran
---------------------------begin------------------------------------------*/

function initDatePicker() {
    //初始化日期input-makedate
    $('#makedate').datetimepicker({
        format: 'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
}

/*
日期控件的初始化function by wangran
---------------------------end------------------------------------------*/


/*

保存角色 by wangran
---------------------------begin------------------------------------------*/

function saverole() {

    var checked = $("#menutree").treeview("getChecked");
    var $roleid = $("#newroleid").val();
    var $rolename = $("#newrolename").val();
    var $rolemenus = [];
    var len = checked.length;

    for (j = 0; j < len; j++) {
        $rolemenus.push(checked[j].nodeid);
    }
    console.log(token);
    var $cmsrole = {
        token:token,
        roleid: $roleid,
        rolename: $rolename,
        menus: $rolemenus,
        operatetype: $operatetype
    }

    $.ajax({
        url: systemPath + "/controller/saverole",
        type: "POST",
        dataType: "json",
        data: JSON.stringify($cmsrole),
        // contentType: "application/json",
        success: function (data) {

            if(data.flag == '1'){

                swal({
                        title: "保存成功！",
                        type: "success",
                    },
                    function() {
                        $("#roleform").modal('hide');//保存成功则关闭模态框，并且重置模态框
                        window.location.reload();//重新刷新页面
                    });
            }
            else {
                swal({
                   title: data.message,
                   type : "error"
                });
            }

        },
        error: function (data) {
            swal({
                title: data.message,
                type : "error"
            });
        }
    });

}


/*
保存角色function by wangran
---------------------------end------------------------------------------*/

/**
*@methodname: jquery主函数
*@description: role.js 页面主流程操作的main函数
*@param:
*@return:
*@date: 2019/7/5 14:41
*@author: wangran
*/
$(function(){
    initMenu();

    //初始化表格
    initTable();

    //初始化日期控件
    initDatePicker();

    //初始化菜单树
    // initMenuTree();
    initSelectTree({searchUrl:systemPath + "/controller/menutree",
                           treeElementId: "menutree",
                           nameElementId: "menutreeName",
                           valueElementId: "menutreeValue"});
    //查询按钮动作，填充table
    $("#queryrole").click(function () {
        queryrolelist();
    });


    //点击新增模态框时，清空所有输入框以及菜单树
    $("#addrole").click(function () {
        $("#newroleid").val("");
        //将角色ID输入框只读树形去除
        $("#newroleid").attr("readonly",false);
        $("#newrolename").val("");
        //新增模态框弹出时，将树形菜单的值都置为未选状态
        $('#menutree').treeview('uncheckAll', { silent: true });

        $operatetype = "insert";
    })


    //提交表单保存角色信息，submit后跳转到$("#roleaddform").validate，juqery validate 控制
    $("#saverole").click(function () {
        $("#roleaddform").submit();
    })

    //提交表单前校验
    $("#roleaddform").validate({
        ignore: "hidden",

        rules: {
            newroleid:{
                required: true
            },
            newrolename:{
                required: true
            }
        },

        messages: {
            newroleid: "角色编码不能为空",
            newrolename: "角色名称不能为空"
        },

        submitHandler: function (form) {
            saverole();
        }
    });

});
