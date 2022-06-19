const EventUtil = (function() {
	let eventArr = ['eventswipeLeft', 'eventswipeRight', 'eventclick', 'eventlongpress'];

  function touchStart(event) {
		this.delta = {};
		this.delta.x = event.touches[0].pageX;
		this.delta.time = new Date().getTime();
	}
	function touchEnd(event) {
		let delta = this.delta, time = new Date().getTime;
		delete this.delta;
		let timegap = time - delta.time;
		delta.x -= event.changedTouches[0].pageX;
		if(Math.abs(delta.x) < 5) {
			if(timegap < 1000) {
				if(this['eventclick']) { this['eventclick'].map(function(fn){ fn(event);	}); }
			} else {
				if(this['eventlongpress']) { this['eventlongpress'].map(function(fn){ fn(event) } ); }
			}
			return;
		} 
    if(delta.x > 0) { if(this['eventswipeLeft']){ this['eventswipeLeft'].map(function(fn){ fn(event); }); } }
    else { this['eventswipeRight'].map(function(fn){ fn(event); }); }
  }
  function bindEvent(dom, type, callback) {
    if(!dom) { console.error('dom is null or undefined'); }
    let flag = eventArr.some(key => dom[key]);
    if(!flag) {
      dom.addEventListener('touchstart', touchStart);
      dom.addEventListener('touchend', touchEnd);
    }
    if(!dom['event'+type]) { dom['event'+type] = []; }
    dom['event'+type].push(callback);
  }
  function removeEvent(dom, type, callback) {
    if(dom['event'+type]) {
      for(let i=0; i<dom['event'+type].length; i++) {
        if(dom['event'+type][i]===callback) { dom['event'+type].splice(i, 1); i--; } 
      }
      if(dim['event'+type] && dom['event'+type].length===0) {
        delete dom['event'+type];
        let flag = eventArr.every(key => !dom[key]);
        if(flag) {
          dom.removeEventListener('touchstart', touchStart);
          dom.removeEventListener('touchend', touchEnd);
        }
      }
    }
  }
  return {
    bindEvent,
    removeEvent
  }
})();