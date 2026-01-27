# SIERA Design Guide
## Single Source of Truth (SSoT) for Design & Development

**Version:** 2.0  
**Last Updated:** 2026-01-27  
**Document Status:** Authoritative Reference  
**Alignment:** Integrates Design System + Pitch Deck Strategic Vision  
**Identity Base:** UPN "Veteran" Jakarta - Sistem Informasi PATRIBERA

---

## Document Purpose & Scope

This design guide serves as the definitive reference for all design and development work on the SIERA (Sistem Informasi PATRIBERA) platform. It harmonizes the strategic vision from the Pitch Deck with the technical specifications from the design system, ensuring every design decision can be traced back to business goals while maintaining design excellence.

**This guide addresses:**
- Product designers creating UI mockups and prototypes
- Frontend developers implementing components
- UX writers crafting microcopy and content
- Product managers understanding design constraints
- QA teams validating implementation against specifications

---

# Part 1: Design Principles & Foundations

## 1.1 Core Design Philosophy

SIERA's design philosophy is built upon three foundational pillars derived from both the UPN "Veteran" Jakarta institutional identity and the modern, user-centric vision outlined in the Pitch Deck.

**Pillar 1: Institutional Integrity with Modern Expression**

Every design element must honor the proud heritage of UPN "Veteran" Jakarta while presenting it through a contemporary lens. The "Bela Negara" spirit and "Widya Mwat Yasa" motto are not merely decorative—they inform the purposeful, intentional nature of every interface decision. When users interact with SIERA, they should feel connected to a larger mission of national service and academic excellence.

**Pillar 2: Clarity Through Visual Hierarchy**

Following the Pitch Deck's emphasis on "Clean Space," interfaces must prioritize content over decoration. The 8-point grid system and generous whitespace create breathing room that allows users to focus on their tasks. Information architecture follows a logical progression that reduces cognitive load and supports efficient task completion.

**Pillar 3: Indonesian Identity in Digital Form**

The design system incorporates Indonesian cultural elements—visible in the batik-inspired background patterns and the "Casablanca" decorative accents—in a way that feels authentic rather than tokenistic. This cultural grounding differentiates SIERA from generic international platforms while remaining inclusive and accessible to all users.

## 1.2 Brand Values

These values guide every design decision and should be evident in every interaction:

| Value | Description | Design Manifestation |
|-------|-------------|---------------------|
| **Trust** | Users must feel confident that SIERA handles their academic and service data securely and reliably | Consistent, predictable UI patterns; clear status indicators; honest messaging |
| **Service** | The platform exists to serve students, mentors, and administrators in their patriotic service activities | Efficient workflows; clear guidance; supportive feedback; accessibility first |
| **Excellence** | UPN's commitment to academic and character excellence extends to the digital experience | Polished details; thoughtful interactions; error prevention over error recovery |
| **Community** | Service is a collective endeavor; the UI should foster connection and collaboration | Social features prominence; shared spaces; clear communication of collective progress |
| **Transparency** | Users should always understand system state, their status, and available actions | Clear status badges; predictable behavior; honest limitations |

## 1.3 Guiding Principles for Day-to-Day Design Work

These principles provide decision-making guidance when specifications are ambiguous:

1. **Default to the Pitch Deck aesthetic when conflicts arise.** The strategic vision prioritizes modern, Indonesian cultural elements. When the design system and pitch deck disagree, the pitch deck's direction takes precedence unless it compromises accessibility or usability.

2. **Every pixel must justify its existence.** Following the "Clean Space" principle, add visual elements only when they serve a functional purpose—guiding attention, conveying meaning, or enabling action.

3. **Consistency over cleverness.** Users should encounter familiar patterns across the platform. When tempted to create a novel solution, first verify that an existing pattern cannot serve the purpose.

4. **Accessibility is not optional.** WCAG 2.1 AA compliance is mandatory. Design alternatives must be found for any visual approach that cannot meet contrast, keyboard navigation, or screen reader requirements.

5. **Mobile-first, desktop-optimized.** The student body heavily relies on mobile devices. Design for mobile constraints first, then enhance for larger screens—never the reverse.

---

# Part 2: Visual Design Standards

## 2.1 Color System

The SIERA color system balances institutional identity (from the design system) with the strategic aesthetic direction (from the pitch deck). The following specifications represent the harmonized resolution of both sources.

### 2.1.1 Primary Palette

The primary palette establishes brand recognition and forms the visual foundation of the interface.

| Role | Color Name | Hex | RGB | Usage Priority |
|------|------------|-----|-----|----------------|
| **Primary Brand** | **UPN Forest Green** | `#195F47` | rgb(25, 95, 71) | Main navigation, primary buttons, active states, brand headers, footer backgrounds |
| **Primary Hover/Active** | **UPN Forest Green Dark** | `#134536` | rgb(19, 69, 54) | Button hover states, active navigation items, pressed states |
| **Secondary Brand** | **UPN Academic Gold** | `#F5DB14` | rgb(245, 219, 20) | Call-to-action accents, highlights, emphasis text, achievement badges |
| **Secondary Hover** | **UPN Academic Gold Dark** | `#D9BE11` | rgb(217, 190, 17) | Button hover states, interactive highlights |
| **Accent** | **UPN Highlight Yellow** | `#FBFAEB` | rgb(251, 250, 235) | Background accents, card highlights, decorative overlays |

**Color Usage Notes:**

The `#195F47` primary color replaces the `#116611` from the original design system to align with the Pitch Deck's strategic visual identity. This darker, richer green better supports the Glassmorphism and Gradient Overlay styles specified in the Pitch Deck while maintaining the institutional connection to UPN's green identity.

The `#F5DB14` gold provides sufficient contrast for emphasis and call-to-action elements while avoiding the accessibility issues that `#FFFF00` (Veteran Yellow) would present when used as text color.

### 2.1.2 Semantic Palette

Semantic colors communicate system state and guide user attention in critical moments.

| Role | Color Name | Hex | RGB | Tailwind | Usage |
|------|------------|-----|-----|----------|-------|
| **Success** | **Growth Green** | `#176417` | rgb(23, 100, 23) | green-800 | Successful submissions, verified attendance, completed tasks |
| **Success Light** | **Growth Green Light** | `#E8F5E9` | rgb(232, 245, 233) | green-100 | Success backgrounds, success badge backgrounds |
| **Warning** | **Amber Alert** | `#F59E0B` | rgb(245, 158, 11) | amber-500 | Pending tasks, deadlines approaching, requires attention |
| **Warning Light** | **Amber Alert Light** | `#FFF8E1` | rgb(255, 248, 225) | amber-100 | Warning backgrounds, pending badge backgrounds |
| **Error** | **Crimson Error** | `#D32F2F` | rgb(211, 47, 47) | red-700 | Validation errors, rejected tasks, system failures |
| **Error Light** | **Crimson Error Light** | `#FFEBEE` | rgb(255, 235, 238) | red-100 | Error backgrounds, error badge backgrounds |
| **Info** | **Sky Information** | `#0288D1` | rgb(2, 136, 209) | sky-700 | Neutral information, educational tips, announcements |
| **Info Light** | **Sky Information Light** | `#E1F5FE` | rgb(225, 245, 254) | sky-100 | Info backgrounds, informational badge backgrounds |

### 2.1.3 Neutral Palette (Grayscale)

Neutral colors provide structure and hierarchy without competing with brand colors.

