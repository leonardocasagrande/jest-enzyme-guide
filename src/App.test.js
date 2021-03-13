import App from './App';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

test("renders without errors", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app")
  expect(appComponent.length).toBe(1);
});
test("renders button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button")
  expect(button.length).toBe(1);
})
test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display")
  expect(counterDisplay.length).toBe(1);
})
test("counter starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
})
test("clicking on increment button increments counter display", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate('click');
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
})

test("clicking on decrement button while 0 displays error", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate('click');
  const error = findByTestAttr(wrapper, "error");
  expect(error.length).toBe(1);
})

test("clicking on decrement button while 0 still displays 0", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate('click');
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
})

test("clicking on decrement button decrement counter display", () => {
  const wrapper = setup();
  const decButton = findByTestAttr(wrapper, "decrement-button");
  const incButton = findByTestAttr(wrapper, "increment-button");
  incButton.simulate('click');
  incButton.simulate('click');
  decButton.simulate('click');
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
})
test("clicking on increment while error is displayed remove error", () => {
  const wrapper = setup();
  const decButton = findByTestAttr(wrapper, "decrement-button");
  const incButton = findByTestAttr(wrapper, "increment-button");
  decButton.simulate('click');
  incButton.simulate('click');
  const error = findByTestAttr(wrapper, "error");
  expect(error.length).toBe(0);
})
