<template>
    <div class="input-keyword border border-gray-300 pl-[10px] pr-[40px] py-[10px] rounded-xl" :class="styleClass">
        <input type="text" class="w-full" :placeholder="placeholder">
    </div>
</template>

<script>
import { computed, ref } from 'vue';

    export default {
        props: {
            keyword: {
                type: String
            },
            placeholder: {
                type: String
            },
            _width: {
                type: Number,
                default: 1000
            },
        },
        setup(props, { emit }) {
            console.log(props);

            const styleClass = computed(() => {
                const style = {};

                if (props._width) style[`w-[${props._width}px]`] = true;
                
                return style;
            });

            return {
                styleClass,
            }
        },
    };
</script>

<style>
    .input-keyword::after {
        content: '';
        background-image: url('../../assets/img/ico-search.png');
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        width: 26px;
        height: 26px;
        right: 50px;
    }
</style>