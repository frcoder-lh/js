/**
 * frcoder.js — 统一站点统计脚本
 * 包含：百度统计、Cloudflare Web Analytics、Google Analytics (gtag.js)
 * 用法：在 HTML 中引入 <script src="analytics/frcoder.js"></script>
 */

/* ===== 百度统计 ===== */
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?d8639eb832f0fe2a9c90297014bcbaa2';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
})();

/* ===== Cloudflare Web Analytics ===== */
(function () {
  var cf = document.createElement('script');
  cf.type = 'module';
  cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  cf.setAttribute('data-cf-beacon', '{"token": "008891703fab4ad69d4317fe209e5eb8"}');
  document.head.appendChild(cf);
})();

/* ===== Google Analytics (gtag.js) ===== */
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-BV1YJKZRGV');

(function () {
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-BV1YJKZRGV';
  document.head.appendChild(ga);
})();
