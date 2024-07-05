<template>
    <div class="flex justify-center items-center gap-[10px] w-full">
        <IDButton class="hover:bg-[#2F80ED] hover:text-white"
        :text="'<<'"
        :isGray="true"
        />
        <IDButton class="hover:bg-[#2F80ED] hover:text-white"
        :text="'<'"
        :isGray="true"
        />
        <IDButton v-for="i in range" :key="i" class="hover:bg-[#2F80ED] hover:text-white"
        :text="i" 
        :isGray= "i !== pageNo"
        />
        <IDButton class="hover:bg-[#2F80ED] hover:text-white"
        :text="'>'"
        :isGray="true"
        />
        <IDButton class="hover:bg-[#2F80ED] hover:text-white"
        :text="'>>'"
        :isGray="true"
        />
    </div>
</template>

<script>
    import IDButton from '@/components/id/IDButton.vue';

    export default {
        components: {
            IDButton,
        },
        props: {
            pageNo: {
                type: Number,
                required: true,
            },
            recordCount: {
                type: Number,
                required: true,
            },
            totalCount: {
                type: Number,
                required: true,
            }
        },
        computed: {
            range() {
                let start = Number.parseInt((this.pageNo - 1) / this.recordCount) * this.recordCount + 1;
                let end = (start + this.recordCount - 1) < Number.parseInt((this.totalCount - 1) / this.recordCount) ? start + this.recordCount - 1 : Number.parseInt((this.totalCount - 1) / this.recordCount) + 1;
                const array = [];

                for (let i = start; i <= end; i++) {
                    array.push(i);
                }
                return array;
            }
        },
        setup(props, { emit }) {
            console.log(props);
        },
    };
</script>