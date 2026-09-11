# Daylight Website Design Specification

## 1. Project Overview

### Project
Daylight — Home Energy / Solar + Battery Website

### Reference
https://godaylight.com/

### Design Character
A premium climate-tech / energy website combining:
- Editorial minimalism
- Warm natural colors
- Technical data visualization
- Large expressive typography
- Photography-driven storytelling
- Subtle motion
- Product-led conversion

Daylight positions itself as a new kind of energy company providing solar, battery backup, energy management, and a subscription-based home energy experience. The homepage emphasizes $0 upfront installation, lower monthly electricity costs, outage protection, and control through the Daylight app. citeturn0search2turn0view0

---

# 2. Core UX Objective

The primary conversion is:

```text
Visitor
  ↓
Understand the value
  ↓
Enter home address
  ↓
Check qualification
  ↓
Get estimate
  ↓
Subscribe / Install
```

The website should answer three questions immediately:

1. How can Daylight lower my energy bill?
2. Will my home stay powered during an outage?
3. What does it cost and how do I know if my home qualifies?

The reference homepage places an address input directly in the hero and repeatedly drives users toward qualification/estimate CTAs. citeturn0view0

---

# 3. Brand Personality

## Desired Attributes

- Human
- Optimistic
- Warm
- Modern
- Confident
- Intelligent
- Environmental
- Premium
- Technical without feeling overly corporate

## Avoid

- Generic green environmental branding
- Typical utility-company aesthetics
- Overly futuristic sci-fi interfaces
- Excessive gradients
- Heavy dashboard layouts
- Generic stock photography
- Cold corporate blue palettes

The brand should feel like:

```text
Climate Tech
+
Premium Consumer Brand
+
Editorial Magazine
+
Energy Infrastructure
```

---

# 4. Visual Language

The visual system is built around the idea of sunlight moving through the visible spectrum.

The official Daylight brand system defines orange as the primary brand color, beige as the primary surface, and a spectrum-inspired gradient as a motion element. citeturn0search1

Primary visual characteristics:

- Warm beige backgrounds
- Near-black typography
- Strong orange accents
- Occasional yellow, blue, and purple
- Large editorial headlines
- Generous whitespace
- Full-bleed photography
- Data/UI overlays
- Thin technical labels
- Rounded but restrained UI

---

# 5. Color System

## Primary

### Daylight Orange

```text
HEX: #F66F00
RGB: 246, 111, 0
```

Primary CTA, active states, highlights, emphasis.

### Daylight Beige

```text
HEX: #FFF7E9
RGB: 255, 247, 233
```

Primary page surface.

### Beige 1

```text
HEX: #F7EED9
```

### Beige 2

```text
HEX: #F0E5CF
```

### Dark Beige

```text
HEX: #DACAB6
```

### Near Black

```text
HEX: #111111
```

Primary typography and dark UI.

### Grey

```text
HEX: #A09B93
```

Secondary text and metadata.

## Secondary Spectrum

```text
Yellow:      #FCCC3C
Brown:       #4C2806
Purple:      #C8B0FF
Dark Purple: #321F61
Light Blue:  #BED5FF
Dark Blue:   #1D3E86
White:       #FFFFFF
```

These values are based on Daylight's published brand system. citeturn0search1

---

# 6. Typography

The official brand kit uses three typefaces with clearly separated roles. citeturn0search1

## Display

```text
Feature Deck
```

Use for:
- Hero headlines
- Major section headings
- Pull quotes
- High-impact statements

Characteristics:
- Large
- Editorial
- Lightweight
- Tight tracking
- High visual impact

Recommended scale:

```text
Hero: 64–96px
Section: 40–56px
Line height: ~95%
Letter spacing: ~-2%
```

## Body / UI

```text
Aeonik Pro
```

Use for:
- Body copy
- Buttons
- Titles
- Subtitles
- Navigation
- Supporting statements

Recommended:

```text
Body: 15–17px
Title: 24–32px
Line height: ~140% body
```

## Mono / Labels

```text
ABC Social Mono
```

Use only for:
- Eyebrows
- Data
- Technical labels
- Captions
- Status
- Metadata

Rules:
- Uppercase
- Letter spacing
- 12px or 16px
- Never use for long body copy

---

# 7. Layout Philosophy

The site should not use a conventional corporate grid everywhere.

Instead combine:

```text
Editorial Grid
+
Full-Bleed Image
+
Technical Data Overlay
+
Asymmetric Composition
```

Recommended maximum content width:

```text
1280px–1440px
```

Large desktop horizontal padding:

```text
48px–80px
```

