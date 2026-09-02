global.window = global;
global.document = {
  documentElement: { lang: '' },
  title: '',
  querySelectorAll: function(sel) {
    if (sel === '[data-i18n]') {
      return [
        { getAttribute: () => 'hero.sub', textContent: 'original', setAttribute: ()=>{}, classList: { toggle: ()=>{} } }
      ];
    }
    if (sel === '[data-i18n-ph]') return [];
    if (sel === '.lang-option') return [];
    return [];
  }
};
global.localStorage = { getItem: () => null, setItem: () => {} };
global.location = { hash: '#lang=en' };

var fs = require('fs');
var html = fs.readFileSync('index.html', 'utf8');
var m = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
if (!m) { console.log('no script'); process.exit(1); }
var code = m[1];
eval(code);
console.log('AGS_LANG:', global.AGS_LANG);
console.log('hero.sub:', global.t('hero.sub'));
global.applyStaticLang();
console.log('after applyStaticLang textContent:', global.document.querySelectorAll('[data-i18n]')[0].textContent);
