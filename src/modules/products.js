import RealDB from "@/classes/DataBase";
import Toast from "@/classes/Toast";

export default {
    namespaced: true,
    state: {
        product_list: [],
        n_order: 0
    },
    mutations: {
        SET_PRODUCT_LIST( state, value ) {
            state.product_list = value;
        },
        SET_N_ORDER( state, value ) {
            state.n_order = value;
        },
    },
    actions: {
        async fetchProductList( { commit, state } ) {
            if ( state.product_list.length === 0 ) {
                const db = new RealDB( "ListaProductos" );
                await db
                    .fetchData( "nombre1" )
                    .then( async ( res ) => {
                        await commit( "SET_PRODUCT_LIST", res.val() );
                    } )
                    .catch( ( e ) => {
                        Toast.error( e );
                    } );
            }
        },
        async getNOrder( { commit } ) {
            let db = new RealDB( "KardexPedidos/" );
            try {
                await db
                    .limitLast( 1 )
                    .once( "value" )
                    .then( ( res ) => res.val() )
                    .then( ( res ) => {
                        res == null ?
                            commit( "SET_N_ORDER", 1 ) :
                            commit( "SET_N_ORDER", parseInt( Object.keys( res ) ) + 1 );
                    } );
            } catch ( e ) {
                Toast.error( `${e.code} - ${e.message}` );
            }
        }
    },
    getters: {},
    modules: {},
};