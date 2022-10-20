import {Option} from "../../types/orders-types";

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
  async getOptions(title?: string, fixed?: number): Promise<Option[] | never | any> {
    await delay(Math.random() * 100, () => {});
    return getOptions(title, fixed);
  },
}
