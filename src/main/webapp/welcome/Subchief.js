jQuery.noConflict();

var niGrid;
var niGrid4;
function displayList(){
	
	var queryFormData;
	niGrid = jQuery("#namingInfoGrid");
	niGrid.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryAttention.action",
		datatype : "local",
		colNames : [ '提醒类型','提醒内容'],//用于展示的列名
		colModel : [ {
			name : 'operatecol',
			index : 'operatecol',
			width : 160,
			sortable : false,
			editable : false
		},{
			name : 'custname',//名称 主键性质
			index : 'custname',//索引列 可不写
			width : 800,//宽度，不能用百分比
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		}],
		pager : '#namingInfoGridPage',
		rowList : [10, 20, 50],
		autowidth : false,
		altRows : false,
		loadonce : true, 
		rowTotal : true,
		cellsubmit : 'clientArray',
		multiselect: false,
		loadError : function(){
			jQuery(".ui-paging-info", "#namingInfoGridPage").html("查询失败！");
		},
		onSelectRow: function(id){ 
//			jQuery("#divNamingInfoAdd").hide();
//			var selrow = niGrid.jqGrid('getGridParam','selrow');
//			niGrid.jqGrid('GridToForm', selrow, "#fm");
	   },
		serializeGridData : function(postData){
			if (typeof queryFormData != "undefined") {
				jQuery.extend(postData, queryFormData);
			}
			return postData;
		},
		gridComplete: function(){//添加操作按钮
		},
		caption: "提醒信息"
	});
	niGrid4 = jQuery("#namingInfoGrid2");
	niGrid4.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryBranchStat1.action",
		datatype : "local",
		colNames : [ '编码','营业部','所属机构','营业部经理','业务员名称','拜访量','建议书量','准客户数','当年承保客户数','当年承保保费'],//用于展示的列名
		colModel : [ {
			name : 'usercodecol',
			index : 'usercodecol',
			width : 0,
			sortable : false,
			editable : false,
			hidden : true
		}, {
			name : 'operatecol',
			index : 'operatecol',
			width : 120,
			sortable : false,
			editable : false
		},{
			name : 'custname',//名称 主键性质
			index : 'custname',//索引列 可不写
			width : 120,//宽度，不能用百分比
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname2',//名称 主键性质
			index : 'custname2',//索引列 可不写
			width : 120,//宽度，不能用百分比
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname3',//名称 主键性质
			index : 'custname3',//索引列 可不写
			width : 120,//宽度，不能用百分比
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname4',//名称 主键性质
			index : 'custname4',//索引列 可不写
			width : 80,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname5',//名称 主键性质
			index : 'custname5',//索引列 可不写
			width : 80,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname6',//名称 主键性质
			index : 'custname6',//索引列 可不写
			width : 80,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname7',//名称 主键性质
			index : 'custname7',//索引列 可不写
			width : 120,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname8',//名称 主键性质
			index : 'custname8',//索引列 可不写
			width : 120,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		}],
		pager : '#namingInfoGridPage2',
		rowList : [10, 20, 50],
		autowidth : false,
		altRows : false,
		loadonce : true, 
		rowTotal : true,
		cellsubmit : 'clientArray',
		multiselect: false,
		loadError : function(){
			jQuery(".ui-paging-info", "#namingInfoGridPage4").html("查询失败！");
		},
		onSelectRow: function(id){ 
//			jQuery("#divNamingInfoAdd").hide();
//			var selrow = niGrid.jqGrid('getGridParam','selrow');
//			niGrid.jqGrid('GridToForm', selrow, "#fm");
	   },
		serializeGridData : function(postData){
			if (typeof queryFormData != "undefined") {
				jQuery.extend(postData, queryFormData);
			}
			return postData;
		},
		gridComplete: function(){//添加操作按钮
		},
		caption: "业务员统计列表"
	});
	queryFormData = jQuery("form").formToData();
	niGrid.jqGrid('refreshData');
	niGrid4.jqGrid('refreshData');
}

jQuery(document).ready(function() {
	//给按钮添上特殊的显示效果
	jQuery("input[class='cssButton']").button();
	//界面表格的显示
	displayList();
	if(jQuery("#operator").val() != jQuery("#tmpoperator").val()){
		jQuery("#welcomeTitle").hide();
	}
});

function showUser(usercode,username){
	window.open(contextPath + "/welcome/Salesman.jsp?tmpoperator="+usercode+"&tmpoperatorname="+username);
}