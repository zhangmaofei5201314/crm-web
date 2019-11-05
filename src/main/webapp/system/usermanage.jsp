<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>

<head>
    <title>cms</title>
    <link href="../assets/fontAwesome/css/fontawesome-all.min.css" rel="stylesheet">
    <link href="../assets/css/lib/themify-icons.css" rel="stylesheet">
    <link href="../assets/css/lib/bootstrap.min.css" rel="stylesheet">
    <link href="../assets/css/lib/nixon.css" rel="stylesheet">
    <link href="../assets/lib/lobipanel/css/lobipanel.min.css" rel="stylesh1eet">
    <link href="../assets/css/lib/sidebar.css" rel="stylesheet">
    <link href="../assets/css/style.css" rel="stylesheet">
    <link href="../assets/bstable/bootstrap-table.css" rel="stylesheet"/>
    <link href="../assets/datetime/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="../assets/treeview/bootstrap-treeview.min.css" rel="stylesheet">
    <link href="../assets/css/lib/sweetalert/sweetalert.css" rel="stylesheet"/>
    <link href="../assets/bsselect/css/bootstrap-select.min.css" rel="stylesheet"/>
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
                <img id="logoImg" src="../logo/logo.png" data-logo_big="../logo/logo.png" data-logo_small="../logo/logoSmall.png" alt="Nixon" />
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
                            <h1>用户管理</h1>
                        </div>
                    </div>
                </div>
                <!-- /# column -->
                <div class="col-lg-4 p-0">
                    <div class="page-header">
                        <div class="page-title">
                            <ol class="breadcrumb text-right">
                                <li class="active">系统管理</li>
                                <li><a href="#">用户管理</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <!-- /# column -->
            </div>
            <!-- /# row -->
            <div class="main-content">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card alert">
                            <div class="card-header">
                                <h4>查询用户</h4>
                            </div>
                            <div class="card-body">
                                <div class="horizontal-form-elements">
                                    <form class="form-horizontal">
                                        <div class="row">
                                                    <div class="col-md-6 col-md-offset-2">
                                                        <input id="usercode" type="text" placeholder="用户ID/手机号/邮箱/姓名" class="form-control">
                                                    </div>
                                                        <input id="queryuser" type="button" value="搜 索"
                                                               class="btn btn-primary m-b-10 m-l-5"></input>
                                                        <input id="adduser" type="button" value="增加新用户"
                                                               class="btn btn-primary m-b-10 m-l-5" data-toggle="modal"
                                                               data-target="#userform"></input>
                                        </div>
                                    </form><!--/#form-->
                                </div>
                            </div>
                        </div><!-- /# card -->
                    </div><!-- /# column -->

                </div>
                <!-- /# form end row -->
                <!-- /# table row begin -->
                <div class="row">


                    <div class="col-lg-12">
                        <div class="card alert">
                            <div class="card-header">
                                <h4>查询结果</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table id="usertable"
                                           class="table  table-bordered table-striped"
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
                    </div><!-- /# card -->

                </div>
                <!-- /# row -->
                <div class="row">
                    <!-- 增加用户表单（Modal） -->
                    <div class="modal fade" id="userform" tabindex="1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog" style="width:500px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times  关闭
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        增加用户
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <div class="horizontal-form-elements">
                                        <form class="form-horizontal" id = "useraddform" role="form">
                                            <div class="row">
                                                <div class="col-md-10 ">
                                                    <div class="form-group ">
                                                        <label class="col-sm-4 control-label">用户ID</label>
                                                        <div class="col-sm-7">
                                                            <input id="newusercode" name="newusercode" type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10 ">
                                                    <div class="form-group ">
                                                        <label class="col-sm-4 control-label">密码</label>
                                                        <div class="col-sm-7">
                                                            <input id="newpassword" name="newpassword" type="password" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">姓名</label>
                                                        <div class="col-sm-7">
                                                            <input id="newusername" name="newusername" type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">手机</label>
                                                        <div class="col-sm-7">
                                                            <input id="newmobile" name="newmobile" type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">用户邮箱</label>
                                                        <div class="col-sm-7">
                                                            <input id="newemail" name="newemail" type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">用户角色</label>
                                                        <div class="col-sm-7">
                                                            <select id="roleselect" class="selectpicker " data-style="form-control" multiple>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                            </div>
                                        </form>
                                        <!--/#form-->
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <input type="button" value="保存" id="saveuser"  class="btn btn-primary"></input>
                                    <input type="button" value="关闭" class="btn btn-default" data-dismiss="modal"></input>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>
                </div>
                <!-- /# row -->
                <div class="row">
                    <!-- 用户详情（Modal） -->
                    <div class="modal fade" id="userformdetail" tabindex="1" role="dialog" aria-labelledby="myModalLabeldetail" aria-hidden="true">
                        <div class="modal-dialog" style="width:500px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times  关闭
                                    </button>
                                    <h4 class="modal-title" id="myModalLabeldetail">
                                        用户详情
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <div class="horizontal-form-elements">
                                        <form class="form-horizontal" id = "userdetail" role="form">
                                            <div class="row">
                                                <div class="col-md-10 ">
                                                    <div class="form-group ">
                                                        <label class="col-sm-4 control-label">用户ID</label>
                                                        <div class="col-sm-7">
                                                            <input id="usercodedetail" name="usercodedetail" readonly="true" type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">姓名</label>
                                                        <div class="col-sm-7">
                                                            <input id="usernamedetail" name="usernamedetail" readonly="true" type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">手机</label>
                                                        <div class="col-sm-7">
                                                            <input id="mobiledetail" name="mobiledetail" readonly="true" type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">邮箱</label>
                                                        <div class="col-sm-7">
                                                            <input id="emaildetail" name="emaildetail" readonly="true" type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">角色</label>
                                                        <div class="col-sm-7">
                                                            <select id="roleselectdetail" class="selectpicker" data-style="form-control" multiple>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                            </div>
                                        </form>
                                        <!--/#form-->
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                    </button>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>

                </div>
                <!-- /# row -->

                <!-- /# 修改用户row -->
                <div class="row">
                    <!-- 用户详情（Modal） -->
                    <div class="modal fade" id="userformedit" tabindex="1" role="dialog" aria-labelledby="myModalLabeledit" aria-hidden="true">
                        <div class="modal-dialog" style="width:500px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times  关闭
                                    </button>
                                    <h4 class="modal-title" id="myModalLabeledit">
                                        用户编辑
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <div class="horizontal-form-elements">
                                        <form class="form-horizontal" id = "useredit" role="form">
                                            <div class="row">
                                                <div class="col-md-10 ">
                                                    <div class="form-group ">
                                                        <label class="col-sm-4 control-label">用户ID</label>
                                                        <div class="col-sm-7">
                                                            <input id="usercodeedit" name="usercodeedit" readonly="true" type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">姓名</label>
                                                        <div class="col-sm-7">
                                                            <input id="usernameedit" name="usernameedit"  type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">手机</label>
                                                        <div class="col-sm-7">
                                                            <input id="mobileedit" name="mobiledetail"  type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">邮箱</label>
                                                        <div class="col-sm-7">
                                                            <input id="emailedit" name="emailedit"  type="text" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="col-sm-4 control-label">角色</label>
                                                        <div class="col-sm-7">
                                                            <select id="roleselectedit" class="selectpicker " data-style="form-control" multiple>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                            </div>
                                        </form>
                                        <!--/#form-->
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <input type="button" value="保存" id="saveuseredit"  class="btn btn-primary"></input>
                                    <input type="button" value="关闭" class="btn btn-default" data-dismiss="modal"></input>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>

                </div>
                <!-- /# row -->

                <!-- /# 修改用户row -->
                <div class="row">
                    <!-- 用户详情（Modal） -->
                    <div class="modal fade" id="pwdformedit" tabindex="1" role="dialog" aria-labelledby="myModalLabelpassword" aria-hidden="true">
                        <div class="modal-dialog" style="width:500px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times  关闭
                                    </button>
                                    <h4 class="modal-title" id="myModalLabelpassword">
                                         设置密码
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <div class="horizontal-form-elements">
                                        <form class="form-horizontal" id = "pwdedit" role="form">
                                            <div class="row">
                                                <div class="col-md-10 ">
                                                    <div class="form-group ">
                                                        <label class="col-sm-4 control-label">新密码</label>
                                                        <div class="col-sm-7">
                                                            <input id="userpasswordedit" type="hidden" class="form-control" >
                                                            <input id="passwordedit" name="passwordedit" type="password" class="form-control" >
                                                        </div>
                                                    </div>
                                                    <div class="form-group ">
                                                        <label class="col-sm-4 control-label">再次输入密码</label>
                                                        <div class="col-sm-7">
                                                            <input id="passwordeditagain" name="passwordeditagain" type="password" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div><!-- /# column -->
                                            </div>
                                        </form>
                                        <!--/#form-->
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <input type="button" value="保存" id="savepassword"  class="btn btn-primary"></input>
                                    <input type="button" value="关闭" class="btn btn-default" data-dismiss="modal"></input>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
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


