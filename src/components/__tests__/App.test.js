import React from 'react';
import { App } from '../App';

import { shallow } from 'enzyme';

describe('<App />', () => {
    const wrapper = shallow(<App />);

    it('renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
