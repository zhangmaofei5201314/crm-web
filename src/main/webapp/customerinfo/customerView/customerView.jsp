<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>

<head>
    <title>客户详细信息</title>
    <link href="../../assets/fontAwesome/css/fontawesome-all.min.css" rel="stylesheet">
    <link href="../../assets/css/lib/themify-icons.css" rel="stylesheet">
    <link href="../../assets/css/lib/bootstrap.min.css" rel="stylesheet">
    <link href="../../assets/css/lib/nixon.css" rel="stylesheet">
    <link href="../../assets/lib/lobipanel/css/lobipanel.min.css" rel="stylesh1eet">
    <link href="../../assets/css/lib/sidebar.css" rel="stylesheet">
    <link href="../../assets/css/style.css" rel="stylesheet">
    <link href="../../assets/bstable/bootstrap-table.css" rel="stylesheet"/>
    <link href="../../assets/datetime/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="../../assets/treeview/bootstrap-treeview.min.css" rel="stylesheet">
    <link href="../../assets/css/lib/sweetalert/sweetalert.css" rel="stylesheet"/>
    <link href="../../assets/bsselect/css/bootstrap-select.min.css" rel="stylesheet"/>


    <style type="text/css">
        .zmf-val{
            font-weight: normal;
            overflow: hidden;
            /*width: 70%;*/
            max-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333;
            height: 5%;
        }
        .zmf-key{
            font-weight: bold;
            color: #333;
            /*width: 30%;*/
            height: 5%;
        }

    </style>
</head>

<body>
<div class="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
    <div class="nano">
        <div class="nano-content" id="menuList">

        </div>
    </div>
</div>
<!-- /# sidebar -->
<div class="header">·
    <div class="pull-left">
        <div class="logo">
            <a href="index.jsp">
                <img id="logoImg" src="../../logo/logo.png" data-logo_big="../../logo/logo.png" data-logo_small="../../logo/logoSmall.png" alt="Nixon" />
            </a>
        </div>
        <div class="hamburger sidebar-toggle">
            <span class="ti-menu"></span>
        </div>
    </div>
    <div class="pull-right p-r-15">
        <%--头部右侧--%>
    </div>
