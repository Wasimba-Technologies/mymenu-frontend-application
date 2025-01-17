<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center flex-row-reverse">
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <router-link to="/menu/create"
                             class="inline-flex items-center justify-center rounded-md border border-transparent
                                         bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700
                                         focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:w-auto">
                    Add Menu
                </router-link>
            </div>
        </div>
        <div class="mt-4 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <TableSearch @searchData="searchMenuByName" />
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Menu</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Time</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Time</th>
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
                            <tr v-for="menu in menus" :key="menu.id">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div class="flex items-center">
                                        <div class="h-10 w-10 flex-shrink-0">
                                            <img class="h-10 w-10 rounded-full" :src="menu?.image" alt="" />
                                        </div>
                                        <div class="ml-4">
                                            <div class="font-medium text-gray-900">{{ menu.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{menu.start_time}}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{menu.end_time}}
                                </td>
                                <td>
                                    <router-link :to="`/menu/${menu.id}/update`" class="px-3 py-4 text-rose-600 hover:text-rose-900" :disabled="!can('menus.update')">
                                        Edit
                                    </router-link>
                                </td>
                            </tr>
                            <tr v-if="menus?.length === 0 && ! isFetching">
                                <td colSpan="5">
                                    <NoDataSVG
                                        class="flex flex-col justify-center items-center mt-10"
                                        message="Oops! There are no menus Yet."
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-end mt-2">
                        <Pagination v-if="menus?.length !== 0"
                                    @on-prev-clicked="onPrevClicked"
                                    @on-next-clicked="onNextClicked"
                                    :is-next="paginationLinks?.next"
                                    :is-prev="paginationLinks?.prev"
                                    :meta="paginationMetaData"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {inject, onMounted, ref, watch, watchEffect} from "vue";
import Pagination from "../../components/Pagination.vue";
import TableSearch from "../../components/TableSearch.vue";
import useMenus from "../../composables/menus";
import SkeletonPlaceHolder from "../../components/SkeletonPlaceHolder.vue";
import NoDataSVG from "../../components/NoDataSVG.vue";
import {ABILITY_TOKEN, useAbility} from "@casl/vue";
import useAuth from "../../composables/auth";

const searchName = ref('')
const {
    menus,
    getMenus,
    paginationLinks,
    paginationMetaData,
    changeTenantsUrl,
    isFetching
} = useMenus()



const onNextClicked = () => {
    changeTenantsUrl(paginationLinks.value.next)
}

const onPrevClicked =() =>{
    changeTenantsUrl(paginationLinks.value.prev)
}

onMounted(()=>{
    //if URL changes perform side effects
    watchEffect(()=>getMenus(searchName.value))
})

const {can} = useAbility()
const {logout} = useAuth()
const ability = inject(ABILITY_TOKEN)
const {getAbilities} = useAuth()

onMounted(async () => {
    await getAbilities()

    if (!can('menus.viewAny')) {
        await logout()
    }
})


watch(searchName, (currentName) => {
    getMenus(currentName)
})

const searchMenuByName = (ev) => {
    searchName.value = ev.target.value
}

//utils.has_perm('menus.view')
// const {can} = useAbility()
// const {logout} = useAuth()
//
// onMounted(()=>{
//     if(!can('menus.viewAny')){
//         logout()
//     }
// })

</script>
