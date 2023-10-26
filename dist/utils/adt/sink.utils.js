export function getSink(Ms) {
    const newSink = (value, effects) => ({
        value,
        effects,
    });
    return {
        newSink,
        of: a => newSink(a, Ms.zero()),
        ap: (fab, fa) => newSink(fab.value(fa.value), Ms.alt(fab.effects, () => fa.effects)),
        map: (fa, f) => newSink(f(fa.value), fa.effects),
        chain: (fa, f) => {
            const fb = f(fa.value);
            return newSink(fb.value, Ms.alt(fa.effects, () => fb.effects));
        },
    };
}