| Role | Color Name | Hex | RGB | Usage |
|------|------------|-----|-----|-------|
| **Text Primary** | **Charcoal** | `#212121` | rgb(33, 33, 33) | Headings, body text, primary content |
| **Text Secondary** | **Slate Gray** | `#757575` | rgb(117, 117, 117) | Metadata, placeholders, captions, secondary text |
| **Text Tertiary** | **Light Slate** | `#9E9E9E` | rgb(158, 158, 158) | Disabled text, timestamps, subtle annotations |
| **Border** | **Divider Gray** | `#E0E0E0` | rgb(224, 224, 224) | Dividers, input borders, card outlines, separators |
| **Border Light** | **Border Light** | `#EEEEEE` | rgb(238, 238, 238) | Subtle borders, grid lines, table borders |
| **Surface** | **Pure White** | `#FFFFFF` | rgb(255, 255, 255) | Card backgrounds, modals, input fields, content areas |
| **Surface Subtle** | **Off White** | `#FAFAFA` | rgb(250, 250, 250) | Secondary backgrounds, hover states, alternating table rows |
| **Background** | **Campus Mist** | `#F5F7F5` | rgb(245, 247, 245) | Main page background, form field backgrounds |
| **Background Dark** | **Dark Background** | `#121212` | rgb(18, 18, 18) | Footer backgrounds, dark mode surfaces (future) |

### 2.1.4 Color Usage Guidelines

**Do's:**

