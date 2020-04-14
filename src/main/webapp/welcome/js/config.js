var Injection = function(args) {
	if (args instanceof Array) {
		args.loop(function(item, i) {
			if (window.opener !== null && window.opener !== undefined) {
				window[item] = window.opener[item]
			} else {
				window[item] = window.top[item]
			}
		})
	} else {
		Injection([args]);
	}
}
Injection(['WINDOW_ROUTERS', 'Router', 'WINDOW_OPENERS', 'memory_system', 'Popup', 'ecif', 'api', 'Api']);

var Tools = {
	COLW: {
		DATE: 120,
		DATETIME: 180,
		CRMNO: 100,
		SEX: 50,
		BRITHDAY: 120,
		PHONE: 130,
		UUID: 230
	},
	trim: function(val) {
		return $.trim(val)
	},
	majPlaceholder: function(data) {
		return '<span id="' + data.id + '" class="maj-placeholder" style="top:' + data.top + 'px;left:' + data.left + 'px ">' + data.text + '</span>'
	},
	isPlaceholderSupport: function() {
		return 'placeholder' in document.createElement('input');
	},
	tableFactory: function(el, options) {
		var options = Tools.tableOptions(options.options)
		options.columns = Tools.createDColList(options.columns)
		$(el).bootstrapTable('destroy');
		$(el).bootstrapTable(option)
	},
	tableOptions: function(options, method) {
		var _options = {
			//url: '', //请求后台的URL（*）
			method: 'post', //请求方式（*）
			contentType: "application/x-www-form-urlencoded",
			//toolbar: '#toolbar',                //工具按钮用哪个容器
			striped: true, //是否显示行间隔色
			dataField: "res",
			cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: false, //是否显示分页（*）
			sortable: false, //是否启用排序
			sortOrder: "asc", //排序方式      
			sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
			pageNumber: 1, //初始化加载第一页，默认第一页
			pageSize: 10, //每页的记录行数（*）
			pageList: [10, 25, 50], //可供选择的每页的行数（*）
			search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch: false,
			showColumns: false, //是否显示所有的列
			showRefresh: false, //是否显示刷新按钮
			minimumCountColumns: 2, //最少允许的列数
			clickToSelect: false, //是否启用点击选中行
			//height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId: "id", //每一行的唯一标识，一般为主键列
			showToggle: false, //是否显示详细视图和列表视图的切换按钮
			cardView: false, //是否显示详细视图
			detailView: false,
			undefinedText: '-'
		}
		options = $.extend({}, _options, options)
		return options
	},
	tableColumn: function(options) {
		var _default = {
				field: '',
				title: '',
				align: 'center', //左右居中
				valign: 'middle' //上下居中
			},
			_options
		if (options instanceof Array) {
			var obj = {
				field: options[0],
				title: options[1]
			} //ellipsis
			if (options[2] && typeof options[2] === 'string') {
				var strary = options[2].split('_')
				if (strary.length > 1 && strary[0] === 'ellipsis') {
					if ((+strary[1]) !== NaN) {
						obj.width = parseInt((+strary[1]))
					} else {
						obj.width = 200
					}
				}
				obj.width = obj.width || 200
				obj.formatter = Tools.tableEllipsisCell(obj.width)
			} else if (options[2] && typeof options[2] === 'number') {
				obj.width = options[2]
			} else if (options[2] && options[2] instanceof Function) {
				obj.formatter = options[2]
			}
			if (options[3] && options[3] instanceof Function) {
				obj.formatter = options[3]
			}

			_options = $.extend({}, _default, obj)
		} else {
			_options = $.extend({}, _default, options)
		}

		//屏蔽crm客户号
		_options.title === 'CRM客户号' && (_options.visible = false)

		return _options
	},
	indexColumn: function(tableOptions, colOption) {
		var type = tableOptions.sidePagination || 'client',
			_colOption = {
				field: 'index',
				title: '序号',
				width: 100,
				searchable: false,
				formatter: function(value, row, index) {
					if (type === 'client') {
						return index + 1;
					} else if (type === 'server') {
						var _option = $(tableOptions.whos).bootstrapTable('getOptions')
						var pageSize = _option.pageSize,
							pageNumber = _option.pageNumber;
						return pageSize * (pageNumber - 1) + index + 1;
					} else {
						return index + 1;
					}
				}
			}
		colOption = $.extend({}, _colOption, colOption)
		return colOption
	},
	fnCol: function(options) {
		var _colOption = {
			field: '__fn__methods',
			title: '操作',
			searchable: false,
			formatter: function(value, row, index) {
				return false
			},
			events: {

			}
		}
		return $.extend({}, _colOption, options)
	},
	createDColList: function(option, colList, hasIndexCOl) {
		var list = []
		if (hasIndexCOl) {
			colList.splice(hasIndexCOl.pos - 1, 0, Tools.indexColumn(option, hasIndexCOl))
		}
		var len = colList.length,
			i = 0
		for (; i < len; i++) {
			list.push(Tools.tableColumn(colList[i]))
		}
		return list
	},
	tableEllipsisCell: function(width) {
		return function(value, row, index) {
			value = (typeof value === 'undefined' || value === null) ? '-' : value
			return '<div class="maj-ellipsis" style="width : ' + width + 'px" title="' + value + '">' + value + '</div>';
		}
	},

	getQueryString: function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
	},
	Json2Query: Router.Json2Query,
	compareData: function(start, end) {
		var start_ = +(start.split('-').join(',')),
			end_ = +(end.split('-').join(','))
		if (start > end) {
			return 'gt'
		} else if (start == end) {
			return 'eq'
		} else {
			return 'lt'
		}
	},
	screenAuto: function() {
		var screen_width = function() {
				return document.body.clientWidth
			},
			class_name = {
				tight : 'maj-screen-tight',
				xs: 'maj-screen-xs',
				sm: 'maj-screen-sm',
				md: 'maj-screen-md',
				lg: 'maj-screen-lg'
			},
			srceen = function() {
				var keys = []
				for(var k in class_name){
					keys.push(class_name[k])
				}
				if (screen_width() > 0) {
					$('body').removeClass(keys.join(' ')).addClass(class_name.tight)
				}
				if (screen_width() > 600) {
					$('body').removeClass(keys.join(' ')).addClass(class_name.xs)
				}
				if (screen_width() > 880) {
					$('body').removeClass(keys.join(' ')).addClass(class_name.sm)
				}
				if (screen_width() > 1366) {
					$('body').removeClass(keys.join(' ')).addClass(class_name.md)
				}
				if (screen_width() > 1800) {
					$('body').removeClass(keys.join(' ')).addClass(class_name.lg)
				}
			}
		$(window).on('resize', function() {
			srceen()
		})
		srceen()
	},
	encodeUnicode: function(str) {
		var res = [];
		for (var i = 0; i < str.length; i++) {
			res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
		}
		return "\\u" + res.join("\\u");
	},
	decodeUnicode: function(str) {
		str = str.replace(/\\/g, "%");
		return unescape(str);
	},
	filter: {
		screenObject: function(obj, keys) {
			return keys.reduce(function(old, item) {
				old[item] = obj[item] || ''
				return old
			}, {})
		}
	},
	modal: function(type) {
		return function(selector) {
			return function() {
				$(selector).modal(type)
			}
		}
	},
	bale: function(el) {
		return function(fields) {
			return function() {
				return fields.reduce(function(old, item, i) {
					old[item] = el.find('[name=' + item + ']').tal()
					return old
				}, {})
			}

		}
	},
	adapter: {
		select: function(option) {
			var DEFAULT = {
				data: [],
				empty: true,
				field: 'code', //select option 的value 对应key
				name: 'codeName', //select option 的text 对应key
			}
		}
	},
	api: {
		dropdown: function(keyName) {
			return function(type, flag, other) {
				var obj = {},
					memkey = 'api.dropdown.' + type,
					flag = typeof flag === 'undefined' ? !0 : typeof flag === 'boolean' ? flag : !1,
					_result;
				obj[keyName || 'codeType'] = type
				other = other || {}
				obj = $.extend(true, {}, obj, other)
				if (obj['codeType']) {
					var _cdata = flag ? memory_system.get(memkey) : undefined
					if (!_cdata) {
						_result = api.dropdown(obj, function(res) {
							var _res = res.extract(function(item) {
								return Tools.filter.screenObject(item, ['code', 'codeName'])
							})
							flag && memory_system.set(memkey, _res)
						})
					} else {
						_result = new Fake(_cdata)
					}
				}
				return _result
			}
		},
		tree: function(type) {
			return function() {

			}
		}
	},
	btnFactory: function(type) {
		return function(clazz, text) {
			return '<button class="' + clazz + ' maj-btn maj-btn-xs maj-btn-' + type + '">' + text + '</button>'
		}
	},
	btnType: ['info', 'success', 'danger', 'warn', 'default', 'empty'],
	btn: {},
	plugins: {
		select: function(option) {
			var DEFAULT = {
				selector: '',
				size: 6,
				field: 'code', //select option 的value 对应key
				name: 'codeName', //select option 的text 对应key
				data: [],
				empty: true
			}
			var this_options = $.extend({}, DEFAULT, option)
			var multiple = $(this_options.selector).prop('multiple')
			multiple && (this_options.empty = false)
			var created = function() {
				var _str = this_options.data.reduce(function(old, item, i) {
					var str = ''
					if (this_options.name instanceof Function) {
						str = '<option value="' + item[this_options.field] + '">' + this_options.name(item) + '</option>'
					} else {
						str = '<option value="' + item[this_options.field] + '">' + item[this_options.name] + '</option>'
					}
					old.push(str)
					return old
				}, [this_options.empty ? '<option value="" >请选择</option>' : '']).join('')
				return _str
			}
			$(this_options.selector).empty()
			$(this_options.selector).append($(created()))
			$(this_options.selector).selectpicker({
				size: this_options.size,
				style: 'maj-input',
				styleBase: ''
			})
			$(this_options.selector).selectpicker('refresh');
			$(this_options.selector).selectpicker('render');
		}
	},
	jqFn: {
		majselect: function(options) {
			var _options = {
				selector: this.selector || this,
				empty: this.data('pure') === undefined ? true : false
			}
			Tools.plugins.select($.extend({}, _options, this.data(), options))
		},
		d: function() {
			var obj = {}
			this.each(function() {
				var $this = $(this)
				obj[$this.attr('name')] = $this
			})
		},
		trimVal: function() {
			return $.trim(this.val())
		},
		datatimepick: function(type) {
			var DEFAULT = {
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
					minView: 2,
					fontAwesome: true
				},
				_type = {
					birthday: {
						endDate: new Date()
					},
					strattime: {
						format: 'yyyy-mm-dd hh:ii:ss',
						minView: 0,
						startDate: new Date()
					},
					normaltime: {
						format: 'yyyy-mm-dd hh:ii:ss',
						minView: 0
					},
					postyears: {
						format: 'yyyy',
						startView: 4,
						minView: 4,
						endDate: new Date()
					},
					endtoday: {
						endDate: new Date()
					},
					starttoday: {
						startDate: new Date()
					},
					endtime: {
						format: 'yyyy-mm-dd hh:ii:ss',
						minView: 0,
						endDate: new Date()
					}
				}
			return function() {
				var options = $.extend({}, DEFAULT, _type[type])
				this.each(function() {
					var $this = $(this)
					$this.datetimepicker(options);
				})
				return this
			}
		}
	},
	alias: {
		sval: function() {
			return this.val()
		}
	}

}

