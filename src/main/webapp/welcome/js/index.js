function isIE() {
	if (window.navigator.userAgent.indexOf("MSIE") >= 1)
		return true;
	else
		return false;
}

function Tformat(num) {
	var reg = /\d{1,3}(?=(\d{3})+$)/g;
	return (num + '').replace(reg, '$&,');
}
var this_pages = {
	scope: {
		risk: 'risk',
		age: 'age'
	},
	$id: function(id) {
		return document.getElementById(id)
	},
	getData: function() {
		//return api.path('welcome.value')({})		
	},
	age: function(data) {
		var xlist = data.extract(function(item) {
			return item.age
		})
		var chartslist = data.extract(function(item) {
			return item.sum
		})

		var thischart = echarts.init(document.getElementById('age'))
		var option = {
			grid: {
				left: '13%',
			},
			title: {
				show: true,
				text: '客户年龄分布(单位:人)',
				textVerticalAlign: 'top',
				x: 'center',
				y: 'top',
				textStyle: {
					color: '#1f1f1f',
					fontSize: 15,
					fontFamily: 'lantinghei',
					fontWeight: 'normal'
				}
			},
			xAxis: {
				type: 'category',
				data: xlist,
				axisTick: {
					alignWithLabel: true,

				},
				axisLabel: {
					interval: 0
				},
				axisLine: {
					lineStyle: {
						color: '#a3abb4'
					}
				}
			},
			yAxis: {
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#a3abb4'
					}
				},
				splitLine: {
					lineStyle: {
						color: '#f3f6fa',
						width: 2
					}
				},
				z: 10
			},
			tooltip: {
				trigger: 'item',
				showDelay: 0,
				transitionDuration: 0.2,
				formatter: function(params) {
					var value = (params.value + '').split('.');
					value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
					return params.name + ': ' + (value === 'NaN' ? '暂无数据' : value);
				}
			},
			series: [{
				data: chartslist,
				type: 'bar',
				barWidth: '25%',
				label: {
					normal: {
						show: false,
						position: 'top'
					}
				},
				itemStyle: {
					barBorderRadius: [50, 50, 0, 0],
					color: isIE() ? '#60c4ff' : new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
						offset: 0,
						color: "#438bf5" // 0% 处的颜色
					}, {
						offset: 1,
						color: "#60c4ff" // 100% 处的颜色
					}], false)
				}
			}]
		}
		thischart.setOption(option)
		return thischart
	},
	sex: function(data, type) {
		if (typeof data === 'array') {
			return
		}

		data.loop(function(item) {
			$('[data-value=' + item.sex + ']').text(item.sum)
		})

		var chartslist = data.reduce(function(old, item) {
			old.legend.push(item.sex)
			old.data.push({
				value: item.sum,
				name: item.sex,
				itemStyle: {
					color: item.sex === '男' ? '#4da1ff' : '#ff7b8c'
				}
			})
			return old
		}, {
			legend: [],
			data: []
		})

		var thischart = echarts.init(document.getElementById(type ? 'sex1' : 'sex'))
		var option = {
			title: {
				show: true,
				text: '客户性别分布',
				textVerticalAlign: 'top',
				x: 'center',
				y: 'top',
				textStyle: {
					color: '#1f1f1f',
					fontSize: 15,
					fontFamily: 'lantinghei',
					fontWeight: 'normal'
				}
			},
			legend: {
				orient: 'vertical',
				icon: "circle",
				right: 0,
				bottom: 0,
				data: chartslist.legend,
				itemWidth: 10,
				itemHeight: 10,
				selectedMode: false
			},
			tooltip: {
				show: false,
				trigger: 'item',
				formatter: "{b} : {c} ({d}%)",

			},

			series: [{
				name: '男女比例',
				type: 'pie',
				radius: ['35%', '66%'],
				label: {
					normal: {
						show: true,
						formatter: '{a|{b}\n {d}%}',
						fontSize: 15,
						rich: {
							a: {
								lineHeight: 15,
								align: 'center',
								fontSize: 15
							}
						}
					},
					emphasis: {
						show: true,
						formatter: '{a|{b}\n {d}%}',
						fontSize: 15,
						rich: {
							a: {
								lineHeight: 15,
								align: 'center',
								fontSize: 15
							}
						}
					}
				},
				data: chartslist.data
			}, {
				name: '男女比例',
				type: 'pie',
				radius: ['35%', '66%'],
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						position: 'center',
						formatter: '{d}%',
						textStyle: {
							fontSize: '20',
							fontWeight: 'bold'
						}
					}
				},
				data: chartslist.data
			}]
		};
		thischart.setOption(option)
		return thischart
	},
	risk: function(data, type) {

		var colors = ['#ff7b8c', '#4da1ff', '#b7aefb', '#83d587', '#ffd75d']
		var chartslist = data.reduce(function(old, item, i) {
			old.legend.push(item.riskType)
			old.value.push(+item.sum)
			old.data.push({
				value: item.sum,
				name: item.riskType,
				itemStyle: {
					color: colors[i]
				},
				tooltip: {
					trigger: 'item',
					showDelay: 0,
					transitionDuration: 0.2,
					formatter: function(params) {
						var value = (params.value + '').split('.');
						value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
						return params.name + ': ' + (value === 'NaN' ? '暂无数据' : value);
					}
				}
			})
			return old
		}, {
			legend: [],
			data: [],
			value: []
		})

		var maxdata = Math.max.apply(null, chartslist.value)

		var datamax = chartslist.value.extract(function() {
			return maxdata
		})

		var thischart = echarts.init(document.getElementById(type ? 'risk1' : 'risk'))
		var option = {
			title: {
				show: true,
				text: '购买险种分布(单位:人)',
				textVerticalAlign: 'top',
				x: 'center',
				y: 'top',
				textStyle: {
					color: '#1f1f1f',
					fontSize: 15,
					fontFamily: 'lantinghei',
					fontWeight: 'normal'
				}
			},
			legend: {
				orient: 'vertical',
				icon: "circle",
				x: 'left',
				bottom: 0,
				data: chartslist.legend,
				itemWidth: 20,
				itemHeight: 20
			},
			xAxis: [{
				type: 'value',
				boundaryGap: false,
				splitLine: {
					show: false
				},
				max: maxdata
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
					show: false,
					inside: true
				}
			}],
			tooltip: {
				trigger: 'item'
			},
			series: [{ // For shadow
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
				barWidth: 13,
				barCategoryGap: '40%',
				data: datamax,
				animation: false,
				z: 1,
				tooltip: {
					show: false
				}
			}, {
				name: '险种比例',
				type: 'bar',
				barWidth: 13,
				itemStyle: {
					emphasis: {
						barBorderRadius: 7
					},
					normal: {
						barBorderRadius: 7
					}
				},
				data: chartslist.data,
				z: 3,
				label: {
					show: true,
					position: [10, -20],
					formatter: '{b}'
				}
			}]
		};

		thischart.setOption(option)
		return thischart
	},
	occupation: function(data) {

		var chartslist = data.reduce(function(old, item) {
			old.legend.push(item.occupationCode)
			old.data.push({
				value: item.sum,
				name: item.occupationCode
			})
			return old
		}, {
			legend: [],
			data: []
		})
		var thischart = echarts.init(document.getElementById('occupation'))

		var option = {
			title: {
				show: true,
				text: '职业分布(单位:人)',
				textStyle: {
					color: '#a40001'
				}

			},
			tooltip: {
				trigger: 'item',
				formatter: "{b}: {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				top: 40,
				data: chartslist.legend
			},
			series: [{
				name: '职业比例',
				type: 'pie',
				radius: ['50%', '70%'],
				avoidLabelOverlap: true,
				minAngle: '5',
				label: {
					normal: {
						show: true,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '30',
							fontWeight: 'bold'
						}
					}
				},
				label: {
					normal: {
						formatter: '{b}  {d}% ',
						rich: {

						}
					}
				},
				labelLine: {
					normal: {
						show: true,
						length: 30,
						length2: 50
					}
				},
				data: chartslist.data
			}]
		};
		thischart.setOption(option)
		return thischart
	},
	degree: function(data, type) {
		var colors = ['#ff7b8c', '#4da1ff', '#ffcd30', '#b7aefb']
		var chartslist = data.reduce(function(old, item, i) {
			old.legend.push(item.degree)
			old.data.push({
				value: item.sum,
				name: item.degree,
				itemStyle: {
					color: colors[i]
				},
				label: {
					normal: {
						show: true,
						formatter: '{a|{b}\n{d}%}',
						rich: {
							a: {
								lineHeight: 15,
								align: 'center',
								fontSize: 15
							}
						}
					},
					emphasis: {
						show: true,
						formatter: '{a|{b}\n{d}%}',
						rich: {
							a: {
								lineHeight: 15,
								align: 'center',
								fontSize: 15
							}
						}
					}
				},
				labelLine: {
					normal: {
						smooth: 0.2,
						length: 5,
						length2: 10
					}
				}
			})
			old.data1.push({
				value: item.sum,
				name: item.degree,
				itemStyle: {
					color: colors[i]
				},
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						formatter: '{a|{d}%}',
						textStyle: {
							color: isIE() ? colors[i] : '#FFF',
							fontSize: isIE() ? '20' : '15',
							fontWeight: 'bold'
						},
						backgroundColor: colors[i],
						borderRadius: 50,
						width: 70,
						height: 70,
						rich: {
							a: {
								lineHeight: 75,
								borderRadius: 50,
								fontSize: 15
							}
						}
					}
				}
			})
			return old
		}, {
			legend: [],
			data: [],
			data1: []
		})
		var thischart = echarts.init(document.getElementById(type ? 'degree1' : 'degree'))

		var option = {
			color: ['#ff7b8c', '#4da1ff', '#ffcd30', '#b7aefb'],
			title: {
				show: true,
				text: '客户学历分布',
				textVerticalAlign: 'top',
				x: 'center',
				y: 'top',
				textStyle: {
					color: '#1f1f1f',
					fontSize: 15,
					fontFamily: 'lantinghei',
					fontWeight: 'normal'
				}

			},
			tooltip: {
				show: false,
				trigger: 'item',
				formatter: "{b}: {c} ({d}%)"
			},
			legend: {
				orient: 'horizontal',
				icon: "emptyCircle",
				x: 'left',
				bottom: 0,
				data: chartslist.legend,
				itemWidth: 14,
				itemHeight: 14,
				selectedMode: false
			},
			series: [{
				name: '学历比例',
				type: 'pie',
				radius: ['50%', '60%'],
				avoidLabelOverlap: true,
				minAngle: '5',
				data: chartslist.data
			}, {
				name: '学历比例',
				type: 'pie',
				radius: ['50%', '60%'],
				avoidLabelOverlap: true,
				minAngle: '5',
				data: chartslist.data1
			}]
		};
		thischart.setOption(option)
		return thischart
	},
	chartmap: function(data) {

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
		var thischart = echarts.init(document.getElementById('map'))
		echarts.registerMap('CN', CN)
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
	},
	line: function(data) {
		var thischart = echarts.init(document.getElementById('line'))

		var chartdata = data.reduce(function(old, item) {
			old.xAxisData.push(item.managecomName)
			old.data.push({
				value: item.sum,
				name: item.managecomName
			})
			old.data1.push({
				value: item.countSum || 0,
				name: item.managecomName
			})
			return old
		}, {
			xAxisData: [],
			data: [],
			data1: []
		})

		var option = {
			title: {
				show: true,
				text: '客户机构分布(单位:人)',
				textVerticalAlign: 'top',
				x: 'center',
				y: 'top',
				textStyle: {
					color: '#1f1f1f',
					fontSize: 15,
					fontFamily: 'lantinghei',
					fontWeight: 'normal'
				}
			},
			legend: {
				data: [{
					name: '累计客户数'
				}, {
					name: '有效客户数'
				}],
				bottom: 0,
				selectedMode: false
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisLine: {
					lineStyle: {
						color: '#ccc'
					}
				},
				data: chartdata.xAxisData
			},
			yAxis: {
				type: 'value',
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#f0f0f0',
						width: 1
					}
				}
			},
			tooltip: {
				show: true,
				trigger: 'axis',
				backgroundColor: '#FFF',
				textStyle: {
					color: '#534f71',
				},
				extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
				axisPointer: {
					type: 'line',
					axis: 'x',
					label: {
						backgroundColor: '#6a7985'
					},
					lineStyle: {
						color: '#ddd'
					}
				}
			},
			series: [{
				name: '累计客户数',
				data: chartdata.data1,
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 10,
				showSymbol: true,
				itemStyle: {
					normal: {
						borderWidth: 5,
						borderColor: 'rgba(255,255,255,.8)',
						color: '#ff5b82'
					}
				},
				areaStyle: {
					color: isIE() ? '#ffd2dd' : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: '#ffd2dd'
					}, {
						offset: 1,
						color: 'rgba(255, 255, 255,0.2)'
					}])
				}
			}, {
				name: '有效客户数',
				data: chartdata.data,
				type: 'line',
				smooth: true,
				symbol: 'circle',
				showSymbol: false,
				itemStyle: {
					color: '#bfbfbf'

				},
				lineStyle: {
					type: 'dashed'
				}
			}]
		}
		thischart.setOption(option)
		return thischart
	},
	Yearonyear: function(data) {
		var year = new Date().getFullYear()
		var l = [{
			name: '月度新增客户数'
		}, {
			name: '月度净增客户数'
		}, {
			name: '新增客户同比增长率'
		}, {
			name: '净增客户同比增长率'
		}]
		var mouth = new Date().getMonth()
		var moulist = new Array(mouth || 12).extract(function(item, i) {
			return '' + (i + 1 < 10 ? "0" + (i + 1) : i + 1)
		})
		//console.log(moulist)

		var find = function(arg) {
			return data.matching(function(item) {
				return item.month.substring(4) + '' === arg
			}) || {
				addSameCountSum: 0,
				addSameValidSum: 0,
				addCountSum: 0,
				addValidSum: 0
			}
		}

		var sbar = function(name, value, symbol) {
			symbol = symbol || ''
			return {
				name: name,
				value: value,
				itemStyle: {
					barBorderRadius: +value >= 0 ? [50, 50, 0, 0] : [0, 0, 50, 50]
				},
				tooltip: {
					show: name + '' !== '0',
					trigger: 'item',
					showDelay: 0,
					transitionDuration: 0.2,
					formatter: function(params) {
						var value = (params.value + '').split('.');
						value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + (value[1] ? ('.' + value[1]) : '');
						return params.seriesName + params.name + ': ' + (value === 'NaN' ? '暂无数据' : value + symbol);
					}
				}
			}
		}

		var dfromat = function(val) {
			return val + '月'; //val.substring(0, 4) + '年' + val.substring(4) + '月'
		}


		var chartdata = moulist.reduce(function(old, item, index) {
			old.addSameCountSum.push(sbar(dfromat(item), find(item).addSameCountSum, '%'))
			old.addSameValidSum.push(sbar(dfromat(item), find(item).addSameValidSum, '%'))
			old.addCountSum.push(sbar(dfromat(item), find(item).addCountSum))
			old.addValidSum.push(sbar(dfromat(item), find(item).addValidSum))
			old.xAxis.push(item + '月')
			return old
		}, {
			addSameCountSum: [],
			addSameValidSum: [],
			addCountSum: [],
			addValidSum: [],
			xAxis: []
		})

		// var chartdata = moulist.splice(new Date().getMonth() + 1, 12 - new Date().getMonth()).extract(function(item) {
		// 	return [(year - 1) + item, (year - 2) + item]
		// }).concat(moulist.extract(function(item) {
		// 	return [year + item, (year - 1) + item]
		// })).reduce(function(old, item) {
		// 	console.log(item)
		// 	old.o.push(sbar(dfromat(item[1]), find(item[1]).tbSum || 0))
		// 	old.n.push(sbar(dfromat(item[0]), find(item[0]).tbSum || 0))
		// 	old.x.push(dfromat(item[0]))
		// 	return old
		// }, {
		// 	o: [],
		// 	n: [],
		// 	x: []
		// })

		//console.log(chartdata)

		var thischart = echarts.init(document.getElementById('Yearonyear'))
		var option = {
			grid: {
				left: '13%'
			},
			color: ['#b2b1b1', '#ff7b8c'],
			title: {
				show: true,
				text: '客户月度新增统计(单位:人)',
				textVerticalAlign: 'top',
				x: 'center',
				y: 'top',
				textStyle: {
					color: '#1f1f1f',
					fontSize: 15,
					fontFamily: 'lantinghei',
					fontWeight: 'normal'
				}
			},
			xAxis: [{
				type: 'category',
				boundaryGap: true,
				data: chartdata.xAxis,
				axisTick: {
					alignWithLabel: true
				},
				axisLabel: {
					show: true,
					interval: 0,
					fontSize: 12
				},
				axisPointer: {
					type: 'shadow'
				}
			}],
			yAxis: [{
				type: 'value'
			}, {
				type: 'value',
				axisLabel: {
					formatter: '{value}%'
				},
				splitLine: {
					show: false
				}
			}],
			legend: {
				show: true,
				data: l,
				bottom: 0,
				selectedMode: false
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					crossStyle: {
						color: '#999'
					}
				},
				formatter: function(params) {
					var temp = params.map(function(item) {
						return item.marker + item.seriesName + item.name + '：' + (item.seriesType === "line" ? item.data.value + '%' : item.data.value)
					}).join('<br/>')
					return params[0].axisValue + '<br/>' + temp
				}
			},
			series: [{
				name: '月度新增客户数',
				type: 'bar',
				barWidth: '30%',
				itemStyle: {
					color: '#b2b1b1',
					//barBorderRadius: [50, 50, 0, 0]
				},
				symbolSize: 10,
				smooth: true,
				data: chartdata.addCountSum
			}, {
				name: '月度净增客户数',
				type: 'bar',
				barWidth: '30%',
				itemStyle: {
					color: '#ff7b8c',
					//barBorderRadius: [50, 50, 0, 0]
				},
				symbolSize: 10,
				smooth: true,
				data: chartdata.addValidSum
			}, {
				name: '新增客户同比增长率',
				type: 'line',
				yAxisIndex: 1,
				barWidth: 10,
				itemStyle: {
					color: '#ffd75d',
					//barBorderRadius: [50, 50, 0, 0]
				},
				symbolSize: 10,
				smooth: true,
				data: chartdata.addSameCountSum
			}, {
				name: '净增客户同比增长率',
				type: 'line',
				yAxisIndex: 1,
				barWidth: 10,
				itemStyle: {
					color: '#4590f6',
					//barBorderRadius: [50, 50, 0, 0]
				},
				symbolSize: 10,
				smooth: true,
				data: chartdata.addSameValidSum
			}]
		}

		thischart.setOption(option)
		return thischart
	},
	mapPost: function(data) {

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

}

