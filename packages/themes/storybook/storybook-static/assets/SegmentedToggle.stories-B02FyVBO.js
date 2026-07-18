import{R as a}from"./index-Bp2yA9Wa.js";import{S as s}from"./SegmentedToggle-DU3sYcBr.js";import"./_commonjsHelpers-CqkleIqs.js";const l=[{value:"morning",label:"Morning"},{value:"evening",label:"Evening"}],b={title:"Forms/SegmentedToggle",component:s,tags:["autodocs"],args:{options:l}},e={render:t=>{const[o,r]=a.useState(l[0].value);return a.createElement(s,{...t,value:o,onChange:r})}},n={render:t=>{const[o,r]=a.useState(l[0].value);return a.createElement(s,{...t,value:o,onChange:r,options:[{value:"morning",label:"Morning",icon:"☀"},{value:"evening",label:"Evening",icon:"☾"}]})}};var u,g,c;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = React.useState(options[0].value);
    return <SegmentedToggle {...args} value={value} onChange={setValue} />;
  }
}`,...(c=(g=e.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var i,m,v;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = React.useState(options[0].value);
    return <SegmentedToggle {...args} value={value} onChange={setValue} options={[{
      value: "morning",
      label: "Morning",
      icon: "☀"
    }, {
      value: "evening",
      label: "Evening",
      icon: "☾"
    }]} />;
  }
}`,...(v=(m=n.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};const h=["Default","WithIcons"];export{e as Default,n as WithIcons,h as __namedExportsOrder,b as default};
