import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import routes from '@/routes.js'
import AppComponent from '../../src/App.vue'

jest.mock('@/components/AppNavigationComponent.vue', () => ({
  name: 'AppNavigationComponent',
  render: (h) => h('div')
}))

jest.mock('@/components/SideBarComponent.vue', () => ({
  name: 'SideBarComponent',
  render: (h) => h('div')
}))

jest.mock('@/components/BiteComponent.vue', () => ({
  name: 'BiteComponent',
  render: (h) => h('div')
}))

const localVue = createLocalVue()
localVue.use(VueRouter)
let router, wrapper

describe('Parent Component', () => {
  beforeAll(async () => {
    router = new VueRouter({ routes })
    wrapper = mount(AppComponent, {
      localVue,
      router
    })
  })

  it('should be loaded if on the root route', () => {
    expect(wrapper.findComponent({ name: 'ParentComponent' }).exists()).toBe(
      true
    )
  })

  describe('When a bite URL is visited', () => {
    beforeAll(async () => {
      // Navigate to a fake bite
      await router.push('/journeys/51/bites/31')
    })

    it('renders the app nav when a bite URL is visited', () => {
      expect(
        wrapper.findComponent({ name: 'AppNavigationComponent' }).exists()
      ).toBe(true)
    })

    it('renders the side bar when a bite URL is visited', () => {
      expect(wrapper.findComponent({ name: 'SideBarComponent' }).exists()).toBe(
        true
      )
    })

    it('renders the main content area  when a bite URL is visited', () => {
      expect(wrapper.findComponent({ name: 'BiteComponent' }).exists()).toBe(
        true
      )
    })
  })
})
