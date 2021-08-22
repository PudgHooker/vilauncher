

function DOMready() {
	if(!isAHK())
		AHKinit(),AHKobject.contextmenuEnabled=1;
}

function AHKready() {
	if(!isAHK())
		return 1;
	return 1;
}
function setMsg(msg,perc) {
	if(perc)
		setPerc(perc);
	$('.body .msg').html(msg);
}

function setPerc(perc) {
	$('.body .progress').css('width',perc+'%');
}