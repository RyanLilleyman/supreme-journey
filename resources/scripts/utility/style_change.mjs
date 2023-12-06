import DECK_SERVICES from "../services/deckServices.mjs";
import { UtilityCenter } from "./utility.mjs";
import SESSION from "../session_handling/session.mjs";
// UtilityCenter.bindArrowStyleChange();
UtilityCenter.fill_Deck();
UtilityCenter.onHomeDelete();
UtilityCenter.bindSearch();
SESSION.bind_session_and_round_spans();
SESSION.bindRenders();

// UtilityCenter.set_uri_from_env("get-env-variable");