- Use Primary Brand (#195F47) for primary actions, navigation, and brand elements
- Use Secondary Brand (#F5DB14) sparingly for emphasis and call-to-action accents
- Apply Semantic colors consistently—success always green, error always red
- Ensure text on colored backgrounds meets WCAG 2.1 AA contrast requirements (4.5:1 minimum)
- Use light semantic backgrounds (#E8F5E9, #FFF8E1, etc.) for status badges and alert banners

**Don'ts:**

- Don't use Semantic colors for decorative purposes—they reserve meaning for system feedback
- Don't use more than one brand color as the primary background color on a single page
- Don't use #FBFAEB (Accent Yellow) as text color—it lacks sufficient contrast
- Don't change the meaning of Semantic colors across different contexts
- Don't use pure black (#000000) except for the darkest overlay backgrounds

### 2.1.5 CSS Custom Properties

```css
:root {
  /* Primary Palette */
  --color-primary: #195F47;
  --color-primary-dark: #134536;
  --color-primary-light: #E8F0ED;
  
  --color-secondary: #F5DB14;
  --color-secondary-dark: #D9BE11;
  --color-secondary-light: #FEF9E0;
  
  --color-accent: #FBFAEB;
  
  /* Semantic Palette - Success */
  --color-success: #176417;
  --color-success-light: #E8F5E9;
  --color-success-emphasis: #2E7D32;
  
  /* Semantic Palette - Warning */
  --color-warning: #F59E0B;
  --color-warning-light: #FFF8E1;
  --color-warning-emphasis: #F57C00;
  
  --color-error: #D32F2F;
  --color-error-light: #FFEBEE;
  --color-error-emphasis: #C62828;
  
  --color-info: #0288D1;
  --color-info-light: #E1F5FE;
  --color-info-emphasis: #0277BD;
  
  /* Neutral Palette */
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-text-tertiary: #9E9E9E;
  
  --color-border: #E0E0E0;
  --color-border-light: #EEEEEE;
  
  --color-surface: #FFFFFF;
  --color-surface-subtle: #FAFAFA;
  
  --color-background: #F5F7F5;
  --color-background-dark: #121212;
}
```

## 2.2 Typography

Typography in SIERA balances the modern, bold approach from the Pitch Deck with the readability requirements of a functional interface.

### 2.2.1 Font Family Specification

**Primary Font Stack (Headings & Display):**

```
"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

**Body Font Stack:**

```
"Inter", "Roboto", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

**Monospace Font Stack (Code, Data):**

```
"JetBrains Mono", "Fira Code", "Consolas", "Monaco", "Courier New", monospace
```

**Font Loading Strategy:**

Import Montserrat (Extralight 200, Regular 400, Semi-Bold 600, Bold 700) and Inter (all weights) via Google Fonts or self-hosted font files. Use `font-display: swap` to ensure text visibility during font loading.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@200;400;600;700&display=swap" rel="stylesheet">
```

### 2.2.2 Type Scale

The type scale follows a geometric progression optimized for the 8-point grid system.

| Style | Font Family | Font Weight | Font Size | Line Height | Letter Spacing | Usage |
|-------|-------------|-------------|-----------|-------------|----------------|-------|
| **Display** | Montserrat | Bold (700) | 48px | 1.1 | -0.02em | Hero sections, landing page titles, celebration moments |
| **Display Small** | Montserrat | Bold (700) | 40px | 1.15 | -0.01em | Major section headers, modal titles |
| **H1** | Montserrat | Semi-Bold (600) | 32px | 1.2 | 0 | Page titles, primary navigation headers |
| **H2** | Montserrat | Semi-Bold (600) | 28px | 1.25 | 0 | Section headings, card titles, major content divisions |
| **H3** | Montserrat | Semi-Bold (600) | 24px | 1.3 | 0 | Subsection headings, category labels |
| **H4** | Montserrat | Medium (500) | 20px | 1.4 | 0 | Component titles, form section headers |
| **H5** | Montserrat | Medium (500) | 18px | 1.45 | 0 | Small headings, card subtitles |
| **Body Large** | Inter | Regular (400) | 18px | 1.55 | 0 | Lead paragraphs, important descriptions |
| **Body** | Inter | Regular (400) | 16px | 1.5 | 0 | Standard body text, form inputs, content blocks |
| **Body Small** | Inter | Regular (400) | 14px | 1.5 | 0 | Secondary text, metadata, descriptions |
| **Caption** | Inter | Regular (400) | 12px | 1.4 | 0.01em | Labels, timestamps, helper text, chips |
| **Overline** | Montserrat | Semi-Bold (600) | 11px | 1.4 | 0.08em | Tag labels, category tags, status indicators |

### 2.2.3 Typography Usage Guidelines

**Headlines (Montserrat):**

- Use Montserrat for all headings from H1 through H5
- Display styles reserved for hero sections and celebration moments
- Maintain consistent letter spacing (0) for headings through H4
- Semi-Bold (600) weight provides sufficient hierarchy without the visual heaviness of Bold

**Body Copy (Inter):**

- Inter serves as the primary body font for optimal screen readability
- 16px base size ensures comfortable reading on all devices
- 1.5 line height provides adequate breathing room for extended reading
- Regular weight (400) for body text; Medium (500) for emphasis within body

**Special Cases:**

- **Dates and Locations in Posts:** Use Montserrat Semi-Bold (600) with white text on brand backgrounds, or accent with #F5DB14 for emphasis
- **Keywords within text:** Apply #F5DB14 background or bold weight to highlight key terms
- **Timestamps and metadata:** Use Inter Caption (12px) in Text Secondary (#757575)

### 2.2.4 CSS Custom Properties

```css
:root {
  /* Font Families */
  --font-heading: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: "Inter", "Roboto", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;
  
  /* Font Sizes */
  --text-display: 48px;
  --text-display-sm: 40px;
  --text-h1: 32px;
  --text-h2: 28px;
  --text-h3: 24px;
  --text-h4: 20px;
  --text-h5: 18px;
  --text-body-lg: 18px;
  --text-body: 16px;
  --text-body-sm: 14px;
  --text-caption: 12px;
  --text-overline: 11px;
  
  /* Font Weights */
  --font-light: 200;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.2;
  --leading-normal: 1.3;
  --leading-relaxed: 1.4;
  --leading-loose: 1.5;
  --leading-extra-loose: 1.55;
  
  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.01em;
  --tracking-extra-wide: 0.08em;
}
```

## 2.3 Iconography

Iconography provides visual anchors and efficient communication throughout the interface.

### 2.3.1 Icon Library Specification

**Primary Icon Set:** Phosphor Icons (Outline style for generic states, Filled for active/selected states)

**Secondary Icon Set:** Heroicons (Outline style) for alternative representations

**Icon Library Source:**
- Phosphor Icons: https://phosphoricons.com
- Heroicons: https://heroicons.com

### 2.3.2 Icon Sizing Grid

Icons should follow a consistent sizing scale aligned with the 8-point grid.

| Size Token | Dimensions | Line Weight | Usage |
|------------|------------|-------------|-------|
| **xs** | 16×16px | 1.5px | Compact lists, data tables, small badges |
| **sm** | 20×20px | 1.5px | Standard button icons, form inputs, navigation |
| **md** | 24×24px | 2px | Primary navigation, major actions, cards |
| **lg** | 32×32px | 2px | Section headers, featured actions, empty states |
| **xl** | 40×40px | 2.5px | Hero sections, celebration moments, error states |
| **2xl** | 48×48px | 2.5px | Full-screen illustrations, major system states |

### 2.3.3 Icon Style Guidelines

**Consistency Rules:**

- Use Outline style as the default; switch to Filled for active/selected states
- Maintain 2px visual padding from text and other elements at standard sizes
- Apply consistent corner radius matching the interface (typically 2px for standard icons)
- Use monochromatic icons (inherited text color) unless semantic meaning requires color

**Color Application:**

```css
.icon {
  width: var(--size);
  height: var(--size);
  color: currentColor;
  /* Semantic coloring */
}

.icon-success { color: var(--color-success); }
.icon-warning { color: var(--color-warning); }
.icon-error { color: var(--color-error); }
.icon-info { color: var(--color-info); }
```

**Usage Examples:**

| Context | Icon Size | Style | Color |
|---------|-----------|-------|-------|
| Navigation sidebar | 24px | Outline (default), Filled (active) | Inherited from text |
| Primary buttons | 20px | Outline | White (on brand) or Inherited |
| Status indicators | 16px | Filled | Semantic color |
| Feature images | 32px | Outline | Text Primary or Text Secondary |
| Empty states | 48px | Outline | Text Tertiary |

### 2.3.4 Icon Usage Do's and Don'ts

**Do:**

- Use icons to support comprehension, not as decoration
- Pair icons with text labels in navigation and actions
- Maintain consistent sizing within the same context
- Use semantic colors to reinforce meaning in status indicators

**Don't:**

- Use icons without text labels in primary navigation
- Mix icon styles (don't combine Phosphor with Heroicons in the same view)
- Scale icons non-proportionally (stretch or compress)
- Use icons as the sole conveyor of meaning (provide text alternatives)

## 2.4 Imagery Guidelines

Imagery in SIERA follows the "Foto Kegiatan" philosophy from the Pitch Deck—authentic photography of real activities with thoughtful styling.

### 2.4.1 Photography Style

**Authentic Activity Photography:**

- Capture genuine moments of service activities, academic discussions, and community engagement
- Prefer natural lighting; when artificial lighting is necessary, use warm, welcoming tones
- Focus on people and their activities rather than empty spaces or buildings
- Diverse representation reflecting the UPN community
- candid moments preferred over posed shots

**Image Treatment (from Pitch Deck):**

- Background photos use low opacity (15-25%) with a solid overlay of the same image at full opacity as the focal point
- This "focus and fade" technique keeps users oriented while maintaining visual interest
- Gradient overlays (dark, transparent) ensure text legibility when overlaid on photos

### 2.4.2 Illustration Approach

**Batik-Inspired Pattern Elements:**

Following the Pitch Deck's direction for Indonesian cultural elements:

- Background patterns incorporating batik-inspired geometric shapes
- Color palette: greens and golds from the primary brand palette
- Subtle opacity (8-15%) to avoid competing with content
- Placement: Login screens, empty states, certificate backgrounds, footer areas

**Illustration Style:**

- Clean, modern vector illustrations
- Consistent with Phosphor Icons' geometric aesthetic
- Limited color palette matching the design system
- Hand-drawn or organic elements may be used sparingly for warmth

### 2.4.3 Visual Metaphors

The following visual metaphors are established for common concepts:

| Concept | Visual Treatment | Examples |
|---------|------------------|----------|
| **PatriBERA Service** | Illustrated silhouettes of service activities with batik pattern overlay | Empty states, success illustrations |
| **Academic Achievement** | UPN-branded iconography with gold accents | Badges, certificates, completion screens |
| **Progress & Growth** | Leaf/growth metaphors using primary green | Progress indicators, streak animations |
| **Community** | Group silhouettes with connected elements | Community features, team dashboards |

### 2.4.4 Asset Specifications

**File Formats:**

- Photographs: WebP format (lossless or high-quality lossy), minimum 1200px width
- Illustrations: SVG for scalability, PNG fallback for complex gradients
- Icons: SVG for all interface icons

**Image Dimensions:**

| Context | Width | Aspect Ratio | File Size Max |
|---------|-------|--------------|---------------|
| Hero images | 1920px | 16:9 or 21:9 | 200KB |
| Card thumbnails | 400px | 4:3 | 50KB |
| Avatar images | 128px | 1:1 | 20KB |
| Background patterns | Tileable | Any | 30KB |

---

# Part 3: Component Library Specifications

## 3.1 Button Component

Buttons trigger actions and navigate users through workflows.

### 3.1.1 Anatomy

```
┌─────────────────────────────────────┐
│  [Icon]  Label Text                 │  ← Vertical center alignment
└─────────────────────────────────────┘
```

Components:
- **Container:** Rectangular with rounded corners
- **Label:** Centered text (Montserrat Semi-Bold 600, 14px or 16px)
- **Icon (Optional):** Left or right of label, 20px size
- **Loader (Loading State):** Spinner replacing icon or label

### 3.1.2 Variants

**Primary Button**

```css
.btn-primary {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: var(--font-heading);
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn-primary:disabled {
  background-color: var(--color-text-tertiary);
  cursor: not-allowed;
  transform: none;
}
```

**Secondary Button (Gold)**

```css
.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-text-primary);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: var(--font-heading);
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: var(--color-secondary-dark);
}
```

**Outline Button**

```css
.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  padding: 10px 22px;
  /* ... same font properties as primary */
}

.btn-outline:hover {
  background-color: var(--color-primary);
  color: #FFFFFF;
}
```

**Ghost Button**

```css
.btn-ghost {
  background-color: transparent;
  color: var(--color-text-secondary);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  /* ... same font properties */
}

.btn-ghost:hover {
  background-color: var(--color-surface-subtle);
  color: var(--color-text-primary);
}
```

### 3.1.3 Sizes

| Size | Height | Padding | Font Size | Icon Size |
|------|--------|---------|-----------|-----------|
| **Small** | 36px | 8px 16px | 12px | 16px |
| **Medium (Default)** | 44px | 12px 24px | 14px | 20px |
| **Large** | 52px | 16px 32px | 16px | 24px |

### 3.1.4 States

| State | Visual Treatment | Interaction |
|-------|------------------|-------------|
| **Default** | Standard variant styling | - |
| **Hover** | 10% darker background, translateY(-1px) | Mouse enter |
| **Active/Pressed** | 5% darker background, translateY(0) | Mouse down |
| **Focus** | 2px offset outline in brand color | Tab navigation |
| **Loading** | Spinner replaces icon/label, disabled | API call in progress |
| **Disabled** | 50% opacity, not-allowed cursor | No pointer events |

### 3.1.5 Accessibility

- **Keyboard:** Enter/Space to activate, Tab to focus
- **Screen Reader:** `aria-label` required if icon-only; `aria-disabled` when loading
- **Focus Indicator:** Visible 2px outline in brand color, 2px offset
- **Contrast:** 4.5:1 minimum contrast ratio (met by all variants)

### 3.1.6 Usage Examples and Do's/Don'ts

**Do:**

```tsx
<Button variant="primary" size="medium">
  Submit Attendance
</Button>

<Button variant="secondary" icon={<PlusIcon />}>
  Create Task
</Button>

<Button variant="outline" loading={isSubmitting}>
  Saving...
</Button>
```

**Don't:**

- Don't use Primary buttons for secondary actions on the same page
- Don't place two Primary buttons adjacent without clear visual hierarchy
- Don't use Ghost buttons for destructive actions (use Outline with error color instead)

---

## 3.2 Card Component

Cards contain related content and actions.

### 3.2.1 Anatomy

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────────┐│
│  │  [Header: Icon + Title + Menu]  ││  ← Optional header
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │                                 ││
│  │  [Body Content]                 ││
│  │                                 ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  [Footer: Actions + Meta]       ││  ← Optional footer
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### 3.2.2 Variants

**Standard Card**

```css
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

**Stats Card (with Gold Accent)**

```css
.card-stats {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid var(--color-secondary);
}

.card-stats .stat-value {
  font-family: var(--font-heading);
  font-weight: var(--font-bold);
  font-size: var(--text-display-sm);
  color: var(--color-text-primary);
  line-height: 1;
}

.card-stats .stat-label {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
  margin-top: 8px;
}
```

**Glassmorphism Card (Pitch Deck Style)**

```css
.card-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(25, 95, 71, 0.1);
}
```

### 3.2.3 Interactive States

| State | Treatment |
|-------|-----------|
| **Default** | Subtle shadow, standard border |
| **Hover** | Elevated shadow, slight border darkening |
| **Active/Pressed** | Reduced shadow, pressed appearance |
| **Focus** | Brand-colored focus ring on interactive elements within |

### 3.2.4 Accessibility

- **Structure:** Use semantic `<article>` or `<section>` tags
- **Headings:** Include proper heading hierarchy within card content
- **Focus:** Ensure interactive elements within cards have visible focus states
- **Card Actions:** Group related actions; use Button component for all actions

### 3.2.5 Usage Examples

```tsx
<Card>
  <Card.Header>
    <Card.Title>Task Details</Card.Title>
    <Card.Menu>
      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      <MenuItem icon={<TrashIcon />} variant="danger">Delete</MenuItem>
    </Card.Menu>
  </Card.Header>
  <Card.Body>
    <TaskDetails task={task} />
  </Card.Body>
  <Card.Footer>
    <Button variant="outline">Cancel</Button>
    <Button variant="primary">Submit</Button>
  </Card.Footer>
</Card>
```

---

## 3.3 Form Input Component

Form inputs collect user data across the platform.

### 3.3.1 Anatomy

```
┌─────────────────────────────────────┐
│  Label (Required indicator if needed)│
│  ┌─────────────────────────────────┐│
│  │  [Prefix]  User input here      ││
│  └─────────────────────────────────┘│
│  Helper text (optional)             │
│  Error message (when invalid)       │
└─────────────────────────────────────┘
```

### 3.3.2 Text Input

```css
.input {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  transition: all 0.2s ease;
}

.input::placeholder {
  color: var(--color-text-tertiary);
}

.input:hover {
  border-color: var(--color-text-secondary);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(25, 95, 71, 0.15);
}

.input:disabled {
  background-color: var(--color-surface-subtle);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### 3.3.3 Input States

**Error State:**

```css
.input-error {
  border-color: var(--color-error);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.15);
}

