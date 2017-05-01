<template>
    <div>ceva {{searchKey}}</div>
</template>

<script>
import Vuex from 'vuex'
export default {
  computed: Vuex.mapGetters([
    'currentUser', 'searchKey'
  ])
}
</script>
