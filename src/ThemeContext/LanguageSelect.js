import { useState } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';

import Select from '../Select/Select.js';

const LanguageSelect = ({
  i18n,
  setDirection,
  languageSelectSx,
  langs,
  label = 'Language',
  size,
  variant,
}) => {
  // init local lang, it does not update if we use i18n language directly
  const [lang, setLang] = useState(i18n.language);
  const handleLangSelect = (event) => {
    const d = i18n.dir(event.target.value);
    // this should be guarded for ssr rendering
    if (document) {
      document.dir = d;
    }
    setDirection?.(d);
    i18n.changeLanguage(event.target.value);
    setLang(event.target.value);
  };
  return _jsx(Select, {
    size: size,
    label: label,
    variant: variant,
    labelId: label ? 'language-select-label' : undefined,
    defaultValue: lang,
    sx: { minWidth: 80, ...languageSelectSx },
    onChange: handleLangSelect,
    buildOptionId: (value) => `language-${value}`,
    values: Object.entries(langs).map(([k, l]) => ({ value: k, text: l })),
  });
};
export default LanguageSelect;
