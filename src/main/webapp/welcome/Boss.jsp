<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@page import="com.sinosoft.utility.StrTool"%>
<%@include file="../common/jsp/common.jsp"%>
<%@include file="../common/jsp/gsCommon.jsp"%>
<%
String cap = "内勤";
String utype = request.getParameter("utype");
if(utype.equals("2")){
	cap = "团险部经理";
}
 %>
<html>
	<head>
		<title>用户首页</title>
		<script type="text/javascript" src="../calender/calendar.js"></script>
<script type="text/javascript" src="../calender/lang/calendar-en.js"></script>
<script type="text/javascript" src="../calender/calendar-setup.js"></script>
		<script type="text/javascript" src="Boss.js"></script>
	</head>
	<body>
	<p id="welcomeTitle">欢迎您，<%=cap%> <%=operatorName%></p>
		<form action="" method="get" name="fm" id="fm">
			<table width="100%" border="0" align="center" cellpadding="0"
				cellspacing="0" class="style2">
				<tr align="left" valign="top">
					<td colspan="2">
						<div id="divNameInfoGrid" style="white-space:nowrap;word-break:keep-all;font-size: 12px;">
							<table id="namingInfoGrid" style="font-size: 12px;"></table>
							<div id="namingInfoGridPage"></div>
						</div>
					</td>
				</tr>
			</table>
			<br/>
			<div id="query1" >
<!--			<a id="query1text" href="#"><strong>营销部统计列表</strong></a>-->
			<br/>
			<div id="query1table">
			<table width="100%" class="style2" style="display: none">
				<tr>
					<td width="15%" align="left" valign="middle" bgcolor="#FAFAFA">
						营业部
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input id="qdepartment" name="qdepartment" maxlength="30" />
					</td>
					<td width="15%" align="left" valign="middle" bgcolor="#FAFAFA">
						营业部经理
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input id="qmanager" name="qmanager" maxlength="30" />
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
				</tr>
				<tr>
					<td width="15%" align="left" valign="middle" bgcolor="#FAFAFA">
						机构
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input type="hidden" id="qbranch" name="qbranch"
						verify="机构名称|CODE"  />
						<input id="branchname" name="branchname" />
					</td>
					<td width="15%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
					<td width="10%" align="right" valign="middle" bgcolor="#FAFAFA">
						<input type="button" class="cssButton" id="searchButton" value="查询" />
					</td>
				</tr>
			</table>
			</div>
			<table width="100%" border="0" align="center" cellpadding="0"
				cellspacing="0" class="style2">
				<tr align="left" valign="top">
					<td colspan="2">
						<div id="divNameInfoGrid2" style="font-size: 12px;">
							<table id="namingInfoGrid2" style="font-size: 12px;"></table>
							<div id="namingInfoGridPage2"></div>
						</div>
					</td>
				</tr>
			</table>
			<input type="hidden" id="operator" name="operator" value='<%=operator%>' /> 
			<input type="hidden" id="comCode" name="comCode" value='<%=comCode%>' /> 
			<input type="hidden" id="userRole" name="userRole"  value='<%=userRole%>' /> 
			<input type="hidden" id="channelC" name="channelC" value = '<%=channelCode%>'/>
		</form>
	</body>
</html>