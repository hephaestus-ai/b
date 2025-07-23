{{/*

    # Why Hugo Sucks

    ### The Philosophy:

    1.  **Templates that Don't Nest Safely:** Instead of elegant composition (e.g., nesting smaller shortcodes for specific
        elements), we are compelled to cram our layout and content variations
        for different major sections into a single file. Why? Because nested shortcodes in Hugo are fundamentally unreliable.
        They lack reliable context passing, mangle Markdown processing, and can produce unpredictable HTML. Getting it to
		seemingly work is not too hard, but you run into a hundred little edge cases that break, making it not worth it.
		The Hugo philosophy is probably that markdown is linear anyway. And if you want components, use something else.
		But other site generators hit a better balance here, offering well designed escape hatches when you need to
		go beyond the structure of markdown.

    2.  **The "Layout" Trap:** The `layout` parameter is the overlord here. It dictates the entire
        structural arrangement via massive, repetitive `{{ if eq $layout "..." }}` switch. You can plug
		content into the template, but all _style and structure need be highly opinionated and coupled_ (core insight). 
		Of course CSS alone cannot reliably reorder or wrap elements differently across vastly distinct structural needs
        without an explosion of unmanageable classes or even more terrifyingly complex selectors. You cannot just
        "flexbox it" when the HTML element order itself needs to change. So what happens is, because the pieces
		do not compose flexibly, you try to make them internally "smart" (which of course makes them even less friendly
		to work with if you're a dev) so you can offer the user some meaningful and painless choice "out of the box".

    3.  **Opinionated Styling Coupled to Layout:** You can forget granular styling parameters for colors,
        fonts, or padding within the shortcode call itself. That would mean an unholy number of arguments. Instead,
        styling is baked into the CSS classes associated with each `layout`. Little flexibility - it's a forced
        simplification because Hugo's templating isn't designed for complex, dynamic style injection.

    4.  **Robustness to Absence (Mandatory Defensive Coding):** Every single content parameter (`headline`, `image_url`, etc.)
        must be wrapped in `{{ with .Get "param_name" }}`. Why? Because Hugo offers no compile-time checks or
        sane default handling, and trying to access a non-existent parameter will silently fail or, worse,
        inject garbage. So you need to add defensive logic in case you don't want to pass certain content to the template.

    ### Why Go Templating & Hugo Shortcodes Are An Absolute Awful Experience:

    * **The Unholy `.Inner`:** The shortcode's `.Inner` content is a chaotic black box. Will it be raw Markdown?
        Partially rendered HTML? A Frankenstein's monster of both? Who knows! It's context-dependent and unreliable.
        You put a single line of Markdown in an inner shortcode, and Hugo often refuses to wrap it in a `<p>` tag,
        treating it as an inline fragment. Add a `<div>` around it, and suddenly the Markdown is ignored. It defies
        all logic and consistency.

    * **Lack of Component Paradigm:** This is the core sin. Hugo shortcodes are string processors, not true components.
        There's no concept of `props` passing like in React, `slots` like in Vue, or even clear argument passing like in
        Nunjucks macros. This fundamental architectural choice forces developers into brittle, `if/else` hellscapes
        just to achieve basic UI modularity.

    * **Go Template Verbosity & Boilerplate:** Every single parameter access requires `.Get`, chaining `| default`,
        and `safeHTML`/`safeHTMLAttr`/`safeCSS` for safety (which, ironically, can break Markdown rendering).
        The result is verbose, unreadable template code that's prone to typos and lacks any semblance of modern
        DX (Developer Experience). No strong typing, no decent IDE auto-completion for template variables, debugging
        is a joke, and there are far too many {{{{{braces}}}}}

    * **Debugging is a Nightmare:** When something breaks, good luck tracing it. Errors are often cryptic,
        and the intermediate rendering steps are opaque. You're left guessing which magical incantation of `safe*`
        functions or `with` blocks will prevent the next inevitable rendering bug.

    * **The "Hugo Way" (Special Snowflake Winter ~~Wonderland~~ Hell):** Some say that this complexity is
        the price of speed or the result of "content-first" design. In reality, it's a reminder of
        a templating system that simply isn't designed for the complex, interactive UI _components_ that modern
        web development demands. The Hugo team could make the shortcodes more "component-like" with reliable
		nesting, but choose to leave them brittle and unreliable. 3/10 do not recommend.

    So, do not judge me for the tech-debt in this repo. It works. It's ugly, it's bloated, it has special snowflakes,
	and it's a reminder of the compromises we make to squeeze a modern web experience out of Hugo's templating engine.

*/}}