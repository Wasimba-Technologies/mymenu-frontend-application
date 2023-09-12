<template>
  <form class="space-y-6 mt-6" @submit.prevent="submitIngredient">
    <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Ingredient information</h3>
          <p class="mt-1 text-sm text-gray-500">{{formDescription}}</p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-3 sm:col-span-3">
              <label for="name" class="block text-sm font-medium text-gray-700">Item Name</label>
              <input type="text" name="name" id="name"  placeholder="Item name" v-model="ingredientForm.name"
                     :class="[errors?.name === undefined ? 'valid-input' : 'invalid-input']" required/>
              <p class="mt-2 text-sm text-red-600" id="name-error" v-for="error in errors?.name">{{error}}</p>
            </div>

            <div class="col-span-3 sm:col-span-3">
              <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" name="price" id="price"  placeholder="Price" v-model="ingredientForm.price"
                     :class="[errors?.price === undefined ? 'valid-input' : 'invalid-input']" required/>
              <p class="mt-2 text-sm text-red-600" id="price-error" v-for="error in errors?.price">{{error}}</p>
            </div>

            <div class="col-span-6 sm:col-span-6">
              <label for="type" class="block text-sm font-medium text-gray-700">Button Type</label>
              <select id="type" name="type" v-model="ingredientForm.menu_id"
                      :class="[errors?.menu_id === undefined ? 'valid-select' : 'invalid-select']">
                <option value="" selected>--Select Type--</option>
                <option v-for="type in types" :value="type.name"
                        :selected="type.name === ingredientForm.type" :key="type.name">
                  {{type.name}}
                </option>
              </select>
              <p class="mt-2 text-sm text-red-600" id="type-error" v-for="error in errors?.type">{{error}}</p>
            </div>

            <div class="col-span-6 sm:col-span-6">
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="is_incrementing" name="is_incrementing" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-600"
                         v-model="ingredientForm.is_incrementing"/>
                </div>
                <div class="text-sm leading-6">
                  <label for="is_incrementing" class="font-medium text-gray-900">Is incrementing</label>
                  <p class="text-gray-500">Check this if the item can be incremented</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6 mt-6">
        <button type="submit" class="btn-sm-submit" :class="{'disabled:opacity-25' : isLoading}" :disabled="isLoading">
          <LoadingSpinner :is-loading="isLoading" />
          {{btnMessage}}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>

import LoadingSpinner from "@/components/LoadingSpinner.vue";

let props = defineProps([
  'ingredientForm', 'errors', 'isLoading', 'types',
  'isFetching', 'btnMessage', 'formDescription',
])

const emit = defineEmits(['submitIngredient'])

const submitIngredient = () =>{
  emit('submitIngredient')
}


</script>


