import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TextEditor from './TextEditor.js';

const TEXT =
  '<p>A p paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique ligula in nibh facilisis bibendum. </p>\
  <p>A second p paragraph. Integer ut finibus est. Quisque a ligula ac est sagittis congue a in ligula. Praesent ac dignissim erat. </p>\
  <ul><li>Pellentesque ut venenatis ligula.</li><li>Etiam consequat sit amet mi ut mollis.</li><li>Aenean dignissim dignissim lectus sit amet mollis.</li></ul>\
  Sed convallis est dolor, eu finibus eros ultricies nec. Nunc nec sodales enim. Suspendisse placerat fringilla dolor eu facilisis. Donec aliquet, ante eget gravida feugiat, diam ex scelerisque lacus, quis bibendum ipsum arcu sed elit. Nam sed condimentum felis, nec ultrices metus.<br/><br/>Curabitur cursus velit in purus consectetur, quis consequat libero ultricies. Sed volutpat maximus lacus, nec ornare turpis pretium a. Ut vitae sapien purus. Nulla auctor massa nisl, et suscipit libero interdum nec. Curabitur elementum ac dui vel lacinia. Duis eu massa eget lorem finibus varius. Aenean condimentum, mi a fringilla pretium, augue nunc blandit felis, nec dignissim nulla est in ipsum. Donec fringilla accumsan metus a placerat. Phasellus pellentesque, dui in fringilla convallis, mauris dui hendrerit metus, ac molestie massa dolor vitae augue. Donec in lectus rutrum, posuere orci ultricies, tristique urna. Integer placerat lectus erat, aliquet vehicula magna tincidunt efficitur. Sed pellentesque erat neque, a elementum lorem efficitur et.';

const FORMULA =
  '<span class="ql-formula" data-value="e=m^2c">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>e</mi><mo>=</mo><msup><mi>m</mi><mn>2</mn></msup><mi>c</mi></mrow><annotation encoding="application/x-tex">e=m^2c</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.4306em;"></span><span class="mord mathnormal">e</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.8141em;"></span><span class="mord"><span class="mord mathnormal">m</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8141em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mord mathnormal">c</span></span></span></span></span>﻿</span> </p><p><br></p>';

const meta = {
  title: 'Text/TextEditor',
  component: TextEditor,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof TextEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Edit = {
  args: {
    value: TEXT,
  },
} satisfies Story;

export const WithFormula = {
  args: {
    value: FORMULA,
  },
} satisfies Story;
