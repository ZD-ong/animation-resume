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
    }, 0)
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
    }, 0)
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
`
var md = `# 左冬

1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
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
        li.innerText = item.content
        let messageList = document.querySelector('#messageList')
        messageList.append(li)
    })
})

let myForm = document.querySelector('#postMessageForm')


myForm.addEventListener('submit',function(e){
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    //Message 是对应的表名
    var Message = AV.Object.extend('Message')
    var message = new Message()
    message.save({
        'content': content
    }).then(function(object){
        console.log('存入成功')
        console.log(object)
    })
})



// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//     words: 'Hello World!'
// }).then(function (object) {
//     console.log(object)
// })