Tools.btnType.loop(function(i) {
	Tools.btn[i] = Tools.btnFactory(i)
})

var Yable = function(options) {
	var DEFAULT = {
		selector: '',
		columns: [],
		postdata: {

		},
		options: {

		},
		serial: 1,
		ajax: ''
	}
	this.build = $.extend({}, DEFAULT, options)
	this.params = {}

	this.init()
}

Yable.prototype.init = function() {
	var that = this
	this.option = Tools.tableOptions($.extend({}, this.build.options, {
		whos: this.build.selector,
		pagination: true
	}))
	this.option.queryParams = function(params) {
		that.params = $.extend({}, that.build.postdata, {
			offset: params.offset,
			limit: params.limit
		})
	}
	this.option.ajax = that.build.ajax instanceof Function ? function(result) {
		return that.build.ajax(that.params, result)
	} : undefined
	this.option.columns = Tools.createDColList(this.option, this.build.columns, {
		pos: this.build.serial
	})
	this.option.whos = this.build.selector
	this.rebuild()
}

Yable.prototype.dobuild = function() {
	$(this.build.selector).bootstrapTable(this.option)
}

Yable.prototype.refresh = function() {
	$(this.build.selector).bootstrapTable('refresh')
}

Yable.prototype.destroy = function() {
	$(this.build.selector).bootstrapTable('destroy')
}

