import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import routes from '../../src/routes.js'
import SideBarComponent from '../../src/components/SideBarComponent.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
let router, wrapper

describe('SideBarComponent', () => {
  beforeAll(async () => {
    router = new VueRouter({ routes })
    wrapper = mount(SideBarComponent, {
      localVue,
      router,
      data () {
        return {
          routes: [],
          biteList: [ {
            'id': 1,
            'type': 'survey',
            'title': 'PRE bite',
            'durationMins': 2,
            'isOptional': false,
            'isCompleted': true,
            'subtype': 'goal',
            'purpose': 'Goal',
            'status': 'published',
            'isRateable': false,
            'journey': {
              'title': 'Awesome module',
              'id': 11
            },
            'positionToClassroom': 'pre'
          },
          {
            'id': 2,
            'type': 'survey',
            'title': 'IN Classroom bite',
            'description': 'I want to find back my goals',
            'durationMins': 3,
            'isOptional': false,
            'isCompletable': false,
            'isCompleted': false,
            'subtype': 'other',
            'purpose': 'Questionnaire',
            'status': 'published',
            'isFavorited': false,
            'isRateable': true,
            'journey': {
              'title': 'Awesome module',
              'id': 11
            },
            'positionToClassroom': 'in'
          },
          {
            'id': 3,
            'type': 'survey',
            'title': 'POST bite',
            'description': 'I want to find back my goals',
            'durationMins': 3,
            'isOptional': false,
            'isCompletable': false,
            'isCompleted': false,
            'subtype': 'feedback',
            'purpose': 'Questionnaire',
            'status': 'published',
            'isRateable': false,
            'journey': {
              'title': 'Awesome module',
              'id': 11
            },
            'positionToClassroom': 'post'
          }],
          preBitesCount: 1,
          postBitesCount: 1,
          classroomBitesCount: 1,
          optionalBitesCount: 0,
          noClassroom: false,
          journeyTitle: 'Awesome module'
        }
      }
    })
  })

  it('Should show the module title', () => {
    expect(wrapper.find('#journey-title').text()).toBe('Awesome module')
  })

  it('Should not show the no-classroom bite list when there is a classroom', () => {
    expect(wrapper.find('#no-classroom').exists()).toBe(false)
    expect(wrapper.find('#no-class-bites').exists()).toBe(false)
  })

  it('Should show the pre bites list', () => {
    expect(wrapper.find('#pre-bites-title').text()).toBe('Prepare for classroom')
    expect(wrapper.find('#pre-bites-title').text()).not.toBe('Hola!')
    expect(wrapper.find('#pre-bites').exists()).toBe(true)
  })

  it('Should show the in bites list', () => {
    expect(wrapper.find('#in-bites-title').text()).toBe('Classroom Session')
    expect(wrapper.find('#in-bites-title').text()).not.toBe('Qué tal!')
    expect(wrapper.find('#in-bites').exists()).toBe(true)
  })

  it('Should show the post bites list', () => {
    expect(wrapper.find('#post-bites-title').text()).toBe('Apply on the job')
    expect(wrapper.find('#post-bites-title').text()).not.toBe('Adios!')
    expect(wrapper.find('#post-bites').exists()).toBe(true)
  })

  it('Should not show the optional bites list', () => {
    expect(wrapper.find('#optional-bites-title').exists()).toBe(false)
    expect(wrapper.find('#optional-bites').exists()).toBe(false)
  })

  it('Display completion icon if bite is completed', () => {
    expect(wrapper.find('#completed-pre-bite').exists()).toBe(true)
    expect(wrapper.find('#completed-in-bite').exists()).toBe(false)
    expect(wrapper.find('#completed-post-bite').exists()).toBe(false)
  })
})
