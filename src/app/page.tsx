import { redirect } from "next/navigation";

/**
 * This page is used to redirect the user to the landing page as it is the
 * default page of the app.
 *
 * If you want to edit the landing page, you can do so in the `(main)/landing`
 * folder. The landing page is within the `(main)` folder so that it inherits
 * from the `(main)/layout.tsx` file (which contains the header and footer).
 *
 * If you don't want this page to redirect, you can remove the `redirect`
 * function and the page will display the landing page as the main page of the
 * app without the header and footer.
 *
 * @returns A redirect to the landing page.
 */
export default function Page() {
  redirect("/landing");
}
