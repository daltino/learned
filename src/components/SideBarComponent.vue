<template>
  <div id="main-container">
    <div id="main-container__image-container">
      <img
        src="../assets/sidebar-image.jpg"
        srcset="
          ../assets/sidebar-image@2x.jpg 2x,
          ../assets/sidebar-image@3x.jpg 3x
        "
        class="sidebar-image"
        :alt="this.journeyTitle"
      />
      <div class="journey-title" id="journey-title">
        {{ this.journeyTitle }}
      </div>
    </div>
    <div id="main-container__nav">
      <ul class="nav bg-pale-grey flex-column">
        <div id="no-classroom" v-if="this.noClassroom" class="pt-lg-3"></div>
        <li
          id="no-class-bites"
          class="nav-item"
          v-if="noClassroom && !bite.isOptional"
          v-for="bite in biteList"
          v-bind:key="bite.id"
        >
          <router-link
            :to="{
              name: 'bite',
              params: { journeyId: bite.journey.id, biteId: bite.id },
            }"
            :class="biteClass(bite)"
            data-toggle="tooltip"
            :title="bite.title"
            >{{ displayBiteTitle(bite.id) }}
            <div v-if="bite.isCompleted" class="icon-class float-right">
              <Icon icon="check" :class="checkedIconClass(bite)" />
            </div>
          </router-link>
        </li>
        <div
          id="pre-bites-title"
          v-if="this.preBitesCount > 0"
          class="section-header"
        >
          Prepare for classroom
        </div>
        <li
          id="pre-bites"
          class="nav-item"
          v-if="bite.positionToClassroom === 'pre'"
          v-for="bite in biteList"
          v-bind:key="bite.id"
        >
          <router-link
            :to="{
              name: 'bite',
              params: { journeyId: bite.journey.id, biteId: bite.id },
            }"
            :class="biteClass(bite)"
            data-toggle="tooltip"
            :title="bite.title"
            >{{ displayBiteTitle(bite.id) }}
            <div
              id="completed-pre-bite"
              v-if="bite.isCompleted"
              class="icon-class float-right"
            >
              <Icon icon="check" :class="checkedIconClass(bite.id)" />
            </div>
          </router-link>
        </li>
        <div
          id="in-bites-title"
          v-if="this.classroomBitesCount > 0"
          class="section-header"
        >
          Classroom Session
        </div>
        <li
          id="in-bites"
          class="nav-item"
          v-if="bite.positionToClassroom === 'in'"
          v-for="bite in biteList"
          v-bind:key="bite.id"
        >
          <router-link
            :to="{
              name: 'bite',
              params: { journeyId: bite.journey.id, biteId: bite.id },
            }"
            :class="biteClass(bite)"
            data-toggle="tooltip"
            :title="bite.title"
            >{{ displayBiteTitle(bite.id) }}
            <div
              id="completed-in-bite"
              v-if="bite.isCompleted && bite.subtype !== 'wordcloud'"
              class="icon-class float-right"
            >
              <Icon icon="check" :class="checkedIconClass(bite.id)" />
            </div>
          </router-link>
        </li>
        <div
          id="post-bites-title"
          v-if="this.postBitesCount > 0"
          class="section-header"
        >
          Apply on the job
        </div>
        <li
          id="post-bites"
          class="nav-item"
          v-if="bite.positionToClassroom === 'post'"
          v-for="bite in biteList"
          v-bind:key="bite.id"
        >
          <router-link
            :to="{
              name: 'bite',
              params: { journeyId: bite.journey.id, biteId: bite.id },
            }"
            :class="biteClass(bite)"
            data-toggle="tooltip"
            :title="bite.title"
            >{{ displayBiteTitle(bite.id) }}
            <div
              id="completed-post-bite"
              v-if="bite.isCompleted"
              class="icon-class float-right"
            >
              <Icon icon="check" :class="checkedIconClass(bite.id)" />
            </div>
          </router-link>
        </li>
        <div
          id="optional-bites-title"
          v-if="this.optionalBitesCount > 0"
          class="section-header"
        >
          Optional bites
        </div>
        <li
          id="optional-bites"
          class="nav-item"
          v-if="bite.isOptional"
          v-for="bite in biteList"
          v-bind:key="bite.id"
        >
          <router-link
            :to="{
              name: 'bite',
              params: { journeyId: bite.journey.id, biteId: bite.id },
            }"
            :class="biteClass(bite)"
            data-toggle="tooltip"
            :title="bite.title"
            >{{ displayBiteTitle(bite.id) }}
            <div v-if="bite.isCompleted" class="icon-class float-right">
              <Icon icon="check" :class="checkedIconClass(bite.id)" />
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { requestAPI } from "../js/LearnedAPI";
import { eventsPath } from "../js/APIpaths";
import { getCompanyCode, getRole } from "../js/authentication/AuthService";
import { get, isNil, find } from "lodash";
import Icon from "./Icon.vue";

