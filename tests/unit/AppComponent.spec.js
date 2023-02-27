import { mount, createLocalVue } from '@vue/test-utils'
import AppComponent from '../../src/App.vue'
import VueRouter from 'vue-router'
import routes from '@/routes.js'

const localVue = createLocalVue()
localVue.use(VueRouter)
let router, wrapper

describe('App Component', () => {
  beforeEach(() => {
    router = new VueRouter({ routes })
    wrapper = mount(AppComponent, {
      localVue,
      router
    })
  })

  it('renders the login component when the login route is visited', async () => {
    await router.push('/login')
    expect(wrapper.findComponent({ name: 'LoginComponent' }).exists()).toBe(
      true
    )
  })

  it('renders the parent component when the root route is visited', async () => {
    await router.push('/')
    expect(wrapper.findComponent({ name: 'ParentComponent' }).exists()).toBe(
      true
    )
  })

  it('renders the not found component when the error route is visited', async () => {
    await router.push('/error')
    expect(wrapper.findComponent({ name: 'NotFoundComponent' }).exists()).toBe(
      true
    )
  })

  it('renders the not found component when the an invalid route is visited', async () => {
    await router.push('/invalidroute')
    expect(wrapper.findComponent({ name: 'NotFoundComponent' }).exists()).toBe(
      true
    )
  })
})
