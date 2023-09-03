<script setup>
import { reactive, computed, ref } from "vue";
import RadioOptions from "./options/RadioButtonOptions.vue";
import CheckboxOptions from "./options/CheckboxOptions.vue";
import AddonOptions from "./options/AddonOptions.vue";
const menuItemDetails = reactive({
  name: "Pep Pizza",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at consequuntur, culpa dolore eos error esse ipsam numquam obcaecati odit officia praesentium quas rerum saepe sequi, similique ullam unde vitae",
  image:
    "https://images.pexels.com/photos/17478671/pexels-photo-17478671/free-photo-of-pizza-with-arugula-leaves.jpeg?auto=compress&cs=tinysrgb&w=600",
  price: 5000,
  currency: "TZS",
  discount: 0,
  options: [
    {
      name: "Crust",
      maximumSelectableItem: 1,
      isRequired: true,
      type: "radio",
      values: [
        {
          name: "Htt",
          price: 0,
        },
        {
          name: "Pan",
          price: 200,
        },
        {
          name: "Staffed Crust",
          price: 0,
        },
      ],
    },
    {
      name: "Sauce",
      maximumSelectableItem: 1,
      isRequired: true,
      type: "radio",
      values: [
        {
          name: "Tomato",
          price: 0,
        },
        {
          name: "Chill",
          price: 200,
        },
        {
          name: "Ukwaju",
          price: 0,
        },
      ],
    },
    {
      name: "Toppings",
      maximumSelectableItem: 8,
      isRequired: true,
      type: "checkbox",
      values: [
        {
          name: "Topping 1",
          price: 0,
        },
        {
          name: "Topping 2",
          price: 200,
        },
        {
          name: "Topping 3",
          price: 0,
        },
      ],
    },
    {
      name: "Addons",
      maximumSelectableItem: "infinity",
      isRequired: true,
      type: "buttons",
      values: [
        {
          name: "Addon 1",
          price: 2,
        },
        {
          name: "Addon 2",
          price: 10,
        },
        {
          name: "Addon 3",
          price: 3,
        },
      ],
    },
  ],
});

const radioData = computed(() =>
  menuItemDetails.options.filter((item) => item.type === "radio")
);
const checkboxData = computed(() =>
  menuItemDetails.options.filter((item) => item.type === "checkbox")
);
const addonsData = computed(() =>
  menuItemDetails.options.filter((item) => item.type === "buttons")
);
const headerData = computed(() => {
  const { name, description, price, currency, discount } = menuItemDetails;
  return { name, description, price, currency, discount };
});
</script>


<template>
  <div>
    <img :src="menuItemDetails.image" alt="food" class="w-full" />
    <main class="px-2 mt-4 space-y-6">
      <div class="flex flex-col space-y-2">
        <h1 class="text-3xl font-bold text-fuchsia-900">{{ headerData.name }}</h1>
        <p class="text-md font-bold text-fuchsia-900">TZS 5000/=</p>
        <div class="">
          <p class="text-sm text-gray-600">{{ headerData.description }}</p>
          <p class="text-sm text-fuchsia-900 underline">More</p>
        </div>
      </div>

      <div
        class="flex space-x-4 bg-gray-100 w-fit px-4 rounded-full items-center justify-center"
      >
        <button class="text-lg font-bold">+</button>
        <p class="text-lg font-medium">1</p>
        <button class="text-lg font-bold">-</button>
      </div>
      <section class="flex flex-col space-y-8">
        <RadioOptions
          v-for="radioDatum in radioData"
          :data="radioDatum"
          :key="radioDatum.name"
        />
        <CheckboxOptions
          v-for="checkboxDatum in checkboxData"
          :data="checkboxDatum"
          :key="checkboxDatum.name"
        />
        <AddonOptions
          v-for="addonDatum in addonsData"
          :data="addonDatum"
          :key="addonDatum.name"
        />
      </section>
    </main>
  </div>
</template>
