// 全部地址
var __projcet__urls = {
	changePW: 'employee/updatePassword',
	menu: 'menu/search/menu',
	login: 'employee/login',
	track: "menu/insert/menu/track",
	loignDropdown: "code/search/loginDropdown",
	checkToken: 'employee/checkToken',
	otherLogin: 'employee/login/second',
	dropdown: 'code/search/dropdown',
	loginOut: 'employee/exitLogin',
	tree: 'code/search/tree',
	pdf: '/operate/download/operationalManual'
}

var __projcet__urls_customerMain = {
	customerSearch: 'customer/info/search/info',
	customerSearchHistory: 'customer/info/search/history',
	customerSearchAddHistory: 'customer/info/insert/history'
}

var __projcet__urls_customerInfo = {
	'relation': 'customer/info/search/selectCustomerFamilyRelation', //家庭关系
	'contactInfo': 'customer/info/search/selectCustomerContactInfo', //联系方式
	'policyInfo': 'customer/info/search/selectCustomerPolicyInfo', //个单信息
	'tagInfo': 'customer/info/search/selectCustomerTagInfo', //标签
	'groupPolicyInfo': 'customer/info/search/selectGroupPolicyInfo', //团单
	'papersInfo': 'customer/info/search/selectCustomerPapersInfo', //证件信息
	'baseInfo': 'customer/info/search/selectCustomerBaseInfo', //基本信息
	'selectCustomerRiskWarningInfo': 'customer/info/search/selectCustomerRiskWarningInfo', //风险提示
	'selectCustomerAmlInfo': '/customer/info/search/selectCustomerAmlInfo', //反洗钱
	'selectCustomerPointInfo': 'customer/info/search/selectCustomerPointInfo', //积分信息
	'selectComplainInfo': 'customer/info/search/selectComplaintInfo', //投诉
	'selectReVisitInfo': '/customer/info/search/selectReVisitInfo', //回访
	'selectCustomerNoteInfo': '/customer/info/search/selectCustomerNoteInfo', //短信
	'selectCustomerWeChatInfo': '/customer/info/search/selectCustomerWeChatInfo', //微信
	'selectCustomerOffWebInfo': '/customer/info/search/selectCustomerOffWebInfo', //官网
	'ServeLogInfo': 'customer/info/search/selectCustomerServeLogInfo', // 服务记录
	'PointOrderInfo': 'customer/info/search/selectCustomerPointOrderInfo', //网销积分
	'selectCustomerConsultInfo': 'customer/info/search/selectCustomerConsultInfo',
	'selectCustomerSatisfactionInfo': '/customer/info/search/selectCustomerSatisfactionInfo',
	'selectEnjoyedServeInfo': '/customer/info/search/selectEnjoyedServeInfo',
	'selectUnenjoyedServeInfo': '/customer/info/search/selectUnenjoyedServeInfo',
	'selectPolicySendLogInfo': '/customer/info/search/selectPolicySendLogInfo',
	'selectCustomerValidPolicyInfo': '/customer/info/search/selectCustomerValidPolicyInfo', //有效个单
	'selectCustomerInvalidPolicyInfo': '/customer/info/search/selectCustomerInvalidPolicyInfo', //无效个单 
	'selectValidGroupPolicyInfo': '/customer/info/search/selectValidGroupPolicyInfo',
	'selectInvalidGroupPolicyInfo': '/customer/info/search/selectInvalidGroupPolicyInfo',
	'allPolicyBaoquan': '/customer/info/search/allPolicyBaoquan',
	'allPolicylipei': '/customer/info/search/allPolicylipei'
}

var __projcet__urls_customerPolicy = {
	'Policy': 'policy/info/Policy/info', //合同信息
	'PolicyAppnt': 'policy/info/PolicyAppnt/info', //投保人信息
	'PolicyRisk': 'policy/info/PolicyRisk/info', // 险种
	'PolicyInsured': 'policy/info/PolicyInsured/info', //被保人
	'PolicyBenefit': 'policy/info/PolicyBenefit/info', //受益人
	'PolicyRenewal': 'policy/info/PolicyRenewal/info', //缴费信息
	'PolicyDividend': 'policy/info/PolicyDividend/info', //保单红利
	'PolicyEdorMain': 'policy/info/PolicyEdorMain/info', //保全
	'PolicyUnderwriting': 'policy/info/PolicyUnderwriting/info', //核保信息
	'PolicyClaimRegister': 'policy/info/PolicyClaimRegister/info', // 理赔
}

var __projcet__urls_taskPlan = {
	'jobname': 'quartz/search/Jobname', //作业名称
	'runstate': 'quartz/search/runstate', //作业运行状态
	'jobplan': 'quartz/search/jobplan', //作业计划
	'repeatunit': 'quartz/search/repeatunit', //频率
	'jobparam': 'quartz/search/jobparam', //作业参数
	'return': 'quartz/search/return', //作业回现
	'insertJob': 'quartz/insert/job', //新增计划
	'updateJob': 'quartz/update/job', //更新
	'deleteJob': 'quartz/delete/job', //删除
	'stopJob': 'quartz/stop/job', //停止
	'startJob': 'quartz/start/job' //启动
}

var __projcet__urls_manualMerge = {
	'searchCustomer': 'merge/search/customer', //查询
	'Similar': 'merge/search/Similar', //要素
	'merge': 'merge/begin/merge', //归并
}

var __projcet__urls_trackSearch = {
	'mergeInfo': 'merge/select/mergeInfo',
	'trackInfo': 'merge/select/trackInfo'
}

var __projcet__urls_taskLog = {
	'search': 'quartz/runlog/search'
}

