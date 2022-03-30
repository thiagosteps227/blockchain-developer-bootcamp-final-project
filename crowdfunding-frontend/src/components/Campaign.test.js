import React from 'react';
import {shallow} from 'enzyme';
import Campaign from './Campaign';


test('Button is disabled after value changes', () => {
  // Render a checkbox with label in the document
  //const button = shallow(<Button labelOn="On" labelOff="Off" />);
  const campaign = shallow(<Campaign />);
  const formField = campaign.find('Form.Field');
  const button = campaign.find('Button');
  //expect(Campaign).toEqual();

  formField.find('value').simulate('0.001');

  expect(button.text()).toEqual('Fund this campaign');
});