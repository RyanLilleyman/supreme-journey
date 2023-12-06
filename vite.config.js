import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/styles/aboutStyle.css",
                "resources/styles/mainStyle.css",
                "resources/styles/navStyle.css",
                "resources/styles/results.css",
                "resources/styles/createDeck.css",
                "resources/styles/references.css",
                "resources/styles/startSessStyle.css",
                "resources/styles/catalogStyle.css",
                "resources/scripts/utility/utility.mjs",
                "resources/scripts/utility/style_change.mjs",
                "resources/scripts/global/globalDecks.mjs",
                "resources/scripts/services/deckServices.mjs",
                "resources/scripts/deck_creation/inject_dom.mjs",
		"resources/scripts/session_handling/session_inject.mjs",
		"resources/scripts/utility/catalog_fill.mjs"
            ],
            refresh: true,
        }),
    ],
});
