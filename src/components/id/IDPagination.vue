<template>
    <div>

    </div>
</template>

<script>
    import IDButton from '@/components/id/IDButton.vue';

    export default {
        components: {
            IDButton  
        },
        props: {
            pageNo: {
                type: int,
                required: true,
            },
            recordCount: {
                type: int,
                required: true,
            },
            totalCount: {
                type: int,
                required: true,
            }
        },
        setup(props, { emit }) {
        },
    };
</script>