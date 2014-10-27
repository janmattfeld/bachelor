/**
 * SOAP-Funktionen
 * 
 * Jan-Henrich Mattfeld
 */

// TODO ajaxSetup
function getKunden() {
	$.ajax({
		url : options.url(options.getKunden),
		type : "POST",
		data : zMguReadKunden,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + options.base64());
		},
		success : function(xml) {
			kundenModel.setData(xml);
		},
		error : function(xhr, status, errThrown) {
			console.log(xhr.status);
			console.log(xhr.statusText);
		},
		timeout : 30000,
		contentType : "text/xml; charset='utf-8'"
	});
}

function getProjekte(kunde) {

	var zMguReadProjekte = soapHeader;
	zMguReadProjekte += '<urn:ZMguReadProjekte>';
	zMguReadProjekte += '<Kunden>' + kunde + '</Kunden>'
	zMguReadProjekte += '<Projekte>';
	zMguReadProjekte += '<item>';
	zMguReadProjekte += '<Mandt></Mandt>';
	zMguReadProjekte += '<Kunde></Kunde>';
	zMguReadProjekte += '<Projekt></Projekt>';
	zMguReadProjekte += '<Bezei></Bezei>';
	zMguReadProjekte += '<PjnrKonz></PjnrKonz>';
	zMguReadProjekte += '<PjnrUms></PjnrUms>';
	zMguReadProjekte += '<PjnrUnfakt></PjnrUnfakt>';
	zMguReadProjekte += '<Prio></Prio>';
	zMguReadProjekte += '<Crnrk></Crnrk>';
	zMguReadProjekte += '<Nosel></Nosel>';
	zMguReadProjekte += '<Prefix></Prefix>';
	zMguReadProjekte += '<CrnrkStellen></CrnrkStellen>';
	zMguReadProjekte += '</item>';
	zMguReadProjekte += '</Projekte>';
	zMguReadProjekte += '</urn:ZMguReadProjekte>';
	zMguReadProjekte += soapFooter;

	$.ajax({
		url : options.url(options.getProjekte),
		type : "POST",
		data : zMguReadProjekte,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + options.base64());
		},
		success : function(xml) {
			projektModel.setData(xml);
		},
		error : function(xhr, status, errThrown) {
			console.log(xhr.status);
			console.log(xhr.statusText);
		},
		timeout : 30000,
		contentType : "text/xml; charset='utf-8'"
	});
}

function getSprints(kunde, projekt) {

	var zMguReadSprint = soapHeader;
	zMguReadSprint += '<urn:ZMguReadSprint>';
	zMguReadSprint += '<Kunde>' + kunde + '</Kunde>';
	zMguReadSprint += '<Projekt>' + projekt + '</Projekt>';
	zMguReadSprint += '<TabSprint>';
	zMguReadSprint += '<item>';
	zMguReadSprint += '<Mandt></Mandt>';
	zMguReadSprint += '<Sprint></Sprint>';
	zMguReadSprint += '<Projekt></Projekt>';
	zMguReadSprint += '<Kunde></Kunde>';
	zMguReadSprint += '<StartDat></StartDat>';
	zMguReadSprint += '<EndDat></EndDat>';
	zMguReadSprint += '<BurnRate></BurnRate>';
	zMguReadSprint += '</item>';
	zMguReadSprint += '</TabSprint>';
	zMguReadSprint += '</urn:ZMguReadSprint>';
	zMguReadSprint += soapFooter;

	$.ajax({
		url : options.url(options.getSprints),
		type : "POST",
		data : zMguReadSprint,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + options.base64());
		},
		success : function(xml) {
			sprintModel.setData(xml);
		},
		error : function(xhr, status, errThrown) {
			console.log(xhr.status);
			console.log(xhr.statusText);
		},
		timeout : 30000,
		contentType : "text/xml; charset='utf-8'"
	});
}

function getAufgaben(kunde, projekt, sprint) {

	var zMguReadAufgaben = soapHeader;
	zMguReadAufgaben += '<urn:ZMguReadAufgaben>';
	zMguReadAufgaben += '<Aufgaben>';
	zMguReadAufgaben += '<item>';
	zMguReadAufgaben += '<Aufgabenid></Aufgabenid>';
	zMguReadAufgaben += '</item>';
	zMguReadAufgaben += '</Aufgaben>';
	zMguReadAufgaben += '<Kunde>' + kunde + '</Kunde>';
	zMguReadAufgaben += '<Projekt>' + projekt + '</Projekt>';
	zMguReadAufgaben += '<Sprint>' + sprint + '</Sprint>';
	zMguReadAufgaben += '</urn:ZMguReadAufgaben>';
	zMguReadAufgaben += soapFooter;

	$.ajax({
		url : options.url(options.getAufgaben),
		type : "POST",
		data : zMguReadAufgaben,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + options.base64());
		},
		success : function(xml) {
			console.log(xml);
//			aufgabenModel.setData(xml);
		},
		error : function(xhr, status, errThrown) {
			console.log(xhr.status);
			console.log(xhr.statusText);
		},
		timeout : 30000,
		contentType : "text/xml; charset='utf-8'"
	});
}