Yable.prototype.rebuild = function() {
	this.destroy()
	this.dobuild()
}

Yable.prototype.load = function(data) {
	$(this.build.selector).bootstrapTable('selectPage', 1)
	$(this.build.selector).bootstrapTable('load', data)
}

Yable.prototype.updateRow = function(oldrow, params) {
	return this.fn('updateRow', {
		index: params.index,
		row: $.extend({}, oldrow, params.row)
	})
}

Yable.prototype.getData = function(flag) {
	return this.fn('getData', {
		'useCurrentPage': flag || false
	})
}

Yable.prototype.fn = function(name, params) {
	return $(this.build.selector).bootstrapTable(name, params)
}

Yable.of = function(args) {
	return new Yable(args)
}

var Yree = function(options) {
	var that = this
	var DEFAULT = {
		linkage: true,
		selector: '',
		type: 'checkbox',
		data: [],
		checkWithoutAllCheck: false,
		onchange: function(data) {}
	}
	this.DEFAULT_TREE = {
		showCheckbox: true,
		highlightSelected: false,
		levels: 1,
		onNodeChecked: function(e, node) {
			that.linkage('check')(node)
		},
		onNodeUnchecked: function(e, node) {
			that.linkage('uncheck')(node)
		},
		onNodeSelected: function(e, node) {
			that.change(that.build.onchange)
		},
		onNodeUnselected: function(e, node) {
			that.change(that.build.onchange)
		}
	}
	this.build = $.extend(true, {}, DEFAULT, options)
	if (this.build.type !== 'checkbox') {
		this.DEFAULT_TREE.showCheckbox = false
		this.DEFAULT_TREE.highlightSelected = true
	}
	this.TreeOptions = $.extend(true, {}, this.DEFAULT_TREE, {
		data: options.data
	})

	this.$el = $(this.build.selector)
	this.initTree()
}

