import React from 'react';
import { App } from '../App';
import toJson from 'enzyme-to-json';

import { shallow } from 'enzyme';

describe('<App />', () => {
    const wrapper = shallow(<App />);

    it('render correctly, without crashing', () => {
        expect(wrapper.exists()).toBe(true);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
