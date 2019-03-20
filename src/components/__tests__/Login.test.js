import React from 'react';
import { Login } from '../Login';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<Login />', () => {
	const wrapper = shallow(<Login />);

	it('render correctly, without crashing', () => {
		expect(wrapper.exists()).toBe(true);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
})