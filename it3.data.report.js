if(streamSaver){it3.dowloadbig=function(data,fn){
	let fileStream=streamSaver.createWriteStream(fn);
	let writer = fileStream.getWriter();
	let encoder=new TextEncoder();
	let uint8array = encoder.encode(JSON.stringify(data) + "\n\n");
	writer.write(uint8array);
	writer.close();};}
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
