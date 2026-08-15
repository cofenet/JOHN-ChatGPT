<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>本地内容阅读器</title>
    <style>
        html {
            font-size: 16px;
        }
        :root {
            --bg-gradient: linear-gradient(135deg, #e0e7ff 0%, #f0f4fa 50%, #f8fafc 100%);
            --card-bg: rgba(255, 255, 255, 0.72);
            --card-border: rgba(255,255,255,0.85);
            --text-main: #0f172a;
            --text-sub: #64748b;
            --border: rgba(226, 232, 240, 0.6);
            --primary: #4f46e5;
            --primary-light: #818cf8;
            --hover-bg: rgba(79, 70, 229, 0.08);
            --active-bg: rgba(79, 70, 229, 0.14);
            --shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
            --blur: 14px;
            --tag-tech:#2563eb;
            --tag-sport:#059669;
            --star-yellow:#eab308;
        }
        [data-theme="dark"] {
            --bg-gradient: linear-gradient(135deg,#0f172a 0%,#1e293b 100%);
            --card-bg: rgba(30, 41, 59, 0.70);
            --card-border: rgba(148,163,184,0.15);
            --text-main: #f1f5f9;
            --text-sub: #94a3b8;
            --border: rgba(148,163,184,0.18);
            --primary: #818cf8;
            --primary-light: #a5b4fc;
            --hover-bg: rgba(129, 140, 248, 0.12);
            --active-bg: rgba(129, 140, 248, 0.20);
            --shadow: 0 10px 40px rgba(0,0,0,0.35);
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Microsoft YaHei", sans-serif;
            background: var(--bg-gradient);
            color: var(--text-main);
            min-height: 100vh;
            padding: 44px 20px;
            transition: background 0.4s ease, color 0.4s ease;
            font-size: 1rem;
        }
        .header-wrap {
            max-width: 1200px;
            margin: 0 auto 36px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap:16px;
        }
        .main-title {
            font-size: 1.75rem;
            font-weight: 700;
            background: linear-gradient(90deg,var(--primary),var(--primary-light));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: 0.6px;
        }
        .header-right{
            display:flex;
            gap:12px;
            align-items:center;
        }
        .weather-box{
            padding:0.5rem 0.875rem;
            border-radius:0.75rem;
            border:1px solid var(--border);
            background:var(--card-bg);
            backdrop-filter: blur(var(--blur));
            font-size:0.875rem;
            color:var(--text-main);
            display:flex;
            align-items:center;
            gap:0.5rem;
        }
        #themeBtn {
            padding:0.5rem 0.875rem;
            border-radius:0.75rem;
            border: 1px solid var(--border);
            background: var(--card-bg);
            backdrop-filter: blur(var(--blur));
            color: var(--text-main);
            cursor: pointer;
            font-size:0.875rem;
            transition: all 0.3s ease;
        }
        #themeBtn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }
        .search-wrap{
            max-width:1200px;
            margin:0 auto 14px;
        }
        #searchInput{
            width:100%;
            padding:0.625rem 1rem;
            border-radius:0.75rem;
            border:1px solid var(--border);
            background:var(--card-bg);
            backdrop-filter: blur(var(--blur));
            color:var(--text-main);
            font-size:0.875rem;
            outline:none;
        }
        #searchInput::placeholder{
            color:var(--text-sub);
        }
        .tab-wrap{
            max-width:1200px;
            margin:0 auto 12px;
            display:flex;
            gap:0.625rem;
            flex-wrap:wrap;
        }
        .tab-btn{
            padding:0.5rem 1rem;
            border-radius:0.625rem;
            border:1px solid var(--border);
            background:var(--card-bg);
            backdrop-filter: blur(var(--blur));
            color:var(--text-main);
            cursor:pointer;
            transition:0.25s;
            font-size:0.875rem;
        }
        .tab-btn.active{
            background:var(--primary);
            color:#fff;
            border-color:var(--primary);
        }
        .tool-wrap{
            max-width:1200px;
            margin:0 auto 20px;
            display:flex;
            gap:0.5rem;
            flex-wrap:wrap;
            align-items:center;
        }
        .tool-btn{
            padding:0.375rem 0.75rem;
            border-radius:0.5rem;
            border:1px solid var(--border);
            background:var(--card-bg);
            backdrop-filter: blur(var(--blur));
            color:var(--text-main);
            font-size:0.8125rem;
            cursor:pointer;
            transition: all 0.18s ease;
        }
        .tool-btn:active{
            transform: scale(0.96);
            filter: brightness(0.92);
        }
        .font-group{
            display:flex;
            gap:0.25rem;
            margin-left:0.625rem;
        }
        .font-btn{
            padding:0.25rem 0.625rem;
            border-radius:0.375rem;
            border:1px solid var(--border);
            background:var(--card-bg);
            color:var(--text-main);
            cursor:pointer;
            font-size:0.75rem;
            transition:0.18s;
        }
        .font-btn:active{
            transform: scale(0.96);
        }
        .font-btn.active{
            background:var(--primary);
            color:#fff;
            border-color:var(--primary);
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            gap: 1.75rem;
            transition: all 0.35s ease;
        }
        .left-sidebar {
            width: 23rem;
            background: var(--card-bg);
            backdrop-filter: blur(var(--blur));
            border: 1px solid var(--card-border);
            border-radius: 1.25rem;
            box-shadow: var(--shadow);
            padding:1.375rem;
            height: 80vh;
            overflow-y: auto;
            position: relative;
            transition: all 0.35s ease;
        }
        .left-sidebar.hide-sidebar{
            width:0;
            padding:0;
            border:none;
            opacity:0;
            overflow:hidden;
        }
        .sidebar-title {
            font-size:1.125rem;
            font-weight: 600;
            padding-bottom:0.75rem;
            border-bottom: 1px solid var(--border);
            margin-bottom:0.5rem;
            display: flex;
            align-items: center;
            gap:0.5rem;
            color:var(--text-main);
        }
        .stat-info{
            font-size:0.78125rem;
            color:var(--text-sub);
            margin-bottom:1rem;
        }
        .list-loading{
            position:absolute;
            inset:0;
            background:rgba(0,0,0,0.08);
            border-radius:1.25rem;
            display:flex;
            align-items:center;
            justify-content:center;
            color:var(--text-main);
            font-size:0.9rem;
            opacity:0;
            pointer-events:none;
            transition:opacity 0.22s ease;
            z-index:5;
        }
        .list-loading.show{
            opacity:1;
            pointer-events:auto;
        }
        .news-item {
            padding:1rem 0.9375rem;
            border-radius:0.875rem;
            margin-bottom:0.6875rem;
            cursor: pointer;
            transition: all 0.28s cubic‑bezier(0.4,0,0.2,1);
            border: 1px solid transparent;
            position:relative;
            color:var(--text-main);
        }
        .news-item:hover {
            background: var(--hover-bg);
            transform: translateY(-2px) scale(1.01);
        }
        .news-item.active {
            background: var(--active-bg);
            border-color: var(--primary);
        }
        .item-title {
            font-size:0.96875rem;
            line-height: 1.6;
            margin-bottom:0.375rem;
            padding-right:1.5rem;
            color:var(--text-main);
        }
        .item-title.read{
            color:var(--text-sub);
        }
        .item-time{
            font-size:0.75rem;
            color:var(--text-sub);
            margin:0.25rem 0;
        }
        .item-tag{
            font-size:0.75rem;
            padding:0.125rem 0.5rem;
            border-radius:0.375rem;
            display:inline-block;
            color:#fff;
        }
        .tag-tech{background:var(--tag-tech);}
        .tag-sport{background:var(--tag-sport);}
        .star-btn{
            position:absolute;
            top:0.75rem;
            right:0.75rem;
            font-size:1.125rem;
            cursor:pointer;
            user-select:none;
            transition:0.2s;
            color:var(--text-sub);
        }
        .star-btn.star-active{
            color:var(--star-yellow);
        }
        .no-match{
            text-align:center;
            color:var(--text-sub);
            padding:1.875rem 0;
            font-size:0.875rem;
        }
        .right-article {
            flex: 1;
            background: var(--card-bg);
            backdrop-filter: blur(var(--blur));
            border: 1px solid var(--card-border);
            border-radius:1.25rem;
            box-shadow: var(--shadow);
            padding:2.625rem 3rem;
            height: 80vh;
            overflow-y: auto;
            color:var(--text-main);
            position:relative;
        }
        /*阅读进度条*/
        .read-progress-bar{
            position:absolute;
            top:0;
            left:0;
            height:4px;
            background:var(--primary);
            width:0%;
            border-radius:0 2px 2px 0;
            z-index:2;
        }
        .article-tool-bar{
            display:flex;
            gap:8px;
            margin-bottom:1rem;
            flex-wrap:wrap;
        }
        .back-btn{
            display:none;
            margin-bottom:1.25rem;
            padding:0.375rem 0.75rem;
            border:1px solid var(--border);
            border-radius:0.5rem;
            background:var(--card-bg);
            color:var(--text-main);
            cursor:pointer;
            font-size:0.875rem;
        }
        .back-btn.show{
            display:block;
        }
        .empty-tip {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--text-sub);
            font-size:1.125rem;
            gap:0.625rem;
        }
        .art-title {
            font-size:1.875rem;
            line-height: 1.42;
            margin-bottom:0.75rem;
            font-weight:700;
            color:var(--text-main);
        }
        .art-tag{
            display:inline-block;
            font-size:0.8125rem;
            padding:0.1875rem 0.625rem;
            border-radius:0.4375rem;
            color:#fff;
            margin-bottom:0.5rem;
        }
        .art-time{
            font-size:0.875rem;
            color:var(--text-sub);
            margin-bottom:0.875rem;
        }
        .art-meta {
            font-size:0.90625rem;
            color: var(--text-sub);
            padding-bottom:1.25rem;
            border-bottom: 1px solid var(--border);
            margin-bottom:1.75rem;
        }
        .art-meta a {
            color: var(--primary);
            text-decoration: none;
        }
        .art-meta a:hover {
            text-decoration: underline;
        }
        .art-content {
            font-size:1.0625rem;
            line-height: 2.0;
            color:var(--text-main);
        }
        .art-content p {
            margin-bottom:1.125rem;
        }
        #backTop{
            position:fixed;
            bottom:1.5rem;
            right:1.5rem;
            width:2.75rem;
            height:2.75rem;
            border-radius:50%;
            border:1px solid var(--border);
            background:var(--card-bg);
            backdrop-filter: blur(var(--blur));
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:1.125rem;
            color:var(--text-main);
            cursor:pointer;
            box-shadow:var(--shadow);
            opacity:0;
            pointer-events:none;
            transition:0.3s;
            z-index:999;
        }
        #backTop.show{
            opacity:1;
            pointer-events:auto;
        }
        #listBackTop{
            position:absolute;
            bottom:1rem;
            right:1rem;
            width:2.375rem;
            height:2.375rem;
            border-radius:50%;
            border:1px solid var(--border);
            background:var(--card-bg);
            backdrop-filter: blur(var(--blur));
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:1rem;
            color:var(--text-main);
            cursor:pointer;
            box-shadow:var(--shadow);
            opacity:0;
            pointer-events:none;
            transition:0.3s;
            z-index:10;
        }
        #listBackTop.show{
            opacity:1;
            pointer-events:auto;
        }
        /*toast提示*/
        .toast{
            position:fixed;
            left:50%;
            transform:translateX(-50%);
            bottom:28px;
            padding:10px 18px;
            border-radius:8px;
            background:rgba(0,0,0,0.72);
            color:#fff;
            font-size:0.875rem;
            z-index:9999;
            opacity:0;
            transition:opacity 0.25s;
            pointer-events:none;
        }
        .toast.show{
            opacity:1;
        }
        /*浏览历史小面板*/
        .history-panel{
            max-width:1200px;
            margin:8px auto 16px;
        }
        .history-header{
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:6px;
        }
        .history-title{
            font-size:0.8125rem;
            color:var(--text-sub);
        }
        .history-clear-btn{
            font-size:0.75rem;
            padding:2px 8px;
            border-radius:4px;
            border:1px solid var(--border);
            background:var(--card-bg);
            color:var(--text-sub);
            cursor:pointer;
        }
        .history-items{
            display:flex;
            gap:6px;
            flex-wrap:wrap;
        }
        .history-item{
            font-size:0.78125rem;
            padding:4px 24px 4px 10px;
            border-radius:6px;
            border:1px solid var(--border);
            background:var(--card-bg);
            backdrop-filter: blur(var(--blur));
            cursor:pointer;
            max-width:180px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            position:relative;
        }
        .history-item-close{
            position:absolute;
            right:4px;
            top:2px;
            font-size:0.85rem;
            color:var(--text-sub);
            cursor:pointer;
            width:16px;
            height:16px;
            display:flex;
            align-items:center;
            justify-content:center;
        }
        ::-webkit-scrollbar { width:0.5625rem; height:0.5625rem; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius:0.375rem; }
        ::-webkit-scrollbar-thumb:hover { background: var(--text-sub); }
        .disclaimer-wrap{
            max-width:1200px;
            margin:2rem auto 0.625rem;
            padding:1.25rem 1.5rem;
            background:var(--card-bg);
            backdrop-filter: blur(var(--blur));
            border:1px solid var(--card-border);
            border-radius:1rem;
            box-shadow:var(--shadow);
            font-size:0.8125rem;
            color:var(--text-sub);
            line-height:1.7;
        }
        .disclaimer-wrap h4{
            font-size:0.875rem;
            color:var(--text-main);
            margin-bottom:0.5rem;
        }
        @media(max-width:860px){
            .container{ flex-direction:column; }
            .left-sidebar,.right-article{ width:100%; height:auto; max-height:58vh; }
            .left-sidebar.hide-sidebar{
                height:0;
            }
            .right-article{ padding:1.625rem 1.375rem; }
            .art-title{ font-size:1.4375rem; }
            .main-title{ font-size:1.375rem; }
            .disclaimer-wrap{margin:1.375rem 0.5rem 0.625rem;padding:1rem;}
            .tab-wrap{flex-wrap:wrap;}
            .header-wrap{flex-direction:column;align-items:flex-start;}
            #backTop{
                bottom:1rem;
                right:1rem;
                width:2.5rem;
                height:2.5rem;
            }
            #listBackTop{
                width:2.125rem;
                height:2.125rem;
                bottom:0.75rem;
                right:0.75rem;
            }
        }
    </style>
