<template>
  <VariationValueFormComponent
      :variation-value-form-form="variationValue"
      :types="types"
      :variations="variations"
      :is-loading="isLoading"
      @submit-variation-value="changeVariationValue"
      form-description="Update your variation values by filling the form below"
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
import {useRoute} from "vue-router";


const {
    errors,
    isLoading,
    variationValue,
    getVariationValue,
  updateVariationValue,
} = useVariationValues()

const {variations, getVariations} = useVariations()

const types = [
  {name: "button"},
  {name: "checkbox"},
  {name: "radio"}
]


const route = useRoute()


const changeVariationValue = async () => {
  await updateVariationValue(route.params.id);
}



provide('isLoading', isLoading)

onMounted(async () => {
  await getAbilities()

  if (!can('menu_items.update')) {
    await logout()
  }
  await getVariations()
  await getVariationValue(route.params.id)
})


const {can} = useAbility()
const {logout} = useAuth()
const ability = inject(ABILITY_TOKEN)
const {getAbilities} = useAuth()


</script>