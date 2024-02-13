import { Meta, StoryObj } from '@storybook/react';

import TextDisplay from './TextDisplay';

const meta = {
  title: 'Text/TextDisplay',
  component: TextDisplay,
} satisfies Meta<typeof TextDisplay>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleText = {
  args: {
    content: 'Hello I am some text',
  },
} satisfies Story;

export const QuillContent = {
  args: {
    content:
      '<p class="ql-align-center">I am centered</p><p>I am left aligned</p><p class="ql-align-right">I am right aligned</p><p class="ql-align-right"><span class="ql-emojiblot" data-name="smiling_imp">﻿<span contenteditable="false"><span class="ap ap-smiling_imp">😈</span></span>﻿</span></p><p class="ql-align-right">I <span style="background-color: rgb(204, 224, 245);">have</span> a <span style="background-color: rgb(194, 133, 255);">background</span></p><p class="ql-align-center"><a href="https://www.google.com" rel="noopener noreferrer" target="_blank">Test link</a></p><p><s>Hey !</s></p><p><strong class="ql-font-serif"><s>Wow</s></strong></p><p><br></p><pre class="ql-syntax" spellcheck="false">Some code too !\n</pre>',
  },
} satisfies Story;

export const HtmlTable = {
  args: {
    content: `
<h2>HTML Table</h2>
<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>
  `,
  },
} satisfies Story;

export const EntireHtmlDocument = {
  args: {
    content: `
<h2 style="background-color: #5050d2; color: white; border-radius: 4px; padding: 8px">HTML Table in Graasp !</h2>

<table style="font-family: arial, sans-serif;
border-collapse: collapse;
width: 100%;">
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>
  `,
  },
} satisfies Story;
