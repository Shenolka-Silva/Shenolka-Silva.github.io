'use strict';
(() => {
  const data = window.PORTFOLIO;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icons = {
    github:'<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    linkedin:'<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2.5 9h3v12h-3ZM9 9h3v1.6c.8-1.2 2-1.9 3.5-1.9 3.2 0 4.5 2 4.5 5.2V21h-3v-6.4c0-1.9-.5-3-2.2-3-1.8 0-2.8 1.3-2.8 3.2V21H9Z"/></svg>'
  };
  function safeUrl(value) {
    if (!value || /[\u0000-\u0020\\]/.test(value)) return '';
    if (/^https?:\/\//i.test(value) || /^mailto:/i.test(value)) return value;
    if (!/^[a-z][a-z\d+.-]*:/i.test(value) && !value.startsWith('//') && !value.startsWith('/')) return value;
    return '';
  }
  function link(label, value, icon = '', className = '') {
    const url = safeUrl(value);
    const content = `${icons[icon] || ''}${escape(label)}`;
    return url ? `<a class="social-item ${className}" href="${escape(url)}" ${/^https?:/i.test(url) ? 'target="_blank" rel="noopener noreferrer"' : ''} ${label === 'Download CV' ? 'download' : ''}>${content}</a>` : `<span class="social-item unavailable ${className}" aria-label="${escape(label)} — not yet available">${content}<small> / soon</small></span>`;
  }
  const tags = values => `<div class="tags">${values.map(v => `<span>${escape(v)}</span>`).join('')}</div>`;
  const diagram = values => `<div class="diagram" aria-label="${escape(values.join(' then '))}">${values.map((v,i) => `${i ? '<i aria-hidden="true"></i>' : ''}<span>${escape(v)}</span>`).join('')}</div>`;
  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.dataset.link;
    const value = key === 'email' && data.links.email ? `mailto:${data.links.email}` : data.links[key];
    el.innerHTML = link(el.dataset.label, value, el.dataset.icon, key === 'cv' ? 'button' : '');
  });
  if (safeUrl(data.profileImage)) document.querySelector('#portrait').innerHTML = `<img src="${escape(data.profileImage)}" alt="Shenolka Silva" width="1122" height="717">`;
  document.querySelector('#project-grid').innerHTML = data.projects.map((p,i) => `<article class="project-card"><div class="project-visual">${safeUrl(p.screenshot) ? `<img loading="lazy" src="${escape(p.screenshot)}" alt="${escape(p.screenshotAlt || p.title)}" width="560" height="185">` : `<span class="visual-label">CONCEPT / ${escape(p.category.toUpperCase())}</span>${diagram(p.diagram)}`}</div><div class="project-body"><div class="project-meta"><span class="project-number">PROJECT ${String(i+1).padStart(2,'0')}</span><span class="pill">${escape(p.status)}</span></div><h3>${escape(p.title)}</h3><p>${escape(p.description)}</p>${tags(p.technologies)}<div class="project-footer"><button class="button" data-project="${escape(p.id)}" aria-label="View details for ${escape(p.title)}">View Details</button>${link('GitHub',p.github)}${link('Documentation',p.documentation)}</div></div></article>`).join('');
  document.querySelector('#skills-grid').innerHTML = Object.entries(data.skills).map(([name,values],i) => `<article class="skill-card"><span>0${i+1} / TOOLKIT</span><h3>${escape(name)}</h3>${tags(values)}</article>`).join('');
  document.querySelector('#certification-list').innerHTML = data.certifications.map(c => `<article class="certification"><div class="cert-logo">${safeUrl(c.logo) ? `<img src="${escape(c.logo)}" alt="${escape(c.organization)} logo" width="64" height="64">` : escape(c.organization)}</div><div><h3>${escape(c.organization)} — ${escape(c.name)}</h3><p>${escape(c.date)}</p><p>${escape(c.note)}</p></div></article>`).join('');
  const dialog = document.querySelector('#project-dialog');
  let previousFocus;
  document.querySelector('#project-grid').addEventListener('click', event => {
    const button = event.target.closest('[data-project]');
    if (!button) return;
    const p = data.projects.find(project => project.id === button.dataset.project);
    previousFocus = button;
    document.querySelector('#dialog-content').innerHTML = `<span class="pill">${escape(p.category)}</span><h2 id="dialog-title">${escape(p.title)}</h2><p><strong>${escape(p.subtitle)}</strong></p><p>${escape(p.description)}</p>${diagram(p.diagram)}${p.groups.map(group=>`<h3>${escape(group.title)}</h3><ul>${group.items.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>`).join('')}<h3>Technologies</h3>${tags(p.technologies)}<h3>Security &amp; technical concepts</h3>${tags(p.concepts)}<div class="project-footer">${link('GitHub',p.github)}${link('Documentation',p.documentation)}</div>`;
    dialog.showModal(); document.body.classList.add('modal-open');
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click',event=> { if(event.target === dialog){ const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); }});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});
  const menu = document.querySelector('.menu-toggle'), nav = document.querySelector('#navigation');
  function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
  nav.addEventListener('click',e=>{if(e.target.closest('a')) closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && nav.classList.contains('open')){closeMenu();menu.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header')) closeMenu();});
  window.matchMedia('(min-width: 961px)').addEventListener('change',closeMenu);
  const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>{if(a.hash===`#${entry.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px'});
  document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
