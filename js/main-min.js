(function(){function e(){var e,s;document.getElementsByTagName("html")[0].removeAttribute("class");n(window,"unload",r.flush);n(window,"resize",i);if(t()){e=document.getElementsByTagName("h2");for(s=e.length-1;s>=0;s-=1)e[s].style.visibility="visible"}i()}function t(){return"ontouchstart"in window||"onmsgesturechange"in window}function n(e,t,n){if(e.addEventListener){e.addEventListener(t,n,!1);r.add(e,t,n)}else if(e.attachEvent){e["e"+t+n]=n;e[t+n]=function(){e["e"+t+n](window.event)};e.attachEvent("on"+t,e[t+n]);r.add(e,t,n)}else e["on"+t]=e["e"+t+n]}function i(){var e,t,n,r,i,s,o,u;e=document.getElementsByTagName("nav")[0];t=e.getElementsByTagName("a");n=e.offsetWidth;r=330;i=Math.floor(r+n%r/Math.floor(n/r))-1;for(u=t.length-1;u>=0;u-=1)t[u].style.width=i+"px";s=window.innerWidth*.01;o=document.getElementsByTagName("section")[0];o.style.marginTop=s+"px";o.style.marginBottom=s+"px"}var r=function(){var e=[];return{listEvents:e,add:function(t,n,r){e.push(arguments)},flush:function(){var t,n;for(t=e.length-1;t>=0;t-=1){n=e[t];n[0].removeEventListener&&n[0].removeEventListener(n[1],n[2],n[3]);n[1].substring(0,2)!="on"&&(n[1]="on"+n[1]);n[0].detachEvent&&n[0].detachEvent(n[1],n[2]);n[0][n[1]]=null}}}}(),s=setInterval(function(){if(document.readyState==="complete"){e();clearInterval(s)}},10)})();