Yree.prototype = {
	initTree: function() {
		this.tree = this.$el.treeview(this.TreeOptions)
		if (this.build.type === 'checkbox') {
			this.$el.treeview('checkAll', {
				silent: true
			});
			this.nodes = this.$el.treeview('getChecked');
		} else {
			this.nodes = this.$el.treeview('getUnselected');
		}
		// this.$el.treeview('checkAll', {
		// 	silent: true
		// });
		// this.nodes = this.$el.treeview('getChecked');
		this.clear()
	},
	hasParent: function(node) {
		var _p = this.$el.treeview('getParent', node)
		return (_p === undefined || _p.nodeId === undefined) ? false : _p
	},
	getChildrenNodeId: function(node) {
		var that = this
		return node.nodes && node.nodes.length ? node.nodes.reduce(function(old, item) {
			if (item.nodes && item.nodes.length) {
				old = old.concat(that.getChildrenNodeId(item))
			} else {
				old.push(item.nodeId)
			}
			return old
		}, [node.nodeId]) : []
	},
	getParentNodeId: function(node) {
		var _list = [],
			_p = this.hasParent(node)
		if (_p) {
			_list.push(_p)
			_list = _list.concat(this.getParentNodeId(_p))
		}
		return _list
	},
	getSiblings: function(node) {
		var nodes = this.$el.treeview('getSiblings', node)

		return nodes
	},
	isAllChecked: function(nodes) {
		return nodes && nodes instanceof Array ? nodes.screen(function(item) {
			return !item.state.checked
		}).length ? false : true : true
	},
	isHasChecked: function(nodes) {
		return nodes && nodes instanceof Array ? nodes.screen(function(item) {
			return item.state.checked
		}).length ? true : false : false
	},
	bubbleCheck: function(node) {
		var that = this
		if (this.build.checkWithoutAllCheck || this.isAllChecked(this.getSiblings(node))) {
			var _pNode = this.hasParent(node)
			if (_pNode) {
				that.$el.treeview('checkNode', [_pNode, {
					silent: true
				}])
				that.bubbleCheck(_pNode)
			}
		}
	},
	bubbleUncheck: function(node) {

		if (this.build.checkWithoutAllCheck) {
			if (!this.isHasChecked(this.getSiblings(node))) {
				var _p = this.hasParent(node)
				if (_p) {
					this.$el.treeview('uncheckNode', [_p, {
						silent: true
					}])
					this.bubbleUncheck(_p)
				}
			}
		} else {
			var _pNodes = this.getParentNodeId(node)
			this.$el.treeview('uncheckNode', [_pNodes, {
				silent: true
			}]);
		}

	},
	sinkCheck: function(node) {
		this.$el.treeview('checkNode', [this.getChildrenNodeId(node), {
			silent: true
		}])
	},
	sinkUncheck: function(node) {
		this.$el.treeview('uncheckNode', [this.getChildrenNodeId(node), {
			silent: true
		}])
	},
	linkage: function(type) {
		var that = this
		return function(node) {
			if (type === 'check') {
				that.bubbleCheck(node)
				that.sinkCheck(node)
			} else {
				that.bubbleUncheck(node)
				that.sinkUncheck(node)
			}
			that.change(that.build.onchange)
		}
	},
	getPickNodes: function(type) {
		var that = this
		return function(field) {
			return function() {
				return that.$el.treeview(type).extract(function(item) {
					return field === undefined ? item : item[field]
				})
			}
		}
	},
	getCheckId: function() {
		return this.getPickNodes('getChecked')('id')()
	},
	getCheckNodes: function(type) {
		return this.getPickNodes('getChecked')()()
	},
	getCheckText: function() {
		return this.getPickNodes('getChecked')('text')()
	},
	getSelectNodes: function() {
		return this.getPickNodes('getSelected')()()
	},
	getSelectId: function() {
		return this.getPickNodes('getSelected')('id')()
	},
	getSelectText: function() {
		return this.getPickNodes('getSelected')('text')()
	},
	clear: function() {
		if (this.build.type === 'checkbox') {
			this.$el.treeview('uncheckAll', {
				silent: true
			})
		} else {
			var _sle = this.$el.treeview('getSelected');
			this.$el.treeview('unselectNode', [_sle, {
				silent: true
			}]);
		}
		this.collapseAll()
		this.change(this.build.onchange)
	},
	change: function(fn) {
		var that = this,
			_type = {
				'checkbox': 'Check',
				'select': 'Select'
			},
			_y = _type[this.build.type] || 'Check'
		return fn({
			id: that['get' + _y + 'Id'](),
			text: that['get' + _y + 'Text'](),
			nodes: that['get' + _y + 'Nodes']()
		})
	},
	the: function(id) {
		var that = this
		this.clear()
		var _nodes = id.extract(function(item) {
			return that.nodes.matching(function(_item) {
				return _item.id + '' === item + ''
			})
		}).screen(function(item) {
			return item !== undefined
		})
		this.$el.treeview(this.build.type === 'checkbox' ? 'checkNode' : 'selectNode', [_nodes, {
			silent: true
		}])
		this.change(this.build.onchange)
	},
	collapseAll: function() {
		this.$el.treeview('collapseAll', { 
			silent: true 
		})
	}
}

