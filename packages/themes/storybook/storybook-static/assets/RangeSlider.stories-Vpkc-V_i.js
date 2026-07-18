import{R as n}from"./index-Bp2yA9Wa.js";import{R as s}from"./RangeSlider-DMmZD_WQ.js";import"./_commonjsHelpers-CqkleIqs.js";const R={title:"Forms/RangeSlider",component:s,tags:["autodocs"],args:{label:"Treatment budget",min:20,max:140,step:5}},e={render:a=>{const[t,g]=n.useState(65);return n.createElement(s,{...a,value:t,onChange:g,formatValue:i=>`£${i}`})}},r={args:{value:void 0},render:a=>n.createElement(s,{...a,formatValue:t=>`£${t}`})};var o,l,u;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = React.useState(65);
    return <RangeSlider {...args} value={value} onChange={setValue} formatValue={v => \`£\${v}\`} />;
  }
}`,...(u=(l=e.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var c,d,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    value: undefined
  },
  render: args => <RangeSlider {...args} formatValue={v => \`£\${v}\`} />
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const S=["Default","Uncontrolled"];export{e as Default,r as Uncontrolled,S as __namedExportsOrder,R as default};
