// 获取cookie
function getCookie(name) {
    var reg = RegExp("(^|)" + name + "=([^;]*)(;|$)")
    var arr = document.cookie.match(reg)
    if (arr) {
        return unescape(arr[2])
    } else {
        return null
    }
}
// axios的处理
var baseUrl = ''

const service = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    timeout: 30000,
});
// axios请求拦截
service.interceptors.request.use(config => {
    const userToken = getCookie('Himall-User')
    const shopId = getCookie('Scmmall-Shop')
    if (userToken) {
        config.headers['Authorization'] = userToken;
        config.headers['shopId'] = shopId;
        config.headers['platform'] = 0;
        config.headers['businessType'] = '2';
    }
    return config;
});
// 响应拦截器
service.interceptors.response.use((res) => {
    if (res.data.status === 500) {
        vueAntd.message.error(res.data.msg);
    }
    return res.data;
});

// 获取url参数
function getQueryString(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null; //返回参数值
    }
}
//处理url
function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    // var a = new URL(url);
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var params = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                p;
            for (var i = 0; i < len; i++) {
                if (seg[i]) {
                    p = seg[i].split('=');
                    params[p[0]] = p[1];
                }
            }
            return params;
        })(),
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1')
    };
}
//删除外部影响样式表
function delStyle(urlList, name) {
    const domList = document.querySelectorAll(name);
    domList.forEach((item) => {
        console.log(parseURL(item.href).path)
        urlList.indexOf(parseURL(item.href).path) >= 0 ? item.remove() : ''
    })
}
