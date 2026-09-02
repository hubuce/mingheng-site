const body = document.body;
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const lang = document.documentElement.lang === 'en' ? 'en' : document.documentElement.lang === 'zh-Hant' ? 'zh-Hant' : 'zh-CN';

const ui = {
  'zh-CN': {
    navOpen: '打开导航', navClose: '关闭导航',
    subject: '明衡奇门测算预约', name: '称呼', contact: '联系方式', type: '测算类型', question: '最希望测算的一件事',
    consent: '我理解测算结果仅供传统文化研究、个人思考与决策参考。',
    opening: '正在打开邮箱应用。如未自动打开，请直接发送邮件至 info@mcmsdd.com。',
    privacy: `<h2>隐私说明</h2><p>明衡仅为回复测算预约及履行约定服务处理必要信息。未经允许，不向无关第三方公开来问者的出生信息、联系方式、住址、户型、家庭情况或商业资料。</p><p>本网站为静态页面，表单内容不会存储在网站服务器；点击提交后由访客设备上的邮箱应用发送。请勿在首次接洽时提交身份证、银行账户、病历等无关敏感信息。</p><p>您可通过 info@mcmsdd.com 联系我们查询、更正或删除已提交的信息。</p>`,
    terms: `<h2>测算说明</h2><ul><li>奇门问事遵循一事一局，所问事项应当真实、具体、明确。</li><li>测算属于传统文化研究与民俗咨询，结论不代表对未来事件或结果的保证。</li><li>同一事项不宜在短期内反复起局，以免信息混杂。</li><li>涉及医疗、法律、投资等事项，请同时咨询相应持牌专业人士。</li><li>正式测算的内容、费用、时间和交付方式以双方确认的约定为准。</li><li>明衡有权拒绝涉及违法、伤害他人、侵犯隐私或超出服务能力的委托。</li></ul>`
  },
  'zh-Hant': {
    navOpen: '開啟導覽', navClose: '關閉導覽',
    subject: '明衡奇門測算預約', name: '稱呼', contact: '聯絡方式', type: '測算類型', question: '最希望測算的一件事',
    consent: '我理解測算結果僅供傳統文化研究、個人思考與決策參考。',
    opening: '正在開啟電郵應用程式。如未自動開啟，請直接發送電郵至 info@mcmsdd.com。',
    privacy: `<h2>隱私說明</h2><p>明衡僅為回覆測算預約及履行約定服務處理必要資訊。未經允許，不向無關第三方公開來問者的出生資訊、聯絡方式、住址、戶型、家庭情況或商業資料。</p><p>本網站為靜態頁面，表格內容不會儲存在網站伺服器；點擊提交後由訪客裝置上的電郵應用程式發送。請勿在首次接洽時提交身分證、銀行帳戶、病歷等無關敏感資訊。</p><p>您可透過 info@mcmsdd.com 聯絡我們查詢、更正或刪除已提交的資訊。</p>`,
    terms: `<h2>測算說明</h2><ul><li>奇門問事遵循一事一局，所問事項應當真實、具體、明確。</li><li>測算屬於傳統文化研究與民俗諮詢，結論不代表對未來事件或結果的保證。</li><li>同一事項不宜在短期內反覆起局，以免資訊混雜。</li><li>涉及醫療、法律、投資等事項，請同時諮詢相應持牌專業人士。</li><li>正式測算的內容、費用、時間和交付方式以雙方確認的約定為準。</li><li>明衡有權拒絕涉及違法、傷害他人、侵犯隱私或超出服務能力的委託。</li></ul>`
  },
  en: {
    navOpen: 'Open navigation', navClose: 'Close navigation',
    subject: 'Mingheng Qimen Reading Enquiry', name: 'Name', contact: 'Contact', type: 'Reading type', question: 'The one matter you want to understand',
    consent: 'I understand that this reading is for traditional cultural study, personal reflection and decision support only.',
    opening: 'Opening your email application. If it does not open, please email info@mcmsdd.com directly.',
    privacy: `<h2>Privacy</h2><p>Mingheng processes only the information needed to respond to enquiries and deliver agreed services. Birth details, contact information, addresses, floor plans, family circumstances and commercial information will not be disclosed to unrelated third parties without permission.</p><p>This is a static website. Form entries are not stored on the website server; submission opens the visitor’s own email application. Please do not send identity documents, bank details, medical records or unrelated sensitive information in an initial enquiry.</p><p>You may contact info@mcmsdd.com to request access, correction or deletion of information you have submitted.</p>`,
    terms: `<h2>Service Notice</h2><ul><li>A Qimen reading follows the principle of one matter, one chart. The question should be genuine, specific and clearly framed.</li><li>Readings belong to traditional cultural study and folk consultation. They do not guarantee future events or outcomes.</li><li>A single matter should not be repeatedly charted within a short period, as this can create conflicting information.</li><li>Medical, legal and investment matters also require advice from appropriately qualified professionals.</li><li>The scope, fee, timing and delivery of a formal reading are subject to the service arrangement confirmed by both parties.</li><li>Mingheng may decline requests that are unlawful, harmful, invasive of privacy or outside the service’s capabilities.</li></ul>`
  }
}[lang];

function setNav(open) {
  body.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? ui.navClose : ui.navOpen);
}

navToggle.addEventListener('click', () => setNav(!body.classList.contains('nav-open')));
navLinks.forEach((link) => link.addEventListener('click', () => setNav(false)));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const heroPlaybackRate = 0.8;
  const setHeroPlaybackRate = () => {
    heroVideo.defaultPlaybackRate = heroPlaybackRate;
    heroVideo.playbackRate = heroPlaybackRate;
  };

  const startHeroVideo = () => {
    heroVideo.muted = true;
    setHeroPlaybackRate();
    const playRequest = heroVideo.play();
    if (playRequest && typeof playRequest.catch === 'function') playRequest.catch(() => {});
  };

  setHeroPlaybackRate();
  heroVideo.addEventListener('loadedmetadata', setHeroPlaybackRate, { once: true });
  startHeroVideo();
  document.addEventListener('pointerdown', startHeroVideo, { once: true, passive: true });
  document.addEventListener('touchstart', startHeroVideo, { once: true, passive: true });
  document.addEventListener('keydown', startHeroVideo, { once: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) startHeroVideo();
  });
}

const form = document.getElementById('consult-form');
const formNote = document.getElementById('form-note');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = `${ui.subject}｜${data.get('type')}｜${data.get('name')}`;
  const message = [
    `${ui.name}：${data.get('name')}`,
    `${ui.contact}：${data.get('contact')}`,
    `${ui.type}：${data.get('type')}`,
    '', `${ui.question}：`, data.get('question'), '', ui.consent
  ].join('\n');
  formNote.textContent = ui.opening;
  window.location.href = `mailto:info@mcmsdd.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});

const dialog = document.getElementById('info-dialog');
const dialogContent = document.getElementById('dialog-content');
document.querySelectorAll('[data-modal]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogContent.innerHTML = button.dataset.modal === 'privacy' ? ui.privacy : ui.terms;
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
