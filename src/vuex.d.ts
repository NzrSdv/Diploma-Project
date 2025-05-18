import Store from 'vuex';

declare module 'vuex' {
    export * from "vuex/types/index.d.ts";
    export * from "vuex/types/helpers.d.ts";
    export * from "vuex/types/logger.d.ts";
    export * from "vuex/types/vue.d.ts";
    interface State {
        currentUser: Object;
        currentPage: Object;
        redWines: Array<Object>;
        
    }

    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}