Yree.of = function(options) {
	return new Yree(options)
}

var Yrop = function(el, options) {
	this.$el = $(el)
	this.$el_ = this.$el.clone()
	this.options = options
	this._data = this.options.data.slice(0)
	this.init()
}

Yrop.DEFAULT = {
	total: 0,
	current: 1,
	pageSize: 10,
	pageNumber: 0,
	data: [],
	checkData: []
}

Yrop.prototype = {
	init: function() {
		this.initWarpDom()
		this.initDom()
		this.initPage()
		this.initData()
		this.events()
		this.render()
	},
	initWarpDom: function() {
		var content = '<div class="btn-group bootstrap-select maj-select msl-right"></div>',
			button = '<button type="button" class="dropdown-toggle bs-placeholder maj-input" data-toggle="dropdown" role="button" data-id="" title="请选择" aria-expanded="false">\
						<span class="filter-option pull-left">请选择</span>\
						<span class="bs-caret"><span class="caret"></span></span>\
						</button>',
			dropdown = '<div class="dropdown-menu p-t-n p-b-n" role="menu">\
							<div class="maj-yrop" data-stopPropagation="true">\
							</div>\
						</div>';
		this.$el.hide()
		this.$content = $(content)
		this.$button = $(button)
		this.$text = this.$button.find('.filter-option')
		this.$dropdown = $(dropdown)
		this.$content.append(this.$button).append(this.$dropdown)
		this.$el.after(this.$content)
		this.$slot = this.$dropdown.find('.maj-yrop')

	},
	initDom: function() {
		var body = '<div class="maj-yrop-body"></div>',
			search = '<div class="maj-yrop-body-search"><input class="maj-input" type="text" name="" placeholder="请输入关键字"></div>',
			item = '<li class="maj-yrop-item"><a class="maj-yrop-item_a">\
						<span class="maj-yrop-item_a-text"></span>\
						<span class="maj-yrop-item_a-icon">\
							<i class="fa fa-check"></i>\
						</span>\
					</a></li>',
			list = '<ul class="maj-yrop-body-warp"></ul>',
			bot = '<div class="maj-yrop-body-bot"></div>',
			prebtn = '<button class="maj-btn maj-btn-info maj-btn-sm" data-pre><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
			nextbtn = '<button class="maj-btn maj-btn-info maj-btn-sm" data-next><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
			info = '<span class="maj-yrop-body-bot-number">\
						<span class="maj-yrop-total"></span>\
						<span class="maj-yrop-pagenum"></span>\
					</span>'

		this.$body = $(body)
		this.$search = $(search)
		var items = ''
		for (var i = 0; i < this.options.pageSize; i++) {
			items += item
		}
		this.$list = $(list)
		this.$list.append($(items))
		this.$bot = $(bot)
		this.$prebtn = $(prebtn)
		this.$nextbtn = $(nextbtn)
		this.$info = $(info)
		this.$total = this.$info.find('.maj-yrop-total')
		this.$pages = this.$info.find('.maj-yrop-pagenum')
		this.$bot.append(this.$info).append(this.$prebtn).append(this.$nextbtn)
		this.$body.append(this.$search).append(this.$list).append(this.$bot)
		this.$items_ = this.$body.find('.maj-yrop-item')
		this.$searchInput = this.$search.find('input')
		this.$slot.append(this.$body)
	},
	initPage: function() {
		this.options.total = this.options.data.length
		this.options.pageNumber = Math.ceil(this.options.total / this.options.pageSize)
		this.options.current = 1
	},
	initData: function() {
		this.options.checkData = []
	},
	initRender: function() {
		this.$items_.each(function() {
			$(this).data('sdata', {}).find('.maj-yrop-item_a-text').text('').end().removeClass('select show');
		})
	},
	render: function() {
		this.initRender()
		var that = this
		var start = this.options.pageSize * (this.options.current - 1),
			end = this.options.pageSize * (this.options.current)
		var _data = this.options.data.slice(start, end)
		_data.loop(function(item, i) {
			that.$items_.eq(i).data('sdata', item).addClass('show')
			that.$items_.eq(i).find('.maj-yrop-item_a-text').text(item.codeName)
			that.isSelected(item) && (that.$items_.eq(i).addClass('select'))
		})
		this.$total.text('共' + this.options.total + '条')
		this.$pages.text('第' + this.options.current + '页')
		this.btnStyle()
	},
	isSelected: function(item) {
		return this.options.checkData.seek(function(item_) {
			return item.code + '' === item_.code + ''
		}) > -1
	},
	btnStyle: function() {
		this.$prebtn.removeClass('maj-btn-ban')
		this.$nextbtn.removeClass('maj-btn-ban')
		if (this.options.current === 1) {
			this.$prebtn.addClass('maj-btn-ban')
		}
		if (this.options.current >= this.options.pageNumber) {
			this.$nextbtn.addClass('maj-btn-ban')
		}
	},
	next: function() {
		if (this.options.current + 1 > this.options.pageNumber) {
			return
		}
		this.options.current++;
		this.render()
	},
	pre: function() {
		if (this.options.current - 1 < 1) {
			return
		}
		this.options.current--;
		this.render()
	},
	select: function(item) {
		this.options.checkData.push(item)
	},
	unselect: function(item) {
		var index = this.options.checkData.seek(function(item_, i) {
			return item.code === item_.code
		})
		if (index > -1)
			this.options.checkData.splice(index, 1)
	},
	search: function(keyword) {
		this.options.data = this._data.screen(function(item) {
			return item.codeName.match(keyword)
		})
		this.initPage()
		this.render()
	},
	events: function() {
		var that = this
		this.$prebtn.off().on('click', function(e) {
			that.pre()
		})
		this.$nextbtn.off().on('click', function(e) {
			that.next()
		})
		this.$items_.off().on('click', function(e) {
			if ($(this).hasClass('select')) {
				that.unselect($(this).data('sdata'))
				$(this).removeClass('select')
			} else {
				that.select($(this).data('sdata'))
				$(this).addClass('select')
			}
			that.change()
		})
		this.$slot.off().on('click', function(e) {
			e = e || window.event
			e.stopPropagation()
		}, false)
		this.$searchInput.off().on('keyup', function() {
			that.search($(this).tal())
		})
	},
	change: function() {
		var text = [],
			id = []
		this.options.checkData.loop(function(item) {
			text.push(item.codeName)
			id.push(item.code)
		})
		this.$el.val(id.join(','))
		this.$text.text(text.length ? text.join(',') : '请选择').attr('title', text.length ? text.join(',') : '请选择')
		this.$button[!text.length ? 'addClass' : 'removeClass']('bs-placeholder')
	},
	updata: function(data) {
		this._data = data
		this.options.data = this._data.slice(0)
		this.options.checkData = []
		this.refresh()
	},
	clear: function() {
		this.options.checkData = []
		this._data = []
		this.options.data = this._data.slice(0)
		this.refresh()
	},
	refresh: function() {
		this.$text.text('请选择').attr('title', '请选择')
		this.$button['addClass']('bs-placeholder')
		this.initPage()
		this.render()
		this.change()
	}
}

