<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-4 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Plan</th>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Start</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
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
                            <tr v-for="subscription in subscriptions" :key="subscription.id">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    {{subscription.plan.name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{subscription.start_date}}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{subscription.end_date}}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    Tsh. {{numFormat(subscription.plan.price)}}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span :class="[statusStyles[subscription.status], 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize']">
                                        {{ subscription.status }}
                                    </span>
                                </td>
                                <td>
                                    <router-link :to="`/subscriptions/${subscription.id}/details`" class="px-3 py-4 text-rose-600 hover:text-rose-900">details</router-link>
                                </td>
                            </tr>
                            <tr v-if="subscriptions?.length === 0 && ! isFetching">
                                <td colSpan="5">
                                    <NoDataSVG
                                        class="flex flex-col justify-center items-center mt-10"
                                        message="Oops! There are no subscription Yet."
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-end mt-2">
                        <Pagination v-if="subscriptions?.length !== 0"
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

import {inject, onMounted, ref} from "vue";
import Pagination from "../../components/Pagination.vue";
import SkeletonPlaceHolder from "../../components/SkeletonPlaceHolder.vue";
import NoDataSVG from "../../components/NoDataSVG.vue";
import useSubscriptions from "../../composables/subscription";
import utils from "../../utils/utils";
import {ABILITY_TOKEN, useAbility} from "@casl/vue";
import useAuth from "../../composables/auth";

const searchName = ref('')
const {
    numFormat,
    isFetching,
    subscriptions,
    paginationLinks,
    getSubscriptions,
    paginationMetaData,
    changeSubscriptionsUrl,

} = useSubscriptions()



const onNextClicked = () => {
    changeSubscriptionsUrl(paginationLinks.value.next)
}

const onPrevClicked =() =>{
    changeSubscriptionsUrl(paginationLinks.value.prev)
}

onMounted(()=>{
    //if URL changes perform side effects
    getSubscriptions()
})

const showPayments = () =>{

}

//utils.has_perm('subscription.view')
const {can} = useAbility()
const {logout} = useAuth()
const ability = inject(ABILITY_TOKEN)
const {getAbilities} = useAuth()

const statusStyles = {
    active: 'bg-green-100 text-green-800',
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-gray-100 text-gray-800',
}

onMounted(async () => {
    await getAbilities()

    if (!can('subscriptions.viewAny')) {
        await logout()
    }
})
</script>
