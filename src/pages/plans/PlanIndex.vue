<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center flex-row-reverse">
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <router-link to="/plans/create"
                             class="inline-flex items-center justify-center rounded-md border border-transparent
                                         bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700
                                         focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:w-auto">
                    Add Plan
                </router-link>
            </div>
        </div>
        <div class="mt-4 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Plan</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
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
                            <tr v-for="plan in plans" :key="plan.id">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    {{ plan.name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{plan.price}}
                                </td>
                                <td>
                                    <router-link :to="`/plans/${plan.id}/update`" class="px-3 py-4 text-rose-600 hover:text-rose-900" :disabled="!(can('plans.update'))">
                                        Edit
                                    </router-link>
                                </td>
                            </tr>
                            <tr v-if="plans?.length === 0 && ! isFetching">
                                <td colSpan="5">
                                    <NoDataSVG
                                        class="flex flex-col justify-center items-center mt-10"
                                        message="Oops! There are no Plans Yet."
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-end mt-2">
                        <Pagination v-if="plans?.length !== 0"
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
import usePlans from "../../composables/plans";
import utils from "../../utils/utils";
import {ABILITY_TOKEN, useAbility} from "@casl/vue";
import useAuth from "../../composables/auth";

const searchName = ref('')
const {
    plans,
    getPlans,
    paginationLinks,
    paginationMetaData,
    changePlansUrl,
    isFetching
} = usePlans()



const onNextClicked = () => {
    changePlansUrl(paginationLinks.value.next)
}

const onPrevClicked =() =>{
    changePlansUrl(paginationLinks.value.prev)
}

onMounted(()=>{
    getPlans()
})

//utils.has_perm('plans.view')

const {can} = useAbility()
const {logout} = useAuth()
const ability = inject(ABILITY_TOKEN)
const {getAbilities} = useAuth()

onMounted(async () => {
    await getAbilities()

    if (!can('plans.viewAny')) {
        await logout()
    }
})

// const {can} = useAbility()
// const {logout} = useAuth()
// const ability = inject(ABILITY_TOKEN)
// const {getAbilities} = useAuth()
//
// getAbilities()
// if(!can('plans.viewAny')){
//     logout()
// }
</script>
