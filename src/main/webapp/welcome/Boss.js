jQuery.noConflict();

var niGrid;
var niGrid4;
function displayList(){
	jQuery.codeSelect("branchname", "qbranch", "comCode", 0, 200,200);
	
	var queryFormData;
	niGrid = jQuery("#namingInfoGrid");
	niGrid.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryProposal.action",
		datatype : "local",
		colNames : [ '����������', '���������', '�ͻ�����', '�ͻ����', '����ʱ��', '������״̬ ','����'],//����չʾ������
		colModel : [ {
			name : 'operatecol',
			index : 'operatecol',
			width : 300,
			sortable : false,
			editable : false
		},{
			name : 'pcode',//���� ��������
			index : 'pcode',//������ �ɲ�д
			width : 0,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false,//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
			hidden:true
		},{
			name : 'custname',//���� ��������
			index : 'custname',//������ �ɲ�д
			width : 280,//��ȣ������ðٷֱ�
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'customerno',//���� ��������
			index : 'customerno',//������ �ɲ�д
			width : 0,//��ȣ������ðٷֱ�
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false,//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
			hidden:true
		},{
			name : 'custname1',//���� ��������
			index : 'custname1',//������ �ɲ�д
			width : 180,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname2',//���� ��������
			index : 'custname2',//������ �ɲ�д
			width : 100,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
			sortable : false,//�Ƿ������Ĭ��false
			sorttype : 'number',
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'action',//���� ��������
			index : 'action',//������ �ɲ�д
			width : 100,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
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
			var ids = niGrid.jqGrid('getDataIDs');
			for(var i=0;i < ids.length;i++){
				var cl = ids[i];
				var be = "<a class='jqgrida' style='text-decoration: underline;color:blue;cursor:pointer' onclick='viewUser(\""+jQuery("#namingInfoGrid").jqGrid('getCell',cl,'customerno')+"\")'>�鿴�û���Ϣ</a> "; 
				jQuery("#namingInfoGrid").jqGrid('setRowData',ids[i],{action:be});
			}
		},
		caption: "����˽�������Ϣ"
	});
	niGrid4 = jQuery("#namingInfoGrid2");
	niGrid4.jqGrid({
		url :  contextPath + "/common/welcomeAction!queryBranchStat2.action",
		datatype : "local",
		colNames : [ '�û�����','Ӫҵ��','��������','Ӫҵ������','ҵ��Ա����','�ݷ���','��������','׼�ͻ���','����б��ͻ���','����б�����'],//����չʾ������
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
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname2',//���� ��������
			index : 'custname2',//������ �ɲ�д
			width : 120,//��ȣ������ðٷֱ�
			sortable : false,//�Ƿ������Ĭ��false
			editable : false//�Ƿ�ɱ༭��Ĭ��false �ɲ�д
		},{
			name : 'custname3',//���� ��������
			index : 'custname3',//������ �ɲ�д
			width : 120,//��ȣ������ðٷֱ�
			align : 'center',//���룬�ɲ�д
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
		caption : "Ӫҵ��ͳ���б�",
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
		}
});
	// ��ѯ	
	jQuery("#searchButton").click(function(){
		queryFormData = jQuery(this).parents("form").formToData();
		niGrid4.jqGrid('refreshData');
	});
	jQuery("#query1").width(jQuery("#namingInfoGridPage").width());
	queryFormData = jQuery("form").formToData();
	niGrid.jqGrid('refreshData');
	niGrid4.jqGrid('refreshData');
}

jQuery(document).ready(function() {
	//����ť�����������ʾЧ��
	jQuery("input[class='cssButton']").button();
	//���������ʾ
	displayList();
});

function showUser(usercode,username){
	window.open(contextPath + "/welcome/Subchief.jsp?tmpoperator="+usercode+"&tmpoperatorname="+username);
}

function viewUser(code){
	window.open(contextPath + "/custom/CustomerInsert.jsp?CustomerNo="+code+"&&type=view");
}