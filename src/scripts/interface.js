const tabs = [...document.querySelectorAll('[role="tab"][data-target]')];
const panels = [...document.querySelectorAll('[data-panel]')];
const languageButton = document.querySelector('#language-button');
const shortcuts = new Map(tabs.map((tab) => [tab.dataset.key, tab.dataset.target]));
let language = 'fr';

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll(`[data-${language}]`).forEach((element) => {
    const cursor = element.querySelector('.cursor');
    element.textContent = element.dataset[language];
    if (cursor) element.append(cursor);
  });
  languageButton?.setAttribute(
    'aria-label',
    language === 'fr' ? 'FR / EN — Switch to English' : 'FR / EN — Passer en français',
  );
}

function activatePanel(target, updateHistory = true) {
  const activeTab = tabs.find((tab) => tab.dataset.target === target) ?? tabs[0];
  const activeTarget = activeTab.dataset.target;

  tabs.forEach((tab) => {
    const selected = tab === activeTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  panels.forEach((panel) => {
    const selected = panel.dataset.panel === activeTarget;
    panel.dataset.active = String(selected);
    panel.setAttribute('aria-hidden', String(!selected));
  });

  if (updateHistory) history.replaceState(null, '', `#${activeTarget}`);
}

tabs.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    activatePanel(tab.dataset.target);
  });

  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = tabs.indexOf(tab);
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? tabs.length - 1
        : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    activatePanel(tabs[nextIndex].dataset.target);
  });
});

languageButton?.addEventListener('click', () => {
  setLanguage(language === 'fr' ? 'en' : 'fr');
});

document.addEventListener('keydown', (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && (target.matches('input, textarea, select') || target.isContentEditable)) return;
  const panel = shortcuts.get(event.key);
  if (!panel) return;
  event.preventDefault();
  activatePanel(panel);
  tabs.find((tab) => tab.dataset.target === panel)?.focus();
});

window.addEventListener('hashchange', () => {
  activatePanel(location.hash.slice(1), false);
});

activatePanel(location.hash.slice(1) || 'profile', false);
