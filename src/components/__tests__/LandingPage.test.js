import React from 'react';
import { LandingPage } from '../LandingPage';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


describe('<LandingPage />', () => {
	const wrapper = shallow(<LandingPage />);

    it('renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders correctly', () => {	
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
