export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  return await $fetch(config.public.apiUrl + '/api/category/post');
});
