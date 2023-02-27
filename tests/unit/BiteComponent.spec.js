import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import routes from '@/routes.js'
import BiteComponent from '@/components/BiteComponent.vue'

jest.mock('@/components/AppNavigationComponent.vue', () => ({
  name: 'AppNavigationComponent',
  render: (h) => h('div')
}))

jest.mock('@/components/BiteContentComponent.vue', () => ({
  name: 'BiteContentComponent',
  render: (h) => h('div'),
  props: {
    type: String,
    details: Object
  }
}))

jest.mock('@/components/FooterComponent.vue', () => ({
  name: 'FooterComponent',
  render: (h) => h('div')
}))

const localVue = createLocalVue()
localVue.use(VueRouter)
let router, wrapper

describe('BiteComponent', () => {
  beforeAll(async () => {
    router = new VueRouter({ routes })
    wrapper = mount(BiteComponent, {
      localVue,
      router,
      data () {
        return {
          biteData: {
            status: 'draft',
            title: 'Test Bite',
            durationMins: '30',
            rate: '2.0',
            description: 'Test Bite Description',
            type: 'survey',
            details: {}
          }
        }
      }
    })
  })

  it('show the draft bite header if the bite is a draft bite', () => {
    expect(wrapper.find('.bite__status').exists()).toBe(true)
    expect(wrapper.find('.bite__status').text()).toBe('This is a draft bite')
  })

  it('does not show the draft bite header if the bite is not a draft bite', async () => {
    await wrapper.setData({ biteData: { status: 'published' } })
    expect(wrapper.find('.bite__status').exists()).toBe(false)
  })

  it('should show the bite title', () => {
    expect(wrapper.find('.title__label').exists()).toBe(true)
    expect(wrapper.find('.title__label').text()).toBe('Test Bite')
  })

  it('should show the bite duration', () => {
    expect(wrapper.find('.content__info__duration').exists()).toBe(true)
    expect(wrapper.find('.content__info__duration').text()).toBe('30 min')
  })

  it('should show the bite rating if it has been rated', () => {
    expect(wrapper.find('.content__info__rating').exists()).toBe(true)
    expect(wrapper.find('.content__info__rating').text()).toBe('Rating: 2.0')
  })

  it('should show the `Not rated yet!` if it has not been rated', async () => {
    await wrapper.setData({ biteData: { rate: null } })
    expect(wrapper.find('.content__info__rating').exists()).toBe(true)
    expect(wrapper.find('.content__info__rating').text()).toBe(
      'Not rated yet!'
    )
  })

  it('should show the bite description', () => {
    expect(wrapper.find('.description__label').exists()).toBe(true)
    expect(wrapper.find('.description__label').text()).toBe(
      'Test Bite Description'
    )
  })

  it('renders the BiteContentComponent passing the type and details', () => {
    expect(
      wrapper.findComponent({ name: 'BiteContentComponent' }).exists()
    ).toBe(true)
    expect(
      wrapper.findComponent({ name: 'BiteContentComponent' }).props()
    ).toEqual({ details: {}, type: 'survey' })
  })

  it('should not show the footer if the bite has a type of survey or it is not published', async () => {
    expect(wrapper.findComponent({ name: 'FooterComponent' }).exists()).toBe(
      false
    )
  })

  it('should show the FooterComponent if the bite is not a survey and is published', async () => {
    await wrapper.setData({
      biteData: { status: 'published', type: 'preparation' }
    })
    expect(wrapper.findComponent({ name: 'FooterComponent' }).exists()).toBe(
      true
    )
  })
})
