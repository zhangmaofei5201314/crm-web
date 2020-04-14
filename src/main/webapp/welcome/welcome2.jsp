<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@include file="../common/jsp/common.jsp"%>
<%@include file="../common/jsp/gsCommon.jsp"%>
<html>
<head>

<title>首页欢迎页面</title>

<link rel="stylesheet" href="../css/csm.css" type="text/css" />
<link rel="stylesheet" type="text/css" href="../css/comlist.css" />
<script type="text/javascript" src="js/welcome.js"></script>


<style>
body,td,button {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #7a7a7a;
	line-height: 25px;
	padding: 0px;
	margin-top: 0px;
}
body{
	background-color: #f2f6f9;
}
.main {
	width: 100%;
	height:100%;
	overflow:hidden;
}

.left {
	width:68%;
	float: left;
	overflow:hidden;
}

#maintop {
	width: 752px;
	height: 419px;
	margin-top: 35px;
	margin-left: 0px;
	background: #f8e197;
	display: block;
	margin-left:20px;
	border-radius: 30px;
	background-image: url('../images/homepic3.png');
	background-repeat:no-repeat;
}

#maindown {
	width: 750px;
	height: 200px;
	margin-top: 15px;
	margin-left: 10px;
	position: relative;
	background: #eaeaea;
	display: block;
	border: 1px solid #dadada;
}

#blue {
	width: 750px;
	height: 30px;
	margin-top: 0px;
	background: #3674bb;
	display: block;
	border: 1px solid #dadada;
}

#blue1 {
	width: 250px;
	height: 30px;
	margin-top: 0px;
	background: #3674bb;
	display: block;
	margin-right: 0px;
	border: 1px solid #dadada;
	position: relative;
}

#right {
	width:210px;
	height: 417px;
	margin-top: 15px;
	float: left;
	margin-left:10px;
	
}

.tt {
	position: absolute;
	left: 10px;
	top: -15px;
}

.notice {
	display: inline-block;
	height: 30px;
	line-height: 30px;
	font-size: 18px;
	color: white;
	padding-left: 80px;
}

.ss {
	position: absolute;
	left: 10px;
	top: -10px;
}

.table {
	width: 1000px;
	padding: 0px 10px 0px 20px;
	height: 100px;
}

.table1 {
	width: 1000px;
	padding: 0px 10px 0px 20px;
	margin-top: -10px;
	height: 200px;
}

select {
	height: 25px;
	width: 160px;
	border-radius: 3px;
	border: 1px solid #30afff;
}

#more {
	float: right;
	margin-top: 30px;
	margin-right: 40px;
	color: blue;
	CURSOR: hand;
	font-size: 10px;
}

#button {
	margin: 20px;
	margin-top: 35px;
	CURSOR: hand;
}

a:hover {
	color: #fff;
	background-color: #308ce3;
}

.button1 {
	color: #fff;
	width: 70px;
	line-height: 20px;
	background: #f97f55;
	margin: 0px 5px 5px 10px;
}

.button2 {
	color: #fff;
	width: 80px;
	line-height: 20px;
	background: #807dfa;
	margin: 0px 5px 5px 10px;
}

.button3 {
	color: #fff;
	width: 70px;
	line-height: 20px;
	background: #f8ae57;
	margin: 0px 5px 5px 10px;
	float: right;
}

.button4 {
	color: #fff;
	width: 50px;
	line-height: 20px;
	background: #308ce3;
	margin: 0px 5px 5px 10px;
}

#right ul,#maindown ul {
	list-style: none;
	margin: 0;
	padding: 0;
	margin-left: 30px;
	margin-top: 15px;
}
.changeColor{
		background-color:#f6f6f6;
	}
.hheader .ui-widget-header{
	background-color:#3d80cd;
	background-image: url('../images/ttt.png');
	padding-left:60px;
	color:#FFFFFF;
}
./*huangbg{
	position:relative;
	width: 100%;
	height:420px;
	margin-top: 35px;
	margin-left: 0px;
	display: block;
	margin-left:10px;
	border-radius: 30px;
	background-image: url('../images/shouye2.gif');
	background-repeat:no-repeat;*/
}
.welcom{
	position: absolute;
	left:20%;
	top:7%;
}
.baiyun{
	position: absolute;
	right:10%;
	top:5%;
}
.wenzi{
	position: absolute;
	right: 10%;
	bottom: 5%;
}
.xiaos{
	position: absolute;
	left:4%;
	top:25%;
	
}
</style>

</head>

<body>
	<!--主体 -->
	<form action="" method="post" name="fm" id="fm" target="frsubmit">
		<div class="main">
			<!--右侧 -->
			<div class="left">
				<div id="huangbg" class="">
				<img src="../images/shouye1.gif" width="98%" style="margin-top: 15px;margin-left: 10px;"/>
					<div class="xiaos">
						<img src="../images/xiaos.png" id="xiaos1" style="display:block;"/>
						<img src="../images/xiaos3.png" id="xiaos3" style="display:none;"/>
					</div>
					
				</div>

				<!--  <div id="maindown">
					<div id="remindDivGrid" style="font-size: 12px;">
						<table id="remindGrid" style="font-size: 12px;"></table>
						<div id="remindGridPage"></div>
					</div>
				</div>-->

			</div>
			<div id="right">
				<!-- <div id="saDivGrid" style="font-size: 12px;">
					<table id="saGrid" style="font-size: 12px;"></table>
					<div id="saGridPage"></div>
				</div> -->
				<div id="remindDivGrid" style="font-size: 12px;" class="toblist1 hheader">
						<table id="remindGrid" style="font-size: 12px;"></table>
						<div id="remindGridPage"></div>
				</div>
			</div>
		</div>
	</form>
</body>

</html>
