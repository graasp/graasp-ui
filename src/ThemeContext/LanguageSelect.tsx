import {
  Direction,
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
  SxProps,
} from '@mui/material';

import { Dispatch, useState } from 'react';

import Select from '../Select/Select.js';
import { I18nInstance } from '../types.js';

const LanguageSelect = ({
  i18n,
  setDirection,
  languageSelectSx,
  langs,
  label,
  size,
  variant,
}: {
  i18n: I18nInstance;
  setDirection?: Dispatch<Direction>;
  languageSelectSx?: SxProps;
  langs: { [key: string]: string };
  label?: string;
  variant?: MuiSelectProps['variant'];
  size?: MuiSelectProps['size'];
}): JSX.Element => {
  // init local lang, it does not update if we use i18n language directly
  const [lang, setLang] = useState(i18n.language);

  const handleLangSelect = (event: SelectChangeEvent<string>): void => {
    const d = i18n.dir(event.target.value);
    // this should be guarded for ssr rendering
    if (document) {
      document.dir = d;
    }
    setDirection?.(d);
    i18n.changeLanguage(event.target.value);
    setLang(event.target.value);
  };

  return (
    <Select
      size={size}
      label={label}
      variant={variant}
      labelId={label ? 'language-select-label' : undefined}
      defaultValue={lang}
      sx={{ minWidth: 80, ...languageSelectSx }}
      onChange={handleLangSelect}
      buildOptionId={(value) => `language-${value}`}
      values={Object.entries(langs).map(([k, l]) => ({ value: k, text: l }))}
    />
  );
};

export default LanguageSelect;
