<template>
  <VariationValueFormComponent
      :variation-value-form="variationValueForm"
      :variations="variations"
      :is-loading="isLoading"
      @submit-variation-value="saveVariationValue"
      form-description="Register your variation values by filling the form below"
      btn-message="Register"
      :errors="errors"
  />
</template>
<script setup>
import VariationValueFormComponent from "@/pages/variation_values/components/VariationValueFormComponent.vue";
import useVariationValues from "@/composables/variation_values";
import {inject, onMounted, provide} from "vue";
import {ABILITY_TOKEN, useAbility} from "@casl/vue";
import useAuth from "@/composables/auth";
import useVariations from "@/composables/variations";


const {
  errors,
    isLoading,
    variationValueForm,
    storeVariationValue,
} = useVariationValues()

const {variations, getVariations} = useVariations()



const saveVariationValue = async () => {
  await storeVariationValue({...variationValueForm});
}


provide('isLoading', isLoading)

onMounted(async () => {

  await getAbilities()

  if (!can('menu_items.create')) {
    await logout()
  }
  await getVariations()
})
const {logout} = useAuth()
const ability = inject(ABILITY_TOKEN)
const { can } = useAbility()
const {getAbilities} = useAuth()
</script>