</div>
<!-- END chat Sidebar-->
<div class="content-wrap">
    <div class="main">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-8 p-0">
                    <div class="page-header">
                        <div class="page-title">
                            <h1>客户信息</h1>
                        </div>
                    </div>
                </div>
                <!-- /# column -->
                <div class="col-lg-4 p-0">
                    <div class="page-header">
                        <div class="page-title">
                            <ol class="breadcrumb text-right">
                                <li class="active">客户信息</li>
                                <li><a href="#">客户详细信息</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <!-- /# column -->
            </div>
            <!-- /# row -->
            <div class="main-content">

                <div class="col-lg-3">

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card alert">

                                <div class="card-body">
                                    <div class="panel-group" id="accordion">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <h5 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse4"><h5>重要提示</h5></a>
                                                </h5>
                                            </div>
                                            <div id="collapse4" class="panel-collapse collapse in">
                                                <div class="panel-body">
                                                    zmm张茂飞
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-group" id="accordion1">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <h5 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion1" href="#collapse2" ><h5>客户基本信息</h5></a>
                                                </h5>
                                            </div>
                                            <div id="collapse2" class="panel-collapse collapse in">
                                                <div class="panel-body">
                                                    <div class="col-lg-4 zmf-key">客户姓名:</div>
                                                    <div class="col-lg-8 zmf-val">MonphyZhang</div>

                                                    <div class="col-lg-4 zmf-key">性别:</div>
                                                    <div class="col-lg-8 zmf-val">男</div>

                                                    <div class="col-lg-4 zmf-key">年龄:</div>
                                                    <div class="col-lg-8 zmf-val">18</div>

                                                    <div class="col-lg-4 zmf-key">出生日期:</div>
                                                    <div class="col-lg-8 zmf-val">2002-01-01</div>

                                                    <div class="col-lg-4 zmf-key">证件类型:</div>
                                                    <div class="col-lg-8 zmf-val">其他</div>

                                                    <div class="col-lg-4 zmf-key">证件号:</div>
                                                    <div class="col-lg-8 zmf-val">TX0579</div>

                                                    <div class="col-lg-4 zmf-key">客户级别:</div>
                                                    <div class="col-lg-8 zmf-val">铂金级</div>

                                                    <div class="col-lg-4 zmf-key">渠道:</div>
                                                    <div class="col-lg-8 zmf-val">个人销售</div>

                                                    <div class="col-lg-4 zmf-key">所属机构:</div>
                                                    <div class="col-lg-8 zmf-val">北京分公司</div>

                                                    <div class="col-lg-4 zmf-key">年收入:</div>
                                                    <div class="col-lg-8 zmf-val">500</div>

                                                    <div class="col-lg-4 zmf-key">民族:</div>
                                                    <div class="col-lg-8 zmf-val">汉族</div>

                                                    <div class="col-lg-4 zmf-key">最高学历:</div>
                                                    <div class="col-lg-8 zmf-val">幼儿园</div>

                                                    <div class="col-lg-4 zmf-key">血型:</div>
                                                    <div class="col-lg-8 zmf-val">O</div>

                                                    <div class="col-lg-4 zmf-key">婚姻状态:</div>
                                                    <div class="col-lg-8 zmf-val">已婚</div>

                                                    <div class="col-lg-4 zmf-key">联系地址:</div>
                                                    <div class="col-lg-8 zmf-val">北京市第一幼儿园</div>

                                                    <div class="col-lg-4 zmf-key">国籍:</div>
                                                    <div class="col-lg-8 zmf-val">中国</div>

                                                    <div class="col-lg-4 zmf-key">职业:</div>
                                                    <div class="col-lg-8 zmf-val">学生</div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-group" id="accordion2">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <h5 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion2" href="#collapse3"><h5>客户标签信息</h5></a>
                                                </h5>
                                            </div>
                                            <div id="collapse3" class="panel-collapse collapse in">
                                                <div class="panel-body">

                                                    标签
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="col-lg-9">
                    <div class="row">
                        <div class="card alert">
                            <div class="card-header">
                                <h5>个人保单信息</h5>

                            </div>
                            <div class="card-body">
                                <div class="row" >
                                    <table id="personalPolicy"
                                           class="table-no-bordered table-responsive table table-hover"
                                           data-toggle="table"
                                           data-click-to-select="true"
                                           data-pagination="true"
                                           data-show-footer="true"
                                           data-side-pagination="client"
                                           >
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="card alert">
                            <div class="card-header">
                                <h5>团体保单信息</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table id="groupPolicy"
                                           class="table  table-bordered table-striped"
                                           data-toggle="table"
                                           data-click-to-select="true"
                                           data-pagination="true"
                                           data-show-footer="true"
                                           data-side-pagination="client">
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="card alert">
                            <div class="card-header">
                                <h5>客户联系方式</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table id="contactInfo"
                                           class="table  table-bordered table-striped"
                                           data-toggle="table"
                                           data-click-to-select="true"
                                           data-pagination="true"
                                           data-show-footer="true"
                                           data-side-pagination="client">
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="card alert">
                            <div class="card-header">
                                <h5>客户证件信息</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table id="documentInfo"
                                           class="table  table-bordered table-striped"
                                           data-toggle="table"
                                           data-click-to-select="true"
                                           data-pagination="true"
                                           data-show-footer="true"
                                           data-side-pagination="client">
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="card alert">
                            <div class="card-header">
                                <h5>客户接触历史</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table id="contactHistory"
                                           class="table  table-bordered table-striped"
                                           data-toggle="table"
                                           data-click-to-select="true"
                                           data-pagination="true"
                                           data-show-footer="true"
                                           data-side-pagination="client">
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>






            </div>
            <!-- /# main content -->
        </div>
        <!-- /# container-fluid -->
    </div>
    <!-- /# main -->
</div>
<!-- /# content wrap -->


<script src="../../assets/js/lib/jquery.min.js"></script>
<!-- jquery vendor -->
<script src="../../assets/js/lib/jquery.nanoscroller.min.js"></script>
<!-- nano scroller -->
<script src="../../assets/js/lib/sidebar.js"></script>
<!-- sidebar -->
<script src="../../assets/js/lib/bootstrap.min.js"></script>
<script src="../../assets/bstable/bootstrap-table.js"></script>
<script src="../../assets/bstable/locale/bootstrap-table-zh-CN.js"></script>
<script src="../../assets/datetime/bootstrap-datetimepicker.js" ></script>
<script src="../../assets/datetime/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="../../assets/treeview/bootstrap-treeview.min.js"></script>
<script src="../../assets/jqvalidate/jquery.validate.min.js"></script>
<script src="../../assets/jqvalidate/localization/messages_zh.js"></script>
<script src="../../assets/js/lib/sweetalert/sweetalert.min.js"></script>
<script src="../../assets/bsselect/js/bootstrap-select.min.js"></script>
<script src="../../assets/bsselect/js/i18n/defaults-zh_CN.min.js"></script>


<script src="../../common/common.js"></script>
<!-- bootstrap -->
<script src="customerView.js"></script>
</body>

</html>