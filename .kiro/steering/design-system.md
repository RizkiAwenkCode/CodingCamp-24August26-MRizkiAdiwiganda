# Design System

## Source

`design.md` in the workspace root is the authoritative Daylight brand specification.
Always consult it before making visual changes.

## Visual direction

Cardless editorial interface. Hardware-panel aesthetic on desktop (full-viewport, no page scroll).
Bold lines. High saturation. Clear typography hierarchy. Flat visual language.

## Colour tokens

| Token | Value | Use |
|---|---|---|
| `--orange` | `#FF6A00` | Primary accent, CTAs, active states |
| `--beige` | `#FDF3E3` | Page background surface |
| `--beige-1` | `#F5E8CC` | Secondary surface (inputs, selects) |
| `--beige-2` | `#EDD9B0` | Hover surface |
| `--dark-beige` | `#C8AF8A` | Control borders |
| `--near-black` | `#0E0E0E` | Primary text, dividers, active fills |
| `--grey` | `#7A736A` | Muted labels, placeholders |
| `--clr-divider` | `var(--near-black)` | All structural lines |
| `--clr-danger` | `#CC1500` | Delete, error states |
| `--clr-success` | `#0A6B35` | Done, success states |

## Dividers

`--divider: 2px solid var(--clr-divider)` — bold near-black lines.
Used for section borders, column separators, row hairlines, input row outlines.
Never use beige/light lines for structure.

## Typography

| Role | Font | Size | Weight |
|---|---|---|---|
| Display headlines | Playfair Display | `clamp(2rem, 3.2vw, 2.8rem)+` | 700 |
| Clock | Playfair Display | `clamp(2.6rem, 4.5vw, 4rem)` | 700 |
| Timer display | Playfair Display | `3rem` | 700 |
| Body / task text | DM Sans | `1rem` | 500 |
| UI buttons | DM Sans | `0.875–0.95rem` | 600–700 |
| Mono eyebrows / labels | DM Mono | `0.72–0.8rem` | 500–600 |
| Mono badges / metadata | DM Mono | `0.65–0.74rem` | 500–600 |

All mono labels are `text-transform: uppercase` with `letter-spacing: 0.1em+`.
Section titles (`.card-title`) are `near-black`, not grey.
Modal labels are `near-black`, not grey.

## Layout

- Desktop: full-viewport grid, no scroll — `html/body { overflow: hidden; height: 100%; }`
- Dashboard grid: greeting strip (fixed header row) + 3-column main grid (timer | todo | links)
- Column widths: timer `300px`, links `280px`, todo `1fr`
- All three columns stretch to full remaining viewport height
- Responsive exits hardware mode at `≤960px` (restores scroll)

## Spacing tokens

`--space-xs: 0.5rem` · `--space-sm: 1rem` · `--space-md: 1.75rem` · `--space-lg: 3rem`

## Radii

Radii only on interactive controls, never layout containers.
`--radius-xs: 2px` · `--radius-sm: 4px` · `--radius-md: 6px`

## Do not

- Add card backgrounds, rounded containers, or drop shadows to layout sections
- Use 1px hairlines or beige-coloured dividers
- Reduce font sizes below the values listed above
- Use grey for section titles or modal labels
- Add new font families
