export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    return navigateTo('/home');
  }

  if (to.path === '/employee' || to.path === '/employee/') {
    return navigateTo('/employee/list');
  }
});
