jQuery.noConflict();

var niGrid;
var niGrid4;
function displayList(){
	
	var queryFormData;
	niGrid = jQuery("#namingInfoGrid");
	niGrid.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryAttention.action",
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
		},
		caption: "������Ϣ"
	});
	niGrid4 = jQuery("#namingInfoGrid2");
	niGrid4.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryBranchStat1.action",
		datatype : "local",
		colNames : [ '����','Ӫҵ��','��������','Ӫҵ������','ҵ��Ա����','�ݷ���','��������','׼�ͻ���','����б��ͻ���','����б�����'],//����չʾ������
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
			name : 'custname',//���� ��������
			index : 'custname',//������ �ɲ�д
			width : 120,//��ȣ������ðٷֱ�
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname2',//���� ��������
			index : 'custname2',//������ �ɲ�д
			width : 120,//��ȣ������ðٷֱ�
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname3',//���� ��������
			index : 'custname3',//������ �ɲ�д
			width : 120,//��ȣ������ðٷֱ�
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname4',//���� ��������
			index : 'custname4',//������ �ɲ�д
			width : 80,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname5',//���� ��������
			index : 'custname5',//������ �ɲ�д
			width : 80,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname6',//���� ��������
			index : 'custname6',//������ �ɲ�д
			width : 80,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname7',//���� ��������
			index : 'custname7',//������ �ɲ�д
			width : 120,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname8',//���� ��������
			index : 'custname8',//������ �ɲ�д
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
		},
		caption: "ҵ��Աͳ���б�"
	});
	queryFormData = jQuery("form").formToData();
	niGrid.jqGrid('refreshData');
	niGrid4.jqGrid('refreshData');
}

jQuery(document).ready(function() {
	//����ť�����������ʾЧ��
	jQuery("input[class='cssButton']").button();
	//���������ʾ
	displayList();
	if(jQuery("#operator").val() != jQuery("#tmpoperator").val()){
		jQuery("#welcomeTitle").hide();
	}
});

function showUser(usercode,username){
	window.open(contextPath + "/welcome/Salesman.jsp?tmpoperator="+usercode+"&tmpoperatorname="+username);
}