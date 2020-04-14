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
		colNames : [ '��������','��������'],//����չʾ������
		colModel : [ {
			name : 'operatecol',
			index : 'operatecol',
			width : 160,
			sortable : false,
			editable : false
		},{
			name : 'custname',//���� ��������
			index : 'custname',//������ �ɲ�д
			width : 800,//��ȣ������ðٷֱ�
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
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
			jQuery(".ui-paging-info", "#namingInfoGridPage").html("��ѯʧ�ܣ�");
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
		gridComplete: function(){//��Ӳ�����ť
//			jQuery("#divNameInfoGrid").accordion("destroy");
		},
		caption: "������Ϣ"
	});
	niGrid2 = jQuery("#namingInfoGrid2");
	niGrid2.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryPol.action",
		datatype : "local",
		colNames : [ '������','�ͻ�����','�б�����','����','������������'],//����չʾ������
		colModel : [ {
			name : 'polno',
			index : 'polno',
			width : 180,
			sortable : false,
			editable : false
		},{
			name : 'customername',//���� ��������
			index : 'customername',//������ �ɲ�д
			width : 420,//��ȣ������ðٷֱ�
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'poldate',//���� ��������
			index : 'poldate',//������ �ɲ�д
			width : 120,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'prem',//���� ��������
			index : 'prem',//������ �ɲ�д
			width : 120,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'enddate',//���� ��������
			index : 'enddate',//������ �ɲ�д
			width : 120,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
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
			jQuery(".ui-paging-info", "#namingInfoGridPage2").html("��ѯʧ�ܣ�");
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
		gridComplete: function(){//��Ӳ�����ť
		}
	});
	niGrid3 = jQuery("#namingInfoGrid3");
	niGrid3.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryPolInTwoMonth.action",
		datatype : "local",
		colNames : [ '���屣����','�ͻ�����','������������'],//����չʾ������
		colModel : [ {
			name : 'operatecol',
			index : 'operatecol',
			width : 200,
			sortable : false,
			editable : false
		},{
			name : 'custname',//���� ��������
			index : 'custname',//������ �ɲ�д
			width : 560,//��ȣ������ðٷֱ�
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'enddate',//���� ��������
			index : 'enddate',//������ �ɲ�д
			width : 200,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
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
			jQuery(".ui-paging-info", "#namingInfoGridPage3").html("��ѯʧ�ܣ�");
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
		gridComplete: function(){//��Ӳ�����ť
		},
		caption: "δ�������µ��ڱ���"
	});
	niGrid4 = jQuery("#namingInfoGrid4");
	niGrid4.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryPreCustomer.action",
		datatype : "local",
		colNames : [ '�ͻ�ID','�ͻ�����','ҵ���չ','���ΰݷ�','����ݷ�','Ԥ�Ʊ���','Ԥ�Ʊ�׼����','�ͻ�����','ǩ���ɹ���'],//����չʾ������
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
			name : 'custname',//���� ��������
			index : 'custname',//������ �ɲ�д
			width : 100,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname2',//���� ��������
			index : 'custname2',//������ �ɲ�д
			width : 105,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname3',//���� ��������
			index : 'custname3',//������ �ɲ�д
			width : 105,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname4',//���� ��������
			index : 'custname4',//������ �ɲ�д
			width : 105,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname5',//���� ��������
			index : 'custname5',//������ �ɲ�д
			width : 130,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname6',//���� ��������
			index : 'custname6',//������ �ɲ�д
			width : 200,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname7',//���� ��������
			index : 'custname7',//������ �ɲ�д
			width : 110,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
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
			jQuery(".ui-paging-info", "#namingInfoGridPage4").html("��ѯʧ�ܣ�");
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
		gridComplete: function(){//��Ӳ�����ť
			var ids = niGrid4.jqGrid('getDataIDs');
			for(var i=0;i < ids.length;i++){
				var cl = ids[i];
				var be = "<a class='jqgrida' style='text-decoration: underline;color:blue;cursor:pointer' onclick='viewUser(\""+jQuery("#namingInfoGrid4").jqGrid('getCell',cl,'idcol')+"\")'>"+jQuery("#namingInfoGrid4").jqGrid('getCell',cl,'operatecol')+"</a> "; 
				jQuery("#namingInfoGrid4").jqGrid('setRowData',ids[i],{operatecol:be});
			}
		}
});
	// ��ѯ	
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
	//����ť�����������ʾЧ��
	jQuery("input[class='cssButton']").button();
	//���������ʾ
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