.input-error-message {
  font-size: var(--text-caption);
  color: var(--color-error);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

**Success State:**

```css
.input-success {
  border-color: var(--color-success);
}

.input-success:focus {
  box-shadow: 0 0 0 3px rgba(23, 100, 23, 0.15);
}
```

### 3.3.4 Label and Helper Text

```css
.input-label {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  margin-bottom: 6px;
  display: block;
}

.input-label-required::after {
  content: " *";
  color: var(--color-error);
}

.input-helper {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  color: var(--color-text-secondary);
  margin-top: 6px;
}
```

### 3.3.5 Textarea

```css
.textarea {
  min-height: 100px;
  padding: 12px 16px;
  resize: vertical;
}
```

### 3.3.6 Accessibility

- **Labels:** Always include `<label>` element associated via `for` attribute
- **Required Fields:** Mark with aria-required="true" and visual indicator
- **Error Messages:** Associate via `aria-describedby`, read automatically on focus
- **Focus:** Visible 3px ring in brand color on focus
- **Instructions:** Use `aria-describedby` for helper text

### 3.3.7 Usage Example

```tsx
<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="email" className="input-label">
      Email Address
    </label>
    <input
      id="email"
      type="email"
      className={`input ${errors.email ? 'input-error' : ''}`}
      value={value}
      onChange={handleChange}
      aria-describedby={errors.email ? 'email-error' : 'email-helper'}
    />
    {errors.email ? (
      <div id="email-error" className="input-error-message">
        <ErrorIcon size={14} />
        {errors.email}
      </div>
    ) : (
      <div id="email-helper" className="input-helper">
        We'll never share your email.
      </div>
    )}
  </div>
</form>
```

---

## 3.4 Navigation Components

### 3.4.1 Navbar (Top Navigation)

```css
.navbar {
  background-color: var(--color-primary);
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar-logo {
  height: 40px;
  width: auto;
}

.navbar-title {
  font-family: var(--font-heading);
  font-weight: var(--font-bold);
  font-size: 20px;
  color: #FFFFFF;
}

.navbar-title-accent {
  color: var(--color-secondary);
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  font-weight: var(--font-medium);
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link-active {
  color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.15);
}
```

### 3.4.2 Sidebar Navigation (Admin/Mentor)

```css
.sidebar {
  width: 280px;
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border);
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
}

.sidebar-section {
  padding: 16px;
}

.sidebar-title {
  font-family: var(--font-heading);
  font-size: var(--text-caption);
  font-weight: var(--font-semibold);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  padding: 0 12px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--text-body);
  transition: all 0.15s ease;
  cursor: pointer;
}

.sidebar-item:hover {
  background-color: var(--color-surface-subtle);
  color: var(--color-text-primary);
}

.sidebar-item-active {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.sidebar-item-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}
```

---

## 3.5 Status Badge Component

Status badges communicate state at a glance.

### 3.5.1 Badge Variants

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-family: var(--font-body);
  font-size: var(--text-caption);
  font-weight: var(--font-medium);
}

.badge-pending {
  background-color: var(--color-warning-light);
  color: var(--color-warning-emphasis);
}

.badge-verified {
  background-color: var(--color-success-light);
  color: var(--color-success-emphasis);
}

.badge-rejected {
  background-color: var(--color-error-light);
  color: var(--color-error-emphasis);
}

.badge-info {
  background-color: var(--color-info-light);
  color: var(--color-info-emphasis);
}
```

### 3.5.2 Icon Badges

```css
.badge-icon {
  padding: 6px;
  border-radius: 50%;
}
```

---

## 3.6 Component Compliance Matrix

This matrix maps each component to Pitch Deck strategic requirements:

| Component | Pitch Deck Alignment | Design System Source |
|-----------|---------------------|----------------------|
| Primary Button | Clean Space, Gradient Overlay capability | Button specifications |
| Secondary Button | Call-to-action accents (#F5DB14) | Gold button styling |
| Glassmorphism Card | Glassmorphism style element | N/A (new from Pitch Deck) |
| Stats Card | Clean data presentation | Card with gold accent |
| Form Inputs | Clean Space, accessibility | Input specifications |
| Navbar | Logo placement, institutional identity | Navbar with logo |
| Sidebar | Navigation clarity | Sidebar specifications |
| Status Badges | Visual hierarchy, clarity | Semantic color usage |

---

# Part 4: Layout & Spacing Systems

## 4.1 Grid System

SIERA uses a flexible grid system that adapts to responsive breakpoints while maintaining the 8-point grid foundation.

### 4.1.1 Grid Columns

| Breakpoint | Columns | Gutter | Max Container Width |
|------------|---------|--------|---------------------|
| **xs** (< 640px) | 4 | 16px | 100% (16px padding) |
| **sm** (640px - 767px) | 8 | 20px | 100% (20px padding) |
| **md** (768px - 1023px) | 12 | 24px | 720px |
| **lg** (1024px - 1279px) | 12 | 24px | 960px |
| **xl** (1280px - 1535px) | 12 | 24px | 1140px |
| **2xl** (≥ 1536px) | 12 | 24px | 1280px |

### 4.1.2 Grid Implementation

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}

@media (min-width: 640px) {
  .container {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1140px;
  }
}

.grid {
  display: grid;
  gap: var(--spacing);
}

.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-8 { grid-template-columns: repeat(8, 1fr); }
.grid-cols-12 { grid-template-columns: repeat(12, 1fr); }
```

