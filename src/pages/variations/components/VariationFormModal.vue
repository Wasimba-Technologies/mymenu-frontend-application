<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-105" enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-105">
            <DialogPanel class="flex w-full max-w-xl transform text-left text-base transition sm:my-8">
              <form class="relative flex w-full flex-col overflow-hidden bg-white pt-6 pb-8 sm:rounded-lg sm:pb-6 lg:py-8">
                <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                  <h2 class="text-lg font-medium text-gray-900">Login </h2>
                  <button type="button" class="text-gray-400 hover:text-gray-500" @click="open = false">
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px]">
                  <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <div class="relative mt-2">
                      <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-200" />
                      </div>
                      <div class="relative flex justify-center text-sm font-medium leading-6">
                        <span class="bg-white px-6 text-gray-900">Create Variation</span>
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <label for="description" class="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" name="name" id="name"  placeholder="Name" v-model="variationForm.name"
                             :class="[errors?.description === undefined ? 'valid-input' : 'invalid-input']" required/>
                      <p class="mt-2 text-sm text-red-600" id="description-error" v-for="error in errors?.name">{{error}}</p>
                    </div>
                  </div>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";

import {
  XMarkIcon
} from '@heroicons/vue/24/outline';
import {inject, provide} from "vue";


const props = defineProps(['show','errors', 'variationForm'])
const emit = defineEmits(['submitVariation'])
const open = inject('openLoginModal')


const submitVariation = () => {
  emit('submitVariation')
}


</script>