Mobile:

```text
20px
```

Use large vertical spacing:

```text
96px
128px
160px
```

Sections should feel visually independent.

---

# 8. Header

## Desktop

Suggested structure:

```text
[Daylight Logo]

Product
Partners
About
Brand

                         Get started
```

The current website uses Product, Partners, About, and Brand as its primary navigation groups, with a strong Get started CTA. citeturn0view0

## Header Behavior

At top:
- Transparent or beige background
- Dark logo
- Minimal navigation

On scroll:
- Sticky header
- Beige surface
- Subtle border
- CTA remains visible

---

# 9. Homepage Hero

## Primary Message

```text
Power your home
for less
```

Supporting message:

```text
Battery backup and solar.
$0 upfront.
A lower electric bill every month.
```

The current homepage uses this exact value hierarchy and places an address field directly below the headline. citeturn0view0

## Hero Structure

```text
--------------------------------------------------
Navigation

Power you control

POWER YOUR HOME
FOR LESS

Battery backup and solar.
$0 upfront. A lower electric bill every month.

[ Enter your address ]

              [Energy / Home Visualization]
--------------------------------------------------
```

## Hero Visual

Use a large residential architectural image or atmospheric home-energy composition.

Overlay:
- kWh generated
- Backup stored
- Temperature
- Energy status
- Battery level

This creates the visual language of:

```text
Beautiful Home
+
Real-Time Energy
```

---

# 10. Hero Interaction

The address input is the main conversion mechanism.

### Input

```text
Placeholder:
Enter your address
```

### Behavior

```text
Address entered
↓
Autocomplete
↓
Qualification check
↓
Estimate flow
```

Do not force users to navigate to another page before understanding the value.

---

# 11. Benefit Trio

Immediately after hero, use three large visual benefit blocks.

## Save

```text
SAVE

Cut your electric
bill by 20% or more
```

## Protect

```text
PROTECT

Keep the lights
on with battery backup
```

## Control

```text
CONTROL

Track it all in the
Daylight app
```

The current homepage uses this exact three-part conceptual hierarchy: save, protect, and control. citeturn0view0

---

# 12. Benefit Card Design

Each block should contain:

```text
[Mono Eyebrow]

Large headline

Short supporting statement

[Large editorial image / UI]
```

Do not make these look like standard SaaS cards.

Prefer:

```text
Image
+
Text
+
Large whitespace
```

over:

```text
Icon
Title
Paragraph
Card
```

---

# 13. "How Daylight Works"

## Heading

```text
A new way to power
your home
```

Supporting copy:

```text
With Daylight, your home generates and stores
power with solar and battery backup.
```

The current site describes Daylight as a complete home energy system combining solar, battery storage, installation, outage protection, and energy pricing. citeturn0view0

---

# 14. Process Section

Use a three-step horizontal narrative.

```text
01
SUBSCRIBE TO DAYLIGHT

A lower bill every month
```

↓

```text
02
WE INSTALL

Daylight handles everything
```

↓

```text
03
POWER ON

Power you control
```

This structure is directly reflected in the current homepage. citeturn0view0

---

# 15. Process UI

Each step should have:

```text
Step Number
↓
Eyebrow
↓
Large Title
↓
Short Description
↓
Product / App Visualization
```

Desktop:

```text
01             02             03
Subscribe      Install        Power On
```

Mobile:

```text
01
Subscribe
   ↓
02
Install
   ↓
03
Power On
```

---

# 16. Product Visualization

Use UI overlays to make energy data feel tangible.

Example:

```text
Energy Earnings

0.0 kWh
0.0%

Sun Mon Tue Wed Thu Fri Sat
```

Additional widgets:

```text
kWh generated
8.2 – 9.5 kWh

Backup stored
68%

Temperature
68°F
```

These should feel like real product UI rather than decorative infographics.

---

# 17. Why Daylight

Use a transition section that challenges the traditional energy model.

### Eyebrow

```text
WHY DAYLIGHT
```

### Heading

```text
Today's grid was built
for yesterday's world
```

Then introduce the problem.

The homepage frames the traditional grid as outdated and highlights increasing electricity costs and outage risk. citeturn0view0

---

# 18. Problem Section

Use large statistics.

Example:

```text
Electricity costs
are skyrocketing
```

```text
Blackouts are
10X more common
than in 1980
```

```text
More than 50%
of U.S. homes are
at risk of outages
```

Use these as editorial data blocks.

Important:
- Verify statistics before production.
- Add source references in the actual production website.
- Never present unverified numbers as current facts.

---

# 19. Decentralized Energy Network

## Heading

