import { Box, Tooltip, Typography, styled } from '@mui/material';

import React, { FC } from 'react';

import { PRIMARY_COLOR } from '../theme';
import { CCSharing } from '../types';

type CCIconProps = {
  title: string;
  description?: string;
  icon: JSX.Element;
};

const ccData = (size: string | number): { [key: string]: CCIconProps } => ({
  cc: {
    title: 'Creative Commons',
    description: '',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='5.5 -3.5 64 64'
        xmlSpace='preserve'
      >
        <circle fill='#FFF' cx={37.785} cy={28.501} r={28.836} />
        <path d='M37.441-3.5c8.951 0 16.572 3.125 22.857 9.372 3.008 3.009 5.295 6.448 6.857 10.314 1.561 3.867 2.344 7.971 2.344 12.314 0 4.381-.773 8.486-2.314 12.313-1.543 3.828-3.82 7.21-6.828 10.143-3.123 3.085-6.666 5.448-10.629 7.086-3.961 1.638-8.057 2.457-12.285 2.457s-8.276-.808-12.143-2.429c-3.866-1.618-7.333-3.961-10.4-7.027-3.067-3.066-5.4-6.524-7-10.372S5.5 32.767 5.5 28.5c0-4.229.809-8.295 2.428-12.2 1.619-3.905 3.972-7.4 7.057-10.486C21.08-.394 28.565-3.5 37.441-3.5zm.116 5.772c-7.314 0-13.467 2.553-18.458 7.657-2.515 2.553-4.448 5.419-5.8 8.6a25.204 25.204 0 0 0-2.029 9.972c0 3.429.675 6.734 2.029 9.913 1.353 3.183 3.285 6.021 5.8 8.516 2.514 2.496 5.351 4.399 8.515 5.715a25.652 25.652 0 0 0 9.943 1.971c3.428 0 6.75-.665 9.973-1.999 3.219-1.335 6.121-3.257 8.713-5.771 4.99-4.876 7.484-10.99 7.484-18.344 0-3.543-.648-6.895-1.943-10.057-1.293-3.162-3.18-5.98-5.654-8.458-5.146-5.143-11.335-7.715-18.573-7.715zm-.401 20.915-4.287 2.229c-.458-.951-1.019-1.619-1.685-2-.667-.38-1.286-.571-1.858-.571-2.856 0-4.286 1.885-4.286 5.657 0 1.714.362 3.084 1.085 4.113.724 1.029 1.791 1.544 3.201 1.544 1.867 0 3.181-.915 3.944-2.743l3.942 2c-.838 1.563-2 2.791-3.486 3.686-1.484.896-3.123 1.343-4.914 1.343-2.857 0-5.163-.875-6.915-2.629-1.752-1.752-2.628-4.19-2.628-7.313 0-3.048.886-5.466 2.657-7.257 1.771-1.79 4.009-2.686 6.715-2.686 3.963-.002 6.8 1.541 8.515 4.627zm18.457 0-4.229 2.229c-.457-.951-1.02-1.619-1.686-2-.668-.38-1.307-.571-1.914-.571-2.857 0-4.287 1.885-4.287 5.657 0 1.714.363 3.084 1.086 4.113.723 1.029 1.789 1.544 3.201 1.544 1.865 0 3.18-.915 3.941-2.743l4 2c-.875 1.563-2.057 2.791-3.541 3.686a9.233 9.233 0 0 1-4.857 1.343c-2.896 0-5.209-.875-6.941-2.629-1.736-1.752-2.602-4.19-2.602-7.313 0-3.048.885-5.466 2.658-7.257 1.77-1.79 4.008-2.686 6.713-2.686 3.962-.002 6.783 1.541 8.458 4.627z' />
      </svg>
    ),
  },
  cc0: {
    title: 'Public Domain Dedication',
    description:
      'You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='-0.5 0.5 64 64'
        xmlSpace='preserve'
      >
        <circle fill='#FFF' cx={31.325} cy={32.873} r={30.096} />
        <path d='M31.5 14.08c-10.565 0-13.222 9.969-13.222 18.42 0 8.452 2.656 18.42 13.222 18.42 10.564 0 13.221-9.968 13.221-18.42 0-8.451-2.657-18.42-13.221-18.42zm0 6.946c.429 0 .82.066 1.188.157.761.656 1.133 1.561.403 2.823l-7.036 12.93c-.216-1.636-.247-3.24-.247-4.437 0-3.722.258-11.473 5.692-11.473zm5.266 5.961c.373 1.984.426 4.056.426 5.513 0 3.723-.258 11.475-5.69 11.475-.428 0-.822-.045-1.188-.136a4.343 4.343 0 0 1-.202-.067 3.666 3.666 0 0 1-.336-.11c-1.21-.515-1.972-1.446-.874-3.093l7.864-13.582z' />
        <path d='M31.433.5C22.556.5 15.074 3.59 8.979 9.8c-3.087 3.087-5.443 6.607-7.082 10.532A31.646 31.646 0 0 0-.5 32.5c0 4.268.797 8.32 2.397 12.168 1.6 3.85 3.921 7.312 6.969 10.396 3.085 3.049 6.549 5.399 10.398 7.037a31.607 31.607 0 0 0 12.169 2.398c4.229 0 8.34-.826 12.303-2.465 3.962-1.639 7.496-3.994 10.621-7.081 3.011-2.933 5.289-6.297 6.812-10.106C62.73 41 63.5 36.883 63.5 32.5c0-4.343-.77-8.454-2.33-12.303-1.562-3.885-3.848-7.32-6.857-10.33C48.025 3.619 40.385.5 31.433.5zm.134 5.759c7.238 0 13.412 2.566 18.554 7.709 2.477 2.477 4.375 5.31 5.67 8.471 1.296 3.162 1.949 6.518 1.949 10.061 0 7.354-2.516 13.454-7.506 18.33-2.592 2.516-5.502 4.447-8.74 5.781a25.512 25.512 0 0 1-9.927 1.994 26.01 26.01 0 0 1-9.949-1.948c-3.163-1.334-6.001-3.238-8.516-5.716-2.515-2.514-4.455-5.353-5.826-8.516-1.333-3.199-2.017-6.498-2.017-9.927 0-3.467.684-6.787 2.017-9.949 1.371-3.2 3.312-6.074 5.826-8.628 4.99-5.103 11.15-7.662 18.465-7.662z' />
      </svg>
    ),
  },
  by: {
    title: 'Attribution',
    description:
      'You must give appropriate credit to the licensor in a reasonable manner.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='5.5 -3.5 64 64'
        xmlSpace='preserve'
      >
        <circle fill='#FFF' cx={37.637} cy={28.806} r={28.276} />
        <path d='M37.443-3.5c8.988 0 16.57 3.085 22.742 9.257C66.393 11.967 69.5 19.548 69.5 28.5c0 8.991-3.049 16.476-9.145 22.456-6.476 6.363-14.113 9.544-22.912 9.544-8.649 0-16.153-3.144-22.514-9.43C8.644 44.784 5.5 37.262 5.5 28.5c0-8.761 3.144-16.342 9.429-22.742C21.101-.415 28.604-3.5 37.443-3.5zm.114 5.772c-7.276 0-13.428 2.553-18.457 7.657-5.22 5.334-7.829 11.525-7.829 18.572 0 7.086 2.59 13.22 7.77 18.398 5.181 5.182 11.352 7.771 18.514 7.771 7.123 0 13.334-2.607 18.629-7.828 5.029-4.838 7.543-10.952 7.543-18.343 0-7.276-2.553-13.465-7.656-18.571-5.104-5.104-11.276-7.656-18.514-7.656zm8.572 18.285v13.085h-3.656v15.542h-9.944V33.643h-3.656V20.557c0-.572.2-1.057.599-1.457.401-.399.887-.6 1.457-.6h13.144c.533 0 1.01.2 1.428.6.417.4.628.886.628 1.457zm-13.087-8.228c0-3.008 1.485-4.514 4.458-4.514s4.457 1.504 4.457 4.514c0 2.971-1.486 4.457-4.457 4.457s-4.458-1.486-4.458-4.457z' />
      </svg>
    ),
  },
  nd: {
    title: 'No Derivative Works',
    description:
      'The licensor permits others to copy, distribute and transmit the work provided that any alterations you may make do not constitute an adaptation.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 64 64'
        xmlSpace='preserve'
      >
        <circle fill='#FFF' cx={32.064} cy={31.788} r={29.013} />
        <path d='M31.944 0c8.952 0 16.533 3.105 22.744 9.314C60.895 15.486 64 23.046 64 32s-3.049 16.457-9.146 22.514C48.418 60.838 40.78 64 31.943 64c-8.65 0-16.153-3.143-22.514-9.43C3.144 48.286 0 40.762 0 32.001c0-8.724 3.144-16.285 9.43-22.685C15.64 3.106 23.144 0 31.943 0zm.117 5.771c-7.276 0-13.43 2.57-18.459 7.715-5.22 5.297-7.83 11.468-7.83 18.514 0 7.125 2.59 13.257 7.771 18.4 5.181 5.182 11.352 7.77 18.516 7.77 7.123 0 13.332-2.607 18.627-7.827 5.028-4.876 7.543-10.99 7.543-18.343 0-7.313-2.554-13.484-7.657-18.514-5.067-5.144-11.238-7.715-18.511-7.715zm12.056 18.685v5.485H20.86v-5.485h23.257zm0 10.287v5.482H20.86v-5.482h23.257z' />
      </svg>
    ),
  },
  sa: {
    title: 'Share Alike',
    description:
      "The licensor permits others to distribute derivative works only under the same license or one compatible with the one that governs the licensor's work.",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='5.5 -3.5 64 64'
        xmlSpace='preserve'
      >
        <circle fill='#FFF' cx={36.944} cy={28.631} r={29.105} />
        <path d='M37.443-3.5c8.951 0 16.531 3.105 22.742 9.315C66.393 11.987 69.5 19.548 69.5 28.5c0 8.954-3.049 16.457-9.145 22.514-6.437 6.324-14.076 9.486-22.912 9.486-8.649 0-16.153-3.143-22.514-9.429C8.644 44.786 5.5 37.264 5.5 28.501c0-8.723 3.144-16.285 9.429-22.685C21.138-.395 28.643-3.5 37.443-3.5zm.114 5.772c-7.276 0-13.428 2.572-18.457 7.715-5.22 5.296-7.829 11.467-7.829 18.513 0 7.125 2.59 13.257 7.77 18.4 5.181 5.182 11.352 7.771 18.514 7.771 7.123 0 13.334-2.609 18.629-7.828 5.029-4.876 7.543-10.99 7.543-18.343 0-7.313-2.553-13.485-7.656-18.513-5.067-5.145-11.239-7.715-18.514-7.715zM23.271 23.985c.609-3.924 2.189-6.962 4.742-9.114 2.552-2.152 5.656-3.228 9.314-3.228 5.027 0 9.029 1.62 12 4.856 2.971 3.238 4.457 7.391 4.457 12.457 0 4.915-1.543 9-4.627 12.256-3.088 3.256-7.086 4.886-12.002 4.886-3.619 0-6.743-1.085-9.371-3.257-2.629-2.172-4.209-5.257-4.743-9.257H31.1c.19 3.886 2.533 5.829 7.029 5.829 2.246 0 4.057-.972 5.428-2.914 1.373-1.942 2.059-4.534 2.059-7.771 0-3.391-.629-5.971-1.885-7.743-1.258-1.771-3.066-2.657-5.43-2.657-4.268 0-6.667 1.885-7.2 5.656h2.343l-6.342 6.343-6.343-6.343 2.512.001z' />
      </svg>
    ),
  },
  nc: {
    title: 'Noncommercial',
    description:
      "The licensor permits others to copy, distribute and transmit the work. In return, licensees may not use the work for commercial purposes — unless they get the licensor's permission.",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='5.5 -3.5 64 64'
        xmlSpace='preserve'
      >
        <circle fill='#FFF' cx={37.47} cy={28.736} r={29.471} />
        <path d='M37.442-3.5c8.99 0 16.571 3.085 22.743 9.256C66.393 11.928 69.5 19.509 69.5 28.5c0 8.992-3.048 16.476-9.145 22.458C53.88 57.32 46.241 60.5 37.442 60.5c-8.686 0-16.19-3.162-22.513-9.485C8.644 44.728 5.5 37.225 5.5 28.5c0-8.762 3.144-16.343 9.429-22.743C21.1-.414 28.604-3.5 37.442-3.5zM12.7 19.872c-.952 2.628-1.429 5.505-1.429 8.629 0 7.086 2.59 13.22 7.77 18.4 5.219 5.144 11.391 7.715 18.514 7.715 7.201 0 13.409-2.608 18.63-7.829 1.867-1.79 3.332-3.657 4.398-5.602l-12.056-5.371c-.421 2.02-1.439 3.667-3.057 4.942-1.622 1.276-3.535 2.011-5.744 2.2v4.915h-3.714v-4.915c-3.543-.036-6.782-1.312-9.714-3.827l4.4-4.457c2.094 1.942 4.476 2.913 7.143 2.913 1.104 0 2.048-.246 2.83-.743.78-.494 1.172-1.312 1.172-2.457 0-.801-.287-1.448-.858-1.943L37.9 31.127l-3.771-1.715-5.086-2.229L12.7 19.872zM37.557 2.214c-7.276 0-13.428 2.571-18.457 7.714a30.623 30.623 0 0 0-3.543 4.287L27.786 19.7c.533-1.676 1.542-3.019 3.029-4.028 1.484-1.009 3.218-1.571 5.2-1.686V9.071h3.715v4.915c2.934.153 5.6 1.143 8 2.971l-4.172 4.286c-1.793-1.257-3.619-1.885-5.486-1.885-.991 0-1.876.191-2.656.571-.781.381-1.172 1.029-1.172 1.943 0 .267.095.533.285.8l4.057 1.83 2.8 1.257 5.144 2.285 16.397 7.314a29.51 29.51 0 0 0 .801-6.857c0-7.353-2.552-13.543-7.656-18.573-5.067-5.143-11.241-7.714-18.515-7.714z' />
      </svg>
    ),
  },
});

