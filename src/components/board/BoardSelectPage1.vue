<template>
    <div>
        게시판목록 이동용 페이지
    </div>
</template>

<script>
import { useRouter } from 'vue-router';


export default {
    setup () {
        const router = useRouter();
        router.push({path:'/boardselect'});

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>