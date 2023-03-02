import * as fs from "https://deno.land/std@0.178.0/fs/mod.ts";

let xml=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
function url(url){
  xml+=`<url><loc>${url}</loc></url>`;
}
const asyncs=[];
for(const entry of fs.walkSync("./src")) {
  if(entry.path==="./")continue;
  if(entry.isDirectory){
    asyncs.push(Deno.mkdir("./dist/"+entry.path, { recursive: true }));
  }
  if(entry.isFile){
    asyncs.push(fs.copy(entry.path,"./dist/"+entry.path));
  }
  const path=(entry.path==="src") ? entry.path.replace("src","") : entry.path.replace("src/","");
  url("https://nakasyou.github.io/"+path);
}
console.log(xml)
await Promise.all(asyncs);