```text
Every home makes
the network stronger
```

Supporting message:

```text
Daylight homes generate,
store, and share power locally.
```

The website presents the Daylight network as a decentralized collection of homes generating, storing, and sharing energy. citeturn0view0

---

# 20. Network Visualization

Create a visual network:

```text
              [Home]
                 │
       ┌─────────┼─────────┐
       ↓         ↓         ↓
    [Home]    [Home]    [Home]
       │         │         │
       └─────────┼─────────┘
                 ↓
            [Energy Grid]
```

Visual style:
- Thin lines
- Orange energy pulses
- Beige background
- Minimal nodes
- Subtle animation

---

# 21. Final CTA

Use a dramatic closing section.

```text
STEP INTO DAYLIGHT

The future is bright

Ready to take control
of your power?

[ See if you qualify ]
```

The current site uses "Step into Daylight" and "The future is bright" as its closing conversion narrative. citeturn0view0

---

# 22. CTA Strategy

Primary CTA:

```text
See if you qualify
```

Secondary:

```text
Get your estimate
```

Generic navigation CTA:

```text
Get started
```

CTA hierarchy:

```text
Orange:
Primary conversion

Black:
Primary navigation action

Beige:
Secondary action

Spectrum:
Campaign / promotional action
```

---

# 23. Product Page

The Product page expands the solar + battery system into a detailed product narrative. The reference product page describes solar panels, battery backup, the Daylight app, network participation, installation, financing comparison, and FAQs. citeturn0search3

Structure:

```text
Header
↓
Hero
↓
How Daylight Works
↓
Solar
↓
Battery
↓
App
↓
Daylight Network
↓
Daylight vs Cash Purchase
↓
Getting Started
↓
FAQ
↓
Testimonials
↓
Qualification Form
↓
Footer
```

---

# 24. Product Hero

Headline:

```text
Your home's
new energy system
```

Supporting:

```text
Solar + battery
```

Visual:
- Matte black solar panels
- Contemporary home
- Battery unit
- Energy overlay

CTA:
- See if you qualify
- Get estimate

---

# 25. System Components

Use three major components.

## Solar

```text
High-efficiency panels
```

Key information:
- Tier-1 panels
- Home-specific sizing
- Maintenance
- Warranty
- Weather-resistant installation

## Battery

```text
Backup power, included
```

Key information:
- Automatic outage protection
- Stored energy
- Weather awareness
- Warranty

## App

```text
Monitor everything
```

Key information:
- Production
- Storage
- Usage
- Savings
- Outage alerts
- Weather tracking

These component categories reflect the current Product page. citeturn0search3

---

# 26. Comparison Section

Use a clear comparison table.

```text
                CASH              DAYLIGHT

Upfront Cost    Required          $0
Battery         Optional          Included
Maintenance    Customer          Daylight
Ownership      Customer          Buy-out option
Monitoring     Fragmented         Integrated
Transfer       Depends            Easy transfer
```

The current Product page uses a Cash vs Daylight comparison to explain the subscription model. citeturn0search3

---

# 27. Getting Started

Three-step process:

```text
01 — SCOPE

Qualify
Customize
Logistics
```

```text
02 — INSTALL

Full-service setup
Permits
Inspection
Activation
```

```text
03 — POWER ON

Monitor
Save
Stay protected
```

The reference Product page describes the installation journey as Scope → Install → Power On and notes a typical 12–14 week timeline from contract to activation. citeturn0search3

---

# 28. FAQ

Use accordion UI.

Questions should cover:

- Installation duration
- Outage behavior
- Home sale / transfer
- Early payoff
- Battery lifespan
- Maintenance
- Roof replacement

Example:

```text
01  How long does installation take?                 +
02  What happens during an outage?                   +
03  What if I sell my home?                          +
04  Can I pay off the system early?                  +
05  How long does the battery last?                  +
06  Who handles maintenance?                         +
```

---

# 29. Testimonials

Use editorial testimonial cards.

Example structure:

```text
[Portrait]

"Daylight was the single-best thing
we could have done for our home."

Dan H.
Norwood, MA
```

Use:
- Real homeowner photography
- Large quote typography
- Minimal metadata

The Product page currently uses homeowner testimonials with names and locations. citeturn0search3

---

# 30. Qualification Form

Use a multi-step form rather than a long single-page form.

### Step 1

```text
First name
Last name
Email
Phone
```

### Step 2

```text
Street address
City
State
ZIP
```

Current Daylight qualification flow requests these homeowner and address details. citeturn0search3

---

# 31. Navigation Architecture

