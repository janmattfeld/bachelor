/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/LocaleData','jquery.sap.strings'],function(q,L,Q){"use strict";var D=function(){throw new Error()};D.oDateInfo={oDefaultFormatOptions:{style:"medium"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"yyyy-MM-dd"},{pattern:"yyyyMMdd",strictParsing:true}],bShortFallbackFormatOptions:true,getPattern:function(l,s){return l.getDatePattern(s)},oRequiredParts:{"text":true,"year":true,"weekYear":true,"month":true,"day":true},bSupportRelative:true};D.oDateTimeInfo={oDefaultFormatOptions:{style:"medium"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"yyyy-MM-dd'T'HH:mm:ss"},{pattern:"yyyyMMdd HHmmss"}],getPattern:function(l,s){var d=l.getDateTimePattern(s),a=l.getDatePattern(s),t=l.getTimePattern(s);return d.replace("{1}",a).replace("{0}",t)},oRequiredParts:{"text":true,"year":true,"weekYear":true,"month":true,"day":true,"hour0_23":true,"hour1_24":true,"hour0_11":true,"hour1_12":true}};D.oTimeInfo={oDefaultFormatOptions:{style:"medium"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"HH:mm:ss"},{pattern:"HHmmss"}],getPattern:function(l,s){return l.getTimePattern(s)},oRequiredParts:{"text":true,"hour0_23":true,"hour1_24":true,"hour0_11":true,"hour1_12":true}};D.getInstance=function(f,l){return this.getDateInstance(f,l)};D.getDateInstance=function(f,l){return this.createInstance(f,l,this.oDateInfo)};D.getDateTimeInstance=function(f,l){return this.createInstance(f,l,this.oDateTimeInfo)};D.getTimeInstance=function(f,l){return this.createInstance(f,l,this.oTimeInfo)};D.createInstance=function(f,l,I){var F=q.sap.newObject(this.prototype);if(f instanceof sap.ui.core.Locale){l=f;f=undefined}if(!l){l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}F.oLocale=l;F.oLocaleData=L.getInstance(l);F.oFormatOptions=q.extend(false,{},I.oDefaultFormatOptions,f);if(!F.oFormatOptions.pattern){F.oFormatOptions.pattern=I.getPattern(F.oLocaleData,F.oFormatOptions.style)}if(!I.aFallbackFormats){if(I.bShortFallbackFormatOptions&&I.aFallbackFormatOptions){var p=I.getPattern(F.oLocaleData,"short").replace(/[^dMyU]/g,"");p=p.replace(/d+/g,"dd");p=p.replace(/M+/g,"MM");I.aFallbackFormatOptions.push({pattern:p.replace(/[yU]+/g,"yyyy"),strictParsing:true});I.aFallbackFormatOptions.push({pattern:p.replace(/[yU]+/g,"yy"),strictParsing:true})}I.aFallbackFormats=[];q.each(I.aFallbackFormatOptions,function(i,f){var o=D.createInstance(f,l,I);o.bIsFallback=true;I.aFallbackFormats.push(o)})}F.aFallbackFormats=I.aFallbackFormats;F.oRequiredParts=I.oRequiredParts;F.bSupportRelative=!!I.bSupportRelative;F.init();return F};D.prototype.init=function(){this.aMonthsAbbrev=this.oLocaleData.getMonths("abbreviated");this.aMonthsWide=this.oLocaleData.getMonths("wide");this.aMonthsAbbrevSt=this.oLocaleData.getMonthsStandAlone("abbreviated");this.aMonthsWideSt=this.oLocaleData.getMonthsStandAlone("wide");this.aDaysAbbrev=this.oLocaleData.getDays("abbreviated");this.aDaysWide=this.oLocaleData.getDays("wide");this.aDaysAbbrevSt=this.oLocaleData.getDaysStandAlone("abbreviated");this.aDaysWideSt=this.oLocaleData.getDaysStandAlone("wide");this.aDayPeriods=this.oLocaleData.getDayPeriods("abbreviated");this.aFormatArray=this.parseJavaDateFormat(this.oFormatOptions.pattern);this.sAllowedCharacters=this.getAllowedCharacters(this.aFormatArray)};D.prototype.oStates={"G":"era","y":"year","Y":"weekYear","M":"month","L":"monthStandalone","w":"weekInYear","W":"weekInMonth","D":"dayInYear","d":"day","F":"dayOfWeekInMonth","E":"dayNameInWeek","c":"dayNameInWeekStandalone","u":"dayNumberOfWeek","a":"amPmMarker","H":"hour0_23","k":"hour1_24","K":"hour0_11","h":"hour1_12","m":"minute","s":"second","S":"millisecond","z":"timezoneGeneral","Z":"timezoneRFC822","X":"timezoneISO8601"};D.prototype.format=function(d,u){if(u===undefined){u=this.oFormatOptions.UTC}if(this.bSupportRelative&&this.oFormatOptions.relative){var r=this.formatRelative(d,u,this.oFormatOptions.relativeRange||[-6,6]);if(r){return r}}var b=[],p,a=u?d.getUTCDay():d.getDay(),c=u?d.getUTCDate():d.getDate(),m=u?d.getUTCMonth():d.getMonth(),y=u?d.getUTCFullYear():d.getFullYear(),M=u?d.getUTCMilliseconds():d.getMilliseconds(),s=u?d.getUTCSeconds():d.getSeconds(),e=u?d.getUTCMinutes():d.getMinutes(),h=u?d.getUTCHours():d.getHours(),t=Math.abs(d.getTimezoneOffset()),P=d.getTimezoneOffset()>0,H=Math.floor(t/60),f=t%60,Y,w,g,R;for(var i=0;i<this.aFormatArray.length;i++){p=this.aFormatArray[i];switch(p.sType){case"text":b.push(p.sValue);break;case"day":b.push(q.sap.padLeft(String(c),"0",p.iDigits));break;case"dayNameInWeek":if(p.iDigits<4){b.push(this.aDaysAbbrev[a])}else if(p.iDigits>=4){b.push(this.aDaysWide[a])}break;case"dayNameInWeekStandalone":if(p.iDigits<4){b.push(this.aDaysAbbrevSt[a])}else if(p.iDigits>=4){b.push(this.aDaysWideSt[a])}break;case"dayNumberOfWeek":b.push(a||7);break;case"month":if(p.iDigits==3){b.push(this.aMonthsAbbrev[m])}else if(p.iDigits>=4){b.push(this.aMonthsWide[m])}else{b.push(q.sap.padLeft(String(m+1),"0",p.iDigits))}break;case"monthStandalone":if(p.iDigits==3){b.push(this.aMonthsAbbrevSt[m])}else if(p.iDigits>=4){b.push(this.aMonthsWideSt[m])}else{b.push(q.sap.padLeft(String(m+1),"0",p.iDigits))}break;case"era":b.push("AD");break;case"year":case"weekYear":Y=""+y;if(p.iDigits==2&&Y.length>2){Y=Y.substr(Y.length-2)}if(p.iDigits==1&&y<100){Y=q.sap.padLeft(Y,"0",4)}b.push(q.sap.padLeft(Y,"0",p.iDigits));break;case"weekInYear":w="";if(d.getWeek){w+=d.getWeek()}b.push(q.sap.padLeft(w,"0",p.iDigits));break;case"hour0_23":b.push(q.sap.padLeft(String(h),"0",p.iDigits));break;case"hour1_24":if(h==0){g="24"}else{g=String(h)}b.push(q.sap.padLeft(g,"0",p.iDigits));break;case"hour0_11":if(h>11){g=String(h-12)}else{g=String(h)}b.push(q.sap.padLeft(g,"0",p.iDigits));break;case"hour1_12":if(h>12){g=String(h-12)}else if(h==0){g="12"}else{g=String(h)}b.push(q.sap.padLeft(g,"0",p.iDigits));break;case"minute":b.push(q.sap.padLeft(String(e),"0",p.iDigits));break;case"second":b.push(q.sap.padLeft(String(s),"0",p.iDigits));break;case"millisecond":b.push(q.sap.padRight(q.sap.padLeft(String(M),"0",Math.min(3,p.iDigits)),"0",p.iDigits));break;case"amPmMarker":var j=h<12?0:1;b.push(this.aDayPeriods[j]);break;case"timezoneGeneral":if(p.iDigits>3&&d.getTimezoneLong){b.push(d.getTimezoneLong());break}else if(d.getTimezoneShort){b.push(d.getTimezoneShort());break}b.push("GMT");case"timezoneISO8601":if(!u&&t!=0){b.push(P?"-":"+");b.push(q.sap.padLeft(String(H),"0",2));b.push(":");b.push(q.sap.padLeft(String(f),"0",2))}else{b.push("Z")}break;case"timezoneRFC822":if(!u&&t!=0){b.push(P?"-":"+");b.push(q.sap.padLeft(String(H),"0",2));b.push(q.sap.padLeft(String(f),"0",2))}break}}R=b.join("");if(sap.ui.getCore().getConfiguration().getOriginInfo()){R=new String(R);R.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString(),style:this.oFormatOptions.style,pattern:this.oFormatOptions.pattern}}return R};D.prototype.parse=function(v,u,s){if(u===undefined){u=this.oFormatOptions.UTC}if(s===undefined){s=this.oFormatOptions.strictParsing}var d,I=0,a=null,m=null,y=null,h=null,M=null,S=null,b=null,p=false,P,c,t=null,V=true,r=this.oRequiredParts;function e(j){return j>=48&&j<=57}function f(j){var x=0;while(x<j&&e(v.charCodeAt(I+x))){x++}return v.substr(I,x)}function g(x){for(var j=0;j<x.length;j++){if(v.indexOf(x[j],I)==I){return x[j]}}return null}function k(x){for(var j=0;j<x.length;j++){if(v.indexOf(x[j],I)==I){return j}}return null}function l(j){var x=v.charAt(I)=="+"?-1:1;I++;c=f(2);var z=parseInt(c,10);I=I+2;if(j){I++}c=f(2);I=I+2;t=parseInt(c,10);t=(t+60*z)*x}function n(j,x){if(j in r&&x){V=false}}v=q.trim(v);if(this.bSupportRelative){var d=this.parseRelative(v,u);if(d){return d}}for(var i=0;i<this.aFormatArray.length;i++){P=this.aFormatArray[i];switch(P.sType){case"text":if(v.indexOf(P.sValue,I)==I){I+=P.sValue.length}else{n(P.sType,this.aFormatArray[i+1].sType in r)}break;case"day":c=f(Math.max(P.iDigits,2));n(P.sType,c==="");I+=c.length;a=parseInt(c,10);if(s&&a>31){V=false}break;case"dayNameInWeek":case"dayNameInWeekStandalone":c=g(this.aDaysWide);if(c){I+=c.length;break}c=g(this.aDaysWideSt);if(c){I+=c.length;break}c=g(this.aDaysAbbrev);if(c){I+=c.length;break}c=g(this.aDaysAbbrevSt);if(c){I+=c.length;break}break;case"dayNumberOfWeek":c=f(P.iDigits);I+=c.length;break;case"month":case"monthStandalone":if(P.iDigits<3){c=f(Math.max(P.iDigits,2));n(P.sType,c==="");m=parseInt(c,10)-1;I+=c.length;if(s&&m>11){V=false}}else{m=k(this.aMonthsWide);if(m!=null){I+=this.aMonthsWide[m].length;break}m=k(this.aMonthsWideSt);if(m!=null){I+=this.aMonthsWideSt[m].length;break}m=k(this.aMonthsAbbrev);if(m!=null){I+=this.aMonthsAbbrev[m].length;break}m=k(this.aMonthsAbbrevSt);if(m!=null){I+=this.aMonthsAbbrevSt[m].length;break}n(P.sType,true)}break;case"era":break;case"year":case"weekYear":if(P.iDigits==1){c=f(4)}else if(P.iDigits==2){c=f(2)}else{c=f(P.iDigits)}I+=c.length;n(P.sType,c==="");y=parseInt(c,10);if(c.length<=2){var C=new Date().getFullYear(),o=Math.floor(C/100),Y=o*100+y-C;if(Y<-70){y+=(o+1)*100}else if(Y<30){y+=o*100}else{y+=(o-1)*100}}break;case"weekInYear":break;case"hour0_23":c=f(Math.max(P.iDigits,2));n(P.sType,c==="");I+=c.length;h=parseInt(c,10);if(s&&h>23){V=false}break;case"hour1_24":c=f(Math.max(P.iDigits,2));n(P.sType,c==="");I+=c.length;h=parseInt(c,10);if(h==24){h=0}if(s&&h>23){V=false}break;case"hour0_11":c=f(Math.max(P.iDigits,2));n(P.sType,c==="");I+=c.length;h=parseInt(c,10);if(s&&h>11){V=false}break;case"hour1_12":c=f(Math.max(P.iDigits,2));n(P.sType,c==="");I+=c.length;h=parseInt(c,10);if(h==12){h=0;p=true}if(s&&h>11){V=false}break;case"minute":c=f(Math.max(P.iDigits,2));n(P.sType,c==="");I+=c.length;M=parseInt(c,10);if(s&&M>59){V=false}break;case"second":c=f(Math.max(P.iDigits,2));n(P.sType,c==="");I+=c.length;S=parseInt(c,10);if(s&&S>59){V=false}break;case"millisecond":c=f(Math.max(P.iDigits,3));I+=c.length;c=q.sap.padRight(c,"0",3);b=parseInt(c,10);break;case"amPmMarker":var A=this.aDayPeriods[0],w=this.aDayPeriods[1];if(v.indexOf(A,I)==I){p=false;I+=2}else if(v.indexOf(w,I)==I){p=true;I+=2}break;case"timezoneGeneral":var T=v.substring(I,I+3);if(T==="GMT"||T==="UTC"){I=I+3}else if(v.substring(I,I+2)==="UT"){I=I+2}else if(v.charAt(I)=="Z"){I=I+1;t=0;break}else{q.sap.log.error(v+" cannot be parsed correcly by sap.ui.core.format.DateFormat: The given timezone is not supported!");break}case"timezoneISO8601":if(v.charAt(I)=="Z"){I=I+1;t=0;break}l(true);break;case"timezoneRFC822":l(false);break}if(!V){break}}if(I<v.length){V=false}if(p){h+=12}if(V){if(u||t!=null){d=new Date(0);d.setUTCFullYear(y||1970);d.setUTCMonth(m||0);d.setUTCDate(a||1);d.setUTCHours(h||0);d.setUTCMinutes(M||0);d.setUTCSeconds(S||0);d.setUTCMilliseconds(b||0);if(s&&(a||1)!==d.getUTCDate()){V=false;d=undefined}else if(t){d.setUTCMinutes((M||0)+t)}}else{d=new Date(1970,0,1,0,0,0);d.setFullYear(y||1970);d.setMonth(m||0);d.setDate(a||1);d.setHours(h||0);d.setMinutes(M||0);d.setSeconds(S||0);d.setMilliseconds(b||0);if(s&&(a||1)!==d.getDate()){V=false;d=undefined}}if(V){return d}}if(!this.bIsFallback){q.each(this.aFallbackFormats,function(i,F){d=F.parse(v,u,s);if(d){return false}});return d}return null};D.prototype.parseJavaDateFormat=function(f){var F=[],i,b=false,c=null,s="",n="";for(i=0;i<f.length;i++){var C=f.charAt(i),N,p,P;if(b){if(C=="'"){p=f.charAt(i-1);P=f.charAt(i-2);N=f.charAt(i+1);if(p=="'"&&P!="'"){b=false}else if(N=="'"){i+=1}else{b=false;continue}}if(s=="text"){c.sValue+=C}else{c={sType:"text",sValue:C};F.push(c);s="text"}}else{if(C=="'"){b=true}else if(this.oStates[C]){n=this.oStates[C];if(s==n){c.iDigits++}else{c={sType:n,iDigits:1};F.push(c);s=n}}else{if(s=="text"){c.sValue+=C}else{c={sType:"text",sValue:C};F.push(c);s="text"}}}}return F};D.prototype._now=function(){return new Date()};D.prototype.parseRelative=function(v,u){if(!v){return null}var t=this;function c(d){var b,T,o=t._now(),T=Date.UTC(o.getFullYear(),o.getMonth(),o.getDate()),f=d*(24*60*60*1000);var b=T+f;if(!u){var g=new Date(o.getTime()+f);b+=g.getTimezoneOffset()*60*1000}return new Date(b)}var p,_,a,i,s;try{for(i=-2;i<=2;i++){p=this.oLocaleData.getRelativeDay(i);s=i<0?-1:1;if(p.indexOf("{0}")<0){if(Math.abs(i)<=1&&q.sap.startsWithIgnoreCase(v,p)&&v.length==p.length){return c(i)}}else if(q.sap.startsWith(p,"{0}")){_=p.substr(3,p.length);if(q.sap.endsWithIgnoreCase(v,_)){a=v.substr(0,v.length-_.length);return c(parseInt(a,10)*s)}}else if(q.sap.endsWith(p,"{0}")){_=p.substr(0,p.length-3);if(q.sap.startsWithIgnoreCase(v,_)){a=v.substr(_.length,v.length);return c(parseInt(a,10)*s)}}else{_=p.split("{0}");if(_.length==2&&q.sap.startsWithIgnoreCase(v,_[0])&&q.sap.endsWithIgnoreCase(v,_[1])){a=v.substr(_[0].length,v.length-_[1].length);return c(parseInt(a,10)*s)}}}}catch(e){q.sap.log.warning("Relative Date parsing not possible: "+e)}return null};D.prototype.formatRelative=function(d,u,r){var t=this._now(),T=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate()),i,a,p;if(u){i=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())}else{i=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())}a=Math.floor((i-T)/(24*60*60*1000));if(a<r[0]||a>r[1]){return null}p=this.oLocaleData.getRelativeDay(a);return q.sap.formatMessage(p,[Math.abs(a)])};D.prototype.getAllowedCharacters=function(f){if(this.bSupportRelative&&this.oFormatOptions.relative){return""}var a="";var n=false;var A=false;var p;for(var i=0;i<this.aFormatArray.length;i++){p=this.aFormatArray[i];switch(p.sType){case"text":if(a.indexOf(p.sValue)<0){a+=p.sValue}break;case"day":case"year":case"weekYear":case"dayNumberOfWeek":case"weekInYear":case"hour0_23":case"hour1_24":case"hour0_11":case"hour1_12":case"minute":case"second":case"millisecond":if(!n){a+="0123456789";n=true}break;case"month":case"monthStandalone":if(p.iDigits<3){if(!n){a+="0123456789";n=true}}else{A=true}break;default:A=true;break}}if(A){a=""}return a};return D},true);
