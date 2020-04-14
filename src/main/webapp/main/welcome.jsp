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

    <link href="css/recover.css" rel="stylesheet"/>
    <link href="css/theme.css" rel="stylesheet"/>
</head>

<body>
    <div class="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
        <div class="nano">
            <div class="nano-content" id="menuList"></div>

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
    <!-- 主体 start -->
    <div class="content-wrap">
        <div class="main">
            <div class="container-fluid">
                <!-- 具体内容 start -->
                <div class="row">
                    <div class="maj-ele-card type1" style="position: relative;display: none">
                        <div class="" id="map" style="height: 500px;width: 100%;">

                        </div>
                        <div class="maj-map-join" id="mapPost" style="height: 240px; width: 200px">

                        </div>
                    </div>

                </div>
                <!-- 具体内容 end -->
            </div>
        </div>
    </div>
    <!-- 主体 end -->



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
<script src="../assets/lib/lobipanel/js/lobipanel.js"></script>
<script src="../assets/js/scripts.js"></script>
<script src="js/welcome.js"></script>
<script src="js/china.js"></script>
<script src="js/echarts.min.js"></script>
    <!-- role.js -->
</body>


<%--<script>
    $(function () {
        $("#roleaddform").validate();
    });
</script>--%>

</html>