const licenses = {
  attr: 'Attribution 4.0 International',
  attrNoDeriv: 'Attribution-NoDerivatives 4.0 International',
  attrShareAlike: 'Attribution-ShareAlike 4.0 International',
  attrNC: 'Attribution-NonCommercial 4.0 International',
  attrNoDerivNC: 'Attribution-NonCommercial-NoDerivatives 4.0 International',
  attrShareAlikeNC: 'Attribution-NonCommercial-ShareAlike 4.0 International',
  cc0: 'CC0 1.0 Universal',
};

const CCIcon: FC<CCIconProps> = ({ icon, title, description }) => {
  const tooltip = (
    <>
      <Typography fontWeight='bold'>{title}</Typography>
      {description && <Typography variant='body2'>{description}</Typography>}
    </>
  );

  return (
    <div>
      <Tooltip id={title} title={tooltip} arrow>
        {icon}
      </Tooltip>
    </div>
  );
};

type CreativeCommonsProps = {
  requireAccreditation?: boolean | undefined;
  allowSharedAdaptation: CCSharing;
  allowCommercialUse: boolean;
  iconSize?: number | undefined;
  borderWith?: number | undefined;
  withLicenseName?: boolean | undefined;
};

type StyledBoxProps = {
  borderWidth: number;
};

