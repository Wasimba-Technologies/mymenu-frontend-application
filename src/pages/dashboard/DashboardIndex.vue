<template>
    <div>
        <title>MyMenu | Home</title>
        <div class="mx-auto px-4 sm:px-6 md:px-8">
            <div class="flex items-center">
                <img class="hidden h-16 w-16 rounded-full sm:block" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <div>
                    <div class="flex items-center">
                        <img class="h-16 w-16 rounded-full sm:hidden" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">{{utils.greeting() }} , {{user?.name}}</h1>
                    </div>
                    <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt class="sr-only">Company</dt>
                        <dd class="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                            <BuildingOfficeIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {{tenant?.name}}
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <Overview
            :total-sold="totalSold"
            :total-sold-products="totalSoldProducts"
            :total-orders="totalOrders"
        />
        <RecentActivity
            :orders="orders"
            :pagination-meta-data="paginationMetaData"
            @on-next-clicked="onNextClicked"
            @on-prev-clicked="onPrevClicked"
        />
    </div>
</template>



<script setup>
    import {ArrowTrendingUpIcon, BuildingOfficeIcon, FolderIcon, ShoppingCartIcon} from '@heroicons/vue/24/outline'
    import RecentActivity from "./components/RecentActivity.vue";
    import Overview from "./components/Overview.vue";
    import utils from "../../utils/utils";
    import {computed, inject, onMounted, provide, watch, watchEffect} from "vue";
    import useOrders from "../../composables/orders";
    import useAuth from "../../composables/auth";
    import {useAbility} from "@casl/vue";
    const {getAbilities} = useAuth()
    const {
        orders,
        getOrders,
        isFetching,
        changeOrdersUrl,
        paginationLinks,
        paginationMetaData
    } = useOrders()

    const {can} = useAbility()

    const {logout} = useAuth()

    onMounted( async () => {
        await getAbilities()
        if(!can('restaurants.update')){
            await logout()
        }
        let date = new Date()
        let start_date = date.getFullYear() + "-" + utils.getStrMonth(date) + "-" + utils.getStrDate(date)
        let end_date = date.getFullYear() + "-" + utils.getStrMonth(date) + "-" + utils.getStrTomorrowDate(date)
        watchEffect(async ()=>await getOrders('', start_date, end_date))
    })

    const totalOrders = computed(()=>{
        return orders.value?.length
    })

    const totalSoldProducts = computed(()=>{
        let sum = 0;
        orders.value?.forEach((order)=>{
            order?.order_items?.forEach((variant) => {
                sum += variant.pivot.qty
            })
        })
        return sum
    })

    const totalSold = computed(()=>{
        let sum = 0;
        orders.value?.forEach((order)=>{
            order?.order_items?.forEach((variant) => {
                sum += (variant.pivot.qty * variant.price)
            })
        })
        return sum
    })


    const onNextClicked = () => {
        changeOrdersUrl(paginationLinks.value.next)
    }

    const onPrevClicked =() =>{
        changeOrdersUrl(paginationLinks.value.prev)
    }

const user = JSON.parse(localStorage.getItem('user'))
const tenant = JSON.parse(localStorage.getItem('tenant'))




</script>