var __projcet__urls_manualSplit = {
	'customer': 'split/select/customer',
	'detial': 'split/select/detial',
	'split': 'split/begin/split'
}

var __projcet__urls_User = {
	'user': 'user/authority/search/user',
	'insert': 'user/authority/insert/user', //添加用户
	'returnUser': 'user/authority/returnUser/user', //当个用户信息
	'update': 'user/authority/update/user',
	'refreshpw': 'user/authority/refresh/passWord',
	'delete': '/user/authority/delete/user'
}

var __projcet__urls_Authority = {
	'position': 'user/authority/insert/position', //添加岗位
	'insertauth': 'user/authority/insert/authorities', //配置权限
	'searchauth': 'user/authority/search/authorities'
}

var __projcet__urls_customerScreen = {
	'customer': 'screen/search/customer',
	'applyRecord': 'screen/search/applyRecord',
	'applyDetail': 'screen/search/applyDetail',
	'readOnline': 'screen/search/readOnline',
	'download': 'screen/search/download'
}

var __projcet__urls_reportApproval = {
	'appRecord': 'screen/search/appRecord',
	'approval': 'screen/search/approval'
}

var __projcet__urls_tagManagement = {
	'insert': 'tag/management/insert/tag',
	'return': 'tag/management/return/tag',
	'update': 'tag/management/update/tag',
	'select': 'tag/management/select/tag',
	'selectByType': 'tag/management/selectByType/tag',
	'customerTag': 'tag/management/insert/customerTag',
	'delete': 'tag/management/delete/tag'
}

var __projcet__urls_customerIntegral = {
	'cusPoint': 'point/search/cusPoint',
	'cusPointDetail': '/point/search/cusPointDetail',
	'cusPointLockFlag': 'point/update/cusPointLockFlag', //
	'downloadMB': 'point/upload/downloadMB', //下载
	'customerLock': 'point/upload/customerLock', //文件上传
	'uploadErrorResult': 'point/search/uploadErrorResult', // 导入结果
	'downloadErrorResult': 'point/upload/downloadErrorResult',
	'searchPointSearch': 'point/history/searchPointSearch',
	'insertPointSearch': 'point/history/insertPointSearch'
}

var __projcet__urls_integralManagement = {
	'insertPointManage': 'point/history/insertPointManage',
	'searchPointManage': 'point/history/searchPointManage'
}

var __projcet__urls_serviceRecord = {
	'templateDownload': 'service/record/templateDownload', //模板下载
	'import': 'service/record/import',
	'selectActivity': 'service/record/selectActivity',
	'activiDownLoad': 'service/record/activiDownLoad'
}

var __projcet__urls_uploadResult = {
	'downloadErrorResult': 'point/upload/downloadErrorResult'
}

var __projcet__urls_errorData = {
	'illegalInfo': 'illegal/search/illegalInfo'
}

var __projcet__urls_taskTarget = {
	'selectHandJobRunLog': 'handDealTask/selectHandJobRunLog',
	'dealByViewValueTag': 'handDealTask/dealByViewValueTag',
	'dealByCrmCustomerno': 'handDealTask/dealByCrmCustomerno',
	'dealByLisCustomerno': 'handDealTask/dealByLisCustomerno',
	'dealByDate': 'handDealTask/dealByDate',
	'dealAllCustomer': 'handDealTask/dealAllCustomer'
}

var __projcet__urls_welcome = {
	'value': '/service/home/value',
	'pdf': '/operate/download/operationalManual'
}

var __projcet__urls_suspectData = {
	'selectSuspectCustomer': 'report/suspect/selectSuspectCustomer',
	'downloadSuspectCustomerReport': 'report/suspect/downloadSuspectCustomerReport'
}

var __projcet__urls_Regiment = {
	'GroupPolicyClaimRegister': '/policy/info/GroupPolicyClaimRegister/info'
}

var __projcet__urls_Similar = {
	'selectSameCustomer': '/report/suspect/selectSameCustomer',
	'downloadSameCustomerReport': '/report/suspect/downloadSameCustomerReport'
}


var __projcet__urls_TagSystem = {
	'systemTag': '/tag/management/select/systemTag',
	'tagSort': '/tag/management/select/tagSort'
}


var __projcet__urls_integralTime = {
	'exportDatePointDetail': '/point/search/exportDatePointDetail',
	'datePointDetail': '/point/search/datePointDetail'
}

var __projcet__urls_refs = {
	customerMain: __projcet__urls_customerMain,
	customerInfo: __projcet__urls_customerInfo,
	customerPolicy: __projcet__urls_customerPolicy,
	taskPlan: __projcet__urls_taskPlan,
	manualMerge: __projcet__urls_manualMerge,
	trackSearch: __projcet__urls_trackSearch,
	manualSplit: __projcet__urls_manualSplit,
	taskLog: __projcet__urls_taskLog,
	user: __projcet__urls_User,
	authority: __projcet__urls_Authority,
	customerScreen: __projcet__urls_customerScreen,
	reportApproval: __projcet__urls_reportApproval,
	tagManagement: __projcet__urls_tagManagement,
	customerIntegral: __projcet__urls_customerIntegral,
	serviceRecord: __projcet__urls_serviceRecord,
	uploadResult: __projcet__urls_uploadResult,
	integralManagement: __projcet__urls_integralManagement,
	errorData: __projcet__urls_errorData,
	taskTarget: __projcet__urls_taskTarget,
	welcome: __projcet__urls_welcome,
	suspectData: __projcet__urls_suspectData,
	customerRegiment: __projcet__urls_Regiment,
	similar: __projcet__urls_Similar,
	TagSystem: __projcet__urls_TagSystem,
	integralTime: __projcet__urls_integralTime
}