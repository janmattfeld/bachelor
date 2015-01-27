/*
 * Copyright (C) 2009-2013 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.model.format.FormattingLibrary");jQuery.sap.require("sap.ca.ui.utils.resourcebundle");sap.ca.ui.model.format.FormattingLibrary={};
sap.ca.ui.model.format.FormattingLibrary.formatAttachmentIcon=function(m){var a={};a["application/msword"]="sap-icon://doc-attachment";a["application/vnd.openxmlformats-officedocument.wordprocessingml.document"]="sap-icon://doc-attachment";a["application/rtf"]="sap-icon://doc-attachment";a["application/pdf"]="sap-icon://pdf-attachment";a["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]="sap-icon://excel-attachment";a["application/msexcel"]="sap-icon://excel-attachment";a["application/vnd.ms-powerpoint"]="sap-icon://ppt-attachment";a["application/vnd.openxmlformats-officedocument.presentationml.presentation"]="sap-icon://ppt-attachment";a["application/vnd.openxmlformats-officedocument.presentationml.slideshow"]="sap-icon://ppt-attachment";a["application/mspowerpoint"]="sap-icon://ppt-attachment";a["application/xml"]="sap-icon://attachment-html";a["application/xhtml+xml"]="sap-icon://attachment-html";a["application/x-httpd-php"]="sap-icon://attachment-html";a["application/x-javascript"]="sap-icon://attachment-html";a["application/gzip"]="sap-icon://attachment-zip-file";a["application/x-rar-compressed"]="sap-icon://attachment-zip-file";a["application/x-tar"]="sap-icon://attachment-zip-file";a["application/zip"]="sap-icon://attachment-zip-file";a["audio/voxware"]="sap-icon://attachment-audio";a["audio/x-aiff"]="sap-icon://attachment-audio";a["audio/x-midi"]="sap-icon://attachment-audio";a["audio/x-mpeg"]="sap-icon://attachment-audio";a["audio/x-pn-realaudio"]="sap-icon://attachment-audio";a["audio/x-pn-realaudio-plugin"]="sap-icon://attachment-audio";a["audio/x-qt-stream"]="sap-icon://attachment-audio";a["audio/x-wav"]="sap-icon://attachment-audio";a["image/png"]="sap-icon://attachment-photo";a["image/tiff"]="sap-icon://attachment-photo";a["image/bmp"]="sap-icon://attachment-photo";a["image/jpeg"]="sap-icon://attachment-photo";a["image/gif"]="sap-icon://attachment-photo";a["text/plain"]="sap-icon://attachment-text-file";a["text/comma-separated-values"]="sap-icon://attachment-text-file";a["text/css"]="sap-icon://attachment-text-file";a["text/html"]="sap-icon://attachment-text-file";a["text/javascript"]="sap-icon://attachment-text-file";a["text/plain"]="sap-icon://attachment-text-file";a["text/richtext"]="sap-icon://attachment-text-file";a["text/rtf"]="sap-icon://attachment-text-file";a["text/tab-separated-values"]="sap-icon://attachment-text-file";a["text/xml"]="sap-icon://attachment-text-file";a["video/mpeg"]="sap-icon://attachment-video";a["video/quicktime"]="sap-icon://attachment-video";a["video/x-msvideo"]="sap-icon://attachment-video";a["application/x-shockwave-flash"]="sap-icon://attachment-video";var i=a[m];if(i){return i}return"sap-icon://document"};
sap.ca.ui.model.format.FormattingLibrary.formatAttachmentTitle=function(d,f){if(d){return d}return f};
sap.ca.ui.model.format.FormattingLibrary.formatStatus=function(s){var S=sap.ui.core.ValueState.None;if(s!==null){var e={1:"Warning",2:"Success",3:"Error"};if(e[s])S=sap.ui.core.ValueState[e[s]]}return S};
sap.ca.ui.model.format.FormattingLibrary.commonIDFormatter=function(d,i){if(i){if(d){return sap.ca.ui.utils.resourcebundle.getText("FormattingLibrary.DescriptionAndId",[d,i])}return i}if(d){return d}return""};
