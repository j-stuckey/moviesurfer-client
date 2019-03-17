import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../App';
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

describe('<App />', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders correctly', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