## 4.2 Spacing Scale

All spacing values are multiples of 4 or 8, maintaining the 8-point grid foundation.

| Token | Size | Usage |
|-------|------|-------|
| **0** | 0px | No spacing |
| **xs** | 4px | Icon gaps, tight stacking, badge padding |
| **sm** | 8px | Button padding, inline element spacing |
| **md** | 16px | Component padding, gutter between related elements |
| **lg** | 24px | Section separation, card internal spacing |
| **xl** | 32px | Container padding, major component spacing |
| **2xl** | 48px | Major section breaks, hero spacing |
| **3xl** | 64px | Full section margins, landing page spacing |
| **4xl** | 96px | Hero sections, major visual breaks |

### 4.2.1 CSS Custom Properties

```css
:root {
  --space-0: 0;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
}
```

### 4.2.2 Spacing Usage Guidelines

**Component-Level Spacing (use multiples of 4px or 8px):**
- Button internal padding: 8px 16px (sm-md)
- Card internal padding: 16px (md) or 24px (lg)
- Form input padding: 0 16px (md)
- Icon to text spacing: 8px (sm)

**Section-Level Spacing (use multiples of 8px):**
- Between related cards in a grid: 16px (md)
- Between sections: 32px (xl) or 48px (2xl)
- Page margins: 24px (mobile) to 48px (desktop)

## 4.3 Layout Patterns

### 4.3.1 Dashboard Layout

```
┌─────────────────────────────────────┐
│           Global Navbar             │
├──────────────┬──────────────────────┤
│              │                      │
│   Sidebar    │     Main Content     │
│   (280px)    │                      │
│              │                      │
│              │                      │
│              │                      │
└──────────────┴──────────────────────┘
```

### 4.3.2 Card Grid Layout

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
}
```

### 4.3.3 Form Layout

```css
.form-group {
  margin-bottom: var(--space-lg);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
```

---

# Part 5: Interaction Design Guidelines

## 5.1 Motion Design Specifications

Motion provides feedback, guides attention, and creates delight.

### 5.1.1 Duration Scale

| Interaction Type | Duration | Examples |
|-----------------|----------|----------|
| **Instant** | 0ms - 50ms | Toggle switches, checkboxes |
| **Quick** | 100ms - 150ms | Button hover, focus states, icon changes |
| **Normal** | 200ms - 300ms | Most UI transitions, modal appears |
| **Deliberate** | 350ms - 500ms | Page transitions, complex list filtering |
| **Extended** | 600ms - 1000ms | Success animations, celebration moments |

### 5.1.2 Easing Functions

| Purpose | Easing | CSS |
|---------|--------|-----|
| **Standard UI** | Ease-out (snappy departure) | `cubic-bezier(0.4, 0, 0.2, 1)` |
| **Entering elements** | Ease-out (gentle arrival) | `cubic-bezier(0, 0, 0.2, 1)` |
| **Exiting elements** | Ease-in (quick departure) | `cubic-bezier(0.4, 0, 1, 1)` |
| **Bouncy/Spring** | Custom spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| **Loading** | Linear (repeating) | `linear` |

### 5.1.3 Common Transitions

**Fade In:**

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 200ms ease-out forwards;
}
```

**Slide Up:**

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 300ms ease-out forwards;
}
```

**Scale In:**

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 200ms ease-out forwards;
}
```

### 5.1.4 Motion Do's and Don'ts

**Do:**

- Use motion to provide feedback (button click, form submission)
- Apply consistent easing across similar interactions
- Respect user preferences (respect `prefers-reduced-motion`)
- Use motion to guide attention (new items sliding in)

**Don't:**

- Animate properties that trigger layout recalculation (width, height)
- Use motion for decoration only
- Exceed 500ms for routine interactions
- Animate elements that might trigger motion sensitivity

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 5.2 Interaction Patterns

### 5.2.1 Button Interactions

| State | Duration | Easing | Visual Change |
|-------|----------|--------|---------------|
| Hover | 150ms | ease-out | 10% darker, translateY(-1px) |
| Active | 100ms | ease-in | translateY(0), 5% darker |
| Focus | Immediate | - | 2px outline appears |
| Loading | - | - | Spinner replaces content |
| Success | 300ms | ease-out | Green check appears |

### 5.2.2 Card Interactions

| State | Duration | Easing | Visual Change |
|-------|----------|--------|---------------|
| Hover | 200ms | ease-out | Shadow increase |
| Click | 100ms | ease-in | Slight press |
| Focus | Immediate | - | Focus ring on interactive elements |

### 5.2.3 Form Interactions

| State | Duration | Easing | Visual Change |
|-------|----------|--------|---------------|
| Focus | 150ms | ease-out | Border color change, ring appears |
| Input | Immediate | - | Character appears |
| Error | 200ms | ease-out | Border and text turn red |
| Success | 200ms | ease-out | Border turns green |

## 5.3 Feedback Mechanisms

### 5.3.1 Toast Notifications

```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: var(--color-surface);
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 400px;
  z-index: 1000;
  animation: slideUp 300ms ease-out;
}

.toast-success { border-left: 4px solid var(--color-success); }
.toast-error { border-left: 4px solid var(--color-error); }
.toast-warning { border-left: 4px solid var(--color-warning); }
.toast-info { border-left: 4px solid var(--color-info); }
```

### 5.3.2 Loading States

**Button Loading:**

```css
.btn-loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.btn-loading::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 50%;
  margin-left: -10px;
  margin-top: -10px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 5.3.3 Success/Delete Confirmation

- Success: Brief toast notification (2-3 seconds), then remove element with fade-out animation
- Error: Toast notification with retry action, element remains
- Delete: Confirmation dialog before action; on success, slide out element

## 5.4 Micro-interaction Standards

### 5.4.1 Like/Bookmark Toggle

```css
.interaction-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 20px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.interaction-btn:hover {
  background-color: var(--color-surface-subtle);
}

.interaction-btn.liked {
  color: var(--color-error);
}

.interaction-btn.liked .heart-icon {
  animation: heartBeat 0.3s ease-out;
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
```

### 5.4.2 Copy to Clipboard

```css
.copy-btn.copied {
  background-color: var(--color-success-light);
  color: var(--color-success);
}

.copy-btn.copied::after {
  content: "Copied!";
  margin-left: 8px;
}
```

---

# Part 6: Accessibility Requirements

## 6.1 Color Contrast Ratios

All text and interactive elements must meet WCAG 2.1 AA standards.

### 6.1.1 Minimum Contrast Ratios

| Context | Font Size | Minimum Ratio | Examples |
|---------|-----------|---------------|----------|
| **Body Text** | 16px+ | 4.5:1 | Form inputs, body copy, buttons |
| **Large Text** | 18px+ (Bold) or 24px+ (Regular) | 3:1 | Headings, status indicators |
| **UI Components** | Icon-only buttons | 3:1 | Navigation icons, action icons |
| **Border/Frame** | N/A | 3:1 | Input borders, divider lines |

### 6.1.2 Contrast Verification

**Passing Combinations:**

| Foreground | Background | Ratio | Status |
|------------|------------|-------|--------|
| #212121 (Text Primary) | #FFFFFF | 13.6:1 | ✅ AAA |
| #212121 | #F5F7F5 | 11.4:1 | ✅ AAA |
| #757575 (Text Secondary) | #FFFFFF | 4.6:1 | ✅ AA |
| #757575 | #F5F7F5 | 4.0:1 | ⚠️ AA Large Only |
| #FFFFFF | #195F47 (Primary) | 5.8:1 | ✅ AA |
| #212121 | #F5DB14 (Gold) | 3.2:1 | ⚠️ AA Large Only |
| #D32F2F (Error) | #FFFFFF | 5.3:1 | ✅ AA |

**Failing Combinations (Do Not Use):**

| Foreground | Background | Ratio | Issue |
|------------|------------|-------|-------|
| #757575 | #F5F7F5 | 4.0:1 | Below 4.5:1 for body text |
| #9E9E9E (Text Tertiary) | #FFFFFF | 3.0:1 | Below 4.5:1 |
| #FFFFFF | #FFFF00 (Veteran Yellow) | 1.2:1 | Severely insufficient |

## 6.2 Focus Indicators

### 6.2.1 Focus Ring Specifications

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* For components with existing ring */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(25, 95, 71, 0.4);
}
```

### 6.2.2 Skip Navigation

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background-color: var(--color-primary);
  color: #FFFFFF;
  padding: 8px 16px;
  z-index: 1000;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```

## 6.3 Keyboard Navigation

### 6.3.1 Required Keyboard Interactions

| Element | Key | Action |
|---------|-----|--------|
| Button | Enter / Space | Activate button |
| Link | Enter | Navigate |
| Checkbox | Space | Toggle checked state |
| Radio | Arrow keys | Select option |
| Select | Arrow keys / Enter | Open/select option |
| Modal | Escape | Close modal |
| Dialog | Escape | Close dialog |
| Focus trap | Tab / Shift+Tab | Navigate within container |

### 6.3.2 Focus Management

```tsx
// When opening a modal
useEffect(() => {
  const previousFocus = document.activeElement as HTMLElement;
  modalRef.current?.focus();
  
  return () => {
    previousFocus?.focus();
  };
}, []);

// Focus trap within modal
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Tab') {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
};
```

## 6.4 Screen Reader Support

### 6.4.1 ARIA Labels and Roles

```tsx
{/* Navigation */}
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Dashboard</a></li>
  </ul>
