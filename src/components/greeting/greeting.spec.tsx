import * as React from 'react';
import {mount} from 'enzyme';
import Greeting from './greeting.component';

describe('Pages', () => {
  describe('Index', () => {
    it('should have correct greeting message.', function () {
      const wrap = mount(<Greeting name="John" showMessage={true} />);
      expect(wrap.find('.greeting').text()).toBe('Hello, John. Welcome to the team!')
    })
  })  
})