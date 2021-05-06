<template>
    <section class="footer has-background-white">
        <p class="has-text-grey">
            &copy; {{getYear()}} Admin ZEYMA SAS. V 1.0.0
        </p>
    </section>
</template>
<script>
import moment from 'moment'
export default {
    name: 'TheFooter',
    methods: {
        getYear() {
            moment.locale('es-mx');        
            return moment().format('YYYY')
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer{
    font-size: 10px;
    letter-spacing: .3px;
    padding: 15px 25px;
    background-color: #fafbfc;
    color: #637388;
    border-top: 1px solid rgba(72, 94, 144, 0.16);
    text-transform: uppercase;
}
</style>