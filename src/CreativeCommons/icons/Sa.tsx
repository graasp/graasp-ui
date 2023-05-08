import React from 'react';

import { CCIconsProps } from './CCIconsProps';

const Sa: React.FC<CCIconsProps> = ({ size }) => (
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
);
export default Sa;