const StyledBox = styled(Box)<StyledBoxProps>(({ borderWidth }) => ({
  borderColor: '#efefef',
  borderRadius: 14,
  borderStyle: 'solid',
  borderWidth: borderWidth,
}));

const CreativeCommons: FC<CreativeCommonsProps> = (props) => {
  const {
    requireAccreditation = true,
    allowCommercialUse,
    allowSharedAdaptation,
    iconSize = 50,
    withLicenseName = true,
    borderWith = 2,
  } = props;

  const iconData = React.useMemo(() => ccData(iconSize), [iconSize]);

  const additionalIcons = requireAccreditation ? (
    <>
      <CCIcon {...iconData.by} />
      {!allowCommercialUse && <CCIcon {...iconData.nc} />}
      {allowSharedAdaptation === CCSharing.No && <CCIcon {...iconData.nd} />}
      {allowSharedAdaptation === CCSharing.Alike && <CCIcon {...iconData.sa} />}
    </>
  ) : (
    <CCIcon {...iconData.cc0} />
  );

  const license = requireAccreditation
    ? allowCommercialUse
      ? allowSharedAdaptation === CCSharing.Yes
        ? licenses.attr
        : allowSharedAdaptation === CCSharing.No
        ? licenses.attrNoDeriv
        : licenses.attrShareAlike
      : allowSharedAdaptation === CCSharing.Yes
      ? licenses.attrNC
      : allowSharedAdaptation === CCSharing.No
      ? licenses.attrNoDerivNC
      : licenses.attrShareAlikeNC
    : licenses.cc0;

  return (
    <StyledBox paddingX={2} paddingY={3} borderWidth={borderWith}>
      <Box justifyContent='space-around' display='flex' flexDirection='row'>
        <CCIcon {...iconData.cc} />
        {additionalIcons}
      </Box>
      {withLicenseName && (
        <Box justifyContent='center' display='flex' marginTop={2}>
          <Typography
            variant='caption'
            color={PRIMARY_COLOR}
            fontSize={iconSize / 4}
            fontWeight='bold'
            textAlign='center'
          >
            {license}
          </Typography>
        </Box>
      )}
    </StyledBox>
  );
};

export default CreativeCommons;
