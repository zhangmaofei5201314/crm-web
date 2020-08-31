<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>

<head>
    <title>客户信息</title>
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
        .zmf-modal-content{


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
                <img id="logoImg" src="../../logo/logo.png" data-logo_big="../logo/logo.png" data-logo_small="../logo/logoSmall.png" alt="Nixon" />
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
                            <h1>360客户信息</h1>
                        </div>
                    </div>
                </div>
                <!-- /# column -->
                <div class="col-lg-4 p-0">
                    <div class="page-header">
                        <div class="page-title">
                            <ol class="breadcrumb text-right">
                                <li class="active">客户信息</li>
                                <li><a href="#">360客户信息</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <!-- /# column -->
            </div>
            <!-- /# row -->
            <div class="main-content">

                <div class="row">
                    <%--<form>--%>
                        <div class="form-group" style="">
                            <div class="input-group input-group-rounded" style="width: 40%; margin: 5% 30% 0%">
                                    <input type="text" placeholder="客户号/证件号/手机号" name="searchParam" id="searchParam" class="form-control" >
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary btn-group-right" id="infoSearch">
                                            <i class="ti-search"></i>
                                        </button>
                                    </span>
                            </div>

                        </div>
                        <div class="row" style="width: 40%; margin: 0% 30% 0%">
                            <div class="text-muted m-b-15 f-s-15" id="historyName">
                                <%--<a><span class="f-s-13">123451123451123451</span></a>
                                <a><span class="f-s-13">123452123452123452</span></a>
                                <a><span class="f-s-13">123453123453123453</span></a>
                                <a><span class="f-s-13">123454123454123454</span></a>
                                <a><span class="f-s-13">123455123455123455</span></a>
                                <a><span class="f-s-13">123456123456123456</span></a>
                                <a><span class="f-s-13">123457123457123457</span></a>
                                <a><span class="f-s-13">123458123458123458</span></a>
                                <a><span class="f-s-13">123459123459123459</span></a>
                                <a><span class="f-s-13">123450123450123450</span></a>--%>
                            </div>
                        </div>
                    <%--</form>--%>
                </div>
                <div class="row">


                    <div class="col-lg-12">
                        <div class="card alert">
                            <div class="card-header">
                                <h4>查询结果</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table id="customerinfotable"
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


                <!-- /# row -->







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
<script src="customerinfosearch.js"></script>
</body>

</html>