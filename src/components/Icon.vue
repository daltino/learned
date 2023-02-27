<script>
import { icons } from '../js/Icon.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

icons.forEach(([, icon]) => library.add(icon))

export default FontAwesomeIcon
</script>
