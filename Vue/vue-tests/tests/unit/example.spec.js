import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import App from '../../src/App.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('App', () => {
  it('check exist', () => {
    const testMessage = 'test message'
    const wrapper = shallowMount(App, {

    })
  });
  it('check class', () => {
    const wrapper = shallowMount(App);
    const isExist = wrapper.find('.test-msg');
    expect(isExist.exists()).toBe(true);
  })
})
