import{p as i}from"./project-DJ1hCcxG.js";import{_ as l,g as d,o,c as s,a as t,t as n,b as u}from"./index-DZBl3CYz.js";const _={key:0,class:"project-info"},m=["src","alt"],j={key:1},v={__name:"test",props:{projectId:{type:[String,Number],required:!0}},setup(r){const c=r,e=d(()=>i.find(a=>a.id===Number(c.projectId)));return(a,p)=>(o(),s("div",null,[e.value?(o(),s("div",_,[t("img",{src:e.value.img.path,alt:e.value.img.alt,class:"project-image"},null,8,m),t("h3",null,n(e.value.title),1),t("p",null,n(e.value.description),1)])):(o(),s("div",j,p[0]||(p[0]=[t("p",null,"Project not found.",-1)])))]))}},f=l(v,[["__scopeId","data-v-2aa3ed68"]]),g={__name:"ProjectView",props:{projectId:{type:String,required:!0}},setup(r){return(c,e)=>(o(),u(f,{projectId:r.projectId},null,8,["projectId"]))}},k=l(g,[["__scopeId","data-v-6740b349"]]);export{k as default};
