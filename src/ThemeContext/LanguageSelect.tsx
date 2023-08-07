import { Direction, SelectChangeEvent, SxProps } from '@mui/material';
import { SelectProps as MuiSelectProps } from '@mui/material/Select';

import React, { Dispatch, useState } from 'react';

import Select from '../Select';
import { I18nInstance } from '../types';

const LanguageSelect = ({
  i18n,
  setDirection,
  languageSelectSx,
  langs,
  languageSelectLabel = 'Language',
  variant,
}: {
  i18n: I18nInstance;
  setDirection?: Dispatch<Direction>;
  languageSelectSx?: SxProps;
  langs: { [key: string]: string };
  languageSelectLabel?: string | null;
  variant?: MuiSelectProps['variant'];
}): JSX.Element => {
  // init local lang, it does not update if we use i18n language directly
  const [lang, setLang] = useState(i18n.language);

  const handleLangSelect = (event: SelectChangeEvent<string>): void => {
    const d = i18n.dir(event.target.value);
    document.dir = d;
    setDirection?.(d);
    i18n.changeLanguage(event.target.value);
    setLang(event.target.value);
  };

  return (
    <Select
      label={languageSelectLabel}
      variant={variant}
      labelId={languageSelectLabel ? 'language-select-label' : undefined}
      defaultValue={lang}
      sx={{ minWidth: 80, ...languageSelectSx }}
      onChange={handleLangSelect}
      buildOptionId={(value) => `language-${value}`}
      values={Object.entries(langs).map(([k, l]) => ({ value: k, text: l }))}
    />
  );
};

export default LanguageSelect;
