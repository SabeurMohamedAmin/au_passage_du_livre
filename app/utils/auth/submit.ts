// /**
//  * Handles the "Register" form submission (Nuxt 4 + Pinia).
//  *
//  * Flow:
//  * 1) Runs local form validation via `validateAll()` (client-side).
//  *    - If validation fails, the submission is aborted immediately.
//  * 2) Sets `isSubmitting` to true to disable the UI / prevent double submits.
//  * 3) Calls the Pinia auth store action `userAuth.create(form)` which sends the
//  *    registration payload to your backend (e.g. `/api/auth/register`).
//  * 4) On success:
//  *    - Shows a success snackbar for user feedback.
//  *    - Redirects to `/auth/login` after a short delay so the user can read the toast.
//  * 5) On failure:
//  *    - Shows an error snackbar.
//  * 6) Always:
//  *    - Resets `isSubmitting` back to false in `finally`.
//  *
//  * Notes:
//  * - The `catch` block does not display server error details on purpose.
//  *   If you want to show the backend message, catch `(err)` and format it.
//  * - `TOAST_TIME` is the delay (ms) before redirecting after success.
//  */
// async function submitRegister() {
//   if (!validateAll()) return
// 
//   isSubmitting.value = true
//   const TOAST_TIME = 2500
// 
//   try {
//     await userAuth.create(form)
//     setSnack(`Account created for ${form.displayName}`, 'success')
//     setTimeout(() => router.push('/auth/login'), TOAST_TIME)
//   } catch {
//     setSnack(`Failed to create ${form.displayName}`, 'error')
//   } finally {
//     isSubmitting.value = false
//   }
// }