```text
HOME
│
├── PRODUCT
│   ├── Solar + Battery
│   ├── How It Works
│   ├── Daylight App
│   └── Daylight Network
│
├── PARTNERS
│   ├── Installers
│   ├── Energy Network
│   └── Business Partners
│
├── ABOUT
│   ├── Company
│   ├── Careers
│   ├── Blog
│   └── Support
│
├── BRAND
│   ├── Logo
│   ├── Colors
│   ├── Typography
│   ├── Photography
│   └── Motion
│
└── GET STARTED
    └── Qualification / Estimate
```

The public navigation currently exposes Product, Partners, About, Brand, Blog, Careers, Terms, Privacy, State Licenses, and Support. citeturn0view0

---

# 32. Component Library

## Primary Button

```text
Background: #F66F00
Text: #FFFFFF
Height: 50px
Padding: 0 24px
Radius: 4px
Font: Aeonik Pro Medium
Font Size: 14px
```

## Secondary Button

```text
Background: #FFF7E9
Text: #111111
Height: 50px
Padding: 0 24px
Radius: 4px
```

## Dark Button

```text
Background: #111111
Text: #FFFFFF
Height: 50px
Radius: 4px
```

## Accent Variants

```text
Yellow: #FCCC3C
Blue: #1D3E86
Purple: #321F61
```

The official brand kit specifies 50px buttons with 4px radius and color variants for different contexts. citeturn0search1

---

# 33. Cards

Cards should be restrained.

Recommended:

```text
Radius:
6px for UI cards

16px for large image cards

Background:
#FFF7E9 / #FFFFFF

Border:
1px solid #DACAB6
```

Avoid excessive shadows.

Use borders and whitespace instead.

---

# 34. Data / Terminal UI

A unique Daylight visual element is the technical "network terminal."

Example:

```text
DAYLIGHT NETWORK                         LIVE

09:41  JOB #4782 SCHEDULED
       127 Elm St, Austin TX

09:43  INSTALL COMPLETE
       BATTERY ONLINE ●

09:44  SYSTEM PRODUCING 4.2 KW
       GRID EXPORT ACTIVE

09:58  GRID EVENT DETECTED
       PEAK DEMAND
       DISPATCHING STORED ENERGY
```

Use:
- Mono typography
- Uppercase labels
- Small timestamps
- Technical language
- Minimal color accents

This reinforces the combination of infrastructure and consumer experience shown in the brand system. citeturn0search1

---

# 35. Photography

The official brand guide divides photography into five categories. citeturn0search1

## Architectural Homes

Characteristics:
- Real homes
- Warm natural light
- Editorial composition
- Attainable architecture
- Golden hour
- Solar visible but not dominant

## Home Interiors

Characteristics:
- Sunlight through windows
- Warm interiors
- Natural materials
- Intimate atmosphere

## Lifestyle & Family

Characteristics:
- Candid
- Authentic
- Human
- Never overly posed

## Aesthetic

Characteristics:
- Light flares
- Film grain
- Analog texture
- Soft contrast
- Conceptual

## Elemental

Characteristics:
- Transmission infrastructure
- Storms
- Lightning
- Large landscapes
- Dramatic scale

---

# 36. Motion System

Motion should represent energy moving through the network.

Primary motion asset:

```text
Daylight Spectrum Gradient
```

Behavior:
- Slow movement
- Continuous transition
- Organic
- Never distracting

Use as:
- Hero background
- Image frame
- Full-bleed campaign surface
- Section transition
- Loading state

The official brand guide explicitly defines the animated gradient as Daylight's visual expression of energy in motion. citeturn0search1

---

# 37. Motion Rules

Recommended durations:

```text
Micro interaction:
100–200ms

UI transition:
200–400ms

Image reveal:
500–800ms

Gradient motion:
8–20 seconds
```

Use:
- Fade
- Mask reveal
- Horizontal slide
- Gradient movement
- Image scale

Avoid:
- Bounce
- Excessive spring animations
- Rapid flashing
- Heavy 3D transitions

---

# 38. Responsive Design

## Desktop

```text
>= 1200px
```

Characteristics:
- Full editorial layout
- Large display typography
- Wide photography
- Multi-column process
- Large data overlays

## Tablet

```text
768px–1199px
```

Characteristics:
- Reduced display typography
- 2-column layout
- Simplified data overlays
- Sticky CTA

## Mobile

```text
< 768px
```

Header:

```text
Daylight                         Menu
```

Hero:

```text
Eyebrow
↓
Large headline
↓
Description
↓
Address input
↓
Visual
```

Cards:
- Single column

