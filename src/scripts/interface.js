const tabs = [...document.querySelectorAll('[role="tab"][data-target]')];
const panels = [...document.querySelectorAll('[data-panel]')];
const languageButton = document.querySelector('#language-button');
const shortcuts = new Map(tabs.map((tab) => [tab.dataset.key, tab.dataset.target]));
const experienceButtons = [...document.querySelectorAll('[data-experience-target]')];
const experienceDetails = [...document.querySelectorAll('[data-experience-detail]')];
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

function activateExperience(target) {
  const activeButton = experienceButtons.find((button) => button.dataset.experienceTarget === target)
    ?? experienceButtons[0];
  const activeTarget = activeButton?.dataset.experienceTarget;

  experienceButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button === activeButton));
  });

  experienceDetails.forEach((detail) => {
    const selected = detail.dataset.experienceDetail === activeTarget;
    detail.dataset.active = String(selected);
    detail.setAttribute('aria-hidden', String(!selected));
  });
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

experienceButtons.forEach((button, index) => {
  button.addEventListener('click', () => activateExperience(button.dataset.experienceTarget));

  button.addEventListener('keydown', (event) => {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? experienceButtons.length - 1
        : (index + (event.key === 'ArrowDown' ? 1 : -1) + experienceButtons.length)
          % experienceButtons.length;
    const nextButton = experienceButtons[nextIndex];
    nextButton.focus();
    activateExperience(nextButton.dataset.experienceTarget);
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
activateExperience(experienceButtons[0]?.dataset.experienceTarget);