$(function() {
	var type = localStorage.getItem('comGrade') || '3'; //
	type + '' === '4' && (type = 3);
	// add by kongxz
	type='1';

	if (type === '1') {
		$('.type,.type3no,.type1').show()
	}
	if (type === '2') {
		$('.type,.type3no,.type2').show()
	}

	if (type === '3') {
		$('.type3').show()
		$('#warp-body').removeClass('maj-ele-box-sm-9 maj-ele-box-9').addClass('maj-ele-box-12')
	}


	//this_pages.getData().done(function(res) {
		//var data = res.data
	    var data = {"occupation":[{"managecom":"86","managecomName":"","sum":"227790","sex":"","age":"","degree":"","riskType":"","occupationCode":"个体从业人员","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"56834","sex":"","age":"","degree":"","riskType":"","occupationCode":"企业高管","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"250455","sex":"","age":"","degree":"","riskType":"","occupationCode":"其他","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"783","sex":"","age":"","degree":"","riskType":"","occupationCode":"军人","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"182996","sex":"","age":"","degree":"","riskType":"","occupationCode":"农民","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"22515","sex":"","age":"","degree":"","riskType":"","occupationCode":"工人","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"399510","sex":"","age":"","degree":"","riskType":"","occupationCode":"技术人员","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"104305","sex":"","age":"","degree":"","riskType":"","occupationCode":"政企工作人员","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null}],"flag":"86","sex":[{"managecom":"86","managecomName":"","sum":"604541","sex":"女","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"710044","sex":"男","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}],"degree":[{"managecom":"86","managecomName":"","sum":"637912","sex":"","age":"","degree":"中专及以下","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"214556","sex":"","age":"","degree":"大专及本科","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"453747","sex":"","age":"","degree":"未填写","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"8380","sex":"","age":"","degree":"硕士及博士","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}],"sum":[{"managecom":"8601","managecomName":"北京","sum":"38757","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"153785","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8602","managecomName":"山东","sum":"247339","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"409271","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8603","managecomName":"四川","sum":"128140","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"242197","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8605","managecomName":"湖北","sum":"163367","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"313507","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8606","managecomName":"青岛","sum":"53631","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"87639","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8607","managecomName":"河南","sum":"206096","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"429480","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8608","managecomName":"河北","sum":"233386","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"385279","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8609","managecomName":"江苏","sum":"86740","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"200183","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8610","managecomName":"天津","sum":"35948","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"59885","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8611","managecomName":"广东","sum":"28246","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"70181","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8612","managecomName":"湖南","sum":"45218","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"65102","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"8613","managecomName":"安徽","sum":"48618","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"96945","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}],"countSumPolicy":"866530","countSumValid":"1314595","tbSum":[{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"931664","month":"201707","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"944229","month":"201708","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"964035","month":"201709","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"964666","month":"201710","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"969967","month":"201711","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"978700","month":"201712","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"989523","month":"201801","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"988246","month":"201802","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"991228","month":"201803","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"994010","month":"201804","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1019320","month":"201805","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1043996","month":"201806","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1053925","month":"201807","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1062123","month":"201808","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1085762","month":"201809","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1092162","month":"201810","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1106530","month":"201811","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1115167","month":"201812","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1151797","month":"201901","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1154652","month":"201902","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1174785","month":"201903","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1188460","month":"201904","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1196302","month":"201905","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null},{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"1211235","month":"201906","validSecuritySum":null,"addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":null}],"validSecuritySum":"309926","countSum":"2493778","addCountValidSumList":[{"managecom":"86","managecomName":"","sum":"","sex":"","age":"","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"201912","validSecuritySum":"","addCountSum":12972,"addValidSum":5058,"addSameCountSum":14.84,"addSameValidSum":16.1,"valueType":""}],"risk":[{"managecom":"86","managecomName":"","sum":"266901","sex":"","age":"","degree":"","riskType":"万能寿险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"755986","sex":"","age":"","degree":"","riskType":"传统寿险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"930928","sex":"","age":"","degree":"","riskType":"健康险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"395097","sex":"","age":"","degree":"","riskType":"分红寿险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"341771","sex":"","age":"","degree":"","riskType":"意外险","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}],"age":[{"managecom":"86","managecomName":"","sum":"284005","sex":"","age":"18岁以下","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},		  {"managecom":"86","managecomName":"","sum":"62642","sex":"","age":"19-25岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"264768","sex":"","age":"26-35岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"300658","sex":"","age":"36-45岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"274126","sex":"","age":"46-55岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"66367","sex":"","age":"56-60岁","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""},{"managecom":"86","managecomName":"","sum":"62020","sex":"","age":"60以上","degree":"","riskType":"","occupationCode":"","countSum":"","countSumPolicy":"","countSumValid":"","tbSum":"","month":"","validSecuritySum":"","addCountSum":0,"addValidSum":0,"addSameCountSum":0.0,"addSameValidSum":0.0,"valueType":""}]};
		$('[data-value=countSum]').text(Tformat(data.countSum || 0))	    
		$('[data-value=countSumPolicy]').text(Tformat(data.countSumPolicy || 0))
		$('[data-value=countSumValid]').text(Tformat(data.countSumValid || 0))
		$('[data-value=validSecuritySum]').text(Tformat(data.validSecuritySum || 0))
		var cage = this_pages.age(data.age)
		var csex = this_pages.sex(data.sex, type === '3' ? 3 : undefined)
		var crisk = this_pages.risk(data.risk, type === '3' ? 3 : undefined)
		//var coccupation = this_pages.occupation(data.occupation)
		var cdegree = this_pages.degree(data.degree, type === '3' ? 3 : undefined)
		if (type !== '3') {
			var chartmap = this_pages.chartmap(data.sum)
			var line = this_pages.line(data.sum)
		}
		var Yearonyear = this_pages.Yearonyear(data.addCountValidSumList)
		var mapPost = this_pages.mapPost(data.sum)
		$(window).on('resize', function() {
			cage.resize()
			csex.resize()
			crisk.resize()

			if (type !== '3') {
				chartmap.resize()
				line.resize()
			}
			cdegree.resize()
			Yearonyear.resize()
		})
	//})

})

Array.prototype.extract = function(cb) {
	var i = 0,
		len = this.length,
		_ary = []
	for (; i < len; i++) {
		_ary.push(cb(this[i], i, this))
	}
	return _ary
}

Array.prototype.loop = function(cb) {
	var i = 0,
		len = this.length
	for (; i < len; i++) {
		cb(this[i], i, this)
	}
	return this
}

Array.prototype.matching = function(cb) {
	var i = 0,
		len = this.length,
		_obj = undefined;
	for (; i < len; i++) {
		if (cb(this[i], i, this)) {
			_obj = this[i]
			break;
		}
	}

	return _obj
}

if (typeof Array.prototype.reduce != "function") { 
	Array.prototype.reduce = function(callback, initialValue) {
		var previous = initialValue,
			k = 0,
			length = this.length;
		if (typeof initialValue === "undefined") {
			previous = this[0];
			k = 1;
		} 
		if (typeof callback === "function") { 
			for (k; k < length; k++) {
				this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this)); 
			}
		}
		return previous; 
	};
}