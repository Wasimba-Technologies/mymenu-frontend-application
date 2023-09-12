import { reactive, ref} from "vue";
import router from "../router";


export default function useAddons() {
    const addons = ref([]);
    const addon = ref({});
    const errors = ref({})
    const isLoading = ref(false)
    const isFetching = ref(false)
    const paginationMetaData = ref({})
    const paginationLinks = ref({})
    const addonsURL = ref('api/addons')

    const addonForm = reactive(
        {
            name: '',
            price: '',
            is_incrementing: true,
            type: 'button'
        }
    )

    const getAddons = async (searchName) => {
        isFetching.value = true
        await axios.get(addonsURL.value+'?name='+searchName).then(response =>{
            addons.value = response.data.data
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

    const getAddon = async (id) => {
        isFetching.value = true
        await axios.get('/api/addons/'+id).then(response =>{
            addon.value = response.data.data
        }).catch(error =>{
            Toast.fire({
                icon: 'error',
                title: error.message
            })
        }).finally(
            () => isFetching.value = false
        )
    }


    const storeAddon = async (data) => {
        isLoading.value = true;

        await axios.post('/api/addons', data)
            .then(response => {
                addon.value = response.data.data
                router.push({name: 'addons.index'})
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
    const updateAddon = async (id) => {

        isLoading.value = true

        const data = {...addon}

        await axios.patch('/api/addon/' + id, data)
            .then(response => {
                router.push({name: 'addons.index'})
                Toast.fire({
                    icon: 'success',
                    title: 'Addon Updated successfully'
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
        addon,
        addons,
        getAddon,
        isLoading,
        isFetching,
        getAddons,
        addonForm,
        storeAddon,
        updateAddon,
        paginationLinks,
        paginationMetaData,
    }

}
