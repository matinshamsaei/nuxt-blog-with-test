export default function (context) {
  console.log("[Middleware] Just Auth");
  if (!context.store.getters.authenticated) {
    context.redirect('/admin/auth')
  }
}
