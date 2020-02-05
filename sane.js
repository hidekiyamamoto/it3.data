var sane={
	backtime:function(a,b){var day=(24*3600*1000);return (a.getTime()-day*b);},
	setzero:function(d){d.setHours(0);d.setMinutes(0);d.setSeconds(0);},
	setdmdm:function(ds,Ds,Ms,de,De,Me){ds.setDate(Ds);ds.setMonth(Ms);de.setDate(De);de.setMonth(Me);},
	get:function(sel){let flag=sel.indexOf(':')>-1;
		let a=flag?sel.split(':')[0]:sel[0];let b=flag?sel.split(':')[1]:sel[1];
		console.log(a+' # '+b);
		var st=new Date();var ed=new Date()
		if(this.op[a]){sel=sel.substr(1);
			if(typeof this.op[a]=='function'){this.op[a](b,st,ed)}
			else if(this.op[a][b]){sel=sel.substr(1);this.op[a][b](sel,st,ed);}}
		else{}
		this.setzero(st);this.setzero(ed);return {s:st,e:ed};},
	op:{'-':{'d':function(c,s,e){s.setDate(s.getDate()-parseInt(c))},
			'w':function(c,s,e){},
			'm':function(c,s,e){},
			'y':function(c,s,e){},
			't':function(c,s,e){},
			'q':function(c,s,e){},
			's':function(c,s,e){},},
		'c':{'d':function(c,s,e){},
			'w':function(c,s,e){},
			'm':function(c,s,e){},
			'y':function(c,s,e){},
			't':function(c,s,e){},
			'q':function(c,s,e){},
			's':function(c,s,e){},
		},'fw':function(arg,s,e){},
		's':function(arg,s,e){
				if(arg[0]=='1'){sane.setdmdm(s,1,0,e,1,6);}
				else{sane.setdmdm(s,1,6,e,1,0);e.setFullYear(s.getFullYear()+1);
}	}	}	};
console.log(sane.get('s:1'));
console.log(sane.get('s:2'));
console.log(sane.get('-d1'));