</nav>

{/* Buttons */}
<button aria-label="Close modal">
  <CloseIcon />
</button>

{/* Form inputs */}
<input
  id="email"
  type="email"
  aria-required="true"
  aria-describedby="email-helper email-error"
/>
<span id="email-helper" className="sr-only">We'll never share your email.</span>

{/* Status messages */}
<div role="alert" aria-live="polite">
  {errorMessage}
</div>

{/* Loading state */}
<span role="status" aria-live="polite">
  Loading your tasks...
</span>
```

### 6.4.2 Screen Reader Optimizations

- Use semantic HTML (button for buttons, a for links)
- Provide `aria-label` for icon-only buttons
- Associate labels with inputs via `for`/`id` or `aria-labelledby`
- Use `aria-describedby` for helper text and error messages
- Announce dynamic content changes via `aria-live` regions
- Use `role="status"` for success messages
- Use `role="alert"` for important errors

## 6.5 Accessibility Testing Checklist

**Pre-Release Testing:**

- [ ] All interactive elements reachable via keyboard
- [ ] Focus order logical and intuitive
- [ ] Visible focus indicators on all interactive elements
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Images have alt text (decorative images marked as such)
- [ ] Form inputs have associated labels
- [ ] Error messages announced to screen readers
- [ ] `prefers-reduced-motion` respected
- [ ] No keyboard traps
- [ ] Skip link present and functional

---

# Part 7: Content & Copy Guidelines

## 7.1 Voice and Tone Specifications

### 7.1.1 Voice Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Professional** | Respects the academic and institutional context | "Your attendance has been verified" |
| **Approachable** | Welcoming without being casual | "Great job completing your task!" |
| **Clear** | Direct and unambiguous | "Enter your email address" |
| **Encouraging** | Supports student engagement | "Keep up the excellent service!" |
| **Respectful** | Honors the Bela Negara spirit | "Thank you for your service" |

### 7.1.2 Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| **Success Messages** | Celebratory, warm | "🎉 Task completed successfully!" |
| **Error Messages** | Helpful, non-blaming | "We couldn't save your changes. Please try again." |
| **Empty States** | Inviting, instructive | "You haven't created any tasks yet. Click below to get started!" |
| **Confirmations** | Clear, reassuring | "Your attendance has been recorded for January 27, 2026." |
| **Deadlines** | Urgent but supportive | "2 days left to complete this task" |

### 7.1.3 Voice Don'ts

- **Don't use slang:** Use "Submit" not "Send it!"
- **Don't blame users:** Use "Please enter a valid email" not "You entered an invalid email"
- **Don't be overly formal:** Use "Let's get started" not "Commencement of task initiation"
- **Don't use jargon:** Use "Sign in" not "Authenticate credentials"

## 7.2 Writing Style for UI Elements

### 7.2.1 Button Labels

| Context | Do | Don't |
|---------|-----|-------|
| **Primary Action** | "Save Changes" | "Submit" |
| **Secondary Action** | "Cancel" | "No thanks" |
| **Destructive** | "Delete Task" | "Remove" |
| **Positive** | "Continue" | "Proceed" |

**Guidelines:**
- Start with verb for actions (Save, Create, Delete)
- Keep under 3-4 words when possible
- Clear about outcome (not "Go" but "Go to Dashboard")

### 7.2.2 Headings

| Context | Do | Don't |
|---------|-----|-------|
| **Page Title** | "Dashboard" | "Welcome to your Dashboard" |
| **Section** | "Recent Tasks" | "Here are your recent tasks" |
| **Card** | "Attendance Overview" | "This shows your attendance" |

### 7.2.3 Form Labels

| Element | Style |
|---------|-------|
| **Labels** | Sentence case, clear noun: "Email address" |
| **Placeholders** | Descriptive examples: "e.g., student@upnvj.ac.id" |
| **Helper Text** | Brief explanation: "We'll never share your email" |
| **Error Messages** | Specific guidance: "Please enter a valid email address" |
| **Required Indicator** | Red asterisk (*) + aria-label |

### 7.2.4 Status Messages

| State | Style | Example |
|-------|-------|---------|
| **Success** | Positive, complete | "Your profile has been updated" |
| **Error** | Direct, actionable | "Unable to save. Check your connection and try again." |
| **Warning** | Clear, concerned | "Your session will expire in 2 minutes" |
| **Info** | Helpful, neutral | "New features are available" |

## 7.3 Terminology Standards

### 7.3.1 Approved Terms

| Term | Usage | Notes |
|------|-------|-------|
| **SIERA** | Full product name | Sistem Informasi PATRIBERA |
| **PATRIBERA | Acronym | PATRIBERA (exact case) |
| **UPN "Veteran" Jakarta** | Full institutional name | Official designation |
| **Dashboard** | Main user hub | N/A |
| **Task** | Service activity assignment | Use consistently |
| **Attendance** | Presence tracking | N/A |
| **Profile** | User account information | N/A |
| **Mentor** | Student mentor role | N/A |
| **Admin** | Administrator role | N/A |

### 7.3.2 Avoided Terms

| Avoid | Use Instead | Reason |
|-------|-------------|--------|
| "Submit" (vague) | Specific action: "Save," "Publish," "Send" | Clarity |
| "User" (impersonal) | "You," "Your," or role name: "Student," "Mentor" | Personalization |
| "Click here" | Descriptive link text | Accessibility |
| "Navigate to" | "Go to," "Open," "View" | Simplicity |

## 7.4 Localization Considerations

### 7.4.1 Internationalization Basics

- Use `Intl` APIs for dates, numbers, and pluralization
- Reserve space for translated text (30-40% longer than English)
- Avoid concatenated strings (separate labels and values)

### 7.4.2 Date and Time Formatting

```tsx
// Use consistent formatting across the app
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
```

### 7.4.3 Text Expansion

Component padding must accommodate longer translations:

```css
.button {
  min-height: 44px; /* Accommodate longer text */
  padding: 12px 24px;
  white-space: nowrap;
}
```

---

# Part 8: Responsive & Platform Adaptation

## 8.1 Responsive Breakpoints

### 8.1.1 Breakpoint Definitions

| Breakpoint | Width | Tailwind | Usage |
|------------|-------|----------|-------|
| **xs** | 0 - 639px | default | Small phones |
| **sm** | 640px - 767px | sm | Large phones, small tablets |
| **md** | 768px - 1023px | md | Tablets |
| **lg** | 1024px - 1279px | lg | Laptops, small desktops |
| **xl** | 1280px - 1535px | xl | Desktops |
| **2xl** | 1536px+ | 2xl | Large screens |

### 8.1.2 Breakpoint-Specific Adaptations

**Navigation:**

```css
/* Desktop */
@media (min-width: 1024px) {
  .navbar { display: flex; }
  .mobile-menu-btn { display: none; }
}

