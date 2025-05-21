// @ts-nocheck
import { createStore, Store } from "vuex";
import type { InjectionKey } from "vue";

import { WineControlModule } from "./wineControlModule.ts";
import type { WineControl, UserControl, CartModule } from "./types.ts";
import { userControlModule } from "./userControlModule.ts";
import { CartControlModule } from "./cartModule.ts";



export interface State {
  wine: WineControl,
  user: UserControl,
  cart: CartModule

}
export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  modules: {
    wine: WineControlModule,
    user: userControlModule,
    cart: CartControlModule
  },
});

export default store;
