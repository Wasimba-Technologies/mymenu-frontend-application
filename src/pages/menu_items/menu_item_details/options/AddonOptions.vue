<script setup>
defineProps({
    data :{
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="flex flex-col space-y-4">

        <div class="flex justify-between">
            <div class="flex flex-col space-y-1">
                <h2 class="text-fuchsia-900 text-xl font-semibold">Select your {{data.name}}</h2>
                <p v-if="data.maximumSelectableItem !== 'infinity'" class="text-xs text-gray-600 font-medium">Select maximum of {{data.maximumSelectableItem}}</p>
            </div>
            <span v-if="data.isRequired" class="flex justify-center items-center text-gray-800 text-xs font-medium bg-gray-100 rounded-full px-2 w-fit h-fit">Required</span>
        </div>

        <div class="flex flex-col space-y-4">
        <div v-for="item in data.values" class="flex flex-col">
            <div class="flex justify-between items-center">
                <div>
                    <span class="text-fuchsia-900 font-medium ">{{ item.name }}</span>
                    <p v-if="item.price !== 0" class="text-xs ">+ TZS {{item.price}}</p>
                </div>
                <div class="flex space-x-4">
                    <button class="flex justify-center items-center font-semibold bg-gray-300 w-6 h-6 rounded-full">-</button>
                    <p>1</p>
                    <button class="flex justify-center items-center font-semibold bg-gray-300 w-6 h-6 rounded-full">+</button>
                </div>
            </div>
            <hr class="mt-2">
        </div>
        </div>

    </div>
</template>
