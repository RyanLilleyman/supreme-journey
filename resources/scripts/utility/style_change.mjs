/**
 * I wrote this simple injection script.
 */
import { UtilityCenter } from "./utility.mjs";
import SESSION from "../session_handling/session.mjs";
// UtilityCenter.bindArrowStyleChange();
// UtilityCenter.set_uri_from_env("get-env-variable");

UtilityCenter.fill_Deck();
UtilityCenter.onHomeDelete();
UtilityCenter.bindSearch();
UtilityCenter.bindEdit();
SESSION.bind_session_and_round_spans();
SESSION.bindRenders();
