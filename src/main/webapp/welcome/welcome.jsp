<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<title></title>
	    <%@include file="pageHeader.jsp" %>
	</head>
	<body class="major">
		<div class="maj-row">

			<div class="maj-ele-box-9 maj-ele-box-sm-9 maj-ele-box-xs-12 p-l-n p-r-n" id="warp-body">
				<div class="type3" style="display: none">
					<div class="maj-ele-box-12 p-l-n">
						<div class="maj-ele-card cusbox-horizontal maj-clearfix">
							<div class="cusbox maj-clearfix font-lh">
								<div class="cusbox-left">
									<img src="imgs/1.png">
								</div>
								<div class="cusbox-right">
									<div class="cusbox-title font-lh">
										累计客户(单位:人)
									</div>
									<div class="cusbox-num font-lh"  data-value="countSum">
										 
									</div>
								</div>
							</div>

							<div class="cusbox maj-clearfix font-lh">
								<div class="cusbox-left">
									<img src="imgs/2.png">
								</div>
								<div class="cusbox-right">
									<div class="cusbox-title font-lh">
										有效客户(单位:人)
									</div>
									<div class="cusbox-num font-lh" data-value="countSumValid">
										 
									</div>
								</div>
							</div>

							<div class="cusbox maj-clearfix font-lh">
								<div class="cusbox-left">
									<img src="imgs/3.png">
								</div>
								<div class="cusbox-right">
									<div class="cusbox-title font-lh">
										有效投保人(单位:人)
									</div>
									<div class="cusbox-num font-lh" data-value="countSumPolicy">
										 
									</div>
								</div>
							</div>

							<div class="cusbox maj-clearfix font-lh">
								<div class="cusbox-left">
									<img src="imgs/3.png">
								</div>
								<div class="cusbox-right">
									<div class="cusbox-title font-lh">
										有社保客户(单位:人)
									</div>
									<div class="cusbox-num font-lh" data-value="validSecuritySum">
										 
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div class="maj-ele-box-4 maj-ele-box-sm-12 p-l-n">
						<div class="maj-ele-card " style="height: 400px;">
							<div class="" id="sex1" style="height: 100%;width: 100%;">
							
							</div>
						</div>
					</div>

					<div class="maj-ele-box-4 maj-ele-box-sm-12 p-l-n">
						<div class="maj-ele-card" style="height: 400px;">
							<div class="" id="degree1" style="height: 100%;width: 100%;">
								
							</div>
						</div>
					</div>

					<div class="maj-ele-box-4 maj-ele-box-sm-12 p-l-n">
						<div class="maj-ele-card" style="height: 400px;">
							<div class="" id="risk1" style="height: 100%;width: 100%;">
								
							</div>
						</div>
					</div>
				</div>
				
				<div class="type" style="display: none">
					<div class="maj-ele-box-12 p-l-n xsyes" id="">
						<div class="maj-ele-card cusbox-horizontal maj-clearfix">
							<div class="cusbox maj-clearfix font-lh">
								<div class="cusbox-left">
									<img src="imgs/1.png">
								</div>
								<div class="cusbox-right">
									<div class="cusbox-title font-lh">
										累计客户(单位:人)
									</div>
									<div class="cusbox-num font-lh"  data-value="countSum">
										 
									</div>
								</div>
							</div>

							<div class="cusbox maj-clearfix font-lh">
								<div class="cusbox-left">
									<img src="imgs/2.png">
								</div>
								<div class="cusbox-right">
									<div class="cusbox-title font-lh">
										有效客户(单位:人)
									</div>
									<div class="cusbox-num font-lh" data-value="countSumValid">
										 
									</div>
								</div>
							</div>

							<div class="cusbox maj-clearfix font-lh">
								<div class="cusbox-left">
									<img src="imgs/3.png">
								</div>
								<div class="cusbox-right">
									<div class="cusbox-title font-lh">
										有效投保人(单位:人)
									</div>
									<div class="cusbox-num font-lh" data-value="countSumPolicy">
										 
									</div>
								</div>
							</div>

							<div class="cusbox maj-clearfix font-lh">
								<div class="cusbox-left">
									<img src="imgs/3.png">
								</div>
								<div class="cusbox-right">
									<div class="cusbox-title font-lh">
										有社保客户(单位:人)
									</div>
									<div class="cusbox-num font-lh" data-value="validSecuritySum">
										 
									</div>
								</div>
							</div>
						</div>
					</div>


					<div class="maj-ele-box-8 maj-ele-box-sm-12 p-l-n">
						<div class="maj-ele-card type2" style="display: none">
							<div class="maj-full" id="line" style="height: 500px;width: 100%;">
								
							</div>
						</div>

						<div class="maj-ele-card type1" style="position: relative;display: none">
							<div class="" id="map" style="height: 500px;width: 100%;">
								
							</div>
							<div class="maj-map-join" id="mapPost" style="height: 240px; width: 200px">
								
							</div>
						</div>
					</div>

					<div class="maj-ele-box-4 maj-ele-box-sm-12 p-l-n">
						<div class="maj-ele-box-12 maj-ele-box-sm-6 p-l-n p-r-n" id="sm-p-r-5">
							<div class="maj-ele-card " style="height: 255px;">
								<div class="maj-full" id="sex" style="height: 100%;width: 100%;">
								
								</div>
							</div>
						</div>
						
						<div class="maj-ele-box-12 maj-ele-box-sm-6 p-l-n p-r-n m-b-n" id="sm-p-l-5">
							<div class="maj-ele-card" style="height: 255px;">
								<div class="" id="degree" style="height: 100%;width: 100%;">
								
								</div>
							</div>
						</div>
					</div>

				</div>
				
				
				<div class="maj-ele-box-6 p-l-n">
					<div class="maj-ele-card" style="height: 330px; padding-bottom: 20px;">
						<div class="maj-full" id="Yearonyear" style="height: 100%;width: 100%;">
							
						</div>
						<p class="welcome-sm-font">各月的新增增客户数=当月累计客户数-上月累计客户数、各月净增客户数=当月有效客户数-上月有效客户数。</p>
					</div>
					
				</div>

				<div class="maj-ele-box-6 p-l-n">
					<div class="maj-ele-card" style="height: 330px;">
						<div class="maj-full" id="age" style="height: 100%;width: 100%;">
							
						</div>
					</div>
				</div>
			</div>

			<div class="maj-ele-box-3 maj-ele-box-sm-3 p-l-n type3no" style="display: none">
				<div class="maj-ele-card xsno" id="">
					<div class="cusbox maj-clearfix font-lh">
						<div class="cusbox-left">
							<img src="imgs/1.png">
						</div>
						<div class="cusbox-right">
							<div class="cusbox-title font-lh">
								累计客户(单位:人)
							</div>
							<div class="cusbox-num font-lh"  data-value="countSum">
								 
							</div>
						</div>
					</div>

					<div class="cusbox maj-clearfix font-lh">
						<div class="cusbox-left">
							<img src="imgs/2.png">
						</div>
						<div class="cusbox-right">
							<div class="cusbox-title font-lh">
								有效客户(单位:人)
							</div>
							<div class="cusbox-num font-lh" data-value="countSumValid">
								 
							</div>
						</div>
					</div>

					<div class="cusbox maj-clearfix font-lh">
						<div class="cusbox-left">
							<img src="imgs/3.png">
						</div>
						<div class="cusbox-right">
							<div class="cusbox-title font-lh">
								有效投保人(单位:人)
							</div>
							<div class="cusbox-num font-lh" data-value="countSumPolicy">
								 
							</div>
						</div>
					</div>

					<div class="cusbox maj-clearfix font-lh">
						<div class="cusbox-left">
							<img src="imgs/3.png">
						</div>
						<div class="cusbox-right">
							<div class="cusbox-title font-lh">
								有社保客户(单位:人)
							</div>
							<div class="cusbox-num font-lh" data-value="validSecuritySum">
								 
							</div>
						</div>
					</div>
				</div>

				
				<div class="maj-ele-card m-t-md" style="height: 400px;">
					<div class="" id="risk" style="height: 100%;width: 100%;">
						
					</div>
				</div>
				
			</div>
		</div>

	</body>
<%@include file="pageFooter.jsp" %>
<script type="text/javascript" src="js/china.js"></script>
<script type="text/javascript" src="js/echarts.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
</html>