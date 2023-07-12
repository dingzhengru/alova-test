import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
import { createAlovaMockAdapter } from '@alova/mock';
import mockGroup1 from './mock';

//* mock
const mockAdapter = createAlovaMockAdapter([mockGroup1 /** ... */], {
  // 全局控制是否启用mock接口，默认为true
  enable: true,

  // 非模拟请求适配器，用于未匹配mock接口时发送请求
  httpAdapter: GlobalFetch(),

  // mock接口响应延迟，单位毫秒
  delay: 1000,

  // 是否打印mock接口请求信息
  mockRequestLogger: true,

  // 模拟接口回调，data为返回的模拟数据，你可以用它构造任何你想要的对象返回给alova
  // 以下为默认的回调函数，它适用于使用GlobalFetch请求适配器
  // 如果你使用的是其他请求适配器，在模拟接口回调中请自定义返回适合适配器的数据结构
  // onMockResponse: data => {
  //   console.log('onMockResponse');
  //   console.log(data);
  //   return new Response(JSON.stringify(data));
  // },
});

const alovaInstance = createAlova({
  // baseURL: 'https://api.publicapis.org',
  // baseURL: 'https://pwaapi.bacctest.com',
  statesHook: VueHook,

  // requestAdapter: GlobalFetch(),
  // 使用mock请求适配器，如果需要切换适配器，请看下面的实践建议
  requestAdapter: mockAdapter,

  //* 緩存模式 https://alova.js.org/zh-CN/learning/response-cache
  // localCache: null,
  localCache: {
    // 统一设置GET的缓存模式
    GET: {
      // 设置缓存模式为内存模式
      mode: 'memory',

      // 单位为毫秒
      // 当设置为`Infinity`，表示数据永不过期，设置为0或负数时表示不缓存
      expire: 60 * 10 * 1000,
    },
    // 统一设置HEAD请求的缓存模式
    HEAD: 60 * 10 * 1000,
  },

  //* 是否於 console 顯示 cache log https://alova.js.org/zh-CN/next-step/cache-log
  cacheLogger: process.env.NODE_ENV === 'development',
  // cacheLogger: false,

  beforeRequest(method) {
    console.log('beforeRequest method');
    console.log(method);

    // method.data = 'data';
    // method.config.params = 'params';
    // method.config.headers.Authorization = 'token';
  },
  responded: {
    // request success interceptor
    // When using the GlobalFetch request adapter, the first parameter receives the Response object
    // The second parameter is the method instance of the current request, you can use it to synchronize the configuration information before and after the request
    onSuccess: async (response, method) => {
      console.log('onSuccess response');
      console.log(response);
      console.log('onSuccess method');
      console.log(method);

      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      // if (json.code !== 200) {
      //   // This request will throw an error when an error is thrown or a Promise instance in the reject state is returned
      //   throw new Error(json.message);
      // }

      // The parsed response data will be passed to the transformData hook function of the method instance, and these functions will be explained later
      return json;
      // return response;
    },

    // Interceptor for request failure
    // This interceptor will be entered when the request is wrong.
    // The second parameter is the method instance of the current request, you can use it to synchronize the configuration information before and after the request
    onError: (err, method) => {
      console.log('onError err.message');
      console.error(err.message);
      console.log('onError method');
      console.error(method);
    },
  },
});

export default alovaInstance;