export default {
  name: "sidebar",
  components: { Icon },

  mounted() {
    this.$root.$on("changed_completion_status", (biteId, newStatus) => {
      find(this.biteList, ["id", biteId]).isCompleted = newStatus;
    });
  },

  data() {
    return {
      routes: [],
      bites: [],
      biteList: null,
      preBitesCount: 0,
      postBitesCount: 0,
      classroomBitesCount: 0,
      optionalBitesCount: 0,
      noClassroom: false,
      journeyTitle: null,
    };
  },

  methods: {
    displayBiteTitle: function (id) {
      const bite = find(this.biteList, ["id", id]);
      return bite.title.length < 30
        ? bite.title
        : bite.title.substring(0, 30) + "...";
    },

    biteClass(bite) {
      const biteSelected = parseInt(this.$route.params.biteId) === bite.id;
      if (bite.isCompleted && biteSelected) {
        return "nav-link py-2";
      } else if (bite.isCompleted) {
        return "nav-link py-2 text-muted";
      } else if (biteSelected) {
        return "nav-link py-2 text-white";
      } else {
        return "nav-link py-2 text-dark";
      }
    },

    checkedIconClass(id) {
      return parseInt(this.$route.params.biteId) === id
        ? "text-white"
        : "check-green-color";
    },

    setData: function (events) {
      this.biteList = events;
      this.journeyTitle = events[0].journey.title;
    },
  },

  beforeRouteEnter(to, from, next) {
    const params = {
      ...to.params,
      companyCode: getCompanyCode(),
      role: getRole(),
    };
    const events = eventsPath(params);
    Promise.resolve(requestAPI(events))
      .then((events) => {
        next((vm) => {
          events.forEach((event) => {
            if (event.type === "bite") {
              if (
                event.details.subtype === "wordcloud" &&
                params.role === "employee"
              ) {
                return;
              }
              vm.bites.push(event.details);
              if (event.details.positionToClassroom === "pre") {
                vm.preBitesCount++;
              } else if (event.details.positionToClassroom === "post") {
                vm.postBitesCount++;
              } else if (event.details.positionToClassroom === "in") {
                vm.classroomBitesCount++;
              } else if (event.details.isOptional) {
                vm.optionalBitesCount++;
              } else if (isNil(event.details.positionToClasroom)) {
                vm.noClassroom = true;
              }
            }
            return vm.bites;
          });
          vm.setData(vm.bites);
        });
      })
      .catch((error) => {
        if (get(error, "response.status") === 401) {
          next({
            name: "login",
            query: { redirect: to.fullPath },
          });
        } else {
          next({
            name: "error",
            query: {
              status: get(error, "response.status"),
            },
          });
        }
      });
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/styles.scss";

#main-container {
  display: flex;
  background-color: #f0f0f5;
  margin-top: $header-height;

  &__image-container {
    position: relative;
    text-align: left;
    color: white;
    flex: 1;
  }

  &__nav {
    background-color: #f0f0f5;
    top: 3px;
    padding-top: 5px;
    padding-bottom: 3px;
    flex-wrap: wrap;
    flex: 3;
  }
}

.sidebar-image {
  width: 100%;
  vertical-align: middle;
}

.journey-title {
  position: absolute;
  top: 70px;
  left: 20px;
  vertical-align: middle;
  @extend %font-primary;
  font-size: 25px;
  line-height: 1.2;
  color: #ffffff;
}

.nav-link {
  @extend %font-no-highlighted;
  background-color: #f0f0f5;
  padding: 20px 20px;
  line-height: 1.5;
}

.nav-link:hover {
  @extend %font-hover;
  display: block;
}

.nav .router-link-active {
  @extend %font-no-highlighted;
  background-color: #6ccbdf;
  color: #ffffff;
  line-height: 1.75;
  font-weight: 900;
}

.nav li {
  white-space: nowrap;
  background-color: #f0f0f5;
  border-bottom: 1px solid #d9dfe5;
}

.section-header {
  @extend %font-primary;
  font-size: 20px;
  padding: 25px 20px;
}

.icon-class {
  padding-left: 8px;
  vertical-align: middle;
  font-size: 20px;
}
</style>
