<template>
  <IngredientFormComponent
      :ingredient-form="ingredientForm"
      :is-loading="isLoading"
      @submit-ingredient="saveIngredient"
      form-description="Register your ingredients by filling the form below"
      btn-message="Register"
      :errors="errors"
  />
</template>

<script setup>
import {inject, onMounted, provide, ref,} from "vue";
import {ABILITY_TOKEN, useAbility} from "@casl/vue";
import IngredientFormComponent from "@/pages/ingredients/components/IngredientFormComponent.vue";
import useIngredients from "@/composables/ingredients";
import useAuth from "@/composables/auth";

const {errors, ingredientForm, isLoading, storeIngredient} = useIngredients()


const saveIngredient = async () => {
  await storeIngredient({...ingredientForm});
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