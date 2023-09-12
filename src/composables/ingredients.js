import { reactive, ref} from "vue";
import router from "../router";


export default function useIngredients() {
    const ingredients = ref([]);
    const ingredient = ref({});
    const errors = ref({})
    const isLoading = ref(false)
    const isFetching = ref(false)
    const paginationMetaData = ref({})
    const paginationLinks = ref({})
    const ingredientsURL = ref('api/ingredients')

    const ingredientForm = reactive(
        {
            name: '',
            price: '',
            is_incrementing: true,
            type: 'button'
        }
    )

    const getIngredients = async (searchName) => {
        isFetching.value = true
        await axios.get(ingredientsURL.value+'?name='+searchName).then(response =>{
            ingredients.value = response.data.data
            paginationMetaData.value = response.data.meta
            paginationLinks.value = response.data.links
        }).catch(error =>{
            Toast.fire({
                icon: 'error',
                title: error.message
            })
        }).finally(
            () => isFetching.value = false
        )
    }

    const getIngredient = async (id) => {
        isFetching.value = true
        await axios.get('/api/ingredients/'+id).then(response =>{
            ingredient.value = response.data.data
        }).catch(error =>{
            Toast.fire({
                icon: 'error',
                title: error.message
            })
        }).finally(
            () => isFetching.value = false
        )
    }


    const storeIngredient = async (data) => {
        isLoading.value = true;

        await axios.post('/api/ingredients', data)
            .then(response => {
                ingredient.value = response.data.data
                router.push({name: 'ingredients.index'})
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                })
            }).catch(error => {
                if (error.response?.data) {
                    errors.value = error.response.data.errors
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: error.message
                    })
                }
            }).finally(
                () => isLoading.value = false
            )
    }
    const updateIngredient = async (id) => {

        isLoading.value = true

        const data = {...ingredient}

        await axios.patch('/api/ingredients/' + id, data)
            .then(response => {
                router.push({name: 'ingredients.index'})
                Toast.fire({
                    icon: 'success',
                    title: 'Ingredient Updated successfully'
                })
            }).catch(error => {
                if (error.response?.data) {
                    errors.value = error.response.data.errors
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: error.message
                    })
                }
            }).finally(
                () => isLoading.value = false
            )
    }


    return {
        errors,
        isLoading,
        isFetching,
        ingredient,
        ingredients,
        getIngredient,
        getIngredients,
        ingredientForm,
        storeIngredient,
        updateIngredient,
        paginationLinks,
        paginationMetaData,
    }

}