</head>
<body>
    <div class="toast" id="toast"></div>

    <div class="header-wrap">
        <h1 class="main-title">📰 本地内容阅读器</h1>
        <div class="header-right">
            <div class="weather-box">
                <span>🌤️</span>
                <span id="weatherText">北京｜晴｜26℃</span>
            </div>
            <button id="themeBtn">切换暗黑模式</button>
        </div>
    </div>

    <div class="search-wrap">
        <input id="searchInput" type="text" placeholder="🔍 搜索文章标题..." autocomplete="off">
    </div>

    <div class="tab-wrap">
        <button class="tab-btn active" data-cat="all">全部</button>
        <button class="tab-btn" data-cat="tech">科技类</button>
        <button class="tab-btn" data-cat="sport">体育类</button>
        <button class="tab-btn" data-cat="star">⭐只看收藏</button>
        <button class="tab-btn" data-cat="unread">🔖只看未读</button>
    </div>

    <div class="tool-wrap">
        <button class="tool-btn" id="refreshBtn">🔄刷新</button>
        <button class="tool-btn" id="focusModeBtn">🎯专注阅读</button>
        <button class="tool-btn" id="markAllRead">全部标为已读</button>
        <button class="tool-btn" id="clearAllRead">清除全部已读标记</button>
        <button class="tool-btn" id="clearAllStar">清空全部收藏</button>
        <div class="font-group">
            <button class="font-btn" data-root="14">小</button>
            <button class="font-btn active" data-root="16">标准</button>
            <button class="font-btn" data-root="19">大</button>
        </div>
    </div>

    <!--浏览历史记录区域-->
    <div class="history-panel" id="historyPanel">
        <div class="history-header">
            <div class="history-title">🕐最近浏览</div>
            <button class="history-clear-btn" id="clearHistoryAll">🗑️清空历史</button>
        </div>
        <div class="history-items" id="historyItems"></div>
    </div>

    <div class="container" id="containerWrap">
        <div class="left-sidebar" id="listScrollWrap">
            <div class="sidebar-title">📋 内容列表</div>
            <div class="stat-info" id="statBox"></div>
            <div id="listBox"></div>
            <div class="list-loading" id="listLoading">🔄 刷新中...</div>
            <div id="listBackTop">⬆</div>
        </div>
        <div class="right-article" id="detailBox">
            <div class="read-progress-bar" id="progressBar"></div>
            <div class="empty-tip">
                <span>👈 点击左侧标题阅读文章</span>
                <span style="font-size:0.875rem;">仅本地个人学习使用</span>
            </div>
        </div>
    </div>

    <div id="backTop">⬆</div>

    <div class="disclaimer-wrap">
        <h4>免责声明</h4>
        <p>本程序为本地个人学习工具。内部内容为使用者根据公开新闻材料整理，非转载原始新闻。所有外部链接指向第三方网站，本工具不对第三方内容真实性负责。仅供个人学习使用，请勿公网部署。</p>
    </div>

