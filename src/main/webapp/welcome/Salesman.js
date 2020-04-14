jQuery.noConflict();

var niGrid;
var niGrid2;
var niGrid3;
var niGrid4;
function displayList(){
	
	Calendar.setup(
			{
				inputField : "signdate", // ID of the input field
				ifFormat : "%Y-%m-%d", // the date format
				button : "btnBeginDate" // ID of the button
			}
	);
	
	Calendar.setup(
			{
				inputField : "enddate", // ID of the input field
				ifFormat : "%Y-%m-%d", // the date format
				button : "btnEndDate" // ID of the button
			}
	);
	
	Calendar.setup(
			{
				inputField : "begindate1", // ID of the input field
				ifFormat : "%Y-%m-%d", // the date format
				button : "btnBeginDate1" // ID of the button
			}
	);
	
	Calendar.setup(
			{
				inputField : "enddate1", // ID of the input field
				ifFormat : "%Y-%m-%d", // the date format
				button : "btnEndDate1" // ID of the button
			}
	);
	
	jQuery.codeSelect("lscustomerrankvalue", "lscustomerrankcode", "CustomerRank", 0, 200,
			200);
	jQuery.codeSelect("successratevalue", "successrate", "SuccessRate", 0, 200,
			200);
	
	var queryFormData;
	niGrid = jQuery("#namingInfoGrid");
	niGrid.jqGrid({
		url : contextPath + "/common/welcomeAction!queryAttention.action",
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
//			jQuery("#divNameInfoGrid").accordion("destroy");
		},
		caption: "提醒信息"
	});
	niGrid2 = jQuery("#namingInfoGrid2");
	niGrid2.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryPol.action",
		datatype : "local",
		colNames : [ '保单号','客户名称','承保日期','保费','保单到期日期'],//用于展示的列名
		colModel : [ {
			name : 'polno',
			index : 'polno',
			width : 180,
			sortable : false,
			editable : false
		},{
			name : 'customername',//名称 主键性质
			index : 'customername',//索引列 可不写
			width : 420,//宽度，不能用百分比
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'poldate',//名称 主键性质
			index : 'poldate',//索引列 可不写
			width : 120,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'prem',//名称 主键性质
			index : 'prem',//索引列 可不写
			width : 120,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'enddate',//名称 主键性质
			index : 'enddate',//索引列 可不写
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
			jQuery(".ui-paging-info", "#namingInfoGridPage2").html("查询失败！");
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
		}
	});
	niGrid3 = jQuery("#namingInfoGrid3");
	niGrid3.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryPolInTwoMonth.action",
		datatype : "local",
		colNames : [ '团体保单号','客户名称','保单到期日期'],//用于展示的列名
		colModel : [ {
			name : 'operatecol',
			index : 'operatecol',
			width : 200,
			sortable : false,
			editable : false
		},{
			name : 'custname',//名称 主键性质
			index : 'custname',//索引列 可不写
			width : 560,//宽度，不能用百分比
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'enddate',//名称 主键性质
			index : 'enddate',//索引列 可不写
			width : 200,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		}],
		pager : '#namingInfoGridPage3',
		rowList : [10, 20, 50],
		autowidth : false,
		altRows : false,
		loadonce : true, 
		rowTotal : true,
		cellsubmit : 'clientArray',
		multiselect: false,
		loadError : function(){
			jQuery(".ui-paging-info", "#namingInfoGridPage3").html("查询失败！");
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
		caption: "未来两个月到期保单"
	});
	niGrid4 = jQuery("#namingInfoGrid4");
	niGrid4.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryPreCustomer.action",
		datatype : "local",
		colNames : [ '客户ID','客户名称','业务进展','初次拜访','最近拜访','预计保费','预计标准保费','客户级别','签单成功率'],//用于展示的列名
		colModel : [{
			name : 'idcol',
			index : 'idcol',
			width : 0,
			sortable : false,
			editable : false,
			hidden : true
		},{
			name : 'operatecol',
			index : 'operatecol',
			width : 105,
			sortable : false,
			editable : false
		},{
			name : 'custname',//名称 主键性质
			index : 'custname',//索引列 可不写
			width : 100,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname2',//名称 主键性质
			index : 'custname2',//索引列 可不写
			width : 105,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname3',//名称 主键性质
			index : 'custname3',//索引列 可不写
			width : 105,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname4',//名称 主键性质
			index : 'custname4',//索引列 可不写
			width : 105,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname5',//名称 主键性质
			index : 'custname5',//索引列 可不写
			width : 130,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname6',//名称 主键性质
			index : 'custname6',//索引列 可不写
			width : 200,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		},{
			name : 'custname7',//名称 主键性质
			index : 'custname7',//索引列 可不写
			width : 110,//宽度，不能用百分比
			align : 'center',//对齐，可不写
			sortable : false,//是否可排序，默认false
			sorttype : 'number',
			editable : false//是否可编辑，默认false 可不写
		}],
		pager : '#namingInfoGridPage4',
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
			var ids = niGrid4.jqGrid('getDataIDs');
			for(var i=0;i < ids.length;i++){
				var cl = ids[i];
				var be = "<a class='jqgrida' style='text-decoration: underline;color:blue;cursor:pointer' onclick='viewUser(\""+jQuery("#namingInfoGrid4").jqGrid('getCell',cl,'idcol')+"\")'>"+jQuery("#namingInfoGrid4").jqGrid('getCell',cl,'operatecol')+"</a> "; 
				jQuery("#namingInfoGrid4").jqGrid('setRowData',ids[i],{operatecol:be});
			}
		}
});
	// 查询	
	jQuery("#searchButton").click(function(){
		queryFormData = jQuery(this).parents("form").formToData();
		niGrid2.jqGrid('refreshData');
	});
	jQuery("#searchButton2").click(function(){
		queryFormData = jQuery(this).parents("form").formToData();
		niGrid4.jqGrid('refreshData');
//		var s;
//		s = jQuery("#namingInfoGrid4").jqGrid('getGridParam','selarrrow');
//		alert(s);
	});
	jQuery("#resetButton").click(function(){
		jQuery("#customername").val("");
		jQuery("#polno").val("");
		jQuery("#signdate").val("");
		jQuery("#enddate").val("");
	});
	jQuery("#resetButton2").click(function(){
		jQuery("#lscustomername").val("");
		jQuery("#lscustomerrankcode").val("");
		jQuery("#lscustomerrankvalue").val("");
		jQuery("#preprem").val("");
		jQuery("#prestaprem").val("");
		jQuery("#begindate1").val("");
		jQuery("#enddate1").val("");
		jQuery("#successrate").val("");
		jQuery("#successratevalue").val("");
	});
	jQuery("#query1").width(jQuery("#namingInfoGridPage").width());
	jQuery("#query2").width(jQuery("#namingInfoGridPage").width());
	queryFormData = jQuery("form").formToData();
	niGrid.jqGrid('refreshData');
	niGrid3.jqGrid('refreshData');
}

jQuery(document).ready(function() {
	//给按钮添上特殊的显示效果
	jQuery("input[class='cssButton']").button();
	//界面表格的显示
	displayList();
	if(jQuery("#operator").val() != jQuery("#tmpoperator").val()){
		jQuery("#welcomeTitle").hide();
	}
	if(userRole == "1000030"){
		jQuery("#welcomeTitle").hide();
	}
});

function viewUser(code){
	window.open(contextPath + "/custom/CustomerInsert.jsp?CustomerNo="+code+"&type=view");
}