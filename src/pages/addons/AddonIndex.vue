<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center flex-row-reverse">
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link v-if="can('menu_items.create')" to="/addons/create"
                     class="inline-flex items-center justify-center rounded-md border border-transparent
                                         bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700
                                         focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:w-auto">
          Create Addons
        </router-link>
      </div>
    </div>
    <div class="mt-4 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <TableSearch @searchData="searchAddonsByName" />
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
              <tr v-for="addon in addons" :key="addon.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div class="font-medium text-gray-900">{{ addon.name }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{Intl.NumberFormat().format(addon.price)}}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{addon.type}}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{addon.is_incrementing}}
                </td>
                <td>
                  <router-link :to="`/addons/${addon.id}/update`" class="px-3 py-4 text-rose-600 hover:text-rose-900" :disabled="!can('menu_items.update')">
                    Edit
                  </router-link>
                </td>
              </tr>
              <tr v-if="addons?.length === 0 && ! isFetching">
                <td colSpan="5">
                  <NoDataSVG
                      class="flex flex-col justify-center items-center mt-10"
                      message="Oops! There are no addons Yet."
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
import useAddons from "@/composables/addons";
import useAuth from "@/composables/auth";
import NoDataSVG from "@/components/NoDataSVG.vue";
import SkeletonPlaceHolder from "@/components/SkeletonPlaceHolder.vue";
import TableSearch from "@/components/TableSearch.vue";


const searchName = ref('')
const {
  addons,
  getAddons,
  paginationLinks,
  paginationMetaData,
  isFetching
} = useAddons()

onMounted(async () => {
  //if URL changes perform side effects
  watchEffect(() => getAddons(searchName.value))
  await getAbilities()
  //if user can view menu_items then can view ingredients
  if (!can('menu_items.viewAny')) {
    await logout()
  }
})
watch(searchName, (currentName) => {
  getAddons(currentName)
})
const searchAddonsByName = (ev) => {
  searchName.value = ev.target.value
}
const {logout} = useAuth()
const ability = inject(ABILITY_TOKEN)
const { can } = useAbility()
const {getAbilities} = useAuth()

</script>