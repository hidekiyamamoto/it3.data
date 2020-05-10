if(!window.X){window.X={};}
it3.dowloadbig=function(data,fn){
	let fileStream=streamSaver.createWriteStream(fn);
	let writer = fileStream.getWriter();
	let encoder=new TextEncoder();
	let uint8array = encoder.encode(JSON.stringify(data) + "\n\n");
	writer.write(uint8array);
	writer.close();};
it3.data={};it3.data.weekstart=1;
it3.data.sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds));};
it3.data.is_dbnull=function(v){
	if(v==undefined){return true}
	if(v==null){return true}
	if(v==0){return true}
	if(v=='0'){return true}
	return false
};
it3.data.pad=function(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
};
//it3.data.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//var basicurl='https://xingu.tech/u/subprofiles?onload=loadprofiles&mode=json&xtoken=%XTOKEN'.replace('%XTOKEN',encodeURIComponent(window.XTOKEN));
it3.data.Graph=function(source,ghtype,_revertdata,_next){if(!_revertdata){_revertdata={};}
	//_page,_metric,_metrics,_metrics_type,_grouped,_coords
	this.source=source;this.ghtype=ghtype;this.grouped=_revertdata._grouped;this.filtered=_revertdata._filtered;
	this.gitem=null;this.xobj=null;this._init(_revertdata,_next);};
