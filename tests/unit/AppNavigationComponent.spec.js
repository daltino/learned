import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import routes from '@/routes.js'
import AppNavigationComponent from '@/components/AppNavigationComponent.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
let router, wrapper

describe('AppNavigationComponent', () => {
  beforeAll(async () => {
    router = new VueRouter({ routes })
    wrapper = mount(AppNavigationComponent, {
      localVue,
      router
    })
  })

  it('should show the logout button link', () => {
    expect(wrapper.find('.logout-button').exists()).toBe(true)
  })

  it('should show the Leave Feedback button', () => {
    expect(wrapper.find('.leave-feedback-button').exists()).toBe(true)
  })
})
