let React = {
    createElement: (tag, props, ...children)=>{
        if (typeof tag === 'function') return tag(props);
        const element = {
            tag,
            props: {
                ...props,
                children
            }
        };
        return element;
    }
};
let states = [];
let stateCursor = 0;
const useState = (initialState)=>{
    const FROZENCURSOR = stateCursor;
    states[FROZENCURSOR] = states[FROZENCURSOR] || initialState;
    const setState = (newState)=>{
        states[FROZENCURSOR] = newState;
        rerender();
    };
    stateCursor++;
    return [
        states[FROZENCURSOR],
        setState
    ];
};
const App = ()=>{
    const [name, setName] = useState('');
    const [count, setCount] = useState(0);
    return(/*#__PURE__*/ React.createElement("div", {
        className: "my-react-library",
        __source: {
            fileName: "index.tsx",
            lineNumber: 32,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("div", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 33,
            columnNumber: 7
        },
        __self: this
    }, "my name is ", name), /*#__PURE__*/ React.createElement("input", {
        type: "text",
        value: name,
        onchange: (e)=>setName(e.target.value)
        ,
        placeholder: "your name",
        __source: {
            fileName: "index.tsx",
            lineNumber: 34,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("p", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 40,
            columnNumber: 7
        },
        __self: this
    }, "this is my react "), /*#__PURE__*/ React.createElement("h2", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 41,
            columnNumber: 7
        },
        __self: this
    }, "the count is: ", count), /*#__PURE__*/ React.createElement("button", {
        onclick: ()=>setCount(count - 1)
        ,
        __source: {
            fileName: "index.tsx",
            lineNumber: 42,
            columnNumber: 7
        },
        __self: this
    }, "-"), /*#__PURE__*/ React.createElement("button", {
        onclick: ()=>setCount(count + 1)
        ,
        __source: {
            fileName: "index.tsx",
            lineNumber: 43,
            columnNumber: 7
        },
        __self: this
    }, "+"), /*#__PURE__*/ React.createElement("br", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 44,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("button", {
        id: "button",
        __source: {
            fileName: "index.tsx",
            lineNumber: 45,
            columnNumber: 7
        },
        __self: this
    }, "Show Virtual Dom")));
};
const render = (reactElementOrStringOrNumber, container)=>{
    if ([
        'string',
        'number'
    ].includes(typeof reactElementOrStringOrNumber)) {
        container.appendChild(document.createTextNode(String(reactElementOrStringOrNumber)));
        return;
    }
    const actualDomElement = document.createElement(reactElementOrStringOrNumber.tag);
    if (reactElementOrStringOrNumber.props) Object.keys(reactElementOrStringOrNumber.props).filter((p)=>p !== 'children'
    ).forEach((p)=>actualDomElement[p] = reactElementOrStringOrNumber.props[p]
    );
    if (reactElementOrStringOrNumber.props.children) reactElementOrStringOrNumber.props.children.forEach((child)=>render(child, actualDomElement)
    );
    container.appendChild(actualDomElement);
};
const rerender = ()=>{
    stateCursor = 0;
    document.querySelector('#app').firstChild.remove();
    render(/*#__PURE__*/ React.createElement(App, {
        __source: {
            fileName: "index.tsx",
            lineNumber: 79,
            columnNumber: 10
        },
        __self: this
    }), document.querySelector('#app'));
};
render(/*#__PURE__*/ React.createElement(App, {
    __source: {
        fileName: "index.tsx",
        lineNumber: 82,
        columnNumber: 8
    },
    __self: this
}), document.querySelector('#app'));
const displayVirtualDOM = ()=>{
    const virtualDom = Object.assign({
    }, React.createElement(App, App));
    const El = document.getElementById('virtual-dom');
    El.innerHTML += `<p>tag:${virtualDom.tag}</p>`;
    El.innerHTML += `<p>
  props:{children{<p id='children'></p>}
  className:${virtualDom.props.className}
  <h2>TO SEE MORE OPEN CONSOLE</h2>}</p>`;
    virtualDom.props.children.forEach((child)=>{
        const children = document.getElementById('children');
        children.innerHTML += `tag:${child.tag} &nbsp;`;
        children.innerHTML += `<p>children:${child.props.children[0]}</p>`;
    });
    document.getElementById('button').addEventListener('click', ()=>{
        El.classList.toggle('hide');
    });
};
displayVirtualDOM();
console.log(/*#__PURE__*/ React.createElement(App, {
    __source: {
        fileName: "index.tsx",
        lineNumber: 102,
        columnNumber: 13
    },
    __self: this
}));

//# sourceMappingURL=index.ad9a7e97.js.map
