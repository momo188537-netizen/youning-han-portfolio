import { useEffect, useLayoutEffect, useState } from 'react'
import './App.css'
import { applyLanguage } from './translations'

const toolStages = [
  { id:'research', no:'01', title:'研究分析', en:'Research', summary:'定量 · 定性 · 洞察', tools:[
    { name:'SPSS', type:'定量分析', text:'用于数据整理、统计分析与结果验证，从数据中识别关系与趋势。' },
    { name:'MAXQDA', type:'定性分析', text:'用于访谈编码、主题归纳与田野资料分析，形成结构化的研究发现。' },
    { name:'NVivo', type:'文本分析', text:'用于研究资料管理、文本检索、编码比较与主题关联分析。' },
  ]},
  { id:'office', no:'02', title:'办公交付', en:'Deliver', summary:'文档 · 沟通 · 展示', tools:[
    { name:'MS Office', type:'文档协作', text:'使用文档、表格与演示工具整理信息，支持团队协作与成果交付。' },
    { name:'Canvas', type:'视觉呈现', text:'用于制作清晰直观的视觉内容，让方案、信息与成果更易理解。' },
    { name:'Outlook', type:'沟通管理', text:'用于邮件沟通、日程安排与任务协调，保持工作节奏清晰有序。' },
  ]},
  { id:'ai', no:'03', title:'AI 协作', en:'AI Collaboration', summary:'构思 · 整理 · 优化', tools:[
    { name:'AI Chat', type:'对话协作', text:'ChatGPT · Gemini · Claude' },
    { name:'AI Agent', type:'智能执行', text:'Codex · WorkBuddy' },
  ]},
]

const traits = [
  { id:'cross', label:'跨文化交流', short:'三语沟通', detail:'在不同文化与语言之间建立理解，让不同的声音彼此靠近。' },
  { id:'empathy', label:'ENFJ', short:'热情与共情', detail:'善于倾听、关注他人感受，也愿意主动提供支持和帮助。' },
  { id:'lead', label:'组织协作', short:'认真负责', detail:'主动组织任务、协调反馈，并持续推进到形成明确结果。' },
]

const profilePhotos = [
  { src:'/profile-mountain.jpg', caption:'去看更大的世界' },
  { src:'/profile-graduation.jpg', caption:'毕业，也是新的开始' },
  { src:'/profile-coast.jpg', caption:'把好奇心带在路上' },
  { src:'/profile-autumn.jpg', caption:'认真感受生活的四季' },
  { src:'/profile-city.jpg', caption:'在不同城市收集故事' },
]

const workItems = [
  { id:'press', no:'01', date:'2026.2—2026.4', place:'南京 · 中国', org:'南京大学出版社', role:'历史社科图书出版策划编辑', summary:'校对国际关系与社会科学书稿；围绕热点议题开展政策和市场调研，协调学者与作者反馈并推进项目立项。', points:[['质量','核查引注、译法与史实，确保内容符合学术及出版标准'],['研究','围绕国际关系热点开展政策与市场调研'],['协调','联系学者与作者，汇总反馈并推进项目立项']] },
  { id:'ta', no:'02', date:'2026.4—2026.7', place:'东京 · 日本', org:'早稻田大学', role:'课程助教', summary:'担任“日本历史和社会文化研究”课程助教，管理超过 50 人的跨文化班级；负责课程资料上传、课堂协调与秩序维护、课后答疑，并协助导师完成期末论文评分与反馈。', points:[['组织','管理超过 50 人的跨文化班级，准备并上传课程资料，安排课堂分组与流程'],['沟通','回应学生问题并协助不同文化背景的学生理解课程要求'],['反馈','协助完成期末论文评分与书面反馈']] },
  { id:'bluefocus', no:'03', date:'2026.8—至今', place:'上海 · 中国', org:'蓝色光标', role:'HR（人才发展）', summary:'支持“蓝血超新星”“百一计划”“NEBU”等集团级人才发展与培训项目，参与从前期调研策划、过程执行到结项复盘的全流程工作。', points:[['线下培训项目运营','准备培训物料，协调跨部门合作与现场活动，并收集学员反馈、整理分析问卷数据'],['培训课程英语化落地','负责网络培训课程英语化与内容适配，推动人才发展项目面向国际团队落地'],['线上 AI 培训搭建','协助搭建线上 AI 培训平台，参与点对点及组对组培训计划的设计与实施']] },
]

