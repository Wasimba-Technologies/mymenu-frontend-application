<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center flex-row-reverse">
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link v-if="can('menu_items.create')" to="/variation_values/create"
                     class="inline-flex items-center justify-center rounded-md border border-transparent
                                         bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700
                                         focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:w-auto">
          Add Variations
        </router-link>
      </div>
    </div>
    <div class="mt-4 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <TableSearch @searchData="searchVariationValuesByName" />
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Incrementing</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-if="isFetching">
                <td colSpan="5">
                  <SkeletonPlaceHolder />
                </td>
              </tr>
              <tr v-for="value in variationValues" :key="value.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div class="font-medium text-gray-900">{{ value.name }}</div>
                  <div class="flex items-center">
                    <div>
                      <div class="font-medium text-gray-900">{{ value?.name }}</div>
                      <div class="text-gray-500">{{ value?.variation?.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{Intl.NumberFormat().format(value?.price)}}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{value?.type}}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{value?.is_incrementing}}
                </td>
                <td>
                  <router-link :to="`/variation_values/${value?.id}/update`" class="px-3 py-4 text-rose-600 hover:text-rose-900" :disabled="!can('menu_items.update')">
                    Edit
                  </router-link>
                </td>
              </tr>
              <tr v-if="variationValues?.length === 0 && ! isFetching">
                <td colSpan="5">
                  <NoDataSVG
                      class="flex flex-col justify-center items-center mt-10"
                      message="Oops! There are no variation Values Yet."
                  />
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {inject, onMounted, ref, watch, watchEffect} from "vue";
import {ABILITY_TOKEN, useAbility} from "@casl/vue";
import useVariationValues from "@/composables/variation_values";
import useAuth from "@/composables/auth";
import NoDataSVG from "@/components/NoDataSVG.vue";
import SkeletonPlaceHolder from "@/components/SkeletonPlaceHolder.vue";
import TableSearch from "@/components/TableSearch.vue";

const searchName = ref('')
const {
  variationValues,
  getVariationValues,
  paginationLinks,
  paginationMetaData,
  isFetching
} = useVariationValues()



onMounted(async () => {
  //if URL changes perform side effects
  watchEffect(() => getVariationValues(searchName.value))

  await getAbilities()

  //if user can view menu_items then can view ingredients
  if (!can('menu_items.viewAny')) {
    await logout()
  }
})



watch(searchName, (currentName) => {
  getVariationValues(currentName)
})

const searchVariationValuesByName = (ev) => {
  searchName.value = ev.target.value
}


const {logout} = useAuth()
const ability = inject(ABILITY_TOKEN)
const { can } = useAbility()
const {getAbilities} = useAuth()


</script>