$.fn.jqYrop = function(option) {
	var args = Array.prototype.slice.call(arguments, 1),
		value;
	this.each(function() {
		var $this = $(this),
			data = $this.data('Yrop'),
			options = $.extend({}, Yrop.DEFAULT, $this.data(),
				typeof option === 'object' && option);
		if (false) {

		}
		if (typeof option === 'string') {

			if (!data) {
				return;
			}

			value = data[option].apply(data, args)
		}
		if (!data) {
			$(this).data('Yrop', (data = new Yrop(this, options)))
		}
	})
	return typeof value === 'undefined' ? this : value
}

$.fn.MiniTable = function(option) {
	var args = Array.prototype.slice.call(arguments, 1),
		value;
	this.each(function() {
		var data = $(this).data('MiniTable')

		if (typeof option === 'string') {
			if (!data) {
				return;
			}
			value = data[option].apply(data, args)
		}

		if (!data) {
			$(this).data('MiniTable', (data = new MiniTable($.extend({}, option, {
				target: $(this)
			}))))
		}
	})

	return this
}

$(function() {
	$('[data-jqYrop]').jqYrop()
})


$.fn.extend({
	majselect: Tools.jqFn.majselect,
	tal: Tools.jqFn.trimVal
})
$.fn.exAttr = function(attr) {
	return this.attr(attr) !== undefined ? true : false
}
$.fn.autoloadSelectDropdown = function(cache) {
	this.each(function() {
		var $this = $(this),
			_type = $this.attr('data-selectdown'),
			_cache = typeof cache === 'undefined' ? !($this.exAttr('data-nocache')) : cache;
		if (!_type) {
			return
		}
		Tools.api.dropdown()(_type, _cache).done(function(res) {
			$this.majselect({
				data: res
			})
		})
	})
}

