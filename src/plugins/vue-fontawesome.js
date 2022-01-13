import Vue from 'vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faUserEdit,
  faChartLine,
  faComment,
  faBell
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dom } from "@fortawesome/fontawesome-svg-core"

library.add(faStar)
library.add(faUserEdit)
library.add(faChartLine)
library.add(faComment)
library.add(faBell)

dom.watch();

Vue.component('font-awesome-icon', FontAwesomeIcon)