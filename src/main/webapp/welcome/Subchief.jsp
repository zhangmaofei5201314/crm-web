<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@page import="com.sinosoft.utility.StrTool"%>
<%@include file="../common/jsp/common.jsp"%>
<%@include file="../common/jsp/gsCommon.jsp"%>
<%
String tmpoperator = (request.getParameter("tmpoperator") == null || request.getParameter("tmpoperator").equals("")) ? operator : request.getParameter("tmpoperator");
String tmpoperatorname = (request.getParameter("tmpoperatorname") == null || request.getParameter("tmpoperatorname").equals("")) ? "" : request.getParameter("tmpoperatorname");
 %>
<html>
	<head>
		<title>�û���ҳ�� <%=tmpoperatorname%></title>
		<script type="text/javascript" src="../calender/calendar.js"></script>
<script type="text/javascript" src="../calender/lang/calendar-en.js"></script>
<script type="text/javascript" src="../calender/calendar-setup.js"></script>
		<script type="text/javascript" src="Subchief.js"></script>
	</head>
	<body>
	<p id="welcomeTitle">��ӭ����Ӫҵ������ <%=operatorName%></p>
		<form action="" method="get" name="fm" id="fm">
			<table width="100%" border="0" align="center" cellpadding="0"
				cellspacing="0" class="style2">
				<tr align="left" valign="top">
					<td colspan="2">
						<div id="divNameInfoGrid" style="font-size: 12px;">
							<table id="namingInfoGrid" style="font-size: 12px;"></table>
							<div id="namingInfoGridPage"></div>
						</div>
					</td>
				</tr>
			</table>
			<br/>
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
			<input type="hidden" id="tmpoperator" name="tmpoperator" value='<%=tmpoperator%>' /> 
			<input type="hidden" id="comCode" name="comCode" value='<%=comCode%>' /> 
			<input type="hidden" id="userRole" name="userRole"  value='<%=userRole%>' /> 
			<input type="hidden" id="channelC" name="channelC" value = '<%=channelCode%>'/>
		</form>
	</body>
</html>