/* Mobile/Tablet */
@media (max-width: 1023px) {
  .navbar { position: relative; }
  .mobile-menu-btn { display: flex; }
  .nav-links { 
    display: none; 
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-primary);
    padding: 16px;
  }
  .nav-links.open { display: block; }
}
```

**Grid Layout:**

```css
.grid-4 { grid-template-columns: repeat(4, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-1 { grid-template-columns: 1fr; }

@media (max-width: 1023px) {
  .grid-4, .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 639px) {
  .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
}
```

## 8.2 Device-Specific Guidelines

### 8.2.1 Mobile (xs - sm)

**Priorities:**

- Touch-friendly targets (44px minimum)
- Vertical scrolling only
- Bottom navigation or hamburger menu
- Simplified card layouts (single column)
- Native keyboard for inputs

**Touch Targets:**

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### 8.2.2 Tablet (md)

**Priorities:**

- Side-by-side content where useful
- Increased touch targets still recommended
- Grid layouts (2 columns typical)
- Hover states may be triggered by tap

### 8.2.3 Desktop (lg - 2xl)

**Priorities:**

- Multi-column layouts
- Full hover state support
- Keyboard navigation emphasis
- Information-dense displays
- Sidebar navigation standard

## 8.3 Platform Adaptation

### 8.3.1 Browser Support

| Browser | Minimum Version | Support Level |
|---------|-----------------|---------------|
| **Chrome** | 90+ | Full support |
| **Firefox** | 88+ | Full support |
| **Safari** | 14+ | Full support |
| **Edge** | 90+ | Full support |

### 8.3.2 Feature Detection

```css
/* Glassmorphism fallback */
@supports (backdrop-filter: blur(12px)) {
  .card-glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
  }
}

@supports not (backdrop-filter: blur(12px)) {
  .card-glass {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

---

# Part 9: Implementation Specifications

## 9.1 CSS Custom Properties Reference

Complete reference for all design tokens.

```css
:root {
  /* ==============================
     COLOR TOKENS
     ============================== */
  
  /* Primary Palette */
  --color-primary: #195F47;
  --color-primary-dark: #134536;
  --color-primary-light: #E8F0ED;
  
  --color-secondary: #F5DB14;
  --color-secondary-dark: #D9BE11;
  --color-secondary-light: #FEF9E0;
  
  --color-accent: #FBFAEB;
  
  /* Semantic Colors */
  --color-success: #176417;
  --color-success-light: #E8F5E9;
  --color-success-emphasis: #2E7D32;
  
  --color-warning: #F59E0B;
  --color-warning-light: #FFF8E1;
  --color-warning-emphasis: #F57C00;
  
  --color-error: #D32F2F;
  --color-error-light: #FFEBEE;
  --color-error-emphasis: #C62828;
  
  --color-info: #0288D1;
  --color-info-light: #E1F5FE;
  --color-info-emphasis: #0277BD;
  
  /* Neutral Colors */
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-text-tertiary: #9E9E9E;
  
  --color-border: #E0E0E0;
  --color-border-light: #EEEEEE;
  
  --color-surface: #FFFFFF;
  --color-surface-subtle: #FAFAFA;
  
  --color-background: #F5F7F5;
  --color-background-dark: #121212;
  
  /* ==============================
     TYPOGRAPHY TOKENS
     ============================== */
  
  --font-heading: "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: "Inter", "Roboto", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;
  
  --text-display: 48px;
  --text-display-sm: 40px;
  --text-h1: 32px;
  --text-h2: 28px;
  --text-h3: 24px;
  --text-h4: 20px;
  --text-h5: 18px;
  --text-body-lg: 18px;
  --text-body: 16px;
  --text-body-sm: 14px;
  --text-caption: 12px;
  --text-overline: 11px;
  
  --font-light: 200;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  --leading-tight: 1.1;
  --leading-snug: 1.2;
  --leading-normal: 1.3;
  --leading-relaxed: 1.4;
  --leading-loose: 1.5;
  --leading-extra-loose: 1.55;
  
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.01em;
  --tracking-extra-wide: 0.08em;
  
  /* ==============================
     SPACING TOKENS
     ============================== */
  
  --space-0: 0;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
  
  /* ==============================
     BORDER & RADIUS
     ============================== */
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  --border-width: 1px;
  --border-width-md: 2px;
  
  /* ==============================
     SHADOWS
     ============================== */
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
  
  /* ==============================
     TRANSITIONS
     ============================== */
  
  --transition-fast: 100ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
  
  /* ==============================
     Z-INDEX SCALE
     ============================== */
  
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal-backdrop: 300;
  --z-modal: 400;
  --z-popover: 500;
  --z-tooltip: 600;
}
```

## 9.2 Component Prop Structures

### 9.2.1 Button Component Props

```tsx
interface ButtonProps {
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  
  /** Optional icon to display */
  icon?: React.ReactNode;
  
  /** Icon position relative to label */
  iconPosition?: 'left' | 'right';
  
  /** Loading state */
  loading?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Full width button */
  fullWidth?: boolean;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  
  /** Accessible label (required for icon-only) */
  'aria-label'?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Child content (label) */
  children: React.ReactNode;
}
```

### 9.2.2 Card Component Props

```tsx
interface CardProps {
  /** Card style variant */
  variant?: 'default' | 'glass' | 'stats';
  
  /** Card padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  
  /** Hover effect */
  hoverable?: boolean;
  
  /** Click handler (makes card interactive) */
  onClick?: () => void;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Card content */
  children: React.ReactNode;
}

interface CardHeaderProps {
  /** Title */
  title: string;
  
  /** Optional subtitle */
  subtitle?: string;
  
  /** Optional actions (buttons, menu) */
  actions?: React.ReactNode;
  
  /** Icon */
  icon?: React.ReactNode;
}

interface CardFooterProps {
  /** Footer content */
  children: React.ReactNode;
  
  /** Alignment */
  align?: 'left' | 'center' | 'right' | 'between';
}
```

### 9.2.3 Input Component Props

```tsx
interface InputProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  
  /** Label text */
  label?: string;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Helper text below input */
  helperText?: string;
  
  /** Error message */
  error?: string;
  
  /** Required field indicator */
  required?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Input value */
  value?: string;
  
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /** Native input props */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  
  /** Additional CSS classes */
  className?: string;
}
```

## 9.3 Integration Guidelines

### 9.3.1 Tailwind CSS Integration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#195F47',
        'primary-dark': '#134536',
        'primary-light': '#E8F0ED',
        secondary: '#F5DB14',
        'secondary-dark': '#D9BE11',
        success: '#176417',
        'success-light': '#E8F5E9',
        warning: '#F59E0B',
        'warning-light': '#FFF8E1',
        error: '#D32F2F',
        'error-light': '#FFEBEE',
        info: '#0288D1',
        'info-light': '#E1F5FE',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        display: '48px',
        'display-sm': '40px',
        h1: '32px',
        h2: '28px',
        h3: '24px',
        h4: '20px',
        h5: '18px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
    },
  },
  plugins: [],
}
```

### 9.3.2 CSS Module Example

```css
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.primary {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border: none;
}

.primary:hover {
  background-color: var(--color-primary-dark);
}

.secondary {
  background-color: var(--color-secondary);
  color: var(--color-text-primary);
  border: none;
}

.sm {
  height: 36px;
  padding: 0 16px;
  font-size: 12px;
}

