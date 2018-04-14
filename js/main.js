// 把code写到#code和style标签里
function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let timer = setInterval(() => {
        n += 1
        //给代码加高亮效果写入#code
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        //将代码写入style标签里面
        styleTag.innerHTML = prefix + code.substring(0, n)
        //页面自动滚动
        domCode.scrollTop = domCode.scrollHeight
        //页面上字符全部写入完毕后结束计时器
        if (n >= code.length) {
            window.clearInterval(timer)
            fn && fn.call()
        }
    }, 60)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let timer = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        //页面自动滚动
        domPaper.scrollTop = domPaper.scrollHeight
        //页面上字符全部写入完毕后结束计时器
        if (n >= markdown.length) {
            window.clearInterval(timer)
            fn && fn.call()
        }
    }, 60)
}

var result = `/*
* 大家好，我是左冬
* 只用文字作做我介绍太单调啦
* 我就用代码来介绍吧
*/

/* 首先给所有元素加上过渡效果 */
*{
    transition: all 1s;
}

/* 给个灰一点的背景 */
html{
    background: rgb(50,41,49);
    color: rgb(222,222,222);
}

/* 文字离边框也太近了吧 */
#code{
    padding: 16px;
    border: 1px solid rgb(255,255,255);
    overflow: auto;
}


/* 我需要一点代码高亮 */
.token.selector{ color: rgb(166,220,39); }
.token.property{ color: rgb(161,142,248); }
.token.punctuation{ color: rgb(230,219,116); }
.token.function{ color: rgb(102,217,233); }

/* 加点 3D 效果 */
#code-wrapper{
    width: 50%;
    height: 100vh;
    left: 0;
    top: 0;
    overflow: auto;
    perspective: 1000px;
}

#code {
    transition: none;
    transform: rotateY(10deg) translateZ(-30px);
}


/* 现在正式开始 */
/* 我需要一张白纸 */

#paper {
    right: 0;
    top: 0;
}
#paper > .content {
    color: black;
    display: block;
}
/* 于是我就可以在白纸上写简历了，请看右边 */
`
var result2 = `/* 看起来怪怪的。。。
 * 对了，这是 Markdown格式的，来把它变成 HTML
 * 需要用到一个优秀的库 marked.js
 */
`
var result3 = `/*
 * OK，相对好些了
 * 接下来仔给HTML一点样式
 */
#paper {

}
`
var result4 = `/*
* 谢谢收看:)
* 有什么想说的，可以给我留言哦，最后再来个留言板
*/
#code-wrapper {
    height: 60vh;
}
#message {
    border: 1px solid rgb(255,255,255);
    margin-left: 10px;
    margin-top: 28px;
    width: 48%;
    height: 34vh;
    padding: 16px;
}
#postMessageForm input {
    height: 22px;
    padding-left: 6px;
    margin-right: 20px;
    color: rgb(51,51,51);
    outline:none;
    background: rgb(238,238,238);
    border: rgb(238,238,238);
}
#postMessageForm > button{
    border: 1px solid rgb(255,255,255);
    padding: 0 4px;
    height: 22px;
    color: rgb(255,255,255);
    background-color: transparent;
    outline:none;
}

`
var md = `## 左冬
女，24岁，本科
求职意向：前端开发工程师

### 技能介绍
- HTML 5：根据 HTML5 标准编写具有语义化的文档结构
- CSS：熟练使用CSS样式布局
- 响应式页面：熟悉 viewport 及媒体查询，移动端动态 REM 书写响应式页面
- Bootstrap：能够使用 Bootstrap 制作精美布局
- 原生 JavaScript：在不使用框架的情况下，能够使用原生 JS 常用 API 完成部分需求
- AJAX、promise：熟悉异步编程
- ECMAScript 2015：了解 ES6 的部分新特性，并能够在实际项目中使用
- jQuery：够使用 jQuery 制作网站、进行 DOM 操作，事件代理、轮播、动画等
- MVC设计模式：了解 MVC、Observer 软件设计模式理念，并能够应用到实际项目中
- Vue：能够使用 Vue.js 完成需求，了解 Vue.js 的数据双向绑定、数据响应式原理、父子组件间的通信原理，能够使用 Vue-Router 制作前端路由
- HTTP：了解 HTTP 基础知识，了解常见状态码含义，能够根据请求查看响应
- Git：解 git 版本控制工具以及常用的操作
- Node.js：了解 Node.js 一些知识，能够使用 Node.js 搭建小服务器，根据请求的 URL 返回指定的数据
- HTTP 缓存、Cookie、Session：了解客户端缓存、Cookie、session 等知识，并写了相应博客

### 项目介绍
1. [网易云音乐]()
2. [Vue 重构有赞商城]()
3. [节节画板]()
4. [豆瓣电影]()
5. [在线简历编辑器]()
6. [一个导航]()

### 链接
- [GitHub]()
- [Blog]()

### 工作经历
Microsoft Skype_intl 团队，本地化测试，负责 EmoticonsCloud & VideoMoji 项目。
`


writeCode('', result, () => {
    createPaper(() => {
        writeMarkdown(md, () => {
            writeCode(result, result2, () => {
                changeMarkdownToHtml(() => {
                    writeCode(result+result2,result4,()=>{
                        leaveMessage()
                    })
                })
            })
        })

    })
})

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}
function changeMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}
function leaveMessage(){
    let message = document.querySelector('#message')
    message.classList.remove('hide')

    
}

var APP_ID = 'T1ov6Kbk0OaGztEMI7YkrCl5-gzGzoHsz';
var APP_KEY = '5tBAjqMyIoCmodYNnjDtEdNc';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var query = new AV.Query('Message')
query.find().then(function(messages){
    let array = messages.map((item)=>item.attributes)
    console.log(array)
    array.forEach((item)=>{
        let li = document.createElement('li')
        li.innerText = `${item.name}: ${item.content}`
        let messageList = document.querySelector('#messageList')
        messageList.append(li)
    })
})

let myForm = document.querySelector('#postMessageForm')


myForm.addEventListener('submit',function(e){
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    //Message 是对应的表名
    var Message = AV.Object.extend('Message')
    var message = new Message()
    message.save({
        'name': name,
        'content': content
    }).then(function(object){
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.append(li)
        
    })
})



// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//     words: 'Hello World!'
// }).then(function (object) {
//     console.log(object)
// })