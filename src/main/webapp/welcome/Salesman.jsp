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
		<title>ҵ��Ա��ҳ�� <%=tmpoperatorname%></title>
		<script type="text/javascript" src="../calender/calendar.js"></script>
<script type="text/javascript" src="../calender/lang/calendar-en.js"></script>
<script type="text/javascript" src="../calender/calendar-setup.js"></script>
		<script type="text/javascript" src="Salesman.js"></script>
	</head>
	<body>
	<p id="welcomeTitle">��ӭ����ҵ��Ա <%=operatorName%></p>
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
			<a id="query1text" href="#"><strong>�б�������Ϣ</strong></a>
			<br/>
			<div id="query1table">
			<table width="100%" class="style2">
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						�ͻ�����
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input id="customername" name="customername" maxlength="30" />
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						������
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input id="polno" name="polno" maxlength="30" />
					</td>
					<td width="20%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
				</tr>
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						�б�������
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input name="signdate"	type="text" id="signdate" maxlength="10" readonly>
						<img src="../images/date.gif" width="16" height="15" align="absmiddle" class="style1" id="btnBeginDate" name="btnBeginDate" style="cursor:pointer">
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						��
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input name="enddate"	type="text" id="enddate" maxlength="10" readonly>
						<img src="../images/date.gif" width="16" height="15" align="absmiddle" class="style1" id="btnEndDate" name="btnEndDate" style="cursor:pointer">
					</td>
					<td width="20%" align="right" valign="middle" bgcolor="#FAFAFA">
						<input type="button" class="cssButton" id="resetButton" value="����" />
						<input type="button" class="cssButton" id="searchButton" value="��ѯ" />
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
			<a id="query1text" href="#"><strong>׼�ͻ���Ϣ</strong></a>
			<br/>
			<div id="query2table">
			<table width="100%" class="style2">
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						�ͻ�����
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input id="lscustomername" name="lscustomername" maxlength="30" />
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						�ͻ�����
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input type="hidden" id="lscustomerrankcode" name="lscustomerrankcode"
						verify="�ͻ�����|CODE" />
						<input id="lscustomerrankvalue" name="lscustomerrankvalue" />
					</td>
					<td width="20%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
				</tr>
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						Ԥ�Ʊ��ѹ�ģ
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
<!--						<input type="hidden" id="preprem" name="preprem"-->
<!--						verify="Ԥ�Ʊ��ѹ�ģ|CODE"  />-->
						<input id="preprem" name="preprem" /> ��Ԫ
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						Ԥ�Ʊ�׼���ѹ�ģ
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
<!--						<input type="hidden" id="prestaprem" name="prestaprem"-->
<!--						verify="Ԥ�Ʊ�׼���ѹ�ģ|CODE"  />-->
						<input id="prestaprem" name="prestaprem" /> ��Ԫ
					</td>
					<td width="20%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
				</tr>
				<tr>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						����ݷ�������
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input name="begindate1" type="text" id="begindate1" maxlength="10" readonly>
						<img src="../images/date.gif" width="16" height="15" align="absmiddle" class="style1" id="btnBeginDate1" name="btnBeginDate1" style="cursor:pointer">
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
						��
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
						ǩ���ɹ���
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
						<input type="hidden" id="successrate" name="successrate"
						verify="ǩ���ɹ���|CODE"  />
						<input id="successratevalue" name="successratevalue" />
					</td>
					</td>
					<td width="10%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
					<td width="30%" align="left" valign="middle" bgcolor="#FAFAFA">
					</td>
					<td width="20%" align="right" valign="middle" bgcolor="#FAFAFA">
					<input type="button" class="cssButton" id="resetButton2" value="����" />
					<input type="button" class="cssButton" id="searchButton2" value="��ѯ" />
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