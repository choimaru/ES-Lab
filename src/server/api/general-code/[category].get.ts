export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const category: string | undefined = event.context.params?.category;
  return await $fetch(config.public.apiUrl + '/api/category/' + category);
});