it3.data.Graph.prototype={
	_init:function(_revertdata,_next){		
		if(!this.page){this.page=this.source.R.current_page}
		if(!this.grouped){if(this.source.G){this.grouped=JSON.parse(JSON.stringify(this.source.G));}}
		if(!this.filtered){if(this.source.F){this.filtered=JSON.parse(JSON.stringify(this.source.F));}}
		if(_revertdata.coords){_revertdata.coords.static=it3.data.report_static;}		
		this.gitem=this.page.grid.addItem(_revertdata.coords||{"x":0,"y":0,"w":12,"h":14,static:it3.data.report_static});
		this.gitem.gobj=this;
		it3.data.sleep(250).then(()=>{let tgt=document.getElementById(this.gitem.id);			
			if(!tgt){console.log('timeout with vue grid problem')}
			this.element=tgt;this.xobj=this['_as_'+this.ghtype](tgt,_revertdata,_next);
	});},
	destroy:function(removegitem){this.xobj.destroy();it3.clearchilds(this.gitem.id);if(removegitem){this.page.grid.removeItem(this.gitem);}},
	_ui_onregroup:function(G,F){this.grouped=G;this.filtered=F;if(this.xobj){if(this.ghtype=='tinymce'){console.log('Should never be here, but no problem.');}
		else{this.xobj.destroy();let elm=document.getElementById(this.gitem.id);it3.clearchilds(elm);
		this.xobj=this['_as_'+this.ghtype](elm,{});}}},
	_as_tinymce:function(tgt,_revertdata,_next){tinyid=it3.uid('tiny');var _ox=this;var ctc=_revertdata.content||'';
		if(ctc.indexOf('class="report-gtext"')>-1){tgt.innerHTML=ctc;}
		else{this.tinyelm=it3.ins(tgt,'div',['id',tinyid,'class','report-gtext','style','width:100%;height:100%;'],ctc);}
		if(it3.data.report_static){
			if(_next){_next(this.tinyelm);}return this.tinyelm;
		}else{
			return this._re_tiny(function(tiny){_ox.xobj=tiny},_next);
		}
	},
	formatLocal:function(num){
		return num.toLocaleString();
	},	
	formatPerc:function(num){		
		return parseFloat(num).toLocaleString()+'%';
	},	
	formatVal:function(num){
		return parseFloat(num).toLocaleString()+'€';
	},	
	_as_table:function(tgt,_revertdata,_next){
		let t=it3.ins(tgt,'table',['class','report-table','style','width:100%'],'<thead><tr><th>'+this.source.OH.join('</th><th>')+'</th></tr></thead><tbody></tbody>');
		var Fdata=this.source.O;var fixfn;
		for(let h=0;h<this.source.OH.length;h++){
			if(this.source.OH[h]=='Impression'){
				fixfn=this.formatLocal;
			}else if(this.source.OH[h]=='Clicks'){
				fixfn=this.formatLocal;
			}else if(this.source.OH[h]=='Units'){
				fixfn=this.formatLocal;
			}else if(this.source.OH[h]=='UnitsSSKU'){
				fixfn=this.formatLocal;
			}else if(this.source.OH[h]=='Orders'){
				fixfn=this.formatLocal;
			}else if(this.source.OH[h]=='Ord.SSKU'){
				fixfn=this.formatLocal;
			}else if(this.source.OH[h]=='CTR'){
				fixfn=this.formatPerc;
			}else if(this.source.OH[h]=='ACOS'){
				fixfn=this.formatPerc;
			}else if(this.source.OH[h]=='CR'){
				fixfn=this.formatPerc;
			}else if(this.source.OH[h]=='Cost'){
				fixfn=this.formatVal;
			}else if(this.source.OH[h]=='CPM'){
				fixfn=this.formatVal;
			}else if(this.source.OH[h]=='CPC'){
				fixfn=this.formatVal;
			}else if(this.source.OH[h]=='Sales'){
				fixfn=this.formatVal;
			}else if(this.source.OH[h]=='SalesSSKU'){
				fixfn=this.formatVal;
			}else if(this.source.OH[h]=='Avg order value'){
				fixfn=this.formatVal;
			}else{
				fixfn=false;
			}
			if(fixfn){
			for(let x=0;x<this.source.O.length;x++){
				this.source.O[x][h]=fixfn(this.source.O[x][h]);
			}}
		}
		let xobj=$(t).DataTable({data:Fdata,"paging":false,dom: 'Bfirtp', colReorder: true,
			"language":{
	"sEmptyTable":     "Nessun dato presente nella tabella",
	"sInfo":           "Vista da _START_ a _END_ di _TOTAL_ elementi",
	"sInfoEmpty":      "Vista da 0 a 0 di 0 elementi",
	"sInfoFiltered":   "(filtrati da _MAX_ elementi totali)",
	"sInfoPostFix":    "",
	"sInfoThousands":  ".",
	"sLengthMenu":     "Visualizza _MENU_ elementi",
	"sLoadingRecords": "Caricamento...",
	"sProcessing":     "Elaborazione...",
	"sSearch":         "Cerca:",
	"sZeroRecords":    "La ricerca non ha portato alcun risultato.",
	"oPaginate": {
		"sFirst":      "Inizio",
		"sPrevious":   "Precedente",
		"sNext":       "Successivo",
		"sLast":       "Fine"
	},
	"oAria": {
		"sSortAscending":  ": attiva per ordinare la colonna in ordine crescente",
		"sSortDescending": ": attiva per ordinare la colonna in ordine decrescente"
	}
},
			buttons:[{extend: 'copy', text: '<i class="fa fa-copy"></i>'},{extend: 'excel', text: '<i class="fa fa-file-excel"></i>'},
			{extend: 'colvis', text: '<i class="fa fa-eye"></i>'}]});
		for(var oh=0;oh<this.source.OH.length;oh++){
			/*if(oh>4){xobj.column(oh).visible(false);}*/
		}
		tgt.insertBefore(xobj.buttons().container()[0],tgt.firstChild);
		if(_next){_next(xobj);}return xobj;},
	_re_tiny:function(_base,_next){var _this=this;_this._tnext=_next;
		var xxx=tinymce.init({selector:'#'+this.gitem.id+' .report-gtext',menubar:false,inline:false,height:'100%',entity_encoding:'raw',verify_html:false,
			plugins: 'print paste importcss searchreplace autolink code visualblocks visualchars image link media template table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists imagetools textpattern noneditable help emoticons',
			toolbar: 'print undo redo | insertfile image media link | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | code | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fontselect fontsizeselect formatselect',
			toolbar_sticky:true,toolbar_drawer:'sliding',
			//quickbars_selection_toolbar: ' bullist numlist outdent indent',
			//contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
			powerpaste_word_import:'clean', powerpaste_html_import: 'clean',
			content_style: "body {padding:0;margin:0;font-size:14px}",
			color_map: [
'#BFEDD2','Light Green','#FBEEB8','Light Yellow','#F8CAC6','Light Red','#ECCAFA','Light Purple','#C2E0F4','Light Blue','#2DC26B','Green','#F1C40F','Yellow',
'#E03E2D','Red','#B96AD9','Purple','#3598DB','Blue','#169179','Dark Turquoise','#E67E23','Orange','#BA372A','Dark Red','#843FA1','Dark Purple','#236FA1',
'Dark Blue','#ECF0F1','Light Gray','#CED4D9','Medium Gray','#95A5A6','Gray','#7E8C8D','Dark Gray','#34495E','Navy Blue','#000000','Black','#ffffff','White'],
			init_instance_callback:function(editor){_this.xobj=editor;			
				editor.contentDocument.body.style.backgroundColor = 'rgb(245,245,245)';editor.show();
				editor.on('click', function(e){DASH.select_gitem(false,_this,true);});
				if(_base){_base(editor)}if(_next){_next(editor)}
		}});return xxx;},
	'_as_pie-graph':function(tgt,_revertdata,_next){let midx=-1;let o=0;
		var metric1=(_revertdata['metric1']);
		if(!metric1){if(this['metric1_sel']){metric1=this['metric1_sel'].options[this['metric1_sel'].selectedIndex].value}}
		if(!metric1){metric1='Impression';}	
		for(o=0;o<this.source.OH.length;o++){if(this.source.OH[o]==metric1){midx=o;break}}		
		var time_cats=[];var series=[];let oseries={};let tmp;let k='';
		for(o=0;o<this.source.O.length;o++){
			for(k in this.source.OUTIDX){if(this.source.OUTIDX[k]==o){
				time_cats.push(k);if(!oseries[k]){oseries[k]={name:k,y:0}}
			}}}
		for(k=0;k<time_cats.length;k++){
			for(o in oseries){tmp=0;
				if(time_cats[k]==o){tmp=parseFloat(this.source.O[this.source.OUTIDX[time_cats[k]]][midx]);oseries[o].y=tmp;}
		}	}		
		for(o in oseries){series.push(oseries[o])}
		oseries=[{name:'Metrics',colorByPoint:true,data:series}]; 
		let newchart=Highcharts.chart(tgt, {credits:{enabled:false},
			chart:{type:'pie',zoomType : false,plotBackgroundColor:null,plotBorderWidth:null,plotShadow: false},title:{floating:true,align:'left',text:metric1},
			tooltip:{pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'},
			plotOptions:{pie:{allowPointSelect:true,cursor:'pointer',dataLabels:{enabled:false},showInLegend:true}},
			series: oseries});
		this._add_metric('metric1_sel',metric1);
		if(_next){_next(newchart)}return newchart;
	},
	'_as_flux-graph':function(tgt,_revertdata,_next){let midx=-1;let o=0;
		var metric1=(_revertdata['metric1']);
		if(!metric1){if(this['metric1_sel']){metric1=this['metric1_sel'].options[this['metric1_sel'].selectedIndex].value}}
		if(!metric1){metric1='Impression';}		
		for(o=0;o<this.source.OH.length;o++){if(this.source.OH[o]==metric1){midx=o;break}}		
		var time_cats=[];var series=[];let oseries={};let tmp;let k='';
		for(o=0;o<this.source.O.length;o++){
			if(time_cats.indexOf(this.source.O[o][0])<0){time_cats.push(this.source.O[o][0]);}
			for(k in this.source.OUTIDX){if(this.source.OUTIDX[k]==o){
				k=k.replace(this.source.O[o][0],'');
				if(!oseries[k]){oseries[k]={name:k,data:[]}}
			break}}}
		for(k=0;k<time_cats.length;k++){
			for(o in oseries){tmp=0;
				if(this.source.OUTIDX[time_cats[k]+o]){tmp=parseFloat(this.source.O[this.source.OUTIDX[time_cats[k]+o]][midx]);}
				oseries[o].data.push(tmp);
		}	}		
		for(o in oseries){series.push(oseries[o])}
		let newchart=Highcharts.chart(tgt,{series:series,credits:{enabled:false},
			chart:{type:'streamgraph',zoomType : false,marginBottom:30},
			title:{floating:true,align:'left',text:metric1},subtitle:false,				
			xAxis:{maxPadding:0,margin:20,crosshair:true,
				type:'category',categories:time_cats,
				labels:{align:'left',reserveSpace:false,rotation:270},
				lineWidth:0,tickWidth:0},
			yAxis:{visible:false,startOnTick:false,endOnTick:false},
			legend:{enabled:false},
			plotOptions:{series:{label:{minFontSize:5,maxFontSize:15,style:{color:'rgba(255,255,255,0.75)'}}}},
		});
		this._add_metric('metric1_sel',metric1);if(_next){_next(newchart)}return newchart;
	},
	'_as_bubble':function(tgt,_next){
		let newchart=false;
		/*Highcharts.chart(tgt, {
			if(){tmpui=it3.ins(this.ui_group_time,'option',['value',tmp[c].name],tmp[c].name);}
			else{tmpui=it3.ins(this.ui_group_time,'option',['value',tmp[c].name],tmp[c].name);}
		*/
		this._add_metric('metric1_sel');	
		this._add_metric('metric2_sel');	
		this._add_metric('metric3_sel');	
		return newchart;
	},
	'_as_bubble-graph':function(tgt,_reverdata,_next){let SS=this.source;let midx1=-1;let midx2=-1;let midx3=-1;let o=0;		
		var metric1=(this['vmetric1_sel']||'Impression');var metric2=(this['vmetric2_sel']||'Clicks');var metric3=(this['vmetric3_sel']||'CTR');		
		for(o=0;o<SS.OH.length;o++){if(SS.OH[o]==metric1){midx1=o;}if(SS.OH[o]==metric2){midx2=o;}if(SS.OH[o]==metric3){midx3=o;}}		
		var time_cats=[];var series=[];let oseries={};let tmp;let k='';
		for(o=0;o<SS.O.length;o++){
			if(time_cats.indexOf(SS.O[o][0])<0){time_cats.push(SS.O[o][0]);}
			for(k in SS.OUTIDX){if(SS.OUTIDX[k]==o){
				//k=k.replace(this.source.O[o][0],'');
				time_cats.push(k);
				if(!oseries[k]){oseries[k]={name:k,data:[]}}
			break}}}
		for(k=0;k<time_cats.length;k++){
			for(o in oseries){tmp={x:0,y:0,z:0};
				if(time_cats[k]==o){
					tmp.x=parseFloat(SS.O[SS.OUTIDX[time_cats[k]]][midx3]);
					tmp.y=parseFloat(SS.O[SS.OUTIDX[time_cats[k]]][midx2]);
					tmp.z=parseFloat(SS.O[SS.OUTIDX[time_cats[k]]][midx1]);
					tmp.name=time_cats[k];
					oseries[o].data=tmp;
		}	}	}
		for(o in oseries){series.push(oseries[o].data)}
		let newchart=Highcharts.chart(tgt,{series:[{data:series}],legend:{enabled:false},credits:{enabled:false},
			chart:{type:'bubble',plotBorderWidth:1,zoomType:false},	
			title:{floating:true,text:metric1,align:'left'},		
			xAxis:{title:{text:metric3},gridLineWidth:1,accessibility:{rangeDescription:metric3},labels:{format:'{value}'}},
			yAxis:{title:{text:metric2},maxPadding:0.2,accessibility:{rangeDescription:metric2},labels:{format:'{value}',startOnTick:false,endOnTick:false}},
			plotOptions:{series:{dataLabels:{enabled:true,format:'{point.name}'}}},
			accessibility:{point:{
				descriptionFormatter:function(point){var index=point.index+1;
					return index+', '+point.name+', '+metric1+': '+point.z +
						'g, sugar: '+point.x + 'g, '+metric3+': '+point.y+'%.';
			}	}	},
			tooltip:{useHTML:true,headerFormat:'<table>',
				pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
					'<tr><th>'+metric3+':</th><td>{point.x}</td></tr>' +
					'<tr><th>'+metric2+':</th><td>{point.y}</td></tr>' +
					'<tr><th>'+metric1+':</th><td>{point.z}</td></tr>',
				footerFormat: '</table>',followPointer: true
		}});	
		this._add_metric('metric1_sel');	
		this._add_metric('metric2_sel');	
		this._add_metric('metric3_sel');
		if(_next){_next(newchart)}return newchart;
	},
	'_as_xy-graph':function(tgt,_revertdata,_next){
		if(!this.metrics){this.metrics=_revertdata._metrics};
		if(!this.metrics_type){this.metrics_type=_revertdata._metrics_type};		
		var ctype='spline';
		if(_revertdata){if(_revertdata.grouped){if(_revertdata.grouped.Campaign=='grouped'){ctype='column'}}}
		if(!this.metrics){if(this.source.OH){this.metrics=[];let metric={};this.metrics_type={};
			for(let i=0;i<this.source.OH.length;i++){
				this.metrics_type[this.source.OH[i]]=ctype;
				if(i!=0){metric[this.source.OH[i]]=false;}
				else{metric[this.source.OH[i]]=true;}
				this.metrics.push(metric);
		}	}	}
		var metrics=this.source.oo.def.cols;
		let m=null;let midx=0;var mseries=[];var maxis=[];var maxis2={};let o=0;
		let cats=[];
		//for(o=0;o<this.source.OH.length;o++){
			for(let k in this.source.OUTIDX){
				//if(this.source.OUTIDX[k]==o){
					cats.push(k);
			//}
			}
		//}
		for(m in metrics){if(metrics[m].axis){if((metrics[m].axis!='date')&&(metrics[m].axis!='string')){let d=[];
			
			for(o=0;o<this.source.OH.length;o++){if(this.source.OH[o]==metrics[m].name){midx=o;break}}
			for(o=0;o<this.source.O.length;o++){
				let v=(typeof this.source.O[o][midx]=='number')?this.source.O[o][midx]:parseFloat(parseFloat(this.source.O[o][midx].replace(/%/g,'').replace(/€/g,'')).toFixed(2));
				if(ctype!='bar'){d.push([this.source.O[o][0],v]);}else{d.push([v]);}
			}
			if(!maxis2[metrics[m].axis]){maxis2[metrics[m].axis]=maxis.length;
				maxis.push({title:false,labels:{style:{color:Highcharts.getOptions().colors[mseries.length]}}});
			}
			let vis=false;
			if(metrics[m].name=='Impression'){vis=true}
			if(metrics[m].name=='Clicks'){vis=true}
			if(_revertdata){
				if(_revertdata.xyrevert){
					vis=_revertdata.xyrevert[metrics[m].name].show;
				}
			}
			mseries.push({name:metrics[m].name,data:d,yAxis:maxis2[metrics[m].axis],visible:vis,type:this.metrics_type[metrics[m].name],opacity:0.8,				
			events:{legendItemClick:function(x){it3.fix(x.browserEvent);if(!it3.data.report_static){
				let S=this.chart.series[this.index];let O=S.options;delete O.lineWidth;
				if(this.visible){if(O.type=='areaspline'){O.type='spline';}else if(O.type=='spline'){O.type='column';}else if(O.type=='column'){O.type='scatter';}
					else if(O.type=='scatter'){O.type='areaspline';}else if(O.type=='hidden'){O.type='areaspline';}
					S.setOptions(O);S.update();if(O.type=='spline'){S.hide()}return false;}
			}}	}	});
		}}}
		let newchart=Highcharts.chart(tgt,{yAxis:maxis,series:mseries,chart:{zoomType : false},credits:{enabled:false},
			title:false,subtitle:false,legend:{enabled:true},
			xAxis:{categories:cats/*,title:false*/,showLastLabel:true,
				labels:{format:'{value}'},maxPadding:0.02},
			tooltip:{shared:true,crosshairs:true},
			plotOptions:{spline:{marker:{enable:false}}},
			boost:{enabled:false}
		});
		if(_next){_next(newchart)}return newchart;
	},
	_add_metric:function(m_elm_nm,_select){
		if(!_select){if(m_elm_nm.indexOf('1')>-1){_select='Impression'}
			else if(m_elm_nm.indexOf('2')>-1){_select='Clicks'}
			else if(m_elm_nm.indexOf('3')>-1){_select='CTR'}}
		if(this[m_elm_nm]){console.log('existing ok');}else{var  _this=this;var _m_elm_nm=m_elm_nm;
			let c=0;let tmp=this.source.oo.def.cols;
			let XB=document.getElementById(this.gitem.id).previousSibling;
			this[m_elm_nm]=it3.ins(XB.parentNode,'select',['class','gitem-metric sel-ctr'],'',XB);			
			for(c=0;c<tmp.length;c++){this.source.out_adapter[tmp[c].name.replace(/ /g,'').toLowerCase()]=c;let _c=c;
				if(tmp[c].axis){if((tmp[c].axis!='date')&&(tmp[c].axis!='string')){
					if(tmp[c].name==_select){it3.ins(this[m_elm_nm],'option',['value',tmp[c].name,'selected','selected'],tmp[c].name);}
					else{it3.ins(this[m_elm_nm],'option',['value',tmp[c].name],tmp[c].name);}
			}}}
			this[m_elm_nm].addEventListener('click',function(ev){ev.cancelBubble=true;});			
			this[m_elm_nm].addEventListener('change',function(ev){
				_this['v'+_m_elm_nm]=ev.target.options[ev.target.selectedIndex].innerHTML;
				_this.xobj.destroy();_this.xobj=_this['_as_'+_this.ghtype](document.getElementById(_this.gitem.id),true);
			});	
		}	
	},
};
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
it3.data.ReportData=function(report,name,data,oo,_Tdata){this.uid=it3.uid();this.guid='g'+this.uid;this.R=report;this.D=data;this.name=name;
	this._Tdata=_Tdata;
	this.oo=oo;this.O=[];this.G={};this.F={};this.ui=null;this.out_adapter={};this.init();};it3.data.ReportData.prototype={
	init:function(){let _this=this;let tmp=null;let tmpui=null;let c=0;
		if(this.oo.add_date_segments_from_col){
			//todo:add columns to cols def
			for(c=0;c<this.D.length;c++){tmp=this.D[c];
				d_date=new Date(tmp[this.oo.add_date_segments_from_col]);
				d_date.setMinutes(Math.abs(d_date.getTimezoneOffset()));
				this.D[c]['year']=d_date.getFullYear();this.D[c]['month']=this.D[c]['year']+'-'+it3.data.pad(d_date.getMonth()+1,2);
				this.D[c]['2weeks']=this.week_selector(d_date);this.D[c]['week']=this.week_selector(d_date);
				this.D[c]['day']=d_date.getFullYear()+'-'+it3.data.pad(d_date.getMonth()+1,2)+'-'+it3.data.pad(d_date.getDate(),2);	
		}	}
		//fill out adapter and draw ui;		
		this.ui=it3.ins(this.R.grouping_target,'div',['id',this.guid,'class','report-source-ui']);
		this.ui_group_time=it3.ins(this.ui,'select',['class','form-control']);
		this.ui_group_time.addEventListener('change',function(ev){_this._ui_group_handler(ev);});
		it3.ins(this.ui_group_time,'option',['value',''],'ALL');
		this.ui_group_normal=it3.ins(this.ui,'div',['style','margin: 0 9% 0 5%;white-space:nowrap;display:flex']);
		tmp=this.oo.def.cols;let filtertemp;
		for(c=0;c<tmp.length;c++){this.out_adapter[tmp[c].name.replace(/ /g,'').toLowerCase()]=c;let _c=c;
			if(tmp[c].filterable){
				this.F[tmp[c].name]=false;
				filtertemp=it3.ins(this.ui,'input',['title','filter '+tmp[c].name,'class','form-control filter '+tmp[c].name,'placeholder','all','onchange','DASH.current_source.F[\''+tmp[c].name+'\']=this.value'],false,this.ui_group_time);
			}if(tmp[c].groupable){this.G[tmp[c].name]='ungrouped';				
				if(tmp[c].g_exclusive){
					if(tmp[c].name=='week'){tmpui=it3.ins(this.ui_group_time,'option',['value',tmp[c].name,'selected','selected'],tmp[c].name);}
					else{tmpui=it3.ins(this.ui_group_time,'option',['value',tmp[c].name],tmp[c].name);}
				}else{
					tmpui=it3.ins(this.ui_group_normal,'div',['id',this.uid+'_gbutt'+c,'class','report-grouping mdc-chip disabled-chip'],tmp[c].name);
					tmpui.addEventListener('click',function(ev){_this._ui_group_handler(ev,_c);});
	}	}	}	this._regroup()},
	week_selector:function(odate){var out='';let date=new Date(odate);
		date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);
		let d=date.getDay();while(d!=it3.data.weekstart){date=new Date(date.setDate(date.getDate()-1));d=date.getDay();}
		let y=date.getFullYear();let m=date.getMonth()+1;
		if(m<10){out=y+' 0'+m;}else{out=y+' '+m;}
		if(date.getDate()<10){out=out+' 0'+date.getDate()+' -';}
		else{out=out+' '+date.getDate()+' -';}
		var start = new Date(date.getFullYear(), 0, 0);
		var diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
		var oneDay = 1000 * 60 * 60 * 24;
		var day = Math.floor(diff / oneDay);
		out=date.getFullYear()+' / W'+it3.data.pad(Math.floor(day/7)+1,2);
		return out;},
	_regroup:function(){this.O=[];let db_r=0;let c=0;let r=0;
		this.G={};let oo=this.ui_group_time.options;
		for(let o=0;o<oo.length;o++){this.G[oo[o].value]=oo[o].selected?'grouped':'ungrouped';}
		oo=document.querySelectorAll('#'+this.guid+' .mdc-chip');		
		for(let o=0;o<oo.length;o++){this.G[oo[o].innerHTML]=oo[o].classList.contains('selected')?'grouped':'ungrouped';}		
		var db_row=null;var json_file=null;var j_row=null;
		let out_ridx=null;this.OUTIDX={};
		let COLS=this.oo.def.cols;
		for(db_r=0;db_r<this.D.length;db_r++){db_row=this.D[db_r];json_file=db_row.json_file;
			for(r=0;r<json_file.rows.length;r++){j_row=json_file.rows[r];
				//Get out_row_index for this json line
				out_ridx=this.make_idx(db_row,j_row,db_row.j_adapter);
				//Create line if not exists
				if(this.OUTIDX[out_ridx]==undefined){this.OUTIDX[out_ridx]=this.O.length;this.O[this.OUTIDX[out_ridx]]=JSON.parse(JSON.stringify(this.oo.def.empty));}
				//Fill columns with op or fn
				for(c=0;c<COLS.length;c++){
						this.OPS[COLS[c].op].call(this,db_row,j_row,this.OUTIDX[out_ridx],db_row.j_adapter,COLS[c],c);
		}	}	}
		let rem=[];	
		for(r=0;r<this.O.length;r++){
			for(c=0;c<COLS.length;c++){
				//if(COLS[c].x_op){this.O[r][c]=COLS[c].x_op.call(this,this.O[r],COLS[c]);}
				if(COLS[c].x_op){
					//console.log('Calling '+COLS[c].x_op);					
					this.O[r][c]=it3.data.X.X_OPS[COLS[c].x_op].call(this,this.O[r],COLS[c]);
				}
				if(COLS[c].x_fn){
					if((typeof COLS[c].x_fn)=='function'){this.O[r][c]=COLS[c].x_fn(this.O[r]);}
					else{this.O[r][c]='todo'}
				}	
				if(COLS[c].filterable){
					if(!it3.inoe(this.F[COLS[c].name])){
						if(this.O[r][c]!=this.F[COLS[c].name]){
							this.O[r]=null;for(db_r in this.OUTIDX){if(this.OUTIDX[db_r]==r){delete this.OUTIDX[db_r];rem.push(r)}}
							c=10000;
						}
					}
				}
			}if(this.O[r]!=null){
			if(!this.final_accept[this.oo.def.final_accept](this.O[r],this.oo.def.final_accept_args)){
				this.O[r]=null;for(db_r in this.OUTIDX){if(this.OUTIDX[db_r]==r){delete this.OUTIDX[db_r];rem.push(r)}}
		}	}	}
		this.O=this.O.filter(function(value,index,arr){return value != null;});
		rem=rem.sort(function(a,b){return b-a});
		for(db_r in this.OUTIDX){for(r=0;r<rem.length;r++){
			if(this.OUTIDX[db_r]>=rem[r]){this.OUTIDX[db_r]=this.OUTIDX[db_r]-1;}
		}	}
		//Insert titles
		this.O.unshift([]);for(c=0;c<COLS.length;c++){this.O[0].push(COLS[c].name)}
		//Clean grouped columns (they make no sense)
		let col=null;for(r=0;r<this.O.length;r++){
			for(col in this.G){if(this.G[col]=='ungrouped'){this.O[r][this.out_adapter[col.replace(/ /g,'').toLowerCase()]]='#--hide';}}
			this.O[r]=this.O[r].filter(function(value,index,arr){return value != '#--hide';});}
		this.OH=this.O.shift();
	},
	final_accept:{check_non_empty_col:function(output_row,v){for(let k in v){if(it3.data.is_dbnull(output_row[v[k]])){return false}}return true;}},
	make_idx:function(db_row,j_row,j_adapter){var c;var k;var xx=[];
		for(k in this.G){if(this.G[k]=='grouped'){let kmin=k.toLowerCase();				
				if(this.dbidx_tuplets[kmin]){xx.push(db_row[this.dbidx_tuplets[kmin]]);}
				else if(db_row[kmin]){xx.push(db_row[kmin]);}
				else if(j_adapter[this.tuplets[k]]){xx.push((j_row[j_adapter[this.tuplets[k]]])||'');}
		}	}return xx.join('-');},
	dbidx_tuplets:{'canale':'account_type','formato':'sp_o_sb','mrk':'marketplace'},
	tuplets:{'Campaign':'campaignName','adGroup':'adGroupName','Canale':'account_type','Formato':'sp_o_sb',
		'keyword text':'keywordText','match Type':'matchType','targeting Expression':'targetingExpression',
		'targeting Text':'targetingText','targeting Type':'targetingType','sku':'sku','ASIN':'asin',
		'other ASIN':'otherAsin','currency':'currency'},
	OPS:{formula:function(){return null},
		normal:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=j_row[j_adapter[C.source_col||C.name.replace(/ /g,'')]];
			if(v){this.O[out_r_idx][c_idx]=v}},
		dbnormal:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=db_row[C.source_col||C.name.replace(/ /g,'')];
			if(v){this.O[out_r_idx][c_idx]=v}},
		sum:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=j_row[j_adapter[C.source_col]];
			if(j_adapter[C.source_col]){if(v){this.O[out_r_idx][c_idx]=this.O[out_r_idx][c_idx]+parseFloat(j_row[j_adapter[C.source_col]]);}}}},
	/* ------------------------------------------------------------------------------------------------------------------- */
	/* ------------------------------------------------------------------------------------------------------------------- */
	destroy:function(ev){this.O=null;this.OH=null;this.G=null;this.D=null;this.source_option=null;
		this.out_adapter=null;this.emptyline=null;this.name=null;this.uid=null;
		delete this.O;delete this.OH;delete this.G;delete this.D;
		it3.clearchilds(document.getElementById(this.uid));},
	make_graph:function(gtype,_revertdata,_next){var ok=false;var err=false;
		if(gtype=='flux-graph'){var x=this.OH[0];if((x=='year')||(x=='month')||(x=='2 weeks')||(x=='week')||(x=='day')){ok=true}
		else{err='A time grouping is necessary for the stream graph';}}else{ok=true;}
		if(ok){return new it3.data.Graph(this,gtype,_revertdata,_next);}else{return {is_msg:true,msg:err}}},
	revert_groups:function(grouped,filtered,forceregroup){this.G=grouped;this.F=filtered;
		this.ui_group_time.options.forEach(e=>{
			if(this.G[e.value]=='grouped'){e.setAttribute('selected','selected');}else{e.removeAttribute('selected');}});
		let bb=document.querySelectorAll('#'+this.guid+' .report-grouping');
		bb.forEach(e=>{e.classList.remove('disabled-chip');if(this.G[e.innerHTML]=='grouped'){e.classList.add('selected');}
		else{e.classList.remove('selected');}});
		for(let k in filtered){if(filtered[k]){
			if(!it3.inoe(filtered[k])){
				document.querySelector('#'+this.guid+' .filter.'+k).value=filtered[k];
			}
		}}
		if(forceregroup){this._regroup(true);}},
	_ui_group_handler:function(ev,c,exclusive){it3.fix(ev);		
		if(ev.target.classList.contains('mdc-chip')){ev.target.classList.toggle('selected');}
		this._regroup();if(this.R.current_gitem){this.R.current_gitem._ui_onregroup(this.G,this.F);}},
};
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
it3.data.Report=function(target,_menutarget){this.uid=it3.uid('rep');this.barid='bar'+this.uid;
	this.element=it3.ins(target,'div',['id',this.uid]);
	this.sources=[];this.gitems=[];this.pages=[];
	this.ui=null;this.ui_preview=null;
	this.content=null;
	this.current_page=false;this.current_source=false;this.current_gitem=false;
	this.init(_menutarget);};
