<template>
  <VariationValueFormComponent
      :variation-value-form="variationValueForm"
      @submit-variation-value="saveVariationValue"
      :is-loading="isLoading"
      form-description="Register your variation values by filling the form below"
      btn-message="Register"
      :errors="errors"
  />
</template>
<script setup>
import VariationValueFormComponent from "@/pages/variation_values/components/VariationValueFormComponent.vue";
import useVariationValues from "@/composables/variation_values";
import {inject, onMounted} from "vue";
import {ABILITY_TOKEN, useAbility} from "@casl/vue";
import useAuth from "@/composables/auth";


const {
  errors,
    isLoading,
    variationValueForm,
    storeVariationValue,
} = useVariationValues()



const saveVariationValue = async () => {
  await storeVariationValue({...variationValueForm});
}


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