.md {
  height: 44px;
  padding: 0 24px;
  font-size: 14px;
}

.lg {
  height: 52px;
  padding: 0 32px;
  font-size: 16px;
}
```

### 9.3.3 Storybook Integration

```tsx
// Button.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading...',
  },
};
```

---

# Part 10: Compliance Matrix

This section explicitly maps each section of the design guide to the strategic objectives and requirements from the Pitch Deck, ensuring every design decision can be traced back to business goals.

## 10.1 Pitch Deck to Design Guide Mapping

### 10.1.1 Color Palette Alignment

| Pitch Deck Requirement | Design Guide Implementation | Section |
|------------------------|---------------------------|---------|
| #195f47 (Forest Green) | `--color-primary: #195F47` | 2.1.1 |
| #f5db14f (Academic Gold) | `--color-secondary: #F5DB14` | 2.1.1 |
| #fbfaeb (Cream/Off-White) | `--color-accent: #FBFAEB` | 2.1.1 |
| Green-Yellow combination | Primary + Secondary palette coordination | 2.1.4 |

### 10.1.2 Typography Alignment

| Pitch Deck Requirement | Design Guide Implementation | Section |
|------------------------|---------------------------|---------|
| Montserrat Extralight | `--font-heading` includes Montserrat | 2.2.1 |
| Montserrat Semi Bold/Bold | Heading weights: 600 (Semi-Bold), 700 (Bold) | 2.2.2 |
| White text with yellow keyword emphasis | Text color #FFFFFF, background #F5DB14 | 2.2.3 |
| Montserrat for dates/locations | Special typography rules for metadata | 2.2.3 |
| Montserrat for titles (white + yellow) | H1-H5 specifications | 2.2.2 |

### 10.1.3 Assets & Branding Alignment

| Pitch Deck Requirement | Design Guide Implementation | Section |
|------------------------|---------------------------|---------|
| Logo placement (top-left) | Navbar brand positioning | 3.4.1 |
| Logo content (Kemendikbudristek, UPNVJ, BLU, Diktiristek) | Logo asset specifications | 2.4.4 |
| Tagline campus bela negara | Footer/tagline area specifications | 2.4.1 |
| Liquid glass footer style | Glassmorphism card variant | 3.2.2 |
| Batik-inspired pattern | Illustration approach, visual metaphors | 2.4.2 |

### 10.1.4 Style Elements Alignment

| Pitch Deck Requirement | Design Guide Implementation | Section |
|------------------------|---------------------------|---------|
| Gradient Overlay & Opacity | Hero image treatment, background patterns | 2.4.1, 5.1.3 |
| Glassmorphism | Glassmorphism card variant, navbar styling | 3.2.2, 3.4.1 |
| Clean Space | Spacing scale, typography hierarchy | 4.2, 2.2.2 |
| Foto Kegiatan | Photography style, authentic imagery | 2.4.1 |
| Low opacity backgrounds + solid focal | Image treatment specifications | 2.4.1 |

## 10.2 Strategic Objective Alignment

### 10.2.1 Institutional Identity Goals

| Goal | Design Implementation | Verification |
|------|----------------------|--------------|
| UPN "Veteran" Jakarta recognition | Primary brand color #195F47 matches institutional green | Visual consistency |
| "Green Campus" spirit | Consistent green usage across primary elements | Color audit |
| "Widya Mwat Yasa" motto | Gold accent color #F5DB14 for emphasis and achievements | Color usage |
| Bela Negara identity | Batik patterns, patriotic content, service-focused UI | Pattern audit |

### 10.2.2 User Experience Goals

| Goal | Design Implementation | Verification |
|------|----------------------|--------------|
| Clear navigation | Navbar + Sidebar with consistent iconography | Navigation audit |
| Quick task completion | Efficient button hierarchy, clear CTAs | Task flow testing |
| Status clarity | Semantic colors for all state indicators | Color contrast audit |
| Mobile accessibility | 44px touch targets, responsive breakpoints | Mobile testing |

### 10.2.3 Modern Platform Goals

| Goal | Design Implementation | Verification |
|------|----------------------|--------------|
| Contemporary aesthetic | Glassmorphism, smooth transitions, modern typography | Visual review |
| Professional presentation | Clean layouts, consistent spacing, quality imagery | Design audit |
| Indonesian identity | Cultural patterns, local imagery, appropriate iconography | Cultural review |

## 10.3 Conflict Resolution

When the original design system and Pitch Deck had conflicting requirements, the following resolution principles were applied:

| Conflict | Resolution | Rationale |
|----------|-----------|-----------|
| Green color: #116611 vs #195f47 | Use #195f47 | Pitch Deck's strategic color choice supports better accessibility and Glassmorphism |
| Font: Inter/Roboto vs Montserrat | Use Montserrat for headings, Inter for body | Pitch Deck emphasizes Montserrat; Inter better for body readability |
| Border radius: 6px vs 8px/12px | Use 8px standard, 12px for cards | Balances modern aesthetic with clean space principle |
| Glassmorphism not in design system | Add Glassmorphism variant | Pitch Deck explicitly requires this style element |

---

# Appendix A: Quick Reference Cards

## A.1 Color Quick Reference

```
┌────────────────────────────────────────────────────────────┐
│  PRIMARY BRAND                                              │
│  ───────────────────────────────────────────────────────── │
│  #195F47  ████████████  Forest Green (Primary)             │
│  #134536  ██████████    Forest Green Dark (Hover)          │
│  #F5DB14  ████████████  Academic Gold (Secondary)          │
├────────────────────────────────────────────────────────────┤
│  SEMANTIC                                                   │
│  ───────────────────────────────────────────────────────── │
│  #176417  ████████████  Success                             │
│  #F59E0B  ████████████  Warning                             │
│  #D32F2F  ████████████  Error                               │
│  #0288D1  ████████████  Info                                │
├────────────────────────────────────────────────────────────┤
│  NEUTRAL                                                    │
│  ───────────────────────────────────────────────────────── │
│  #212121  ████████████  Text Primary                        │
│  #757575  ████████████  Text Secondary                      │
│  #E0E0E0  ████████████  Border                              │
│  #FFFFFF  ████████████  Surface                             │
│  #F5F7F5  ████████████  Background                          │
└────────────────────────────────────────────────────────────┘
```

## A.2 Typography Quick Reference

```
┌────────────────────────────────────────────────────────────┐
│  DISPLAY          Montserrat Bold    48px    1.1           │
│  H1               Montserrat Semi    32px    1.2           │
│  H2               Montserrat Semi    28px    1.25          │
│  H3               Montserrat Semi    24px    1.3           │
│  Body Large       Inter Regular      18px    1.55          │
│  Body             Inter Regular      16px    1.5           │
│  Body Small       Inter Regular      14px    1.5           │
│  Caption          Inter Regular      12px    1.4           │
└────────────────────────────────────────────────────────────┘
```

## A.3 Spacing Quick Reference

```
┌────────────────────────────────────────────────────────────┐
│  xs  ▓▓  4px    Icon gaps, tight stacking                   │
│  sm  ▓▓  8px    Button padding, inline spacing              │
│  md  ▓▓  16px   Component padding, gutters                  │
│  lg  ▓▓  24px   Section separation                          │
│  xl  ▓▓  32px   Container padding                           │
│  2xl ▓▓  48px   Major section breaks                        │
└────────────────────────────────────────────────────────────┘
```

---

# Appendix B: Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-26 | Initial design system document | Design Team |
| 2.0 | 2026-01-27 | Integrated Pitch Deck requirements, harmonized colors, added Glassmorphism | Lead Designer |

---

**Document Status:** AUTHORITATIVE REFERENCE  
**Next Review:** 2026-04-27  
**Owner:** SIERA Design Team

This document serves as the Single Source of Truth for all SIERA design and development work. All team members should reference this guide when making design decisions. Questions or proposed changes should be directed to the Design Lead for review and approval.