it3.data.Report.prototype={
	init:function(_menutarget){let _this=this;this.mode='edit';
		this.ui=it3.ins(this.element,'div',['class','report-ui']);
		this.content=it3.ins(this.element,'div');
		if(!_menutarget){_menutarget=this.ui}
		this.report_menu=it3.ins(_menutarget,'div',['id',this.barid,'class','report-menu add_mode','style','display:inline-block'],it3.data.T.report_menu);
		let bb=document.querySelectorAll('#'+this.barid+' .it3-mb.dropdown-menu');
		bb.forEach(e=>{e.addEventListener('click',function(ev){return _this.ui_menu_button(ev);})});
		this.sources_sel=this.report_menu.getElementsByClassName('source-select')[0];
		this.sources_sel.addEventListener('change',function(ev){_this.ui_source_sel_handler(ev)});
		this.rem_src_butt=this.report_menu.getElementsByClassName('remove_source')[0];
		this.rem_src_butt.addEventListener('click',function(ev){_this.rem_source(ev)});
		this.ui_pages_nav=it3.ins(document.getElementById('new_report-items-target'),'div',['class','report-pager']);		
		bb=it3.ins(this.ui_pages_nav,'button',['class','page-thumb'],'<i class="fa fa-plus"></i>');
		bb.addEventListener('click',function(ev){_this.add_page()});
		this.grouping_target=this.report_menu.getElementsByClassName('report-grouping-target')[0];
		this.src_type_sel=this.report_menu.getElementsByClassName('new-src-type')[0];
		this.brands_sel=this.report_menu.getElementsByClassName('new-src-brand')[0];
		it3.data.X=X.advReporting;
	},
	reset_report:function(){let x;for(x=0;x<this.sources.length;x++){this.rem_source(false,this.sources[x].name);}
		for(x=0;x<this.pages.length;x++){this.empty_page(this.pages[x])}},
	destroy:function(){this.reset_report();it3.clearchilds(this.element);window.DASH=false;delete window.DASH;},
	/* SOURCES */
	add_source:function(name,data,oo,_Tdata){
		let i=new it3.data.ReportData(this,name,data,oo,_Tdata);
		this.sources.push(i);let _this=this;
		i.source_option=it3.ins(this.sources_sel,'option',['value',this.sources.length-1],name);
		this.select_source({target:this.sources_sel});
		return i;},
	rem_source:function(ev,name){if(!name){name=this.current_source.name.toString();}		
		for(i=0;i<this.sources.length;i++){if(this.sources[i].name==name){
			this.sources_sel.removeChild(this.sources[i].source_option);
			this.sources[i].destroy();break;}}
		this.sources.splice(i,1);},	
	select_source:function(ev,name,_source){let previous_s=this.current_source;this.current_source=false;
		let idx=-1;if(_source){this.current_source=_source}
		else if(ev){if(typeof ev.target!='number'){idx=ev.target.options[ev.target.selectedIndex].getAttribute('value');}else{idx=ev.target;}
			this.current_source=this.sources[idx];}
		else if(name){for(let gx=0;gx<this.sources.length;gx++){
			if(this.sources[gx].name==name){this.current_source=this.sources[gx];break;}}}
		if(!this.current_source){if(previous_s){this.current_source=previous_s}}
		if(!this.current_source){if(this.sources.length>0){this.current_source=this.sources[0];}else{console.log('No source to select')}}
		if(this.current_source){
			for(let hx=0;hx<this.sources_sel.options.length;hx++){if(this.sources_sel.options[hx].innerHTML==this.current_source.name){this.sources_sel.selectedIndex=hx;}}
			let xx=document.querySelectorAll('.report-source-ui');
			xx.forEach(function(elm){elm.style.display='none'});
			if(this.current_source.ui){this.current_source.ui.style.display='';
				let se=this.report_menu.getElementsByClassName('new-src-menu')[0];
				se.style.display='none';this.rem_src_butt.style.display='';
			}else{
				this.sources_sel.selectedIndex=0;
				let se=this.report_menu.getElementsByClassName('new-src-menu')[0];
				se.style.display='';this.rem_src_butt.style.display='none';
			}
			xx=document.querySelector('.tool-area-bar .report-menu');
			xx.classList.remove('add_mode');
		}else{this.sources_sel.selectedIndex=0;
			let se=this.report_menu.getElementsByClassName('new-src-menu')[0];
			se.style.display='';this.rem_src_butt.style.display='none';			
			xx=document.querySelector('.tool-area-bar .report-menu');
			xx.classList.add('add_mode');
		}
	},
	add_gitem:function(ghtype,sourcename,_revertdata,_next){var xx=null;
		this.select_source(false,sourcename);		
		if(ghtype!='tinymce'){xx=this.current_source.make_graph(ghtype,_revertdata,_next);}
		else{xx=new it3.data.Graph({R:this},ghtype,_revertdata,_next);}
		if(xx.is_msg){return false;}else{
			this.gitems.push(xx);var _this=this;
			//this.select_gitem(false,xx);
		return xx;}},
	_remove_gitem:function(id){var XI;let gx=0;	/*only called by buttons*/		
		for(gx=0;gx<this.gitems.length;gx++){if(this.gitems[gx].gitem.id==id){XI=this.gitems[gx];break;}}
		if(XI==this.current_gitem){this.unselect_all();this.current_gitem=false;}XI.destroy(false);this.gitems.splice(gx,1);},
	unselect_all:function(){
		let oo=document.querySelectorAll('.report-source-ui');oo.forEach(function(o){o.style.display='none'});
		oo=document.querySelectorAll('.sel-ctr,.highcharts-button-symbol,.highcharts-button-box,.dt-buttons,.dataTables_filter');
		oo.forEach(function(o){o.style.display='none'});
		oo=document.querySelectorAll('.dataTables_wrapper');oo.forEach(function(o){o.style.top='0'});	
		oo=document.querySelectorAll('#'+this.guid+' .report-grouping');oo.forEach(e=>{e.classList.add('disabled-chip');});	
		for(let i=0;i<this.gitems.length;i++){
			if(this.gitems[i].ghtype=='tinymce'){if(this.gitems[i].xobj){
				if(this.gitems[i].xobj.destroy){this.gitems[i].xobj.destroy();
					this.gitems[i].element.firstChild.style.visibility='visible';
					this.gitems[i].element.firstChild.style.display='';
				}}
			}else if(this.gitems[i].ghtype=='xy-graph'){
				if(this.gitems[i].xobj){
				for(let s=0;s<this.gitems[i].xobj.series.length;s++){
					if(!this.gitems[i].xobj.series[s].visible){
						oo=this.gitems[i].xobj.series[s].options;oo.showInLegend=false;
						this.gitems[i].xobj.series[s].setOptions(oo);}
				}this.gitems[i].xobj.legend.update();}
	}	}	},
	_get_gitem_by_id:function(id){for(var gx=0;gx<this.gitems.length;gx++){if(this.gitems[gx].gitem.id==id){return this.gitems[gx];}}},
	select_gitem:function(id,_gitem,keep_selection){
		if(it3.data.report_static){this.unselect_all();return;}
		var gid='';if(this.current_gitem){gid=this.current_gitem.gitem.id;}
		if(!_gitem){for(var gx=0;gx<this.gitems.length;gx++){
			if(this.gitems[gx].gitem.id==id){this.current_gitem=this.gitems[gx];break;}}
		}else{this.current_gitem=_gitem}
		if(this.current_gitem){
			if((gid==this.current_gitem.gitem.id)&&(!keep_selection)){
				this.unselect_all();this.current_gitem=false;
			}else{if(gid!=this.current_gitem.gitem.id){this.unselect_all();}
				gid=this.current_gitem.gitem.id;	
				if(this.current_gitem.ghtype!='tinymce'){
				if(this.current_source){if(this.current_source.ui){
					this.current_source.ui.style.display='';
						this.select_source(false,false,this.current_gitem.source);
						this.current_source.revert_groups(this.current_gitem.grouped,this.current_gitem.filtered);
				}}}else{
					if(this.current_gitem.ghtype=='tinymce'){var _ox=this.current_gitem;this.current_gitem._re_tiny(function(tiny){_ox.xobj=tiny});}
					if(this.current_gitem.xobj){if(this.current_gitem.xobj.render){this.current_gitem.xobj.render();}}
				}
				this.select_page(false,this.current_gitem.page);
				var selector='# .sel-ctr,# .highcharts-button-symbol,# .highcharts-button-box,# .dt-buttons,# .dataTables_filter';
				selector=selector.replace(/#/g,'#'+gid);oo=document.querySelectorAll(selector);oo.forEach(function(o){o.style.display=''});				
				oo=document.querySelectorAll('# .dataTables_wrapper'.replace(/#/g,'#'+gid));oo.forEach(function(o){o.style.top='32px'});				
				oo=document.querySelectorAll('#'+this.guid+' .report-grouping');oo.forEach(e=>{e.classList.remove('disabled-chip');});				
				let CB=document.getElementById(this.current_gitem.gitem.id);if(CB){CB=CB.previousSibling;
				CB.style.display='';if(CB.previousSibling){CB.previousSibling.style.display='';
				if(CB.previousSibling.previousSibling){CB.previousSibling.previousSibling.style.display='';
				if(CB.previousSibling.previousSibling.previousSibling){CB.previousSibling.previousSibling.previousSibling.style.display='';}}}}
				if(this.current_gitem.xobj){if(this.current_gitem.xobj.series){
				for(var s=0;s<this.current_gitem.xobj.series.length;s++){
					oo=this.current_gitem.xobj.series[s].options;oo.showInLegend=true;
					this.current_gitem.xobj.series[s].setOptions(oo);}
				this.current_gitem.xobj.legend.update();}}
		}	}else{this.unselect_all();this.current_gitem=false;}
		return this.current_gitem;
	},
	select_page:function(id,_page){if(!_page){
		for(let gx=0;gx<this.pages.length;gx++){
			if(this.pages[gx].id==id){this.current_page=this.pages[gx];break;
		}}}else{this.current_page=_page}
		this.current_page.element=document.getElementById(this.current_page.id);
		let pp=document.querySelectorAll('.report-page');
		pp.forEach(function(e){e.style.display=(e.id==id)?'':'none'});
		if(this.current_page.element){this.current_page.element.style.display='';
			pp=document.querySelectorAll('.page-thumb');pp.forEach(function(e){e.classList.remove('selected')});
			this.current_page.thumb.classList.add('selected');}},
	add_page:function(undraggable){var id=this.uid+it3.uid('pid');var _this=this;let isdraggable=true;if(undraggable==true){isdraggable=false}
		var E=it3.ins(this.content,'div',['id',id,'class','report-page','onclick',"(window.R||window.DASH).ui_page_click(event);"],it3.data.T.vuegrid);
		var G=new Vue({el:E,data:{draggable:isdraggable,resizable:isdraggable,index:0,layout:[]},
			methods:{
				itemTitle:function(item){var result=item.i;if(item.static){result+=" - Static";}return result;},				        
				removeItem:function(item){_this._remove_gitem(item.id);this.layout.splice(this.layout.indexOf(item),1);},
				editItem:function(item,ev){console.log(ev);
					if(!ev.target.classList.contains('dt-button')){if(!ev.target.parentElement.classList.contains('dt-button')){
						if(ev){it3.fix(ev)}_this.select_gitem(item.id,false,true);
				}}},
				addItem:function(obj){var c;var item={"x":obj.x,"y":obj.y,"w":obj.w,"h":obj.h,"i":this.index+"","id":it3.uid('gid')};
					this.index++;this.layout.push(item);return item;},
				resizedEvent:function(i, newX, newY, newHPx, newWPx){	
					for(let x=0;x<this.layout.length;x++){if(this.layout[x].i==i){
						var CGI=DASH._get_gitem_by_id(this.layout[x].id);
						if(CGI.xobj.reflow){CGI.xobj.reflow();
							it3.data.sleep(250).then(()=>{CGI.xobj.reflow();it3.data.sleep(1000).then(()=>{CGI.xobj.reflow();});});}
		}	}	}	}	});
		let pthumb=it3.ins(this.ui_pages_nav,'div',['id',id+'-page-ref','class','page-thumb'],);
		it3.ins(pthumb,'span',['onclick','DASH.select_page(\''+id+'\')'],'Page '+(this.pages.length+1));
		let idx=this.pages.push({id:id,title:'Page '+(this.pages.length+1),element:E,thumb:pthumb,grid:G})-1;
		//let self=this;//this.template.push({'page':(this.pages.length),'sources':[],'current_page':false});
		it3.ins(pthumb,'button',['id',id+'remove-page-button','onclick','DASH.remove_page(event,\''+id+'\')'],'<i class="fa fa-times"></i>');
		this.select_page(id);
		//E.addEventListener('click',function(ev){(window.R||window.DASH).unselect_all()});
		},
			
	remove_page:function(ev,id){let p;let i;ev.stopPropagation();
			for(p=0;p<this.pages.length;p++){if(id==this.pages[p].element.id){break;}}
			console.log('Remove page '+p);
			var pelm=document.getElementById(this.pages[p].id);
			for(i=0;i<this.pages[p].grid.layout.length;i++){
				let item=this.pages[p].grid.layout[i];
				var elm=document.getElementById(item.id);
				if(elm){elm.parentElement.removeChild(elm);}
				item.gobj.destroy(true);
			}this.content.removeChild(pelm);
			//if(p==R.pages.length-1 && R.pages.length!=1){R.show_page(R.pages[p-1].element.id);}
			this.pages[p].thumb.parentElement.removeChild(this.pages[p].thumb);
			for(let h=p;h<this.pages.length-1;h++){this.pages[h]=this.pages[h+1];}
			this.pages.pop();for(i=0;i<this.pages.length;i++){this.pages[i].title='Page '+(i+1);}			
			let page_nav=document.querySelectorAll('.page-thumb');
			for(i=1;i<page_nav.length;i++){page_nav[i].firstChild.innerHTML='Page '+(i);
				page_nav[i].setAttribute('onclick','DASH.select_page(\''+this.pages[i-1].id+'\')');
				page_nav[i].children[1].setAttribute('onclick','DASH.remove_page(event,\''+this.pages[i-1].id+'\')');
			}
			if(this.pages.length==0){this.add_page();}
			this.select_page(this.pages[0].id);
	},
	empty_page:function(page){let i;let x=page.grid.layout.length;for(i=0;i<x;i++){page.grid.removeItem(page.grid.layout[i]);}},	
	/* ########################################################################################################################################## */
	/*LOAD - SAVE*/
	toJSON:function(){var JOUT={sources:[],pages:[]};var s=0;var gi=0;let tmp1=null;let tmp2;this.unselect_all();
		for(s=0;s<this.sources.length;s++){JOUT.sources.push({name:this.sources[s].name,D:this.sources[s].D,oo:this.sources[s].oo});}
		return this._toJSON(JOUT);},
	toJSONT:function(){var JOUT={sourcesT:[],pages:[]};this.unselect_all();
		for(s=0;s<this.sources.length;s++){JOUT.sourcesT.push({market:this.sources[s]._Tdata.market,channel:this.sources[s]._Tdata.channel,timesel:this.sources[s]._Tdata.timesel,rtype:this.sources[s]._Tdata.rtype});}
		return this._toJSON(JOUT);},
	_toJSON:function(JOUT){var s=0;var gi=0;let tmp1=null;let tmp2;
		for(s=0;s<this.pages.length;s++){JOUT.pages[s]=[];
			for(gi=0;gi<this.gitems.length;gi++){if(this.gitems[gi].page==this.pages[s]){tmp1=this.gitems[gi].gitem;
				tmp2={coords:{x:tmp1.x,y:tmp1.y,w:tmp1.w,h:tmp1.h},ghtype:this.gitems[gi].ghtype};
				if(this.gitems[gi].ghtype=='tinymce'){
					tmp2.content=document.getElementById(tmp1.id).innerHTML;
				}else if(this.gitems[gi].ghtype=='xy-graph'){tmp2.xyrevert={};
					tmp2.grouped=this.gitems[gi].grouped;tmp2.filtered=this.gitems[gi].filtered;
					tmp2.sourcename=this.gitems[gi].source.name;
					for(let m=0;m<this.gitems[gi].xobj.series.length;m++){
						tmp2.xyrevert[this.gitems[gi].xobj.series[m].options.name]={show:this.gitems[gi].xobj.series[m].options.showInLegend}
					}
				}else{tmp2.grouped=this.gitems[gi].grouped;tmp2.filtered=this.gitems[gi].filtered;
					tmp2.sourcename=this.gitems[gi].source.name;
					let CB=document.getElementById(this.gitems[gi].gitem.id);if(CB){CB=CB.previousSibling;
						if(CB.previousSibling){CB=CB.previousSibling;tmp2.metric1=CB.options[CB.selectedIndex].innerHTML;}
						if(CB.previousSibling){CB=CB.previousSibling;tmp2.metric2=CB.options[CB.selectedIndex].innerHTML;}
						if(CB.previousSibling){CB=CB.previousSibling;tmp2.metric3=CB.options[CB.selectedIndex].innerHTML;}
				}	}
				JOUT.pages[s].push(tmp2);
		}	}	}
		return JOUT;
	},
	fromJSON:function(JIN,undraggable){
		Highcharts.setOptions({
			plotOptions: {
				series: {
					animation: false
				}
			}
		});
		if(JIN.pages){this.loadingItemsCount=0;this.loadingItemsCurr=0;
			for(let p=0;p<JIN.pages.length;p++){
				this.loadingItemsCount=this.loadingItemsCount+JIN.pages[p].length;
		}}
		if((JIN.weekstart)||(JIN.weekstart==0)){it3.data.weekstart=JIN.weekstart;}
		if(JIN.sources){this.fromJSONF(JIN,undraggable);}
		else{this.fromJSONT(JIN,undraggable);}
	},
	fromJSONF:function(JIN,undraggable){this.reset_report();
		for(let x=0;x<JIN.sources.length;x++){this.add_source(JIN.sources[x].name,JIN.sources[x].D,JIN.sources[x].oo);}
		var PPIDX=0;var GIIDX=0;var _this=this;var lastP=-1;
		this.preview_mode();
		var item_load_step=function(){
			_this.unselect_all();
			if(GIIDX<JIN.pages[PPIDX].length){
				var llin=document.getElementById('loading-inside');if(llin){document.getElementById('loading-wrap').style.display='';
					llin.innerHTML='Loading Page '+(PPIDX+1)+'/'+JIN.pages.length+' - Item '+(GIIDX+1)+'/'+JIN.pages[PPIDX].length;
					var bar=document.getElementById('loading-bar');
					bar.style.width=(Math.round((33/DASH.loadingItemsCount)*DASH.loadingItemsCurr))+'%';
					DASH.loadingItemsCurr=DASH.loadingItemsCurr+1;}
				var NGI=JIN.pages[PPIDX][GIIDX];
				if(PPIDX>0){if(lastP!=PPIDX){lastP=PPIDX;_this.add_page(undraggable);}}
				if(NGI.ghtype=='tinymce'){_this.add_gitem('tinymce',false,NGI,function(xobj){GIIDX=GIIDX+1;item_load_step();});}
				else{
					_this.select_source(false,NGI.sourcename);
					_this.current_source.revert_groups(NGI.grouped,NGI.filtered,true);
					_this.add_gitem(NGI.ghtype,NGI.sourcename,NGI,function(xobj){GIIDX=GIIDX+1;item_load_step();});
				}
			}else{GIIDX=0;PPIDX=PPIDX+1;if(PPIDX<JIN.pages.length){item_load_step();}else{console.log('finished load file');
				var ll=document.getElementById('loading-wrap');if(ll){ll.style.display='none';}
				setTimeout("DASH.unselect_all();",100)}}
		};item_load_step();},
	fromJSONT:function(JIN,undraggable){this.reset_report();
		var SSIDX=-1;var _this=this;
		var loadsources=function(){SSIDX=SSIDX+1;
			if(SSIDX<JIN.sourcesT.length){
				it3.data.X._add_source(JIN.sourcesT[SSIDX].timesel,JIN.sourcesT[SSIDX].market,JIN.sourcesT[SSIDX].channel?JIN.sourcesT[SSIDX].channel:'ALL',JIN.sourcesT[SSIDX].rtype,loadsources);				
			}else{_this._fromJSONT_step2(JIN,undraggable);}
		};loadsources();
	},
	_fromJSONT_B4:function(JIN){
		var bb=[];
		for (let s=0;s<JIN.sourcesT.length;s++){
			
		}
		//Show table of replacements
		//Refill JIN
		//Call fromJSONT(JIN)
	},
	_fromJSONT_step2:function(JIN,undraggable){
		//this.reset_report();
		//for(let x=0;x<JIN.sources.length;x++){this.add_source(JIN.sources[x].name,JIN.sources[x].D,JIN.sources[x].oo);}
		var PPIDX=0;var GIIDX=0;var _this=this;var lastP=-1;
		this.preview_mode();
		var item_load_step=function(){
			_this.unselect_all();
			if(GIIDX<JIN.pages[PPIDX].length){
				var NGI=JIN.pages[PPIDX][GIIDX];
				var brandname=DASH.brands_sel.selectedOptions[0].innerHTML;
				if(PPIDX>0){if(lastP!=PPIDX){lastP=PPIDX;_this.add_page(undraggable);}}
				if(NGI.ghtype=='tinymce'){NGI.content=NGI.content.replace('%BRAND',brandname);_this.add_gitem('tinymce',false,NGI,function(xobj){GIIDX=GIIDX+1;item_load_step();});}
				else{
					NGI.sourcename=NGI.sourcename.split('-');
					NGI.sourcename[0]=DASH.brands_sel.selectedOptions[0].innerHTML;
					NGI.sourcename=NGI.sourcename.join('-');
					_this.select_source(false,NGI.sourcename);
					_this.current_source.revert_groups(NGI.grouped,NGI.filtered,true);
					_this.add_gitem(NGI.ghtype,NGI.sourcename,NGI,function(xobj){GIIDX=GIIDX+1;item_load_step();});
				}
			}else{GIIDX=0;PPIDX=PPIDX+1;if(PPIDX<JIN.pages.length){item_load_step();}else{console.log('finished load template');}}
		};item_load_step();},
	preview_mode:function(){this.unselect_all();document.body.classList.add('dashboard_mode');this.toggle_unpreview();},	
	toggle_unpreview:function(){var _this=this;let d=document.getElementById('unpreview-element-modal');
		if(!d){d=it3.ins(document.body,'div',['id','unpreview-element-modal','style','position:absolute;top:0;bottom:50px;left:0;right:0;background-color:transparent;z-index:100;display:none']);
			d.addEventListener('click',function(){if(!document.body.classList.contains('hard')){
			document.getElementById('preview-mode-button').innerHTML='Preview mode';document.getElementById('unpreview-element-modal').style.display='none';document.body.classList.remove('dashboard_mode');}});
		}else{d.style.display='none';}},	
	ui_handleFileSelect:function(evt){var files=evt.target.files;
		for(var i=0,f;f=files[i];i++){
			//if (!f.type.match('.*.json')) {console.log('does not seem json file')}
			var reader=new FileReader();
			reader.onload=(function(theFile){return function(e){DASH.fromJSON(JSON.parse(e.target.result));};})(f);
		reader.readAsText(f);}},
	ui_source_sel_handler:function(ev,skip_sel){
		var idx=ev.target.selectedIndex;
		if(idx==0){this.unselect_all();
			
			let xx=document.querySelectorAll('.report-source-ui');
			xx.forEach(function(elm){elm.style.display='none'});
			xx=this.report_menu.getElementsByClassName('new-src-menu')[0];
			xx.style.display='';this.rem_src_butt.style.display='none';
			xx=document.querySelector('.tool-area-bar .report-menu');
			xx.classList.add('add_mode');
		}else{if(!skip_sel){			
			xx=document.querySelector('.tool-area-bar .report-menu');
			xx.classList.remove('add_mode');this.select_source(ev);}}
	},ui_page_click:function(ev){var flag=true;if(this.current_gitem){flag=false;}this.current_gitem=false;
		this.unselect_all();if(flag){this.preview_mode();}
	},
	ui_menu_button:function(ev){if(ev){let action=ev.target.getAttribute('href');
		if(action){action=action.replace('#','');}else{return false}	
		if(action=='preview'||action=='print'){
			var s=document.getElementById('preview-mode-button');var s=s.innerHTML;			
			if((s.indexOf('view')>-1)||(action=='print')){s.innerHTML='Edit mode';
				this.unselect_all();document.body.classList.add('dashboard_mode');
				this.toggle_unpreview();}
			else{s.innerHTML='Preview mode';document.body.classList.remove('dashboard_mode');}
		}if(action=='print'){window.print();}
		if(action=='reset'){this.reset_report();}
		else if(action=='Add page'){this.add_page(ev)}
		else if(action=='Remove page'){this.remove_page(ev)}
		else if(action=='exportJSON'){it3.dowloadbig(this.toJSON(),'report.json');}
		else if(action=='exportLINK'){
			var a=prompt('Set password (leave empty for none)');
			var T=this.toJSON();
			it3.data.saveURL(a,JSON.stringify(T));
		}
		else if(action=='exportTLINK'){
			var a=prompt('Set password (leave empty for none)');
			var T=this.toJSON();
			X.advReporting.saveURL(a,JSON.stringify(T));
			//it3.dowloadbig(,'report.json');
		}
		else if(action=='exportJSONT'){it3.dowloadbig(this.toJSONT(),'template.json');}
		else if(action=='importJSON'){jQuery('#json-file').click();}
		else if(action.indexOf('gi-')==0){this.add_gitem(action.replace('gi-',''));}
		else if(action=='download_excel'){
			//Download Excel Tables
			it3.data.X.download(ev);
		}else{
			console.log('Unimplemented action '+action);}
	}return false;},
};
it3.data.report_static=false;
it3.data.saveURL=function(pass,ctc){
	var http = new XMLHttpRequest();
	var url = 'https://xingu.tech/u/saveDOCLINK';
	var XD={pass:pass,content:ctc};
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			window.open('http://xingu.tech:8069/web#action=254&model=xingu.doclink&view_type=form&menu_id=168&id='+http.responseText);
			
		}else if(http.readyState == 4 ){
			console.log('Response ended with '+http.status)
		}
	}
	http.send(JSON.stringify(XD));
};

it3.data.T={vuegrid:`<grid-layout :layout="layout"
		:col-num="44"
		:row-height="8"
		:is-draggable="draggable"
		:is-resizable="resizable"
		:vertical-compact="true"
		:use-css-transforms="true"
><grid-item v-for="item in layout" :key="item.id"
	   :static="item.static"
	   :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
	   @resize="resizedEvent"
	   drag-ignore-from="th"
><button @click="removeItem(item)" class="chart_times fa fa-times sel-ctr"></button><div v-bind:id="item.id" @click="editItem(item,event)" class="report-viz">
</div></grid-item></grid-layout>`,
	report_menu:`<div class="form-inline"><div style="display:inline-block;">
<button class="btn btn-sm btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false">File</button>
<div class="it3-mb dropdown-menu">
  <a class="it3-mb dropdown-item" href="#gi-tinymce">Insert Text Element</a>
  <a id="preview-mode-button" class="it3-mb dropdown-item" href="#preview">Preview</a>
  <a class="it3-mb dropdown-item" href="#print">Print</a>
  <div class="dropdown-divider"></div>
  <a class="it3-mb dropdown-item" href="#reset">New...</a>
  <label for="json-file"><a class="it3-mb dropdown-item" href="#importJSON">Open...</a></label><input type="file" id="json-file" name="json-file" onchange="DASH.ui_handleFileSelect(event)" style="display:none;"/>
  <a class="it3-mb dropdown-item" href="#exportJSON">Save</a>
  <a class="it3-mb dropdown-item" href="#embed">Embed</a>
  <a class="it3-mb dropdown-item" href="#exportLINK">Save LINK</a>
  <a class="it3-mb dropdown-item" href="#download_excel">Download Excel Tables</a>
  <div class="dropdown-divider"></div>
  <a class="it3-mb dropdown-item" href="#importJSON">Open from template</a>
  <a class="it3-mb dropdown-item" href="#exportJSONT">Save as template</a>
  <!--<div class="dropdown-divider"></div>
  <a class="it3-mb dropdown-item" href="#exportJSON">Export JSON</a>
  <a class="it3-mb dropdown-item" href="#importJSON">Import JSON</a>-->
</div></div><div style="display:inline-block;">
<button class="insert-btn btn btn-sm btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false">Insert</button>
<div class="it3-mb dropdown-menu rmenu_page-menu">  
  <a class="it3-mb dropdown-item" href="#gi-table">Table element</a>
  <a class="it3-mb dropdown-item" href="#gi-xy-graph">XY graph</a>
  <a class="it3-mb dropdown-item" href="#gi-flux-graph">Flux graph</a>
  <a class="it3-mb dropdown-item" href="#gi-pie-graph">Cake graph</a>
  <a class="it3-mb dropdown-item" href="#gi-bubble-graph">Bubble simple</a>
  <a class="it3-mb dropdown-item" href="#gi-bubble">Bubbles in Time</a>
</div>
</div>
<select class="source-select form-control">
	<option value="insert-new-src">Add source...</option>
</select><button style="display:none;border:none;background:transparent;" class="remove_source" type="button"><i class="fa fa-trash-alt"></i></button>
</div>
<div class="new-src-menu form-inline new-mode" style="margin-left:8px;display:inline-block;">
<select class="new-src-brand form-control mr-sm-2" style="width:150px">
<input id="single-template-file" type="file" class="form-control tpl-ctr"/>
</select><select class="new-src-market form-control new-ctr">
	   <option value="ALL">ALL</option><option value="IT">IT</option><option value="FR">FR</option><option value="ES">ES</option>
		  <option value="DE">DE</option><option value="UK">UK</option><option value="US">US</option></select>
<select class="new-src-channel form-control new-ctr">
	   <option value="ALL" selected="selected">ALL</option><option value="vendor">Vendor</option><option value="seller">Seller</option></select>
<select class="new-src-time form-control mr-sm-2 new-ctr">
	<option value="-y0">Current Year</option>
	<option value="-y1">Previous Year</option>
	<option value="-w6">-6 Weeks [+21]</option>
	<option value="-w12" selected="selected">-12 Weeks [+21]</option>
	<option value="-w52">-52 Weeks [+21]</option>
	<option value="-m3">Last 3m</option>
	<option value="-m6">Last 6m</option>
	<option value="-m12">Last 12m</option>
	<option value="-m24">Last 24m</option>	
	<option value="cq1">curr Q1</option>
	<option value="pq1">prev Q1</option>
	<option value="cq2">curr Q2</option>
	<option value="pq2">prev Q2</option>
	<option value="cq3">curr Q3</option>
	<option value="pq3">prev Q3</option
	<option value="cq4">curr Q4</option>>
	<option value="pq4">prev Q4</option></select>
<select class="new-src-type form-control mr-sm-2 new-ctr"><option value="" disabled=""></option><option value="adGroup">AdGroup</option><option value="keyword">Keyword</option><option value="campaign">Campaign</option><option value="targets">Targets</option><option value="productAd">ProductAd</option><option value="otherAsin">OtherAsin</option></select>
<input type="checkbox" title="week starts on sunday" onchange="if(it3.data.weekstart==1){it3.data.weekstart=0}else{it3.data.weekstart=1}"/>
<button class="btn btn-outline-white btn-sm waves-effect waves-light new-ctr" onclick="it3.data.X.add_source()">Add</button></div>
<div class="new-src-menu form-inline" style="margin-left:8px;display:none;">
</div>
<div class="report-grouping-target form-inline" style="margin-left:8px;">
</div></div>`,
};
it3.data.sane={
	backtime:function(a,b){var day=(24*3600*1000);return (a.getTime()-day*b);},
	setzero:function(d){d.setHours(0);d.setMinutes(0);d.setSeconds(1);},
	setfull:function(d){d.setHours(23);d.setMinutes(59);d.setSeconds(59);},
	setdmdm:function(ds,Ds,Ms,de,De,Me){ds.setMonth(Ms,Ds);de.setMonth(Me,De);},
	weekstarter:function(d,f){while(d.getDay()!=parseInt(f)){d.setTime(it3.data.sane.backtime(d,-1));}},
	monthstarter:function(d){while(d.getDate()!=1){d.setDate(d.getDate()-1);}},
	get:function(sel){let flag=sel.indexOf(':')>-1;
		let a=flag?sel.split(':')[0]:sel[0];let b=flag?sel.split(':')[1]:sel[1];
		var st=new Date();var ed=new Date()
		if(this.op[a]){sel=sel.substr(1);
			if(typeof this.op[a]=='function'){this.op[a](b,st,ed)}
			else if(this.op[a][b]){sel=sel.substr(1);console.log(sel);this.op[a][b](sel,st,ed);}}
		else{}
		this.setzero(st);this.setfull(ed);return {s:st,e:ed};},
	op:{'-':{'d':function(c,s,e){s.setDate(s.getDate()-parseInt(c))},
			'w':function(c,s,e){s.setTime(it3.data.sane.backtime(s,7*parseInt(c)));it3.data.sane.weekstarter(s,it3.data.weekstart);it3.data.sane.weekstarter(e,it3.data.weekstart);e.setDate(e.getDate()-1)},
			'm':function(c,s,e){s.setMonth(s.getMonth()-(parseInt(c)%12));s.setFullYear(s.getFullYear()-(Math.trunc(parseInt(c)/12)));it3.data.sane.monthstarter(s);it3.data.sane.monthstarter(e);e.setDate(e.getDate()-1)},
			'y':function(c,s,e){it3.data.sane.setdmdm(s,1,0,e,31,11);s.setFullYear(s.getFullYear()-parseInt(c));e.setFullYear(s.getFullYear());},
			't':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*3)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*3)/12)));},
			'q':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*4)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*4)/12)));},
			's':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*6)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*6)/12)));},},
		'c':{
			'q':function(c,s,e){let t;if(!c){c=1}it3.data.sane.setdmdm(s,1,3*(c-1),e,1,3*(c-1)+3);e.setDate(e.getDate()-1);},
		},p:{
			'q':function(c,s,e){let t;s.setFullYear(s.getFullYear()-1);e.setFullYear(e.getFullYear()-1);if(!c){c=1}it3.data.sane.setdmdm(s,1,3*(c-1),e,1,3*(c-1)+3);e.setDate(e.getDate()-1);},
		}
		,'d':function(c,s,e){s.setDate(1);s.setMonth(0);s.setTime(it3.data.sane.backtime(s,-parseInt(c)+1));e.setTime(it3.data.sane.backtime(s,-1));},
			'w':function(c,s,e){it3.data.sane.setdmdm(s,1,0,e,1,0);it3.data.sane.weekstarter(s,it3.data.weekstart);
					s.setTime(it3.data.sane.backtime(s,(1-parseInt(c))*7));e.setTime(it3.data.sane.backtime(s,-7));},
			'm':function(c,s,e){it3.data.sane.setdmdm(s,1,parseInt(c)-1,e,1,parseInt(c));},
			't':function(c,s,e){c=parseInt(c);if(c==1){it3.data.sane.setdmdm(s,1,0,e,1,3);}
					else if(c==2){it3.data.sane.setdmdm(s,1,3,e,1,6);}
					else if(c==3){it3.data.sane.setdmdm(s,1,6,e,1,9);}
					else if(c==4){it3.data.sane.setdmdm(s,1,9,e,1,0);e.setFullYear(e.getFullYear()+1);}},
			'q':function(c,s,e){c=parseInt(c);if(c==1){it3.data.sane.setdmdm(s,1,0,e,1,4);}
					else if(c==2){it3.data.sane.setdmdm(s,1,4,e,1,8);}
					else if(c==3){it3.data.sane.setdmdm(s,1,8,e,1,0);e.setFullYear(e.getFullYear()+1);}},
			'fw':function(arg,s,e){},
			's':function(arg,s,e){
					if(arg[0]=='1'){it3.data.sane.setdmdm(s,1,0,e,1,6);}
					else{it3.data.sane.setdmdm(s,1,6,e,1,0);e.setFullYear(s.getFullYear()+1);
}	}	}	};


