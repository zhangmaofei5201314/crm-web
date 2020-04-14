<%-- <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%> --%>
    <%@ page contentType="text/html;charset=UTF-8" language="java"  isELIgnored="false" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	

<script src="customList.js"></script>
<!-- <script src="../externalPage/customListCFG.js"></script> -->

<link rel="stylesheet" type="text/css" href="../common/css/jquery/plugins/jstree/themes/default/style.css" />
<link rel="stylesheet" type="text/css" href="../css/commoncs.css" />
<link rel="stylesheet" type="text/css" href="../css/comlist.css" />		
<link rel="stylesheet" type="text/css" href="../css/xuanxiangka.css" />
<link href="../bootstrap/css/bootstrap-table.css" rel="stylesheet"/>

<link rel="stylesheet" type="text/css" href="default.css" />
<link rel="stylesheet" type="text/css" href="lis-frame.css" />
<link rel="stylesheet" type="text/css" href="style.min.css" />
<link rel="stylesheet" type="text/css" href="theme.css" />

<link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css" />
<link  href="../bootstrap/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">


<script src="../bootstrap/js/bootstrap-table.js"></script>
<script src="../bootstrap/js/bootstrap-table-zh-CN.js"></script>
<script src="../assets/lib/jquery-1.9.1.min.js"></script>
<script>
    /* $(function(){
        listcode =  "${param.menuId}";
    }); */
</script>
<style type="text/css">

    .box1{position:absolute; left:0px;  padding:1px; background:#f0f3f9; font-size:12px; -moz-box-shadow:2px 2px 4px #666666; -webkit-box-shadow:2px 2px 4px #666666;}
    .box2{position:absolute; left:108px;  padding:1px; background:#f0f3f9; font-size:12px; -moz-box-shadow:2px 2px 4px #666666; -webkit-box-shadow:2px 2px 4px #666666;}

    .boxs1{position:absolute; left:0px; top:50px; padding:1px;  font-size:12px; -moz-box-shadow:2px 2px 4px #666666; -webkit-box-shadow:2px 2px 4px #666666;}
    .boxs2{position:absolute; left:108px; top:50px; padding:1px; font-size:12px; -moz-box-shadow:2px 2px 4px #666666; -webkit-box-shadow:2px 2px 4px #666666;}

    .test{border:1px solid #a0b3d6; background:white;}

    .bar{line-height:20px;width:100px; background:#beceeb; border-bottom:1px solid #a0b3d6; padding-left:5px; cursor:move;}
    .bars{color:#fff; line-height:20px;width:100px; background: #348fe2; border-bottom:1px solid #348fe2; padding-left:5px; }

</style>
<title>Insert title here</title>
</head>
<body>



<div lisFrame="layout">

<lis-panel headtitle="自定义清单">

    <lis-panel-label id="hhh" class="col-sm-8 "  headtitle="拖拽选项" style="width:20%; height:625px; overflow: auto">

<div class="panel-card-label">拖拽选项</div>
        <div style="margin: auto 15px;font-size: 15px;font-family: 微软雅黑, Arial">

            <ul id="a">
                <li>
                    <div id="boxs1" class="boxs1">
                        <div id="tests" class="test">
                            <div id="bars" draggable="true" class="bars" >维度筛选:</div>
                        </div>
                    </div>
                </li>
                <li >
                	<div id="01Animal" class="box1" style="top: 75px;">
                        <div id="atest1" class="test">
                            <div id="abar1" draggable="true" class="bar" >生肖</div>
                        </div>
                    </div>
                </li>
                <li >
                	<div id="01Star" class="box1" style="top: 100px;">
                        <div id="atest2" class="test">
                            <div id="abar2" draggable="true" class="bar" >星座</div>
                        </div>
                    </div>
                </li>
                <li >
                	<div id="01Nation" class="box1" style="top: 125px;">
                        <div id="atest3" class="test">
                            <div id="abar3" draggable="true" class="bar" >国籍</div>
                        </div>
                    </div>
                </li>
                <li >
                	<div id="01Age" class="box1" style="top: 150px;">
                        <div id="atest4" class="test">
                            <div id="abar4" draggable="true" class="bar" >年龄</div>
                        </div>
                    </div>
                </li>
            </ul>

            <ul id="b">
                <li>
                    <div id="boxs2" class="boxs2" >
                        <div id="tests2" class="test">
                            <div id="bars2" draggable="true" class="bars">字段:</div>
                        </div>
                    </div>
                </li>
                
                <li >
                	<div id="11Name" class="box2" style="top: 75px;">
                        <div id="btest1" class="test">
                            <div id="bbar1" draggable="true" class="bar" >姓名</div>
                        </div>
                    </div>
                </li>
                
                <li >
                	<div id="11Sex" class="box2" style="top: 100px;">
                        <div id="btest2" class="test">
                            <div id="bbar2" draggable="true" class="bar" >性别</div>
                        </div>
                    </div>
                </li>
                
                <li >
                	<div id="11Birthday" class="box2" style="top: 125px;">
                        <div id="btest3" class="test">
                            <div id="bbar3" draggable="true" class="bar" >出生日期</div>
                        </div>
                    </div>
                </li>
                
                <li >
                	<div id="11DocumentType" class="box2" style="top: 150px;">
                        <div id="btest4" class="test">
                            <div id="bbar4" draggable="true" class="bar" >证件类型</div>
                        </div>
                    </div>
                </li>
                
                <li >
                	<div id="11DocumentNo" class="box2" style="top: 175px;">
                        <div id="btest5" class="test">
                            <div id="bbar5" draggable="true" class="bar" >证件号</div>
                        </div>
                    </div>
                </li>
                
            </ul>
        </div>



    </lis-panel-label>

    <lis-panel-label class="col-sm-8" headtitle="清单" style="width:80%; height:545px;">

        <lis-panel-body>
            <div class="col-sm-6" id="dimension">
                <div class="col-sm-12 "> <%--占3格--%>
                    <label class="panel-card-title"> 维度筛选 </label>
                </div>
            </div>
            <div class="col-sm-6" id="quota">
                <div class="col-sm-12 ">
                    <label class="panel-card-title"> 字段 </label>
                </div>
            </div>
        </lis-panel-body>

        <lis-panel-body >
            <div class="col-xs-12 sino-btn">
                <button id="btn_list_reset" class="btn btn-success btn-lis" onclick="clickReset()"> 重置</button>
                <button id="btn_list_add" data-original-title="1"  class="btn btn-success btn-lis" onclick="clickListAdd()"> 生成清单</button>
            </div>
        </lis-panel-body>
        <lis-panel-body>
            <!-- <div  id="transFormGrid" class="ui-grid" style="height: 150px; display: none"> -->
            <div  id="transFormGrid" class="col-xs-12" style="height: 150px; display: none">
               
            </div>
            <div class="col-xs-12 sino-btn">
                <button id="btn_list_exl" class="btn btn-success btn-lis">导出CSV</button>
            </div>
            </lis-panel-body>
    </lis-panel-label>

</lis-panel>

</div>
</body>
</html>