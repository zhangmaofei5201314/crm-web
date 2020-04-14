(function($) {
	var JqSelect = function(el, options) {
		console.log(options)
		this.$el = $(el)
		this.$el_ = this.$el.clone()
		this.options = options
		//
		this.init()
	}
	// {
	// 		code: '1',
	// 		codeName: '2123131232'
	// 	}, {
	// 		code: '2',
	// 		codeName: '2123123'
	// 	}, {
	// 		code: '3',
	// 		codeName: '啥都发发发沙发'
	// 	}, {
	// 		code: '4',
	// 		codeName: '啥都发发发'
	// 	}, {
	// 		code: '5',
	// 		codeName: '啥都发发发沙'
	// 	}, {
	// 		code: '6',
	// 		codeName: '啥都发发发'
	// 	}, {
	// 		code: '7',
	// 		codeName: '啥都发'
	// 	}
	JqSelect.DEFAULT_OPTIONS = {
		data: [],
		activeClass: 'selected',
		key: 'codeName',
		value: 'code',
		mode: 'multiple',
		selected: [],
		search: false,
		keywords: ''

	}

	JqSelect.LOCALES = {}

	JqSelect.LOCALES['CN'] = JqSelect.LOCALES.cn = {
		formatSearch: '请输入关键字',
		formatTitle: '请选择',
		formatEmptyData: '无选项',
		formatEmptySeach: function(keyword) {
			return '没有找到 "' + keyword + '" 相关数据'
		}

	}

	$.extend(JqSelect.DEFAULT_OPTIONS, JqSelect.LOCALES['CN'])

	JqSelect.prototype.init = function() {
		//this.options = $.extend(JqSelect.DEFAULT_OPTIONS, this.options)

		this._data = this.options.data.slice(0)
		this.initSelect()
		this.initEvent()
		this.options.search && this.initSearch()
	}

	JqSelect.prototype.initSelect = function() {
		var select = '<div class="maj-select"></div>'
		var starter = '<button class="maj-select-btn"><p>' + this.options.formatTitle + '</p><span></span><i class="fa fa-caret-down" aria-hidden="true"></i></button>'
		this.$root = $(select)
		this.$btn = $(starter)
		this.$title = this.$btn.find('p')
		this.$text = this.$btn.find('span')
		this.$btn.addClass(this.$el.attr('class'))
		this.$root.append(this.$btn).append(this.initDorpdown())
		// this.$el.wrap(this.$root)
		this.$el.css({
			'display': 'none'
		})
		this.$el.after(this.$root)
		this.render()
	}

	JqSelect.prototype.initEvent = function() {
		var that = this,
			toggleDropdown = function(e) {
 
				e || window.event
				e.stopPropagation()
				if (!$(e.target).closest('.maj-select').length) {
					that.close()
				}
			}
		this.$btn.off('click').on('click', $.proxy(this.open, this))
		// document.removeEventListener('click',toggleDropdown)
		// document.addEventListener('click',toggleDropdown)
		//$('body').on('click',toggleDropdown)

	}

	JqSelect.prototype.open = function() {
		$('.maj-select-dorpdown').hide()
		this.$dorpdown.show()
		this.$search && this.$search.focus()
	}

	JqSelect.prototype.close = function() {
		this.$dorpdown.hide()
	}

	JqSelect.prototype.initDorpdown = function() {
		var dorpdown = '<div class="maj-select-dorpdown"></div>',
			searchBox = '<div class="maj-select-search"></div>'
		var itemList = '<div class="maj-select-list"></div>'
		this.$searchBox = $(searchBox)
		this.$itemList = $(itemList)
		this.$dorpdown = $(dorpdown).append(this.$searchBox).append(this.$itemList)
		return this.$dorpdown
	}

	JqSelect.prototype.initSearch = function() {
		var search = '<input class="maj-input" placeholder="' + this.options.formatSearch + '"/>',
			that = this
		if (this.options.search) {
			this.$search = $(search)
			this.$searchBox.append(this.$search)
			this.$search.off('keydown').on('keyup', function() {
				that.options.keywords = $.trim($(this).val())
				that.search()
				that.render()
			})
		}
	}

	JqSelect.prototype.search = function() {
		var that = this
		this.options.data = this._data.screen(function(i) {
 
			return !!(i[that.options.key].match(that.options.keywords))
		})
	}

	JqSelect.prototype.render = function() {
		var that = this
		var nodes = this.options.data.extract(function(item, index) {
			var flag = that.options.selected.seek(function(_i) {
				var _flag = item[that.options.value] + '' === _i + ''
				return _flag
			}) >= 0 ? true : ''

			return that.item(item, index, flag)
		})

		this.$nodes = $(nodes)
		this.$nodes.off('click')
		this.$nodes.on('click', function() {
			var vif = $(this).attr('data-value'),
				index = $(this).attr('data-index')
			if (that.selectData(vif, index) === 'unselect') {
				$(this).removeClass(that.options.activeClass)
			} else {
				if (that.options.mode !== 'multiple') {
					that.$nodes.removeClass(that.options.activeClass)
					that.close()
				}
				$(this).addClass(that.options.activeClass)


			}
			that.renderStarter()
		})
		this.$itemList.empty()
		this.$itemList.append(this.$nodes)
		this.renderStarter()
		return this.$nodes
	}

	JqSelect.prototype.renderStarter = function() {
		var len = this.options.selected.length
		this.$el.val(this.options.selected.join(','))
 
		if (len) {
			this.$title.css({
				'display': 'none'
			})
			this.$text.css({
				'display': 'inline-block'
			})
		} else {
			this.$title.css({
				'display': 'inline-block'
			})
			this.$text.css({
				'display': 'none'
			})

		}
		this.$text.text(this.getSelectedData(this.options.key).join(','))

	}

	JqSelect.prototype.selectData = function(vif, _i) {
		var flag = 'select',
			that = this
		if (this.options.mode === 'multiple') {
			var index = this.options.selected.seek(function(i, _) {
				return i + '' === vif + ''
			})
			if (index > -1) {
				this.options.selected.splice(index, 1)
				flag = 'unselect'
			} else {
				this.options.selected.push(this.options.data[_i][this.options.value])
			}
		} else {
			this.options.selected = [this.options.data[_i][this.options.value]]
		}


		return flag
	}

	// JqSelect.prototype.init = function() {

	// }

	JqSelect.prototype.item = function(data, index, selected) {
		var icon = '<i class="fa fa-check"></i>'
		var dom = '<div class="maj-select-item">\
						<a>\
						</a>\
					</div>'
		var icon = '<i class="fa fa-check"></i>'
		var $dom = $(dom),
			text = ''

		if (this.options.key instanceof Function) {
			text = this.options.key(data) || ''
		} else {
			text = data[this.options.key] || ''
		}
		$dom.addClass(selected ? this.options.activeClass : '')
		$dom.find('a').text(text).end().attr({
			'data-index': index,
			'data-value': data[this.options.value]
		})
		if (this.options.mode === 'multiple') {
			$dom.append($(icon))
		}
		return $dom[0]
	}

	JqSelect.prototype.getSelected = function(key) {
		// return this.options.selectData.extract(function(item, i) {
		// 	if (key) {
		// 		return item[key]
		// 	} else {
		// 		return item
		// 	}
		// })


		return this.options.selected
	}

	JqSelect.prototype.getSelectedData = function(key) {
		var that = this
		var _ary = []
		this.options.selected.loop(function(item, i) {
			var index = that.options.data.seek(function(_item) {
				return _item[that.options.value] + '' === item + ''
			})
			if (index >= 0) {
				_ary.push(that.options.data[index])
			}
		})
		return _ary.extract(function(item, i) {
			if (key) {
				return item[key]
			} else {
				return item
			}
		})
	}

	var allowEvent = ['getSelected', 'getSelectedData']

	$(document).on('click', function(e) {
		e || window.event
		e.stopPropagation()
		if (!$(e.target).closest('.maj-select').length) {
			$('.maj-select-dorpdown').hide()
		}
	})

	$.fn.jqSelect = function(option) {
		var args = Array.prototype.slice.call(arguments, 1),
			value;
		this.each(function() {
			var $this = $(this),
				data = $this.data('JqSelect'),
				options = $.extend({}, JqSelect.DEFAULT_OPTIONS, $this.data(),
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
				$(this).data('JqSelect', (data = new JqSelect(this, options)))
			}
		})
		return typeof value === 'undefined' ? this : value
	}
	$(function() {
		$('[data-jqselect]').jqSelect()
	})
})(jQuery)