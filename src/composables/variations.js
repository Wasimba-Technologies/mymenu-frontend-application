import { reactive, ref} from "vue";
import router from "../router";


export default function useVariations() {
    const variations = ref([]);
    const variation = ref({});
    const errors = ref({})
    const isLoading = ref(false)
    const isFetching = ref(false)
    const paginationMetaData = ref({})
    const paginationLinks = ref({})
    const variationsURL = ref('api/variations')

    const variationForm = reactive(
        {
            name: '',
        }
    )

    const getVariations = async (searchName) => {
        isFetching.value = true
        searchName = searchName ? searchName : ''
        await axios.get(variationsURL.value+'?name='+searchName).then(response =>{
            variations.value = response.data.data

            //TODO: Uncomment this to allow pagination.
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

    const getVariation = async (id) => {
        isFetching.value = true
        await axios.get('/api/variations/'+id).then(response =>{
            variation.value = response.data.data
        }).catch(error =>{
            Toast.fire({
                icon: 'error',
                title: error.message
            })
        }).finally(
            () => isFetching.value = false
        )
    }


    const storeVariation = async (data) => {
        isLoading.value = true;

        await axios.post('/api/variations', data)
            .then(response => {
                variation.value = response.data.data
                router.push({name: 'variations.index'})
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
    const updateVariation = async (id) => {

        isLoading.value = true

        const data = {...variation}

        await axios.patch('/api/variations/' + id, data)
            .then(response => {
                router.push({name: 'variations.index'})
                Toast.fire({
                    icon: 'success',
                    title: 'Variation Updated successfully'
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
        variation,
        variations,
        getVariation,
        getVariations,
        variationForm,
        storeVariation,
        updateVariation,
        paginationLinks,
        paginationMetaData,
    }

}