<script src="../assets/js/lib/jquery.min.js"></script>
<!-- jquery vendor -->
<script src="../assets/js/lib/jquery.nanoscroller.min.js"></script>
<!-- nano scroller -->
<script src="../assets/js/lib/sidebar.js"></script>
<!-- sidebar -->
<script src="../assets/js/lib/bootstrap.min.js"></script>
<script src="../assets/bstable/bootstrap-table.js"></script>
<script src="../assets/bstable/locale/bootstrap-table-zh-CN.js"></script>
<script src="../assets/datetime/bootstrap-datetimepicker.js" ></script>
<script src="../assets/datetime/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="../assets/treeview/bootstrap-treeview.min.js"></script>
<script src="../assets/jqvalidate/jquery.validate.min.js"></script>
<script src="../assets/jqvalidate/localization/messages_zh.js"></script>
<script src="../assets/js/lib/sweetalert/sweetalert.min.js"></script>
<script src="../assets/bsselect/js/bootstrap-select.min.js"></script>
<script src="../assets/bsselect/js/i18n/defaults-zh_CN.min.js"></script>
<script src="../common/common.js"></script>
<!-- bootstrap -->
<script src="usermanage.js"></script>
<script src="../assets/lib/lobipanel/js/lobipanel.js"></script>
<script src="../assets/js/scripts.js"></script>
</body>

</html>