const languageItems = [
  { id:'english', title:'英语', level:'IELTS 7.0', highlights:[['9.0','阅读单项满分'],['助教','英语课堂沟通']], text:'本科与硕士阶段均接受全英语专业教育，并担任英语授课专业课程助教。能够清晰表达观点、组织课堂沟通，并在多元文化环境中自然交流。', note:'学术阅读 · 课堂表达 · 跨文化沟通' },
  { id:'japanese', title:'日语', level:'JLPT N2', highlights:[['6 年','在日学习生活'],['融入','理解社会文化']], text:'在日本完成本科并继续攻读硕士，长期深入校园与日常社会环境。能够使用日语完成生活沟通，也对日本社会文化与交往方式形成了切身理解。', note:'社会融入 · 文化理解 · 日常沟通' },
]

const researchItems = [
  { id:'nationalism', year:'2022', meta:'威廉姆斯文理学院 · 2022.8—2022.10', title:'中美民族主义话语对比分析', text:'作为组长带领五人团队分配任务、汇总教授反馈并推进修改；完成 20 次线上访谈，结合定量、定性方法与扎根理论分析民族认同话语。', tags:['团队领导','深度沟通','混合研究'] },
  { id:'paper', year:'2023', meta:'BCP Social Sciences & Humanities · 2023.2.15', title:'Son Preferences in China: What are the causes?', text:'独立完成文献综述与中国古籍语料分析，从经济、文化和政治三个维度识别“重男轻女”现象背后的成因；文章发表于国际会议并获得百余次下载。', tags:['独立研究','问题发现','语料分析'], link:'https://bcpublication.org/index.php/SSH/article/view/3806' },
  { id:'field', year:'2025', meta:'武汉东西湖区慈惠街道 · 2025.7—2025.8', title:'新农村建设调研', text:'围绕乡村旅游建设下的居民生活变化开展田野调查，完成 10 次居民及从业者深度访谈；使用 MAXQDA 进行定性分析，识别发展问题并形成社区治理建议。', tags:['访谈沟通','MAXQDA','洞察与建议'] },
]

