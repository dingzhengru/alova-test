import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';

const alovaInstance = createAlova({
  // baseURL: 'https://api.publicapis.org',
  // baseURL: 'https://pwaapi.bacctest.com',
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
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
      // const json = await response.json();
      // if (json.code !== 200) {
      //   // This request will throw an error when an error is thrown or a Promise instance in the reject state is returned
      //   throw new Error(json.message);
      // }

      // The parsed response data will be passed to the transformData hook function of the method instance, and these functions will be explained later
      // return json;
      return response;
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