Typography:
```text
Hero: 44–56px
Section: 34–40px
Body: 16px
```

---

# 39. Accessibility

Requirements:
- WCAG 2.1 AA
- Keyboard navigation
- Visible focus state
- Semantic headings
- Accessible forms
- Proper input labels
- Alt text
- Sufficient contrast
- Touch targets >= 44px
- Do not communicate status through color alone

For data-heavy terminal components, status should use both text and visual indicators.

---

# 40. SEO Structure

## Homepage

H1:

```text
Power your home for less
```

H2 examples:

```text
Cut your electric bill by 20% or more
Keep the lights on with battery backup
Track it all in the Daylight app
A new way to power your home
Today's grid was built for yesterday's world
Every home makes the network stronger
```

## Product

H1:

```text
Your home's new energy system
```

H2:
- How Daylight works for you
- The hardware behind your lower electric bill
- Your home supports a more reliable grid
- Daylight or cash purchase
- A simple path to Daylight
- Questions? We have answers.

---

# 41. Homepage Information Flow

```text
HEADER
  ↓
HERO
  Power your home for less
  ↓
ADDRESS QUALIFICATION
  ↓
SAVE / PROTECT / CONTROL
  ↓
HOW DAYLIGHT WORKS
  ↓
3-STEP PROCESS
  ↓
PRODUCT / APP VISUALIZATION
  ↓
WHY DAYLIGHT
  ↓
ENERGY GRID PROBLEM
  ↓
DECENTRALIZED NETWORK
  ↓
FINAL CTA
  ↓
FOOTER
```

---

# 42. Design Tokens

```css
:root {
  --color-orange: #F66F00;
  --color-beige: #FFF7E9;
  --color-beige-1: #F7EED9;
  --color-beige-2: #F0E5CF;
  --color-dark-beige: #DACAB6;

  --color-black: #111111;
  --color-grey: #A09B93;
  --color-white: #FFFFFF;

  --color-yellow: #FCCC3C;
  --color-brown: #4C2806;
  --color-purple: #C8B0FF;
  --color-dark-purple: #321F61;
  --color-light-blue: #BED5FF;
  --color-dark-blue: #1D3E86;

  --font-display: "Feature Deck";
  --font-body: "Aeonik Pro";
  --font-mono: "ABC Social Mono";

  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 16px;

  --button-height: 50px;

  --container-width: 1440px;

  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 48px;
  --spacing-xl: 96px;
  --spacing-2xl: 128px;
  --spacing-3xl: 160px;
}
```

---

# 43. Design Principles

## 01 — Human First

Energy infrastructure should feel approachable.

## 02 — Make Energy Visible

Use data visualization to show:
- Generation
- Storage
- Consumption
- Savings
- Backup

## 03 — Sell the Outcome

Focus on:

```text
Lower bills
+
Backup power
+
Control
+
A better energy future
```

rather than only selling solar hardware.

## 04 — Editorial Over Corporate

Large typography, photography, whitespace, and asymmetric layouts should replace conventional corporate card grids.

## 05 — Technology Should Feel Calm

Technical data should communicate confidence, not complexity.

## 06 — Every Section Should Move Toward Conversion

The user's journey should continuously reinforce:

```text
Understand
→
Trust
→
Qualify
→
Estimate
→
Start
```

---

# 44. Final Design Direction

The resulting website should feel like:

```text
              DAYLIGHT

       HUMAN ENERGY BRAND
                 +
        CLIMATE TECHNOLOGY
                 +
        PREMIUM EDITORIAL
                 +
       REAL-TIME DATA
                 +
          HIGH-CONVERSION UX
```

Core visual hierarchy:

```text
1. Homeowner benefit
2. Savings
3. Backup / resilience
4. Product technology
5. Network vision
6. Trust
7. Qualification
8. Conversion
```

The most important visual principle is the contrast between:

```text
WARM
Beige
Orange
Sunlight
Photography
Human stories

VS

TECHNICAL
Black
Mono typography
Energy data
Network diagrams
System status
```

That contrast is what makes the Daylight experience distinctive.

---

# 45. Implementation Notes

This document is a UI/UX specification derived from the publicly accessible Daylight website and its published brand system. It should be used as a design reference rather than a reproduction of proprietary assets.

Before production:
- Use officially licensed Daylight assets only when authorized.
- Verify all current pricing, claims, statistics, warranties, licenses, and service availability.
- Use original imagery or properly licensed photography.
- Load the official fonts only where licensing permits.
- Keep the qualification flow optimized for mobile.
- Preserve the strong editorial character rather than converting the design into a generic SaaS dashboard.
