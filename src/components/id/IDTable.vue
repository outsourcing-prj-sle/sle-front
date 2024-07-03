<template>
    <div class="w-full overflow-x-scroll">
        <table class="border border-collapse border-gray-300 w-full max-md:text-[14px]">
            <thead>
            <tr class="bg-gray-300">
                <th class="border border-collapse border-gray-500 p-[10px]"><input type="checkbox"></th>
                <th class="border border-collapse border-gray-500 p-[10px] whitespace-nowrap" v-for="item in headers" :key="item">{{ item }}</th>
            </tr>
            </thead>
            <tbody>
                <tr class="border border-collapse border-gray-500" v-for="body in bodies" :key="body">
                <td class="border border-collapse border-gray-500 p-[10px] whitespace-nowrap"><input type="checkbox"></td>
                <td class="border border-collapse border-gray-500 p-[10px] whitespace-nowrap"><p>{{ body.nttNo }}</p></td>
                <td class="border border-collapse border-gray-500 p-[10px] whitespace-nowrap"><p>{{ body.pollNm }}</p></td>
                <td class="border border-collapse border-gray-500 p-[10px] text-ellipsis overflow-hidden whitespace-nowrap break-all" :class="{ 'text-gray-400' : !body.pollTarget}">
                    <p>{{ body.pollTarget || '관리>설정을 해주세요.' }}</p>
                </td>
                <td class="border border-collapse border-gray-500 p-[10px] whitespace-nowrap" :class="{ 'text-gray-400' : !body.date }">
                    <p>{{ body.date || '관리>설정을 해주세요.' }}</p>
                </td>
                <td class="border border-collapse border-gray-500 p-[10px] whitespace-nowrap">
                    <IDButton v-if="body.dtl" class="rounded-xl"
                        :text="'상세보기'" 
                        :isWhite="false" 
                        :_width="84" 
                    />
                    <p v-if="!body.dtl">-</p>
                </td>
                <td class="border border-collapse border-gray-500 p-[10px] min-w-[60px]">
                    <picture class="flex items-center justify-center">
                        <img class="w-[28px] h-[28px] cursor-pointer" src="@/assets/img/ico-gear.png" alt="">
                    </picture>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import IDButton from '@/components/id/IDButton.vue';

    export default {
        components: {
            IDButton
        },
        props: {
            headers: {
                type: Array,
                required: true,
            },
            bodies: {
                type: Array,
                required: true,
            },
        },
        setup(props, { emit }) {
        },
    };
</script>