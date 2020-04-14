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
		<title>业务员首页： <%=tmpoperatorname%></title>
		<script type="text/javascript" src="../calender/calendar.js"></script>
<script type="text/javascript" src="../calender/lang/calendar-en.js"></script>
<script type="text/javascript" src="../calender/calendar-setup.js"></script>
		<script type="text/javascript" src="Salesman.js"></script>
	</head>
	<body>
	<p id="welcomeTitle">欢迎您，业务员 <%=operatorName%></p>
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
			<div id="query1" >
			<a id="query1text" href="#"><strong>承保保单信息</strong></a>
			<br/>
			<div id="query1table">
			<table width="100%" class="style2">
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						客户名称
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input id="customername" name="customername" maxlength="30" />
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						保单号
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input id="polno" name="polno" maxlength="30" />
					</td>
					<td width="20%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
				</tr>
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						承保日期自
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input name="signdate"	type="text" id="signdate" maxlength="10" readonly>
						<img src="../images/date.gif" width="16" height="15" align="absmiddle" class="style1" id="btnBeginDate" name="btnBeginDate" style="cursor:pointer">
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						至
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input name="enddate"	type="text" id="enddate" maxlength="10" readonly>
						<img src="../images/date.gif" width="16" height="15" align="absmiddle" class="style1" id="btnEndDate" name="btnEndDate" style="cursor:pointer">
					</td>
					<td width="20%" align="right" valign="middle" bgcolor="#FAFAFA">
						<input type="button" class="cssButton" id="resetButton" value="重置" />
						<input type="button" class="cssButton" id="searchButton" value="查询" />
					</td>
				</tr>
			</table>
			</div>
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
			<table width="100%" border="0" align="center" cellpadding="0"
				cellspacing="0" class="style2">
				<tr align="left" valign="top">
					<td colspan="2">
						<div id="divNameInfoGrid3" style="font-size: 12px;">
							<table id="namingInfoGrid3" style="font-size: 12px;"></table>
							<div id="namingInfoGridPage3"></div>
						</div>
					</td>
				</tr>
			</table>
			<br/>
			<div id="query2" >
			<a id="query1text" href="#"><strong>准客户信息</strong></a>
			<br/>
			<div id="query2table">
			<table width="100%" class="style2">
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						客户名称
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input id="lscustomername" name="lscustomername" maxlength="30" />
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						客户级别
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input type="hidden" id="lscustomerrankcode" name="lscustomerrankcode"
						verify="客户级别|CODE" />
						<input id="lscustomerrankvalue" name="lscustomerrankvalue" />
					</td>
					<td width="20%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
				</tr>
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						预计保费规模
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
<!--						<input type="hidden" id="preprem" name="preprem"-->
<!--						verify="预计保费规模|CODE"  />-->
						<input id="preprem" name="preprem" /> 万元
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						预计标准保费规模
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
<!--						<input type="hidden" id="prestaprem" name="prestaprem"-->
<!--						verify="预计标准保费规模|CODE"  />-->
						<input id="prestaprem" name="prestaprem" /> 万元
					</td>
					<td width="20%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
				</tr>
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						最近拜访日期自
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input name="begindate1" type="text" id="begindate1" maxlength="10" readonly>
						<img src="../images/date.gif" width="16" height="15" align="absmiddle" class="style1" id="btnBeginDate1" name="btnBeginDate1" style="cursor:pointer">
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						至
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input name="enddate1"	type="text" id="enddate1" maxlength="10" readonly>
						<img src="../images/date.gif" width="16" height="15" align="absmiddle" class="style1" id="btnEndDate1" name="btnEndDate1" style="cursor:pointer">
					</td>
					<td width="20%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
				</tr>
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						签单成功率
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input type="hidden" id="successrate" name="successrate"
						verify="签单成功率|CODE"  />
						<input id="successratevalue" name="successratevalue" />
					</td>
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
					<td width="20%" align="right" valign="middle" bgcolor="#FAFAFA">
					<input type="button" class="cssButton" id="resetButton2" value="重置" />
					<input type="button" class="cssButton" id="searchButton2" value="查询" />
					</td>
				</tr>
			</table>
			</div>
			</div>
			<table width="100%" border="0" align="center" cellpadding="0"
				cellspacing="0" class="style2">
				<tr align="left" valign="top">
					<td colspan="2">
						<div id="divNameInfoGrid4" style="font-size: 12px;">
							<table id="namingInfoGrid4" style="font-size: 12px;"></table>
							<div id="namingInfoGridPage4"></div>
						</div>
					</td>
				</tr>
			</table>
			<input type="hidden" id="operator" name="operator" value='<%=operator%>' /> 
			<input type="hidden" id="tmpoperator" name="tmpoperator" value='<%=tmpoperator%>' />
			<input type="hidden" id="tmprole" name="tmprole" value="1000000" />
			<input type="hidden" id="comCode" name="comCode" value='<%=comCode%>' /> 
			<input type="hidden" id="userRole" name="userRole"  value='<%=userRole%>' /> 
			<input type="hidden" id="channelC" name="channelC" value = '<%=channelCode%>'/>
		</form>
	</body>
</html>