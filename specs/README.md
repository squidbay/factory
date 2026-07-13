# specs/ — where tasks become buildable

This folder holds your factory's **execute specs**: one file per task, named for the task (`overhaul-homepage.md`, `add-contact-form.md`). Cowork writes them, you merge them, and a Code session builds from them.

Three rules make the folder work, and they're the same three that make the whole factory work:

1. **One spec per task, named for the task.** A spec that covers two tasks is two specs. The filename is how a fresh session finds its assignment months later.
2. **Complete enough that a fresh Code session builds it with zero questions.** Exact files, exact steps, what done looks like, what's out of scope. If the builder would have to guess, the spec isn't finished — the shape to fill is [`templates/EXECUTE-SPEC.md`](../templates/EXECUTE-SPEC.md).
3. **If chat and the spec disagree, the spec wins — update the spec first.** Chat is where ideas happen; the merged spec is what actually shipped as the plan. Changing your mind is normal and welcome; it just goes through the spec (a small PR you merge), so the plan on record is always the real one. A session ends, a chat scrolls away — the spec is what the next session can re-read identically.

A spec is a **draft until you merge it**. That's not ceremony: it means every plan your factory executes is one you actually read and said yes to, and the folder becomes a complete history of everything you ever decided to build.