<script>
const weatherInfo = {
    city:"北京",
    condition:"晴",
    temp:"26℃"
};
document.getElementById("weatherText").innerText = `${weatherInfo.city}｜${weatherInfo.condition}｜${weatherInfo.temp}`;

const articleData = [
    {
        title:"科技新闻示例：新一代芯片发布",
        category:"tech",
        source:"科技媒体",
        sourceUrl:"https://example.com",
        pubTime:"2026‑08‑01",
        content:`
<p>新一代处理器正式发布，计算能效相比上代有明显提升。</p>
<p>在AI推理、多任务并行场景下性能提升显著，面向消费级与工业场景。</p>
<p>多家厂商已经宣布会在后续产品中搭载该芯片。</p>
`
    },
    {
        title:"AI模型能力持续迭代",
        category:"tech",
        source:"科技资讯",
        sourceUrl:"https://example.com",
        pubTime:"2026‑08‑05",
        content:`
<p>大模型新版本更新，长文本理解、逻辑推理能力得到优化。</p>
<p>本地部署版本占用资源进一步下降，普通设备也可以流畅运行。</p>
`
    },
    {
        title:"联赛常规赛战况综述",
        category:"sport",
        source:"体育媒体",
        sourceUrl:"https://example.com",
        pubTime:"2026‑08‑10",
        content:`
<p>多场焦点比赛结束，积分榜格局发生变化。</p>
<p>多名年轻选手发挥亮眼，为队伍贡献关键得分。</p>
`
    },
    {
        title:"运动员赛季采访",
        category:"sport",
        source:"体育快讯",
        sourceUrl:"https://example.com",
        pubTime:"2026‑08‑12",
        content:`
<p>运动员谈及训练状态，对接下来的比赛充满信心。</p>
<p>团队整体磨合越来越好，目标冲击更好成绩。</p>
`
    }
];

