/* 站点间跳转配置：
   408 大题站与英语站是两个容器、两个端口。
   在阿里云上如果改了英语端口，只改这里，然后重新构建 408 镜像即可。 */
window.STUDY_SITES = {
  /* 同域不同端口时改这里 */
  englishPort: 5001,
  /* 如果以后用反向代理把英语站挂到 /english/，填 "/english/"；
     留空则按“当前域名 + englishPort”跳转。 */
  englishUrl: ""
};
