import alovaInstance from './instance';

export const apiEntries = async () => {
  const res = await alovaInstance.Get('https://api.publicapis.org/entries').send();
  return res;
};
export const apiGetDataVersionList = async () => {
  const res = await alovaInstance.Get('https://pwaapi.bacctest.com/webCache/GetDataVersionList').send();
  return res;
};
//* mock
export const apiGetTodoList = async () => {
  const res = await alovaInstance.Get('/todo').send();
  return res;
};
