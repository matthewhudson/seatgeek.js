// Generated by CoffeeScript 1.4.0
(function(){var e,t,n,r;e=typeof exports!="undefined"&&exports!==null?exports:this.seatgeek={};r="http://api.seatgeek.com/2";e.callback=null;e.events=function(e,t){return n("/events/",e,t)};e.performers=function(e,t){return n("/performers/",e,t)};e.venues=function(e,t){return n("/venues/",e,t)};n=function(n,r,i){var s,o,u,a;if(typeof r=="function"){i=r;r={}}if(typeof exports=="undefined"||exports===null){r.callback="seatgeek.callback";e.callback=i}else s||(s=require("http"));a=t(n,r);if(typeof exports=="undefined"||exports===null){u=document.createElement("script");u.type="text/javascript";u.src=a;return document.body.appendChild(u)}o=s.get(a,function(e){var t;t="";e.on("data",function(e){return t+=e});return e.on("end",function(){return i(null,t)})});return o.on("error",function(e){return i(e,null)})};t=function(e,t){var n,i,s,o;n=r+e;s=[];for(i in t){o=t[i];i=encodeURIComponent(i);o=encodeURIComponent(o);s.push(i+"="+o)}s.length&&(n+="?"+s.join("&"));return n}}).call(this);