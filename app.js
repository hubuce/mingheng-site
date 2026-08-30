const body = document.body;
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a');

function setNav(open) {
  body.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
}

navToggle.addEventListener('click', () => setNav(!body.classList.contains('nav-open')));
navLinks.forEach((link) => link.addEventListener('click', () => setNav(false)));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

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

const form = document.getElementById('consult-form');
const formNote = document.getElementById('form-note');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = `明衡奇门测算预约｜${data.get('type')}｜${data.get('name')}`;
  const message = [
    `称呼：${data.get('name')}`,
    `联系方式：${data.get('contact')}`,
    `测算类型：${data.get('type')}`,
    '',
    '最希望测算的一件事：',
    data.get('question'),
    '',
    '我理解测算结果仅供传统文化研究、个人思考与决策参考。'
  ].join('\n');

  formNote.textContent = '正在打开邮箱应用。如未自动打开，请直接发送邮件至 info@mcmsdd.com。';
  window.location.href = `mailto:info@mcmsdd.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});

const dialog = document.getElementById('info-dialog');
const dialogContent = document.getElementById('dialog-content');
const dialogCopy = {
  privacy: `
    <h2>隐私说明</h2>
    <p>明衡仅为回复测算预约及履行约定服务处理必要信息。未经允许，不向无关第三方公开来问者的出生信息、联系方式、住址、户型、家庭情况或商业资料。</p>
    <p>本网站为静态页面，表单内容不会存储在网站服务器；点击提交后由访客设备上的邮箱应用发送。请勿在首次接洽时提交身份证、银行账户、病历等无关敏感信息。</p>
    <p>客户可通过 info@mcmsdd.com 联系我们查询、更正或删除其已提交的信息。</p>`,
  terms: `
    <h2>测算说明</h2>
    <ul>
      <li>奇门问事遵循一事一局，所问事项应当真实、具体、明确。</li>
      <li>测算属于传统文化研究与民俗咨询，结论不代表对未来事件或结果的保证。</li>
      <li>同一事项不宜在短期内反复起局，以免信息混杂。</li>
      <li>涉及医疗、法律、投资等事项，请同时咨询相应持牌专业人士。</li>
      <li>正式测算的内容、费用、时间和交付方式以双方确认的约定为准。</li>
      <li>明衡有权拒绝涉及违法、伤害他人、侵犯隐私或超出服务能力的委托。</li>
    </ul>`
};

document.querySelectorAll('[data-modal]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogContent.innerHTML = dialogCopy[button.dataset.modal];
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
