<template>
  <AddonFormComponent
      :addon-form="addonForm"
      :types="types"
      :is-loading="isLoading"
      @submit-addon="saveAddon"
      form-description="Register your addons by filling the form below"
      btn-message="Register"
      :errors="errors"
  />
</template>

<script setup>
import {inject, onMounted, provide,} from "vue";
import {ABILITY_TOKEN, useAbility} from "@casl/vue";
import useAuth from "@/composables/auth";
import AddonFormComponent from "@/pages/addons/components/AddonFormComponent.vue";
import useAddons from "@/composables/addons";

  const {errors, addonForm, isLoading, storeIngredient} = useAddons()
  const types = [
    {name: "button"},
    {name: "checkbox"},
    {name: "radio"}
  ]
  const saveAddon = async () => {
    await storeIngredient({...addonForm});
  }

  provide('isLoading', isLoading)

  onMounted(async () => {
    await getAbilities()
    if (!can('menu_items.create')) {
      await logout()
    }
  })
  const {logout} = useAuth()
  const ability = inject(ABILITY_TOKEN)
  const { can } = useAbility()
  const {getAbilities} = useAuth()
</script>
