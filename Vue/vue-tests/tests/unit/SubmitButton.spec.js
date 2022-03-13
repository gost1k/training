import {mount} from "@vue/test-utils";
import SubmitButton from "@/components/SubmitButton.vue"

// describe('SubmitButton', () => {
// 	it('Отображает сообщения для неавторизованного пользователя', () => {
// 		const msg = "Войти";
// 		const wrapper = mount(SubmitButton, {
// 			propsData: {
// 				msg: msg
// 			}
// 		})
// 		expect(wrapper.find("span").text()).toBe('Не авторизован')
// 		expect(wrapper.find("button").text()).toBe('Войти')
// 	})
// 	it('Отображает сообщение для администратора', () => {
// 		const msg = "Войти";
// 		const isAdmin = true;
// 		const wrapper = mount(SubmitButton, {
// 			propsData: {
// 				msg,
// 				isAdmin
// 			}
// 		})
// 		expect(wrapper.find("span").text()).toBe('Привелегии администратора');
// 		expect(wrapper.find("button").text()).toBe('Войти')
// 	})
// })

const msg = 'Войти';
const factory = (propsData) => {
	return mount(SubmitButton, {
		propsData: {
			msg,
			...propsData
		}
	})
}

describe('SubmitButton.vue', () => {

	describe('Нет привелегий администратора', () => {
		it('Выводит верное сообщение', () => {
			const wrapper = factory()
			expect(wrapper.find("span").text()).toBe('Не авторизован');
			expect(wrapper.find('button').text()).toBe('Войти')
		})
	})

	describe('Есть привелегии администратора', () => {
		it('Выводит верное сообщение', () => {
			const wrapper = factory({isAdmin: true})
			expect(wrapper.find('span').text()).toBe('Привелегии администратора')
			expect(wrapper.find('button').text()).toBe('Войти')
		})
	})

})