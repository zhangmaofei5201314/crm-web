var niGrid;
var niGrid1;
jQuery.noConflict();
(function($) {
	/**
	 * 业务提醒信息
	 */
	$(function() {
		var queryFormData;
		var url = contextPath + "/common/remindAction!selectRemind.action";
		niGrid = jQuery("#remindGrid");
		niGrid.jqGrid( {
			url : url,
			datatype : "local",
			colNames : [ ' ', '','' ],// 用于展示的列名
			colModel : [ {
				name : 'CONTENT',
				index : 'CONTENT',
				width : 250,
				sortable : false,
				editable : false
			}, {
				name : 'URL',
				index : 'URL',
				width : 250,
				sortable : false,
				editable : false,
				hidden : true
			},{
				name : 'action',
				index : 'action',
				width : 50,
				sortable : false,
				editable : false
			} ],
			pager : '#remindGridPage',
			rownumbers : true,
			width:window.screen.availWidth*0.25,  
            autowidth: false,  
            shrinkToFit: true, 
			altRows : true,
			altclass : 'changeColor',
			rowTotal : true,
			cellsubmit : 'clientArray',
			multiselect : false,
			gridComplete : function() {// 添加操作按钮
				var ids = niGrid.jqGrid('getDataIDs');
				for ( var i = 0; i < ids.length; i++) {
					var celldata=jQuery("#remindGrid").jqGrid('getCell',ids[i],'URL');
					if(celldata==""){
							var ae ="";
					}else{
					var ae = "<a style='text-decoration: underline;cursor:pointer;color:blue;' onclick='tourl("
									+ ids[i] + ");return false;' >打开</a>";
					}		niGrid.jqGrid('setRowData', ids[i], {
						action : ae
					});
				}
		    },
			loadError : function() {
				$(".ui-paging-info", "#remindGridPage").html("查询失败！");
			},
			serializeGridData : function(postData) {
				if (typeof queryFormData != "undefined") {
					jQuery.extend(postData, queryFormData);
				}
				return postData;
			},
			caption : "业务提醒信息"
		});
		niGrid.jqGrid('refreshData');

		$("#remindGrid").closest(".ui-jqgrid-bdiv").css( {
			"overflow-x" : "none"
		});

	});

	/**
	 * 系统公告
	 */
	$(function() {
		var queryFormData;
		var url = contextPath
				+ "/common/systemAnnouncementAction!selectSystemAnnouncement.action";
		niGrid1 = jQuery("#saGrid");
		niGrid1.jqGrid( {
			url : url,
			datatype : "local",
			colNames : [ 'ID', ' ' ],// 用于展示的列名
			colModel : [ {
				name : 'ID',
				index : 'ID',
				width : 100,
				sortable : false,
				hidden : true,
				editable : false
			}, {
				name : 'CONTENT',
				index : 'CONTENT',
				width : 208,
				sortable : false,
				editable : false
			} ],
			pager : '#saGridPage',
			rownumbers : true,
			autowidth : false,
			altRows : false,
			loadonce : true,
			rowTotal : true,
			cellsubmit : 'clientArray',
			multiselect : false,
			loadError : function() {
				$(".ui-paging-info", "#saGridPage").html("查询失败！");
			},
			serializeGridData : function(postData) {
				if (typeof queryFormData != "undefined") {
					jQuery.extend(postData, queryFormData);
				}
				return postData;
			},
			caption : "系统公告信息"
		});
		niGrid1.jqGrid('refreshData');

		$("#saGrid").closest(".ui-jqgrid-bdiv").css( {
			"overflow-x" : "auto"
		});

	});

})(jQuery);
function tourl(id){
	var jQdata = jQuery("#remindGrid").jqGrid('getRowData',id);
	var url= jQdata.URL;
	self.location.href=contextPath + ""+url+""; 
}
function donghua() {
	//jQuery("#xiaos1").src="../images/xiaos2";
	//jQuery("#xiaos1").attr("src","../images/xiaos2.png");

	if (jQuery("#xiaos1").css("display") == "block") {
		jQuery("#xiaos1").css("display","none");
		jQuery("#xiaos3").css("display","block");
	} else {
		jQuery("#xiaos3").css("display","none");
		jQuery("#xiaos1").css("display","block");
	}
}
window.onload = function() {
	//动画
	setInterval("donghua()", 800);
};