const READ_KEY = "news_reader_read";
const STAR_KEY = "news_reader_star";
const SCROLL_KEY = "news_reader_scroll";
const FONT_KEY = "news_reader_fontroot";
const THEME_KEY = "news_reader_dark";
const LAST_ART_KEY = "news_reader_lastart";
const HISTORY_KEY = "news_reader_history";

//toast工具
const toastDom = document.getElementById("toast");
function showToast(msg){
    toastDom.innerText = msg;
    toastDom.classList.add("show");
    setTimeout(()=>toastDom.classList.remove("show"),2000);
}

function getReadSet(){
    const raw = localStorage.getItem(READ_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
}
function saveReadSet(s){
    localStorage.setItem(READ_KEY, JSON.stringify([...s]));
}
function getStarSet(){
    const raw = localStorage.getItem(STAR_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
}
function saveStarSet(s){
    localStorage.setItem(STAR_KEY, JSON.stringify([...s]));
}
function getScrollPos(){
    const raw = localStorage.getItem(SCROLL_KEY);
    return raw ? JSON.parse(raw) : {};
}
function saveScrollPos(obj){
    localStorage.setItem(SCROLL_KEY, JSON.stringify(obj));
}
//历史浏览记录
function getHistoryList(){
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
}
function pushHistory(aid,title){
    let arr = getHistoryList();
    arr = arr.filter(x=>x.aid !== aid);
    arr.unshift({aid,title});
    if(arr.length>8) arr.length=8;
    localStorage.setItem(HISTORY_KEY,JSON.stringify(arr));
    renderHistory();
}
//删除单条历史
function delSingleHistory(aid){
    if(!confirm("确定删除这条浏览记录？")) return;
    let arr = getHistoryList();
    arr = arr.filter(x=>x.aid !== aid);
    localStorage.setItem(HISTORY_KEY,JSON.stringify(arr));
    renderHistory();
    showToast("已删除单条历史");
}
//清空全部历史
document.getElementById("clearHistoryAll").onclick = function(){
    if(!confirm("确定要清空全部浏览历史？此操作不可恢复！")) return;
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
    showToast("已清空全部浏览历史");
};

function renderHistory(){
    const box = document.getElementById("historyItems");
    const arr = getHistoryList();
    box.innerHTML = "";
    const panelDom = document.getElementById("historyPanel");
    if(!arr.length){
        panelDom.style.display="none";
        return;
    }
    panelDom.style.display="block";
    arr.forEach(h=>{
        const span = document.createElement("div");
        span.className="history-item";
        span.innerText = h.title;
        const closeBtn = document.createElement("span");
        closeBtn.className = "history-item-close";
        closeBtn.innerText = "×";
        closeBtn.onclick = (e)=>{
            e.stopPropagation();
            delSingleHistory(h.aid);
        };
        span.appendChild(closeBtn);
        span.onclick = ()=>openArticleByAid(h.aid);
        box.appendChild(span);
    });
}

// 更新统计信息
function updateStat(){
    const readSet = getReadSet();
    const starSet = getStarSet();
    const total = articleData.length;
    const readCnt = readSet.size;
    const starCnt = starSet.size;
    document.getElementById("statBox").innerText = `📊 全部：${total}篇｜已读：${readCnt}篇｜收藏：${starCnt}篇`;
}

//全局字号切换
const fontBtns = document.querySelectorAll(".font-btn");
function applyRootFont(px){
    document.documentElement.style.fontSize = px + "px";
    localStorage.setItem(FONT_KEY, px);
    fontBtns.forEach(b=>{
        b.classList.toggle("active", Number(b.dataset.root) === px);
    });
}
const savedFont = localStorage.getItem(FONT_KEY);
if(savedFont){
    applyRootFont(Number(savedFont));
}
fontBtns.forEach(btn=>{
    btn.onclick = ()=>{
        applyRootFont(Number(btn.dataset.root));
    }
});

//暗黑模式
const themeBtn = document.getElementById("themeBtn");
let darkMode = localStorage.getItem(THEME_KEY) === "1";
function applyDark(){
    if(darkMode){
        document.documentElement.setAttribute("data-theme","dark");
        themeBtn.innerText = "切换浅色模式";
    }else{
        document.documentElement.removeAttribute("data-theme");
        themeBtn.innerText = "切换暗黑模式";
    }
}
applyDark();
themeBtn.onclick = ()=>{
    darkMode = !darkMode;
    localStorage.setItem(THEME_KEY, darkMode ? "1":"0");
    applyDark();
};

//专注模式切换
const focusBtn = document.getElementById("focusModeBtn");
const leftSideDom = document.getElementById("listScrollWrap");
let focusMode = false;
focusBtn.onclick = function(){
    focusMode = !focusMode;
    if(focusMode){
        leftSideDom.classList.add("hide-sidebar");
        focusBtn.innerText = "📖退出专注";
        showToast("已开启专注阅读模式");
    }else{
        leftSideDom.classList.remove("hide-sidebar");
        focusBtn.innerText = "🎯专注阅读";
        showToast("已退出专注模式");
    }
};

//刷新按钮逻辑，增加loading视觉反馈
const listLoading = document.getElementById("listLoading");
document.getElementById("refreshBtn").onclick = function(){
    listLoading.classList.add("show");
    //清空搜索框
    searchInput.value = "";
    //切回全部分类
    currentCat = "all";
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
    document.querySelector('.tab-btn[data-cat="all"]').classList.add("active");
    //重置阅读区域
    currentArticleId = null;
    localStorage.removeItem(LAST_ART_KEY);
    detailBox.innerHTML = `
        <div class="read-progress-bar" id="progressBar"></div>
        <div class="empty-tip">
            <span>👈 点击左侧标题阅读文章</span>
            <span style="font-size:0.875rem;">仅本地个人学习使用</span>
        </div>
    `;
    //重置列表滚动位置
    listScrollWrap.scrollTop = 0;

    setTimeout(()=>{
        renderList();
        renderHistory();
        listLoading.classList.remove("show");
    },220);
    showToast("列表已刷新");
};

//清空全部收藏，增加确认弹窗
document.getElementById("clearAllStar").onclick = function(){
    if(window.confirm("确定要清空全部收藏吗？此操作不可恢复！")){
        saveStarSet(new Set());
        renderList();
        showToast("收藏已全部清空");
    }
};

//清除全部已读标记，增加确认弹窗
document.getElementById("clearAllRead").onclick = function(){
    if(window.confirm("确定要清除全部已读标记吗？此操作不可恢复！")){
        saveReadSet(new Set());
        renderList();
        showToast("已读标记已清除");
    }
};

const backTopBtn = document.getElementById("backTop");
window.addEventListener("scroll",()=>{
    backTopBtn.classList.toggle("show", window.scrollY>300);
});
backTopBtn.onclick = ()=> window.scrollTo({top:0, behavior:"smooth"});

const listScrollWrap = document.getElementById("listScrollWrap");
const listBackTopBtn = document.getElementById("listBackTop");
listScrollWrap.addEventListener("scroll",()=>{
    listBackTopBtn.classList.toggle("show", listScrollWrap.scrollTop>200);
});
listBackTopBtn.onclick = ()=> listScrollWrap.scrollTo({top:0, behavior:"smooth"});

const listBox = document.getElementById("listBox");
const detailBox = document.getElementById("detailBox");
const searchInput = document.getElementById("searchInput");
let currentCat = "all";
let currentArticleId = null;

//返回首页
function goBack(){
    currentArticleId = null;
    localStorage.removeItem(LAST_ART_KEY);
    document.querySelectorAll(".news-item").forEach(el=>el.classList.remove("active"));
    detailBox.innerHTML = `
        <div class="read-progress-bar" id="progressBar"></div>
        <div class="empty-tip">
            <span>👈 点击左侧标题阅读文章</span>
            <span style="font-size:0.875rem;">仅本地个人学习使用</span>
        </div>
    `;
}

//保存阅读滚动位置 & 上次文章
detailBox.addEventListener("scroll",()=>{
    if(!currentArticleId) return;
    const pos = getScrollPos();
    pos[currentArticleId] = detailBox.scrollTop;
    saveScrollPos(pos);
    //计算阅读进度条
    const scrollTop = detailBox.scrollTop;
    const scrollHeight = detailBox.scrollHeight - detailBox.clientHeight;
    const percent = scrollHeight <= 0 ? 0 : (scrollTop / scrollHeight)*100;
    const bar = document.getElementById("progressBar");
    if(bar) bar.style.width = percent + "%";
});

//通过aid打开文章，用于历史记录恢复
function openArticleByAid(aid){
    const parts = aid.split("_");
    const title = parts.slice(1).join("_");
    const idx = articleData.findIndex(x=>x.title === title);
    if(idx === -1) return;
    const item = articleData[idx];
    document.querySelectorAll(".news-item").forEach(el=>el.classList.remove("active"));
    const r = getReadSet();
    r.add(aid);
    saveReadSet(r);
    currentArticleId = aid;
    localStorage.setItem(LAST_ART_KEY,JSON.stringify({aid:aid}));
    pushHistory(aid,item.title);
    detailBox.innerHTML = `
        <div class="read-progress-bar" id="progressBar"></div>
        <button class="back-btn show" id="goBackBtn">← 返回列表</button>
        <div class="article-tool-bar">
            <button class="tool-btn" id="copyArticleBtn">📋复制全文</button>
        </div>
        <h2 class="art-title">${item.title}</h2>
        <span class="art-tag ${item.category==="tech"?"tag-tech":"tag-sport"}">${item.category==="tech"?"科技":"体育"}</span>
        <div class="art-time">发布时间：${item.pubTime}</div>
        <div class="art-meta">来源：${item.source}｜<a target="_blank" href="${item.sourceUrl}">查看原文链接</a></div>
        <div class="art-content" id="articleContentDom">${item.content}</div>
    `;
    document.getElementById("goBackBtn").onclick = goBack;
    //复制全文
    document.getElementById("copyArticleBtn").onclick = async ()=>{
        const text = document.getElementById("articleContentDom").innerText;
        try{
            await navigator.clipboard.writeText(text);
            showToast("已复制文章正文");
        }catch(e){
            showToast("复制失败");
        }
    };
    const posMap = getScrollPos();
    setTimeout(()=>{
        if(posMap[aid]) detailBox.scrollTop = posMap[aid];
        else detailBox.scrollTop = 0;
    },20);
    renderList();
}

function renderList(){
    const readSet = getReadSet();
    const starSet = getStarSet();
    updateStat();
    const kw = searchInput.value.trim().toLowerCase();
    let arr = articleData;
    if(currentCat !== "all"){
        if(currentCat === "star"){
            arr = arr.filter((it,idx)=> starSet.has(idx+"_"+it.title));
        }else if(currentCat === "unread"){
            arr = arr.filter((it,idx)=> !readSet.has(idx+"_"+it.title));
        }else{
            arr = arr.filter(it=> it.category === currentCat);
        }
    }
    if(kw){
        arr = arr.filter(it=> it.title.toLowerCase().includes(kw));
    }
    listBox.innerHTML = "";
    if(arr.length === 0){
        listBox.innerHTML = `<div class="no-match">暂无匹配文章</div>`;
        return;
    }
    arr.forEach(item=>{
        const realIdx = articleData.findIndex(x=>x.title === item.title);
        const aid = realIdx + "_" + item.title;
        const div = document.createElement("div");
        div.className = "news-item";
        const isRead = readSet.has(aid);
        const isStar = starSet.has(aid);
        div.innerHTML = `
            <div class="star-btn ${isStar?"star-active":""}">${isStar?"⭐":"☆"}</div>
            <div class="item-title ${isRead?"read":""}">${item.title}</div>
            <div class="item-time">🕒 ${item.pubTime}</div>
            <span class="item-tag ${item.category==="tech"?"tag-tech":"tag-sport"}">${item.category==="tech"?"科技":"体育"}</span>
        `;
        const starDom = div.querySelector(".star-btn");
        starDom.onclick = (e)=>{
            e.stopPropagation();
            const s = getStarSet();
            if(s.has(aid)) s.delete(aid);
            else s.add(aid);
            saveStarSet(s);
            renderList();
        };
        div.onclick = ()=>{
            openArticleByAid(aid);
        };
        listBox.appendChild(div);
    });
}

document.querySelectorAll(".tab-btn").forEach(btn=>{
    btn.onclick = ()=>{
        document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        currentCat = btn.dataset.cat;
        currentArticleId = null;
        localStorage.removeItem(LAST_ART_KEY);
        detailBox.innerHTML = `
            <div class="read-progress-bar" id="progressBar"></div>
            <div class="empty-tip">
                <span>👈 点击左侧标题阅读文章</span>
                <span style="font-size:0.875rem;">仅本地个人学习使用</span>
            </div>
        `;
        renderList();
    }
});
searchInput.oninput = ()=>{
    currentArticleId = null;
    localStorage.removeItem(LAST_ART_KEY);
    detailBox.innerHTML = `
        <div class="read-progress-bar" id="progressBar"></div>
        <div class="empty-tip">
            <span>👈 点击左侧标题阅读文章</span>
            <span style="font-size:0.875rem;">仅本地个人学习使用</span>
        </div>
    `;
    renderList();
};

document.getElementById("markAllRead").onclick = ()=>{
    if(window.confirm("确定全部标为已读？")){
        const s = getReadSet();
        articleData.forEach((it,i)=> s.add(i+"_"+it.title));
        saveReadSet(s);
        renderList();
        showToast("已全部标记已读");
    }
};

//初始化
renderList();
renderHistory();

//页面加载恢复上次阅读文章
(function restoreLastArticle(){
    const raw = localStorage.getItem(LAST_ART_KEY);
    if(!raw) return;
    try{
        const obj = JSON.parse(raw);
        if(obj.aid){
            openArticleByAid(obj.aid);
        }
    }catch(e){}
})();
</script>
</body>
</html>
