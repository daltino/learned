import BiteComponent from './components/BiteComponent.vue'
import NotFoundComponent from './components/NotFoundComponent.vue'
import Auth0CallbackComponent from './components/Auth0CallbackComponent.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import RatingModalComponent from './components/RatingModalComponent.vue'
import FeedbackModalComponent from './components/FeedbackModalComponent.vue'
import ParentComponent from './components/ParentComponent.vue'
import SideBarComponent from './components/SideBarComponent'

export default [
  { path: '/login', name: 'login', component: LoginComponent },
  { path: '/callback', name: 'callback', component: Auth0CallbackComponent },
  {
    path: '/',
    name: 'app',
    component: ParentComponent,
    children: [
      {
        path: '/journeys/:journeyId/bites/:biteId',
        name: 'bite',
        components: {
          sidebar: SideBarComponent,
          maincontent: BiteComponent
        },
        children: [
          {
            path: 'rate',
            name: 'rate',
            component: RatingModalComponent
          },
          {
            path: 'feedback',
            name: 'feedback',
            component: FeedbackModalComponent
          }
        ]
      }
    ]
  },
  { path: '/error', name: 'error', component: NotFoundComponent },
  { path: '*', name: '404', component: NotFoundComponent }
]
