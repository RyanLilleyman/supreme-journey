/**
 * I wrote this method to inject the generated front_session.blade.php with
 * the session logic and necessary parameters.
 */
import SESSION from "./session.mjs";
SESSION.grab_url_arrays_and_timers_then_merge_and_start_session();
