import { configureQueryClient } from '@graasp/query-client';
const queryConfig = {
  API_HOST: 'http://localhost:3000',
};

const { QueryClientProvider, queryClient, hooks, useMutation } =
  configureQueryClient(queryConfig);

export { QueryClientProvider, queryClient, hooks, useMutation };
