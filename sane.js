var sane={
	backtime:function(a,b){var day=(24*3600*1000);return (a.getTime()-day*b);},
	setzero:function(d){d.setHours(0);d.setMinutes(0);d.setSeconds(0);},
	setdmdm:function(ds,Ds,Ms,de,De,Me){ds.setDate(Ds);ds.setMonth(Ms);de.setDate(De);de.setMonth(Me);},
	weekstarter:function(d,f){while(d.getDay()!=parseInt(f)){d.setTime(sane.backtime(d,-1));}},
	get:function(sel){let flag=sel.indexOf(':')>-1;
		let a=flag?sel.split(':')[0]:sel[0];let b=flag?sel.split(':')[1]:sel[1];
		console.log(a+' # '+b+' # '+sel);
		var st=new Date();var ed=new Date()
		if(this.op[a]){sel=sel.substr(1);
			if(typeof this.op[a]=='function'){this.op[a](b,st,ed)}
			else if(this.op[a][b]){sel=sel.substr(1);console.log(sel);this.op[a][b](sel,st,ed);}}
		else{}
		this.setzero(st);this.setzero(ed);return {s:st,e:ed};},
	op:{'-':{'d':function(c,s,e){s.setDate(s.getDate()-parseInt(c))},
			'w':function(c,s,e){s.setTime(sane.backtime(s,7*parseInt(c)));},
			'm':function(c,s,e){s.setMonth(s.getMonth()-(parseInt(c)%12));s.setFullYear(s.getFullYear()-(Math.trunc(parseInt(c)/12)));},
			'y':function(c,s,e){s.setFullYear(s.getFullYear()-parseInt(c));},
			't':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*3)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*3)/12)));},
			'q':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*4)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*4)/12)));},
			's':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*6)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*6)/12)));},},
		'c':{'d':function(c,s,e){if(!c){c=1}
					s.setDate(s.getDate()-parseInt(c)+1);e.setDate(e.getDate()+1)},
			'w':function(c,s,e){if(!c){c=1}
					sane.weekstarter(e,1);s.setTime(sane.backtime(e,7*parseInt(c)));},
			'm':function(c,s,e){if(!c){c=1}
					sane.setdmdm(e,1,e.getMonth()+1,s,1,e.getMonth()-parseInt(c)+1);},
			'y':function(c,s,e){if(!c){c=1}
					sane.setdmdm(s,1,0,e,1,0);e.setFullYear(e.getFullYear()+1);s.setFullYear(e.getFullYear()-c);},
			't':function(c,s,e){let t;if(!c){c=1}
					if(e.getMonth()==0){t=1;}else{t=Math.trunc(e.getMonth()/3);}
					if(t==3){e.setFullYear(e.getFullYear()+1);sane.setdmdm(e,1,0,s,1,0);}else{sane.setdmdm(e,1,((t+1)*3),s,1,((t+1)*3));}
					s.setMonth(s.getMonth()-((parseInt(c)*3)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*3)/12)));},
			'q':function(c,s,e){let t;if(!c){c=1}
					if(e.getMonth()==0){t=1;}else{t=Math.trunc(e.getMonth()/4);}
					if(t==2){e.setFullYear(e.getFullYear()+1);sane.setdmdm(e,1,0,s,1,0);}else{sane.setdmdm(e,1,((t+1)*4),s,1,((t+1)*4));}
					s.setMonth(s.getMonth()-((parseInt(c)*4)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*4)/12)));},
			's':function(c,s,e){let t;if(!c){c=1}
					if(e.getMonth()==0){t=1;}else{t=Math.trunc(e.getMonth()/6);}
					if(t==1){e.setFullYear(e.getFullYear()+1);sane.setdmdm(e,1,0,s,1,0);}else{sane.setdmdm(e,1,((t+1)*6),s,1,((t+1)*6));}
					s.setMonth(s.getMonth()-((parseInt(c)*6)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*6)/12)));},
		},'d':function(c,s,e){s.setDate(1);s.setMonth(0);s.setTime(sane.backtime(s,-parseInt(c)+1));e.setTime(sane.backtime(s,-1));},
			'w':function(c,s,e){sane.setdmdm(s,1,0,e,1,0);sane.weekstarter(s,1);
					s.setTime(sane.backtime(s,(1-parseInt(c))*7));e.setTime(sane.backtime(s,-7));},
			'm':function(c,s,e){sane.setdmdm(s,1,parseInt(c)-1,e,1,parseInt(c));},
			't':function(c,s,e){c=parseInt(c);if(c==1){sane.setdmdm(s,1,0,e,1,3);}
					else if(c==2){sane.setdmdm(s,1,3,e,1,6);}
					else if(c==3){sane.setdmdm(s,1,6,e,1,9);}
					else if(c==4){sane.setdmdm(s,1,9,e,1,0);e.setFullYear(e.getFullYear()+1);}},
			'q':function(c,s,e){c=parseInt(c);if(c==1){sane.setdmdm(s,1,0,e,1,4);}
					else if(c==2){sane.setdmdm(s,1,4,e,1,8);}
					else if(c==3){sane.setdmdm(s,1,8,e,1,0);e.setFullYear(e.getFullYear()+1);}},
			'fw':function(arg,s,e){},
			's':function(arg,s,e){
					if(arg[0]=='1'){sane.setdmdm(s,1,0,e,1,6);}
					else{sane.setdmdm(s,1,6,e,1,0);e.setFullYear(s.getFullYear()+1);
}	}	}	};
