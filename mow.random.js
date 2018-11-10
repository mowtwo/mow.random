let ramdom = (function() {
	let _RANDOM_ = function() {
		this.tag = 'staicClass'
	}
	
	let swtTpOFList = {
		'object': function(args) {
			let arg = (args[1] && (typeof args[1] == 'object')) ? args[0] : args
			let len = 0
			let r = 0
			// debugger
			if (Array.isArray(arg)) {
				len = arg.length
				r = Math.floor(Math.random() * len)
				return arg[r]
			} else {
				return arg[swtTpOFList['object'](Object.keys(arg))]
			}

		},
		'number': function(args) {
			let arg = [args[0]]
			if (args[1]) arg.concat(args[1])
			for (let v of arg) {
				if (typeof v !== 'string')
					continue
				else
					return swtTpOFList['string'](arg.join(''))
			}
			return swtTpOFList['object'](arg)
		},
		'string': function(args) {
			let arg = (args[1] && typeof args[1] == 'object') ?
				args[0] + args[1].join('') :
				args
			return swtTpOFList['object'](arg.split(''))
		},
		'others': function() {
			throw Error('The parameter list must be NUMBER or OBJECT');
		}
	}
	
	let choice = function(arg, ...args) {
			let arg0 = arg
			let argAll = [arg, args]
			return swtTpOFList[arg0 ? (typeof arg0) : 'others'](argAll);
		},
		randint = function(min, max) {
			if (!min) throw Error('The parameter list is empty')
			else if(min && !max) throw Error('There must be more than two parameters.')
			else{
				let _min = (min<max) ? min : max
				let _max = (min<max) ? max : min
				let cac = []
				for(let i=_min;i<=_max;i++)
					cac.push(i)
				return choice(cac)
			}
		},
		range = function(start,stop,step=1){
			let cac = []
			if(start == stop){
				cac.push(start)
			}else{
				if(step>1){
					let tmp = []
					if(start>stop){
						for(let i=start;i>=stop;i--)
							tmp.push(i)
					}else{
						for(let i=start;i<=stop;i++)
							tmp.push(i)
					}
					let l = tmp.length
					let tl = 0
					let cl = 0
					do{
						cac[cl] = tmp[tl]
						cl++
						tl+=step
					}while(tl<l)
				}else{
					if(step<0){
						throw Error('Step size must be greater than 0')
					}else{
						if(start>stop){
							for(let i=start;i>=stop;i--)
								cac.push(i)
						}else{
							for(let i=start;i<=stop;i++)
								cac.push(i)
						}
					}
				}
			}
			return cac
		},
		_random_ = function(){
			return 'don\'t'
		}
		
	_RANDOM_.prototype = {
		/**
		 * 结果根据第一个参数的类型会产生特殊结果
		 * 参数1的类型为对象或数组，将忽略之后的所有参数
		 * 参数1的类型为数字或字符串，若后续参数中的属性嵌套了数组和对象都会被转换成字符串
		 */
		choice,
		/**
		 * 返回一个范围内的整形数字，包含最小和最大值
		 */
		randint,
		/**
		 * 返回一个范围内的整形数字或字母，排序顺序根据初始值和最终值决定
		 * 步长代表两个数字与字母在ASCII码之间的差值
		 */
		range,
		/**
		 * 原生Math对象下的random方法
		 * 如果不存在，则调用自己的random方法
		 */
		native:Math.random || _random_
	}
	return new _RANDOM_()
})();
