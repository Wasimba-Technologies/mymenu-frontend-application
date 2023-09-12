<template>
  <IngredientFormComponent
      :ingredient-form="ingredient"
      :types="types"
      :is-loading="isLoading"
      @submit-ingredient="changeIngredient"
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
import {useRoute} from "vue-router";


const types = [
  {name: "button"},
  {name: "checkbox"},
  {name: "radio"}
]


const {
  errors,
  ingredient,
  isLoading,
  isFetching,
  getIngredient,
  updateIngredient,
} = useIngredients()


const route = useRoute()

const modified_menu_item = ref({})

const changeIngredient = async () => {
  await updateIngredient(route.params.id);
}



provide('isLoading', isLoading)

onMounted(async () => {
  await getAbilities()

  if (!can('menu_items.update')) {
    await logout()
  }
  await getIngredient(route.params.id)
})


//utils.has_perm('menu_items.update')
const {can} = useAbility()
const {logout} = useAuth()
const ability = inject(ABILITY_TOKEN)
const {getAbilities} = useAuth()


</script>
