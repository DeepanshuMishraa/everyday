# HyperFrames Production

## Contents

- Skill routing
- Project artifacts
- Composition contract
- Timeline craft
- Audio
- Development loop
- Rendering
- Repository hygiene

## Skill routing

Load the installed `hyperframes` entry skill first. Let it route and refresh the correct workflow. Use:

- `product-launch-video` for the end-to-end product workflow;
- `hyperframes-core` for composition structure and determinism;
- `hyperframes-creative` for design and story direction;
- `hyperframes-animation` for motion recipes and transitions;
- `hyperframes-cli` for checks, Studio, snapshots, and rendering;
- `media-use` for sourced media and provider choices;
- `music-to-video` when the beat grid is the editing spine.

Read each selected skill completely and follow its required references before acting.

## Project artifacts

Keep these durable:

- `BRIEF.md`;
- `STORYBOARD.md`;
- `frame.md`;
- `audio_meta.json`;
- beat or audio map;
- `compositions/frames/*.html`;
- assembled `index.html`.

Keep captures, snapshots, caches, virtual environments, and renders separated from authored source.

## Composition contract

- Use one root with `data-composition-id`, dimensions, and duration.
- Make visible timed elements direct-child `.clip` elements.
- Give every clip an id, start, duration, and track.
- Register one paused timeline under the same composition id.
- Put audio and video media at the host root where the runtime can seek it.
- Keep sub-compositions self-contained and mount them from the master.
- Use local assets for final reliability.

Never use wall-clock time, unbounded repeats, `Math.random`, or asynchronous timeline construction.

## Timeline craft

- Prefer `fromTo` over `from`.
- State both endpoints explicitly.
- Use `x`, `y`, `scale`, and `rotation` for spatial animation.
- Avoid tweening layout dimensions and positions.
- Keep ambient motion finite and attached to the seekable timeline.
- Use one driver for causally linked motion.
- Finish a scene’s entrance before its readable hold.
- Let the transition own non-final scene exits.

When an entrance and a slow drift both affect an image, animate the wrapper for entrance and the child for drift.

## Audio

Place the final audio track on the master timeline. Verify exact duration and avoid accidental truncation. Keep music below narration when narration exists.

Generate or source only music the user is permitted to publish. Do not infer licensing from availability.

## Development loop

Use project-pinned CLI wrappers when present.

```bash
npm run check -- --samples 15 --at-transitions
npx hyperframes snapshot --at 2.5,6.2,11.3,15.3,19.2
npm run dev -- --port 3017
```

Inspect every sub-composition at a visible midpoint. A successful check does not prove a frame is attractive; inspect the contact sheet.

Use Studio as the approval surface:

```text
http://localhost:<port>/#project/<project-directory-name>
```

Do not render before approval.

## Rendering

Probe the pinned CLI against the latest release once before final rendering, following the installed CLI skill.

Render from the approved brief rather than a fixed house format:

```bash
npm run render -- \
  --output renders/final.mp4 \
  --fps <approved-fps> \
  --quality high
```

Set canvas dimensions and duration in the composition from the approved aspect ratio and runtime. Verify with `ffprobe` or the bundled audit script. Check actual duration, dimensions, and frame rate, not only the requested flags.

## Repository hygiene

Respect the repository’s policy. Typical local-only patterns:

```gitignore
videos/
**/.hyperframes/
**/.hf-tmp/
**/renders/
*.mp4
*.mov
*.webm
```

Do not add broad ignore rules without user intent. Confirm ignored state with `git check-ignore -v`. If authored video source is intended for version control, ignore only caches and renders.
