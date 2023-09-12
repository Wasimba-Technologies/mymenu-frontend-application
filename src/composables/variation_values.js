import { reactive, ref} from "vue";
import router from "../router";


export default function useVariationValues() {
    const variationValues = ref([]);
    const variationValue = ref({});
    const errors = ref({})
    const isLoading = ref(false)
    const isFetching = ref(false)
    const paginationMetaData = ref({})
    const paginationLinks = ref({})
    const ingredientsURL = ref('api/variation_values')

    const variationValueForm = reactive(
        {
            name: '',
            price: '',
            is_incrementing: true,
            type: 'button',
            variation_id: ''
        }
    )

    const getVariationValues = async (searchName) => {
        isFetching.value = true
        await axios.get(ingredientsURL.value+'?name='+searchName).then(response =>{
            variationValues.value = response.data
            // variationValues.value = response.data.data
            // paginationMetaData.value = response.data.meta
            // paginationLinks.value = response.data.links
        }).catch(error =>{
            Toast.fire({
                icon: 'error',
                title: error.message
            })
        }).finally(
            () => isFetching.value = false
        )
    }

    const getVariationValue = async (id) => {
        isFetching.value = true
        await axios.get('/api/variation_values/'+id).then(response =>{
            variationValue.value = response.data.data
        }).catch(error =>{
            Toast.fire({
                icon: 'error',
                title: error.message
            })
        }).finally(
            () => isFetching.value = false
        )
    }


    const storeVariationValue= async (data) => {
        isLoading.value = true;

        await axios.post('/api/variation_values', data)
            .then(response => {
                variationValue.value = response.data.data
                router.push({name: 'variation_values.index'})
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
    const updateVariationValue = async (id) => {

        isLoading.value = true

        const data = {...variationValue}

        await axios.patch('/api/variation_values/' + id, data)
            .then(response => {
                router.push({name: 'variation_values.index'})
                Toast.fire({
                    icon: 'success',
                    title: 'Value Updated successfully'
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
        variationValue,
        variationValues,
        paginationLinks,
        getVariationValue,
        variationValueForm,
        getVariationValues,
        storeVariationValue,
        updateVariationValue,
        paginationMetaData,
    }

}