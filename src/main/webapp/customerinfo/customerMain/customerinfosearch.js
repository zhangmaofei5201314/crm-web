/* -----------------------变量区 begin------------------------------------------*/

/* -----------------------jquery主函数 begin------------------------------------------*/
$(function(){
    initMenu();
    //初始化客户信息表格
    initCustomerInfoTable();

    //点击查询
    $("#infoSearch").click(function () {
        searchCusInfo();
    });

    selectSearchHistory();



});


/* -----------------------成员函数 begin------------------------------------------*/




function initCustomerInfoTable() {
    $("#customerinfotable").bootstrapTable('destroy').bootstrapTable({
        columns: [
            [{
                title: 'ID',
                field: 'id',
                align: 'center',
                valign: 'middle',
                visible: 0,
                width: 50
            }, {
                title: '客户号',
                field: 'customerNo',
                align: 'center',
                valign: 'middle',
                width: 100
            }, {
                title: '姓名',
                field: 'customerName',
                align: 'center',
                valign: 'middle',
                width: 100
            }, {
                title: '性别',
                field: 'sex',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '出生日期',
                field: 'birthday',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '证件类型',
                field: 'documentType',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '证件号',
                field: 'documentNo',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '手机号',
                field: 'mobile',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '操作',
                field: 'operate',
                align: 'center',
                valign: 'middle',
                width: 100,
                events: window.operateEvents,
                formatter: operateFormatter1
            }]
        ],
        formatNoMatches: function(){
            return "你瞅啥，没有！";
        },
        formatLoadingMessage: function(){
            return "请稍等，正在加载中。。。";
        }
    });
}

function operateFormatter1(value, row, index) {
    return [
        '<a id="checkCustomerInfo" href="/customerinfo/customerView/customerView.jsp" title="查看" data-toggle="modal" style="color: blue">',
        '查看',
        '</a>  '
    ].join('');
}
/*查询客户信息*/
function searchCusInfo(){
    var searchParam = $("#searchParam").val();

    // console.log(searchParam);

    var param={
        searchParam:searchParam,
        token:token
    }
    $.ajax({
        url: systemPath + "/controller/customer/info/selectCustomerByParam",
        type: "POST",
        dataType: "json",
        data: param,
        success: function (data) {
            $("#customerinfotable").bootstrapTable('load',data);


            addSearchHistory();

        },
        error: function () {
            swal({
                title: "查询出错了 o(╯□╰)o",
                type: "error"
            });
        }
    });

    // selectSearchHistory();

}
//查询搜索历史
function selectSearchHistory() {
    var param = {
        token : token
    }
    $.ajax({
        url: systemPath + "/controller/customer/info/selectSearchHistoryData",
        type: "POST",
        dataType: "json",
        data: param,
        success: function (data) {
            var historyList='搜索历史：';
            for (let i = 0; i < data.length; i++) {

                console.log("内容："+data[i])
                historyList += '<a><span class="f-s-13" onclick="clickHistory(this)" name="'+data[i]+'">'+data[i]+'</span></a> &nbsp;';
            }
            $("#historyName").html(historyList);
        }
    });
}

/**
 * 点击搜索历史事件
 * @param param
 */
function clickHistory(param) {
    var historyName = param.getAttribute("name");

    // console.log(historyName);
    $("#searchParam").val(historyName);
    searchCusInfo();


}


//添加搜索历史
function addSearchHistory() {
    console.log("添加搜索历史")
    var historyName = $("#searchParam").val();
    if(historyName!=''){
        var param = {
            historyName: historyName,
            token: token
        }
        $.ajax({
            url: systemPath + "/controller/customer/info/addSearchHistoryData",
            type: "POST",
            dataType: "text",
            data: param,
            success: function (data) {
                selectSearchHistory();
            }
        })
    }


}

