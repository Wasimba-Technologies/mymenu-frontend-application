<template>
  <BlurredSpinner v-if="isFetching" />
  <AddonFormComponent
      :addon-form="addon"
      :is-loading="isLoading"
      @submit-addon="changeAddon"
      form-description="Update your addons by filling the form below"
      btn-message="Register"
      :errors="errors"
  />
</template>
<script setup>
  import AddonFormComponent from "@/pages/addons/components/AddonFormComponent.vue";
  import {inject, onMounted, provide} from "vue";
  import {ABILITY_TOKEN, useAbility} from "@casl/vue";
  import useAuth from "@/composables/auth";
  import {useRoute} from "vue-router";
  import useAddons from "@/composables/addons";
  import BlurredSpinner from "@/components/BlurredSpinner.vue";


  const {
    errors,
    addon,
    getAddon,
    isLoading,
    isFetching,
    updateAddon,
  } = useAddons()

  const route = useRoute()

  const changeAddon = async () => {
    await updateAddon(route.params.id);
  }

  provide('isLoading', isLoading)

  onMounted(async () => {
    await getAbilities()
    if (!can('menu_items.update')) {
      await logout()
    }
    await getAddon(route.params.id)
  })

  const {can} = useAbility()
  const {logout} = useAuth()
  const ability = inject(ABILITY_TOKEN)
  const {getAbilities} = useAuth()

</script>