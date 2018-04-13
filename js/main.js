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
    }, 10)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let timer = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown + code.substring(0, n)
        //页面自动滚动
        domPaper.scrollTop = domPaper.scrollHeight
        //页面上字符全部写入完毕后结束计时器
        if (n >= markdown.length) {
            window.clearInterval(timer)
            fn && fn.call()
        }
    }, 10)
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
    min-height: 100vh;
}

/* 文字离边框太近了吧 */
#code{
    padding: 0.5em;
    margin: 0.5em;
    border: 1px solid #fff;
    overflow: auto;
    width: 100%;
    height: 100%;
}


/* 我需要一点代码高亮 */
.token.selector{ color: rgb(166,220,39); }
.token.property{ color: rgb(161,142,248); }
.token.punctuation{ color: rgb(230,219,116); }
.token.function{ color: rgb(102,217,233); }



/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
    width: 50%; left: 0; position: fixed; height: 100%;
}
#paper > .content {
    display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`
var result2 = `/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
var md = `# 自我介绍
我叫 XXX
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
        console.log('paper有了')
        writeCode(result, result2, () => {
            writeMarkdown(md)
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
    fn.call()
}