$.fn.linkSelectDropdown = function(cache) {
	var linkd = function(dom, $linkedDom) {
		dom.on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {

			var val = $(this).selectpicker('val')
			$linkedDom.linkSelectDropdownReload(val)
		})
	}
	this.each(function(i) {
		var $this = $(this),
			linked = $this.attr('data-emit'),
			_type = $this.attr('data-linkselectdown'),
			_cache = typeof cache === 'undefined' ? !($this.exAttr('data-nocache')) : cache;
		$linkedDom = $(linked)
		if (!_type) {
			return
		}
		Tools.api.dropdown()(_type, false).done(function(res) {
			$this.majselect({
				data: res
			})
		})
		$linkedDom.majselect({
			data: []
		})

		linkd($this, $linkedDom)
	})
}


$.fn.linkSelectDropdownReload = function(val) {

	this.each(function() {
		var $this = $(this),
			_type = $this.attr('data-acceptselectdown'),
			linkedkey = $this.attr('data-acceptfield'),
			obj = {}
		if (!val) {
			$this.majselect({
				data: []
			})
			return
		}
		obj[linkedkey] = val.join(',')

		Tools.api.dropdown()(_type, false, obj).done(function(res) {
			$this.majselect({
				data: res
			})
		})
	})
}

$.fn.reLo = function() {
	this.each(function() {
		var $this = $(this),
			_type = $this.attr('data-selectdown')
		if (!_type) {
			return
		}
		$this.autoloadSelectDropdown(false)
	})
}