function App(){
  const [menu,setMenu]=useState(false)
  const [language,setLanguage]=useState('zh')
  const [showHome,setShowHome]=useState(false)
  const [activeTool,setActiveTool]=useState('research')
  const [activeTrait,setActiveTrait]=useState('cross')
  const [photoIndex,setPhotoIndex]=useState(0)
  const [activeWork,setActiveWork]=useState('press')
  const [activeLanguage,setActiveLanguage]=useState('english')
  const [activeResearch,setActiveResearch]=useState('nationalism')
  useEffect(()=>{
    const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('show')),{threshold:.12})
    document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el))
    const onScroll=()=>{document.documentElement.style.setProperty('--page',String(scrollY/(document.documentElement.scrollHeight-innerHeight)));setShowHome(scrollY>innerHeight*.72)}
    addEventListener('scroll',onScroll,{passive:true});onScroll()
    return()=>{observer.disconnect();removeEventListener('scroll',onScroll)}
  },[])
  useLayoutEffect(()=>{
    applyLanguage(document.querySelector('main'),language)
  },[language,menu,activeTool,activeTrait,activeWork,activeLanguage,activeResearch,photoIndex])
  const close=()=>setMenu(false)
  return <main>
    <div className="progress" />
    <a className={`back-home ${showHome?'is-shown':''}`} href="#top" aria-label="一键返回首页"><span>↑</span><small>首页</small></a>
    <section className="hero" id="top">
      <nav className="nav wrap">
        <a className="logo" href="#top"><b>Y</b><span>韩佑宁 ✦</span></a>
        <div className={menu?'links open':'links'}><a href="#top" onClick={close}>首页</a><a href="#education" onClick={close}>教育</a><a href="#research" onClick={close}>科研</a><a href="#experience" onClick={close}>经历</a><a href="#tools" onClick={close}>工具</a><a href="#contact" onClick={close}>联系</a></div>
        <div className="nav-actions"><a className="hello" href="#contact">和我聊聊 ↗</a><button className="lang-toggle" onClick={()=>setLanguage(language==='zh'?'en':'zh')} aria-label={language==='zh'?'Switch to English':'切换为中文'}>{language==='zh'?'EN':'中文'}</button><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="切换菜单">{menu?'×':'☰'}</button></div>
      </nav>
      <div className="hero-grid wrap">
        <div className="home-intro">
          <p className="home-kicker">↳ 你好，我是韩佑宁</p>
          <h1>连接文化，<br/><i>理解人与人。</i></h1>
          <p className="home-quote">“用真诚的沟通，让不同的声音彼此靠近。”</p>
          <p className="home-summary">我是一名早稻田大学国际关系专业硕士生，关注社会、文化与人之间的互动和沟通。跨文化学习与研究经历，让我能够倾听不同声音、理解多元需求，并在差异中建立共识。我热情开朗，乐于与人连接，也愿意在他人需要时主动提供支持；面对工作，我勤奋投入、认真负责，会持续推进任务直至取得结果。秉持“成人达己”的价值观，我希望在人力资源工作中连接个人与组织，帮助他人成长，也与团队共同实现目标。</p>
          <div className="job-preference"><span><small>寻找岗位</small>HR</span><span><small>地点</small>不限</span></div>
          <div className="trait-tags"><span>跨文化交流</span><span>沟通能力</span><span>领导力</span><span>责任心</span><span>ENFJ</span></div>
          <div className="home-actions"><a href="#education">了解我的经历 →</a><a href="#contact">联系我 ✦</a><a className="resume-download" href="/Han-Youning-Resume-Chinese-2026.pdf" download="韩佑宁中文简历.pdf">下载中文简历 ↓</a><a className="resume-download" href="/Han-Youning-Resume-English-2026.pdf" download="Youning-Han-English-Resume.pdf">下载英文简历 ↓</a></div>
        </div>
        <div className="profile-board">
          <span className="board-note note-me">↙ 这就是我</span><span className="board-note note-open"><i/>正在寻找正式工作</span>
          <h2 className="meet-title">Meet Youning</h2>
          <div className="board-gallery" aria-label="韩佑宁的生活照片">
            {profilePhotos.map((photo,index)=>{
              const position=(index-photoIndex+profilePhotos.length)%profilePhotos.length
              return <button key={photo.src} className={`gallery-photo gallery-position-${position>2?'hidden':position}`} onClick={()=>setPhotoIndex((photoIndex+1)%profilePhotos.length)} aria-hidden={position>2} tabIndex={position===0?0:-1}>
                <img src={photo.src} alt={position===0?`韩佑宁：${photo.caption}`:''}/><span>{photo.caption}</span>
              </button>
            })}
          </div>
          <div className="gallery-controls">
            <button onClick={()=>setPhotoIndex((photoIndex-1+profilePhotos.length)%profilePhotos.length)} aria-label="上一张照片">←</button>
            <span>{String(photoIndex+1).padStart(2,'0')} / {String(profilePhotos.length).padStart(2,'0')}</span>
            <button onClick={()=>setPhotoIndex((photoIndex+1)%profilePhotos.length)} aria-label="下一张照片">→</button>
          </div>
          {traits.map((trait,index)=><button key={trait.id} className={`board-callout callout-${index===0?'one':index===1?'two':'three'} ${activeTrait===trait.id?'active':''}`} onClick={()=>setActiveTrait(trait.id)}><b>{trait.label}</b><br/>{trait.short}</button>)}
          <div className="board-life-tags"><span>热爱动物</span><span>热爱生活</span><span>乐于助人</span></div>
          <div className="board-stars">✦　♡　✧</div>{traits.filter(t=>t.id===activeTrait).map(t=><p className="board-footer board-footer-dynamic" key={t.id}>{t.detail}</p>)}
        </div>
      </div>
      <div className="ticker" aria-hidden="true" />
    </section>

    <section className="resume-page education-page" id="education"><div className="wrap page-grid">
      <div className="page-aside" data-reveal><div className="section-label"><span>01</span> EDUCATION</div><p>教育背景</p><div className="page-doodle">A+</div></div>
      <div className="page-content" data-reveal><p className="page-kicker">学习经历</p><h2>在多元的课堂与生活中，<br/>形成理解世界的<span>视角。</span></h2>
        <div className="education-timeline">
          <article className="timeline-card cream-card"><div className="year">2021.9—2025.9 · 本科</div><h3><a className="school-link" href="https://www.ritsumei.ac.jp/" target="_blank" rel="noreferrer">立命馆大学 <small>Ritsumeikan University</small><i>↗</i></a></h3><h4>国际关系 · 全球研究方向 · 文学学士</h4><p>在全英语授课的专业环境中完成国际关系学习，与来自不同国家和文化背景的同学共同讨论全球议题。本科绩点 4.3 / 5.0，专业排名前 5%，连续四年获得校级奖学金。</p><div className="course-tags"><span>国际社会学 A+</span><span>国际政治经济 A+</span><span>现代工商管理 A+</span></div></article>
          <article className="timeline-card blue-card"><div className="year">2025.9—2027.9 · 硕士</div><h3><a className="school-link" href="https://www.waseda.jp/top/en/" target="_blank" rel="noreferrer">早稻田大学 <small>Waseda University</small><i>↗</i></a></h3><h4>国际关系 · 社会研究方向 · 文学硕士</h4><p>继续在英语授课环境中深化社会研究，研究课题聚焦中国社会中的婚姻、家庭与性别；同时担任国际关系专业课程助教。</p><div className="course-tags"><span>移民研究 A+</span><span>社会学质性研究方法 A+</span><span>日本历史与社会 A+</span></div></article>
        </div>
      </div>
    </div></section>

    <section className="resume-page experience-page" id="experience"><div className="wrap page-grid">
      <div className="page-aside" data-reveal><div className="section-label"><span>03</span> EXPERIENCE</div><p>实习经历</p><div className="page-doodle">✦</div></div>
      <div className="page-content" data-reveal><p className="page-kicker">WORK & COLLABORATION</p><h2>把研究能力，<br/>转化为可靠的<span>执行。</span></h2>
        <div className="evidence-switcher work-switcher"><div className="evidence-tabs" role="tablist" aria-label="实习经历">{workItems.map(item=><button key={item.id} className={activeWork===item.id?'active':''} onClick={()=>setActiveWork(item.id)} role="tab" aria-selected={activeWork===item.id}><span>{item.no}</span><small>{item.role}</small><b>{item.org}</b><i>↗</i></button>)}</div>{workItems.filter(item=>item.id===activeWork).map(item=><article className="evidence-panel" key={item.id}><div className="evidence-meta"><span>{item.role}</span><time>{item.date}</time></div><h3>{item.org}</h3><p>{item.summary}</p><dl>{item.points.map(([term,desc])=><div key={term}><dt>{term}</dt><dd>{desc}</dd></div>)}</dl></article>)}</div>
        <article className="opportunity-card"><span className="opportunity-plus">＋</span><div><small>NEXT CHAPTER · 职业新起点</small><h3>期待在这个秋天，遇见值得长期投入与共同成长的机会。</h3><p>学习、研究与实习经历，为我步入职场奠定了基础。这个秋天，我期待一份能够长期投入、持续成长的正式工作，与团队共同创造真实价值。</p></div><a href="#contact">和我聊聊 ↗</a></article>
      </div>
    </div></section>

    <section className="resume-page language-page" id="languages"><div className="wrap page-grid">
      <div className="page-aside" data-reveal><div className="section-label"><span>04</span> LANGUAGES</div><p>语言能力</p><div className="page-doodle">Aa</div></div>
      <div className="page-content" data-reveal><p className="page-kicker">THREE LANGUAGES, MORE CONNECTIONS</p><h2>在不同语言之间，<br/>准确地<span>理解与表达。</span></h2>
        <div className="language-interactive"><div className="language-tabs" role="tablist" aria-label="语言能力">{languageItems.map((item,index)=><button key={item.id} className={activeLanguage===item.id?'active':''} onClick={()=>setActiveLanguage(item.id)} role="tab" aria-selected={activeLanguage===item.id}><span>0{index+1}</span><b>{item.title}</b><small>{item.level}</small></button>)}</div>{languageItems.filter(item=>item.id===activeLanguage).map(item=><article className="language-detail-panel" key={item.id}><div className="language-top"><b>{item.title}</b><span>{item.level}</span></div><div className="language-highlights">{item.highlights.map(([big,label])=><strong key={label}><i>{big}</i>{label}</strong>)}</div><p>{item.text}</p><div className="language-note">{item.note}</div></article>)}</div>
      </div>
    </div></section>

    <section className="resume-page research-page" id="research"><div className="wrap page-grid">
      <div className="page-aside" data-reveal><div className="section-label"><span>02</span> RESEARCH</div><p>科研经历</p><div className="page-doodle">⌁</div></div>
      <div className="page-content" data-reveal><p className="page-kicker">FIELDWORK, WRITING & ANALYSIS</p><h2>从真实的社会现场，<br/>提炼有价值的<span>洞察。</span></h2>
        <div className="evidence-switcher research-switcher"><div className="evidence-tabs" role="tablist" aria-label="科研经历">{researchItems.map((item,index)=><button key={item.id} className={activeResearch===item.id?'active':''} onClick={()=>setActiveResearch(item.id)} role="tab" aria-selected={activeResearch===item.id}><span>0{index+1}</span><small>{item.year}</small><b>{item.title}</b><i>↗</i></button>)}</div>{researchItems.filter(item=>item.id===activeResearch).map(item=><article className="evidence-panel research-detail" key={item.id}><div className="evidence-meta"><span>{item.meta}</span><time>{item.year}</time></div><h3>{item.link?<a className="research-paper-link" href={item.link} target="_blank" rel="noreferrer">{item.title}<i>↗</i></a>:item.title}</h3><p>{item.text}</p><div className="research-tags">{item.tags.map(tag=><b key={tag}>{tag}</b>)}</div></article>)}</div>
      </div>
    </div></section>

    <section className="resume-page tools-page" id="tools"><div className="wrap page-grid">
      <div className="page-aside" data-reveal><div className="section-label"><span>05</span> TOOLS</div><p>工具能力</p><div className="page-doodle">⌘</div></div>
      <div className="page-content" data-reveal><p className="page-kicker">从信息到成果</p><h2>让工具服务于沟通、分析，<br/>也服务于<span>最终交付。</span></h2><p className="tools-intro">工具位于工作流的末端。对我而言，它们不是简历中孤立的关键词，而是把访谈、数据和想法转化为可协作、可验证、可交付成果的方法。</p>
        <div className="workflow workflow-static" aria-label="工具工作流程">{toolStages.map(stage=><div key={stage.id}><i>{stage.no}</i><b>{stage.en}</b><span>{stage.title} / {stage.summary}</span></div>)}</div>
        <div className="tool-workbench"><div className="tool-tabs" role="tablist" aria-label="选择工具阶段">{toolStages.map(stage=><button key={stage.id} className={activeTool===stage.id?'active':''} onClick={()=>setActiveTool(stage.id)} role="tab" aria-selected={activeTool===stage.id}><span>{stage.no}</span>{stage.title}</button>)}</div>{toolStages.filter(stage=>stage.id===activeTool).map(stage=><div className="tool-panel" key={stage.id}><div className="tool-panel-intro"><small>{stage.no} · {stage.title}</small><h3>{stage.summary}</h3><p>当前阶段使用 {stage.tools.length} 项工具</p></div><div className={`tool-cards count-${stage.tools.length}`}>{stage.tools.map((tool,index)=><article key={tool.name}><small>0{index+1} · {tool.type}</small><h3>{tool.name}</h3><p>{tool.text}</p><span>{tool.type}</span></article>)}</div></div>)}</div>
      </div>
    </div></section>

    <section className="contact" id="contact"><div className="contact-doodle d1">☆</div><div className="contact-doodle d2">✦</div><div className="contact-doodle d3">⌁</div>
      <div className="wrap contact-inner" data-reveal><p>LET’S MAKE SOMETHING GOOD TOGETHER</p><h2>一起聊聊<br/><i>新的可能。</i></h2><div className="contact-details"><div className="contact-links"><a href="mailto:15150550225@163.com"><small>EMAIL</small>15150550225@163.com <span>↗</span></a><a href="tel:+8615150550225"><small>PHONE</small>15150550225 <span>↗</span></a></div><div className="qr-card"><span className="qr-tape"/><img src="/wechat-qr.jpg?v=2" alt="韩佑宁微信二维码"/><p>WECHAT · 扫码添加微信</p></div></div></div>
      <footer className="wrap"><span>YOUNING HAN · WASEDA UNIVERSITY</span><div><a href="#education">Education</a><a href="#research">Research</a></div><a href="#top">BACK TO TOP ↑</a></footer>
    </section>
  </main>
}
export default App
