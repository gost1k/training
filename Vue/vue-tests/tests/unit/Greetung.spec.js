import { mount } from "@vue/test-utils";
import Greeting from '@/components/Greeting.vue'

describe('Greeting.vue', () => {
	it('Отрисовывает приветствие', () => {
		const wrapper = mount(Greeting)

		expect(wrapper.text()).toMatch("Vue and TDD")
	})
})