$.fn.majtree = function() {
	var filter = function(node) {
		node.loop(function(item) {
			if (item.nodes && item.nodes.length) {
				filter(item.nodes)
			} else {
				delete item.nodes
			}
		})
	}
	this.each(function() {
		//todo
		var $this = $(this),
			field = $this.attr('data-yree'),
			type = $this.attr('data-yreetype'),
			valid = $this.attr('data-yreeval'),
			textid = $this.attr('data-yreetext')
		api.tree({
			codeType: field
		}).done(function(res) {
			filter(res);
			
			$this.data('Yree', Yree.of({
				selector: $this,
				data: res,
				type: type,
				onchange: function(nodes) {
					$('#' + valid).val(nodes.id)
					$('#' + textid).val(nodes.text)
				}
			}))
		})

	})
}



$.fn.birthday = Tools.jqFn.datatimepick('birthday')
$.fn.strattime = Tools.jqFn.datatimepick('strattime')
$.fn.normaltime = Tools.jqFn.datatimepick('normaltime')
$.fn.postyears = Tools.jqFn.datatimepick('postyears')
$.fn.endtoday = Tools.jqFn.datatimepick('endtoday')
$.fn.starttoday = Tools.jqFn.datatimepick('starttoday')
$.fn.endtime = Tools.jqFn.datatimepick('endtime')
Tools.screenAuto()

//Injection(['WINDOW_ROUTERS', 'Router', 'WINDOW_OPENERS', 'memory_system', 'Popup', 'ecif', 'api', 'API']);

var routers = WINDOW_ROUTERS;
$('[data-selectdown]').autoloadSelectDropdown()
$('[data-linkselectdown]').linkSelectDropdown()
$('[data-birthday]').birthday()
$('[data-strattime]').strattime()
$('[data-normaltime]').normaltime()
$('[data-postyears]').postyears()
$('[data-endtoday]').endtoday()
$('[data-starttoday]').starttoday()
$('[data-endtime]').endtime()

$('[data-yreetype]').majtree()

$('[data-stopPropagation]').on('click', function(e) {
	e = e || window.event
	e.stopPropagation()
})

if (!Tools.isPlaceholderSupport()) {
	var _id_node = 1001
	$('input[placeholder]').each(function() {
		var $this = $(this)
		var id = '_placeholder' + _id_node++;
		var placeholderTxt = $this.attr('placeholder'),
			top = $this[0].offsetTop,
			left = $this.parent('div').css('paddingLeft').split('px')[0];
		$this.parent('div').css({
				position: 'relative'
			})
			.append(Tools.majPlaceholder({
				id: id,
				top: top,
				left: left,
				text: placeholderTxt
			})).end().attr('data-plac', id)
		$this.on('focus', function() {
			$(this).tal().length && $('#' + id).hide()
		})
	})
	$('input[placeholder]').bind('propertychange', function() {
		if ($.syncProcessSign) return;
		$.syncProcessSign = true;
		var val = $(this).tal(),
			id = $(this).attr('data-plac')
		if (!val.length) {
			$(this).val('');
			$('#' + id).show();
		} else {
			$('#' + id).hide();
		}
		$.syncProcessSign = false;
	})
	$('input[placeholder]').on('blur', function() {
		var _val = $(this).tal(),
			id = $(this).attr('data-plac')
		if (!_val.length) {
			$(this).val('');
			$('#' + id).show();
		} else {
			$('#' + id).hide();
		}

	})
	$('.maj-placeholder').on('click', function() {
		var _id = $(this).attr('id')
		$('input[data-plac=' + _id + ']').focus()
	})
}

var Yitle = function(options) {
	this.init()
}

Yitle.prototype.init = function() {
	this.$el = $(this.dom())
	$('body').append(this.$el)
}

Yitle.prototype.dom = function(text) {
	return '<div class="maj-yitle"></div>'
}

Yitle.prototype.show = function(text) {
	this.$el.text(text)
	this.$el.show()
	return this
}

Yitle.prototype.hide = function() {
	this.clear()
	this.$el.hide()
	return this
}

Yitle.prototype.pos = function(data) {
	this.$el.css({
		left: data.x,
		top: data.y
	})
}

Yitle.prototype.clear = function() {
	this.$el.text('')
	this.$el.css({
		left: 0,
		top: 0
	})
}

var yitle = new Yitle()

$(document).on('keydown', '[maxlength]', function() {
	var length = $(this).attr('maxlength')
	if (!length) return;
	var val = $(this).tal()
	if (val.length > length) {
		return
	}
})

$(document).on('mousemove', '[data-yitle]', function(e) {
	yitle.show($(this).text()).pos({
		x: e.clientX,
		y: e.clientY
	})
})

$(document).on('mouseout', '[data-yitle]', function(e) {
	yitle.hide()
})