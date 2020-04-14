
$(function() {
    initMenu();
    dataForMap();
})
//赋值
function dataForMap() {
    $('.type,.type3no,.type1').show();
    var data = {"occupation":[{"managecom":"86","managecomName":"","sum":"227790","sex":"","age":"","degree":"","riskType":"","occupationCode":"个体从业人员","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"56834","sex":"","age":"","degree":"","riskType":"","occupationCode":"企业高管","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"250455","sex":"","age":"","degree":"","riskType":"","occupationCode":"其他","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"783","sex":"","age":"","degree":"","riskType":"","occupationCode":"军人","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"182996","sex":"","age":"","degree":"","riskType":"","occupationCode":"农民","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"22515","sex":"","age":"","degree":"","riskType":"","occupationCode":"工人","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"399510","sex":"","age":"","degree":"","riskType":"","occupationCode":"技术人员","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"104305","sex":"","age":"","degree":"","riskType":"","occupationCode":"政企工作人员","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null}],"flag":"86","sex":[{"managecom":"86","managecomName":"","sum":"604541","sex":"女","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"710044","sex":"男","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}],"degree":[{"managecom":"86","managecomName":"","sum":"637912","sex":"","age":"","degree":"中专及以下","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"214556","sex":"","age":"","degree":"大专及本科","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"453747","sex":"","age":"","degree":"未填写","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"8380","sex":"","age":"","degree":"硕士及博士","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}],"sum":[{"managecom":"8601","managecomName":"北京","sum":"38757","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"153785","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8602","managecomName":"山东","sum":"247339","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"409271","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8603","managecomName":"四川","sum":"128140","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"242197","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8605","managecomName":"湖北","sum":"163367","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"313507","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8606","managecomName":"青岛","sum":"53631","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"87639","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8607","managecomName":"河南","sum":"206096","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"429480","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8608","managecomName":"河北","sum":"233386","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"385279","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8609","managecomName":"江苏","sum":"86740","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"200183","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8610","managecomName":"天津","sum":"35948","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"59885","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8611","managecomName":"广东","sum":"28246","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"70181","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8612","managecomName":"湖南","sum":"45218","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"65102","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8613","managecomName":"安徽","sum":"48618","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"96945","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}],"countSumPolicy":"866530","countSumValid":"1314595","tbSum":[{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"931664","month":"201707","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"944229","month":"201708","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"964035","month":"201709","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"964666","month":"201710","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"969967","month":"201711","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"978700","month":"201712","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"989523","month":"201801","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"988246","month":"201802","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"991228","month":"201803","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"994010","month":"201804","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1019320","month":"201805","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1043996","month":"201806","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1053925","month":"201807","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1062123","month":"201808","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1085762","month":"201809","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1092162","month":"201810","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1106530","month":"201811","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1115167","month":"201812","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1151797","month":"201901","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1154652","month":"201902","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1174785","month":"201903","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1188460","month":"201904","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1196302","month":"201905","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1211235","month":"201906","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null}],"validSecuritySum":"309926","countSum":"2493778","addCountValidSumList":[{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"201912","validSecuritySum":"","addCountSum":12972,"addValidSum":5058,"addSameCountSum":14.84,"addSameValidSum":16.1,"valueType":""}],"risk":[{"managecom":"86","managecomName":"","sum":"266901","sex":"","age":"","degree":"","riskType":"万能寿险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"755986","sex":"","age":"","degree":"","riskType":"传统寿险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"930928","sex":"","age":"","degree":"","riskType":"健康险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"395097","sex":"","age":"","degree":"","riskType":"分红寿险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"341771","sex":"","age":"","degree":"","riskType":"意外险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}],"age":[{"managecom":"86","managecomName":"","sum":"284005","sex":"","age":"18岁以下","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},		  {"managecom":"86","managecomName":"","sum":"62642","sex":"","age":"19-25岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"264768","sex":"","age":"26-35岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"300658","sex":"","age":"36-45岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"274126","sex":"","age":"46-55岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"66367","sex":"","age":"56-60岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"62020","sex":"","age":"60以上","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}]};
    var chartmap = initMap(data.sum);
    var mapPost = initMapPost(data.sum);
    $(window).on('resize', function() {//页面宽度发生变化时，触发
        chartmap.resize()
    });

}

//初始化大地图
function initMap(data) {
    var chartslist = data.extract(function(item) {
        return {
            name: item.managecomName,
            value: +item.sum,
            itemStyle: {
                areaColor: '#c21115',
                borderColor: '#FFF'
            },
            tooltip: {
                formatter: function(params) {
                    return params.name + '<br>' + '累计客户' + ': ' + Tformat(item.countSum) + '<br>' + '有效客户' + ': ' + Tformat(params.value)
                }
            }
        }
    })
    // console.log(chartslist);
    var thischart = echarts.init(document.getElementById('map'));
    echarts.registerMap('CN', CN);
    var option = {
        title: {
            show: true,
            text: '客户机构分布(单位:人)',
            textVerticalAlign: 'top',
            x: 'center',
            y: 'top',
            top: 15,
            textStyle: {
                color: '#1f1f1f',
                fontSize: 22,
                fontFamily: 'lantinghei',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function(params) {
                var value = (params.value + '').split('.');
                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                return params.name + ': ' + (value === 'NaN' ? '暂无数据' : value);
            },
            left: 'left'
        },
        series: [{
            name: '省份数据',
            type: 'map',
            roam: false,
            map: 'CN',
            aspectScale: 1,
            itemStyle: {
                borderColor: '#FFF',
                color: 'f2f2f2',
                borderWidth: 2,
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            data: chartslist
        }]
    };
    thischart.setOption(option)
    return thischart
}
//地图边上的那几行字
function initMapPost (data) {

    var chartslist = data.reverse().reduce(function(old, item, i) {
        old.legend.push(item.managecomName)
        old.value.push(+item.sum)
        old.data.push({
            value: item.sum,
            name: item.managecomName
        })
        old.data1.push(Tformat(item.sum))
        return old
    }, {
        legend: [],
        data: [],
        value: [],
        data1: []
    })

    var maxdata = Math.max.apply(null, chartslist.value)

    var datamax = chartslist.value.extract(function() {
        return {
            value: maxdata
        }
    })
    var thischart = echarts.init(document.getElementById('mapPost'))
    var option = {
        title: {
            show: true,
            text: '有效客户数量(单位:人)',
            textVerticalAlign: 'top',
            x: 'left',
            y: 'top',
            top: 0,
            textStyle: {
                color: '#1f1f1f',
                fontSize: 14,
                fontFamily: 'lantinghei',
                fontWeight: 'bold'
            }
        },
        grid: {
            left: '20%',
            right: '35%',
            top: 20,
            bottom: 0
        },
        xAxis: [{
            type: 'value',
            boundaryGap: false,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            }
        }],
        yAxis: [{
            type: 'category',
            data: chartslist.legend,
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: true,
                interval: 0,
                fontSize: 13
            }
        }, {
            position: 'right',
            data: chartslist.data1,
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: true,
                interval: 0,
                fontSize: 13
            }
        }],
        series: [{
            type: 'bar',
            legendHoverLink: false,
            itemStyle: {
                normal: {
                    color: '#e2f0ff',
                    barBorderRadius: 7
                },
                emphasis: {
                    color: '#e2f0ff',
                    barBorderRadius: 7
                }
            },
            barGap: '-100%',
            barWidth: 9,
            barCategoryGap: '40%',
            data: datamax,
            animation: false,
            z: 1
        }, {
            name: '',
            type: 'bar',
            barWidth: 9,
            itemStyle: {
                emphasis: {
                    color: '#c21115',
                    barBorderRadius: 7
                },
                normal: {
                    color: '#c21115',
                    barBorderRadius: 7
                }
            },

            data: chartslist.data,
            z: 3
        }]
    }

    thischart.setOption(option)
    return thischart
}

function Tformat(num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
}

/**
 * Array.prototype 属性表示 Array 构造函数的原型，并允许您向所有Array对象添加新的属性和方法
 * @param cb
 * @returns {Array}
 */
Array.prototype.extract = function(cb) {
    var i = 0,
        len = this.length,
        _ary = []
    for (; i < len; i++) {
        _ary.push(cb(this[i], i, this))
    }
    return _ary
}
