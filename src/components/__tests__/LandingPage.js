import React from 'react';
import { LandingPage } from '../LandingPage';
import { shallow } from 'enzyme';

describe('<LandingPage />', () => {
    const wrapper = shallow(<LandingPage />);

    it('renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
