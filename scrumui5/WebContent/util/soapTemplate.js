/**
 * 
 */
// TODO Constant
var soapHeader = '';
soapHeader += '<soapenv:Envelope xmlns:soapenv=';
soapHeader += '"http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn=';
soapHeader += '"urn:sap-com:document:sap:soap:functions:mc-style">';
soapHeader += '<soapenv:Header/>';
soapHeader += '<soapenv:Body>';

var soapFooter = '';
soapFooter += '</soapenv:Body>';
soapFooter += '</soapenv:Envelope>';

var zMguReadKunden = soapHeader;
zMguReadKunden += '<urn:ZMguReadKunden>';
zMguReadKunden += '<Kunden>';
zMguReadKunden += '<item>';
zMguReadKunden += '<Mandt></Mandt>';
zMguReadKunden += '<Kunde></Kunde>';
zMguReadKunden += '<Bezei></Bezei>';
zMguReadKunden += '<Prio></Prio>';
zMguReadKunden += '</item>';
zMguReadKunden += '</Kunden>';
zMguReadKunden += '</urn:ZMguReadKunden>';
zMguReadKunden += soapFooter;

var zMguReadProjekte = soapHeader;
zMguReadProjekte += '<urn:ZMguReadProjekte>';
zMguReadProjekte += '<Kunden>DHL</Kunden>'
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