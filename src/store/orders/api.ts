import {ColumnType, Option, Order} from "@Types/orders-types";
import {getInstance} from "@Utils/axios-options";
import {apiEndpoints} from "@Utils/api/api";

const getOption = (i: number = 0, title?: string): Option => ({
  id: Math.random() + "opt_id",
  title: `${(title ? title : "some option")} ${i}`
});

function delay(time: number, callback: () => void) {
  return new Promise(function(resolve) {
    setTimeout(resolve.bind(null, callback), time)
  });
}

const getOptions = (title?: string, fixed?: number): Option[] =>
  Array(fixed ? fixed : (Math.floor(Math.random() * 11))).fill(null)
  .map((_, i) => getOption(i, title));

export const ordersAPI = {
  async getOrders(): Promise<Order[] | never> {
    const {data} = await getInstance().get(apiEndpoints().orders.getOrders);
    const orders = data.orders ?? [];
    return orders.map(item => ({...item, id: `${item.id}`}));
  },
  async getOrderDetails(id: string): Promise<any> {
    const {data} = await getInstance().get(apiEndpoints(id).orders.orderId);
    return data;
  },
  async createOrder(payload: {}): Promise<any> {
    const {data} = await getInstance().post(apiEndpoints().orders.order, payload);
    return {
      complete: data.complete,
      id: `${data.id}`,
      username: data.username,
    }
  },
  async postField(payload = {}): Promise<{ array: Option[], fieldType?: ColumnType } | never> {
    const {data} = await getInstance().post(apiEndpoints().orders.fields, payload);
    if (!data) {
      return {array: []}
    }
    const fieldType = Object.keys(data.fields)[0];
    const res = data.fields[fieldType] ?? {};
    const array = Object.keys(res).map(key => ({ id: key, title: res[key] ?? "" }));
    return {array, fieldType: fieldType as ColumnType};
  },

  async getOptions(title?: string, fixed?: number): Promise<Option[] | never | any> {
    await delay(Math.random() * 100, () => {});
    return getOptions(title, fixed);
  },
}

// TODO:
// height, width, quantity => inputs number

// selected point, align in mm

// mods require corner -> side and corner ->

// based on type, align depends on selected corner, as point zero, x/y only positive params from selected point
