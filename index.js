"use strict";var params={public_key:"gWKneA_PyJXFoX3AYF7wc3d",auth_params:{username:"admin",payload:"cb8b6d40cdd8374049e47bbce9df5f63f69ed2701ce834eada7979a56014fc08"}},socketize=new Socketize.client(params);document.getElementById("post-btn").onclick=function(){socketize.publish("splatterwall",{name:"Rob",city:"Amsterdam"})},socketize.subscribe("splatterwall",function(message){console.log(message);var liHtml="<li>"+message.name+message.city+"</li>";document.getElementById("messages").insertAdjacentHTML("beforeend",liHtml)});