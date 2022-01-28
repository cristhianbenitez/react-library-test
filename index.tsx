let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === 'function') {
      return tag(props);
    }
    const element = { tag, props: { ...props, children } };

    return element;
  }
};

let states = [];
let stateCursor = 0;

const useState = (initialState) => {
  const FROZENCURSOR = stateCursor;
  states[FROZENCURSOR] = states[FROZENCURSOR] || initialState;

  const setState = (newState) => {
    states[FROZENCURSOR] = newState;
    rerender();
  };
  stateCursor++;

  return [states[FROZENCURSOR], setState];
};

const App = () => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  return (
    <div className="my-react-library">
      <div>my name is {name}</div>
      <input
        type="text"
        value={name}
        onchange={(e) => setName(e.target.value)}
        placeholder="your name"
      />
      <p>this is my react </p>
      <h2>the count is: {count}</h2>
      <button onclick={() => setCount(count - 1)}>-</button>
      <button onclick={() => setCount(count + 1)}>+</button>
      <br />
      <button id="button">Show Virtual Dom</button>
    </div>
  );
};

const render = (reactElementOrStringOrNumber, container) => {
  if (['string', 'number'].includes(typeof reactElementOrStringOrNumber)) {
    container.appendChild(
      document.createTextNode(String(reactElementOrStringOrNumber))
    );
    return;
  }
  const actualDomElement = document.createElement(
    reactElementOrStringOrNumber.tag
  );

  if (reactElementOrStringOrNumber.props) {
    Object.keys(reactElementOrStringOrNumber.props)
      .filter((p) => p !== 'children')
      .forEach(
        (p) => (actualDomElement[p] = reactElementOrStringOrNumber.props[p])
      );
  }
  if (reactElementOrStringOrNumber.props.children) {
    reactElementOrStringOrNumber.props.children.forEach((child) =>
      render(child, actualDomElement)
    );
  }
  container.appendChild(actualDomElement);
};

const rerender = () => {
  stateCursor = 0;
  document.querySelector('#app').firstChild.remove();
  render(<App />, document.querySelector('#app'));
};

render(<App />, document.querySelector('#app'));

const displayVirtualDOM = () => {
  const virtualDom = Object.assign({}, React.createElement(App, App));
  const El = document.getElementById('virtual-dom');
  El.innerHTML += `<p>tag:${virtualDom.tag}</p>`;
  El.innerHTML += `<p>
  props:{children{<p id='children'></p>}
  className:${virtualDom.props.className}
  <h2>TO SEE MORE OPEN CONSOLE</h2>}</p>`;
  virtualDom.props.children.forEach((child) => {
    const children = document.getElementById('children');
    children.innerHTML += `tag:${child.tag} &nbsp;`;
    children.innerHTML += `<p>children:${child.props.children[0]}</p>`;
  });
  document.getElementById('button').addEventListener('click', () => {
    El.classList.toggle('hide');
  });
};

displayVirtualDOM();

console.log(<App />);
