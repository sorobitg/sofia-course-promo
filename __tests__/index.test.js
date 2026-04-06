'use strict';

const fs = require('fs');
const path = require('path');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  document = new DOMParser().parseFromString(html, 'text/html');
});

// ─────────────────────────────────────────────
// Document Structure
// ─────────────────────────────────────────────
describe('Document structure', () => {
  test('has <html> with lang="en"', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  test('has UTF-8 charset meta tag', () => {
    const charset = document.querySelector('meta[charset]');
    expect(charset).not.toBeNull();
    expect(charset.getAttribute('charset').toUpperCase()).toBe('UTF-8');
  });

  test('has viewport meta tag', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
    expect(viewport.getAttribute('content')).toContain('width=device-width');
  });

  test('has correct page title', () => {
    expect(document.title).toBe("Sofia's Course — Transform Your Life");
  });

  test('has a <body> element', () => {
    expect(document.body).not.toBeNull();
  });

  test('has embedded <style> in <head>', () => {
    const style = document.querySelector('head style');
    expect(style).not.toBeNull();
    expect(style.textContent.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────
// CSS Design Tokens
// ─────────────────────────────────────────────
describe('CSS design tokens', () => {
  let styleText;

  beforeAll(() => {
    styleText = document.querySelector('head style').textContent;
  });

  test('defines --primary color variable', () => {
    expect(styleText).toContain('--primary:');
  });

  test('defines --primary-dark color variable', () => {
    expect(styleText).toContain('--primary-dark:');
  });

  test('defines --bg color variable', () => {
    expect(styleText).toContain('--bg:');
  });

  test('defines --text color variable', () => {
    expect(styleText).toContain('--text:');
  });

  test('defines --surface color variable', () => {
    expect(styleText).toContain('--surface:');
  });

  test('defines --muted color variable', () => {
    expect(styleText).toContain('--muted:');
  });

  test('includes mobile responsive media query at 600px', () => {
    expect(styleText).toMatch(/@media\s*\(max-width:\s*600px\)/);
  });
});

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────
describe('Navigation', () => {
  let nav;

  beforeAll(() => {
    nav = document.querySelector('nav');
  });

  test('navigation element exists', () => {
    expect(nav).not.toBeNull();
  });

  test('brand name is "✦ Sofia"', () => {
    const brand = nav.querySelector('.nav-brand');
    expect(brand).not.toBeNull();
    expect(brand.textContent.trim()).toBe('✦ Sofia');
  });

  test('has nav-links list', () => {
    const list = nav.querySelector('.nav-links');
    expect(list).not.toBeNull();
  });

  test('has "About" link pointing to #about', () => {
    const link = nav.querySelector('a[href="#about"]');
    expect(link).not.toBeNull();
    expect(link.textContent.trim()).toBe('About');
  });

  test('has "Curriculum" link pointing to #curriculum', () => {
    const link = nav.querySelector('a[href="#curriculum"]');
    expect(link).not.toBeNull();
    expect(link.textContent.trim()).toBe('Curriculum');
  });

  test('has "Preview" link pointing to #reel', () => {
    const link = nav.querySelector('a[href="#reel"]');
    expect(link).not.toBeNull();
    expect(link.textContent.trim()).toBe('Preview');
  });

  test('has "Enroll Now" CTA button in nav pointing to #enroll', () => {
    const link = nav.querySelector('a[href="#enroll"]');
    expect(link).not.toBeNull();
    expect(link.textContent.trim()).toBe('Enroll Now');
    expect(link.classList.contains('btn-nav')).toBe(true);
  });

  test('nav links list has exactly 4 items', () => {
    const items = nav.querySelectorAll('.nav-links li');
    expect(items.length).toBe(4);
  });
});

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
describe('Hero section', () => {
  let hero;

  beforeAll(() => {
    hero = document.querySelector('section.hero');
  });

  test('hero section exists', () => {
    expect(hero).not.toBeNull();
  });

  test('displays "New Course Available" badge', () => {
    const badge = hero.querySelector('.hero-badge');
    expect(badge).not.toBeNull();
    expect(badge.textContent).toContain('New Course Available');
  });

  test('hero heading contains "Unlock Your Potential"', () => {
    const h1 = hero.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('Unlock Your Potential');
  });

  test('hero heading highlights "Sofia\'s Method"', () => {
    const highlight = hero.querySelector('h1 span');
    expect(highlight).not.toBeNull();
    expect(highlight.textContent.trim()).toBe("Sofia's Method");
  });

  test('hero subtext describes the course', () => {
    const p = hero.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('transformative');
  });

  test('"Start Today" CTA button links to #enroll', () => {
    const btn = hero.querySelector('a.btn-primary[href="#enroll"]');
    expect(btn).not.toBeNull();
    expect(btn.textContent.trim()).toBe('Start Today');
  });

  test('"Watch Preview" button links to #reel', () => {
    const btn = hero.querySelector('a.btn-outline[href="#reel"]');
    expect(btn).not.toBeNull();
    expect(btn.textContent.trim()).toBe('Watch Preview');
  });

  test('hero cover placeholder element exists', () => {
    const cover = hero.querySelector('.hero-cover');
    expect(cover).not.toBeNull();
  });

  test('hero cover references sofia-cover.png asset', () => {
    const cover = hero.querySelector('.hero-cover');
    expect(cover.textContent).toContain('sofia-cover.png');
  });
});

// ─────────────────────────────────────────────
// About / What You'll Learn Section
// ─────────────────────────────────────────────
describe('About section — What You\'ll Learn', () => {
  let section;

  beforeAll(() => {
    section = document.querySelector('section#about');
  });

  test('about section exists with id="about"', () => {
    expect(section).not.toBeNull();
  });

  test('section tag reads "About the Course"', () => {
    const tag = section.querySelector('.section-tag');
    expect(tag).not.toBeNull();
    expect(tag.textContent.trim()).toBe('About the Course');
  });

  test('section title reads "What You\'ll Learn"', () => {
    const title = section.querySelector('.section-title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim()).toBe("What You'll Learn");
  });

  test('learn grid has exactly 6 cards', () => {
    const cards = section.querySelectorAll('.learn-card');
    expect(cards.length).toBe(6);
  });

  test('every learn card has an icon', () => {
    const icons = section.querySelectorAll('.learn-icon');
    expect(icons.length).toBe(6);
    icons.forEach(icon => {
      expect(icon.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  test('every learn card has a heading', () => {
    const headings = section.querySelectorAll('.learn-card h3');
    expect(headings.length).toBe(6);
    headings.forEach(h => {
      expect(h.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  test('every learn card has a description paragraph', () => {
    const paragraphs = section.querySelectorAll('.learn-card p');
    expect(paragraphs.length).toBe(6);
    paragraphs.forEach(p => {
      expect(p.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  const expectedCards = [
    { heading: 'Clear Goal Setting', icon: '🎯' },
    { heading: 'Mindset Mastery', icon: '🧠' },
    { heading: 'Daily Momentum', icon: '⚡' },
    { heading: 'Community & Accountability', icon: '🌐' },
    { heading: 'Measurable Results', icon: '📈' },
    { heading: 'Practical Tools', icon: '💡' },
  ];

  expectedCards.forEach(({ heading, icon }) => {
    test(`card "${heading}" exists with correct icon`, () => {
      const cards = section.querySelectorAll('.learn-card');
      const match = Array.from(cards).find(
        c => c.querySelector('h3')?.textContent.trim() === heading
      );
      expect(match).not.toBeUndefined();
      expect(match.querySelector('.learn-icon').textContent.trim()).toBe(icon);
    });
  });
});

// ─────────────────────────────────────────────
// Curriculum Section
// ─────────────────────────────────────────────
describe('Curriculum section', () => {
  let section;

  beforeAll(() => {
    section = document.querySelector('section#curriculum');
  });

  test('curriculum section exists with id="curriculum"', () => {
    expect(section).not.toBeNull();
  });

  test('section tag reads "Inside the Course"', () => {
    const tag = section.querySelector('.section-tag');
    expect(tag).not.toBeNull();
    expect(tag.textContent.trim()).toBe('Inside the Course');
  });

  test('section title reads "Course Curriculum"', () => {
    const title = section.querySelector('.section-title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim()).toBe('Course Curriculum');
  });

  test('slides grid has exactly 6 cards', () => {
    const cards = section.querySelectorAll('.slide-card');
    expect(cards.length).toBe(6);
  });

  test('every slide card has a placeholder or image', () => {
    const cards = section.querySelectorAll('.slide-card');
    cards.forEach(card => {
      const hasPlaceholder = card.querySelector('.slide-placeholder') !== null;
      const hasImg = card.querySelector('img') !== null;
      expect(hasPlaceholder || hasImg).toBe(true);
    });
  });

  test('every slide card has a label', () => {
    const labels = section.querySelectorAll('.slide-label');
    expect(labels.length).toBe(6);
    labels.forEach(label => {
      expect(label.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  const expectedModules = [
    'Module 1 — Foundation',
    'Module 2 — Mindset',
    'Module 3 — Strategy',
    'Module 4 — Execution',
    'Module 5 — Momentum',
    'Module 6 — Mastery',
  ];

  expectedModules.forEach(label => {
    test(`slide label "${label}" is present`, () => {
      const labels = Array.from(section.querySelectorAll('.slide-label'));
      const match = labels.find(el => el.textContent.trim() === label);
      expect(match).not.toBeUndefined();
    });
  });

  test('slide placeholders reference numbered asset files', () => {
    const placeholders = section.querySelectorAll('.slide-placeholder');
    for (let i = 1; i <= 6; i++) {
      const match = Array.from(placeholders).find(p =>
        p.textContent.includes(`slide-${i}.png`)
      );
      expect(match).not.toBeUndefined();
    }
  });
});

// ─────────────────────────────────────────────
// Reel / Preview Section
// ─────────────────────────────────────────────
describe('Reel preview section', () => {
  let section;

  beforeAll(() => {
    section = document.querySelector('section#reel');
  });

  test('reel section exists with id="reel"', () => {
    expect(section).not.toBeNull();
  });

  test('section tag reads "Preview"', () => {
    const tag = section.querySelector('.section-tag');
    expect(tag).not.toBeNull();
    expect(tag.textContent.trim()).toBe('Preview');
  });

  test('section title reads "Watch the Promo Reel"', () => {
    const title = section.querySelector('.section-title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim()).toBe('Watch the Promo Reel');
  });

  test('reel wrapper exists', () => {
    const wrap = section.querySelector('.reel-wrap');
    expect(wrap).not.toBeNull();
  });

  test('reel section references final-reel.mp4 asset', () => {
    const placeholder = section.querySelector('.reel-placeholder');
    expect(placeholder).not.toBeNull();
    expect(placeholder.textContent).toContain('final-reel.mp4');
  });
});

// ─────────────────────────────────────────────
// CTA / Enroll Section
// ─────────────────────────────────────────────
describe('CTA / Enroll section', () => {
  let section;

  beforeAll(() => {
    section = document.querySelector('section#enroll');
  });

  test('enroll section exists with id="enroll"', () => {
    expect(section).not.toBeNull();
  });

  test('section has cta-section class', () => {
    expect(section.classList.contains('cta-section')).toBe(true);
  });

  test('CTA heading reads "Ready to Change Your Life?"', () => {
    const h2 = section.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent.trim()).toBe('Ready to Change Your Life?');
  });

  test('CTA body copy mentions transforming mindset', () => {
    const p = section.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('mindset');
  });

  test('"Enroll Now" button is present', () => {
    const btn = section.querySelector('a.btn-primary');
    expect(btn).not.toBeNull();
    expect(btn.textContent).toContain('Enroll Now');
  });
});

// ─────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────
describe('Footer', () => {
  let footer;

  beforeAll(() => {
    footer = document.querySelector('footer');
  });

  test('footer element exists', () => {
    expect(footer).not.toBeNull();
  });

  test('footer contains copyright notice', () => {
    expect(footer.textContent).toContain('©');
    expect(footer.textContent).toContain("Sofia's Course");
  });

  test('footer mentions current or near-future year', () => {
    const currentYear = new Date().getFullYear();
    const text = footer.textContent;
    const yearMatch = text.match(/\b(202\d)\b/);
    expect(yearMatch).not.toBeNull();
    expect(parseInt(yearMatch[1], 10)).toBeGreaterThanOrEqual(currentYear - 1);
  });

  test('footer includes "All rights reserved"', () => {
    expect(footer.textContent).toContain('All rights reserved');
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────
describe('Accessibility', () => {
  test('page language is declared on <html>', () => {
    expect(document.documentElement.getAttribute('lang')).toBeTruthy();
  });

  test('page has exactly one <h1>', () => {
    const h1s = document.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  test('all headings follow a logical order (h1 before h2)', () => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
    expect(headings.length).toBeGreaterThan(0);
    const firstH1 = headings.findIndex(h => h.tagName === 'H1');
    const firstH2 = headings.findIndex(h => h.tagName === 'H2');
    // H1 must come before any H2
    if (firstH2 !== -1) {
      expect(firstH1).toBeLessThan(firstH2);
    }
  });

  test('all <img> tags have alt attributes', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      expect(img.hasAttribute('alt')).toBe(true);
    });
  });

  test('all anchor tags have non-empty href attributes', () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      expect(link.hasAttribute('href')).toBe(true);
    });
  });

  test('anchor tag link text is descriptive (no empty links)', () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      const text = link.textContent.trim();
      const ariaLabel = link.getAttribute('aria-label') || '';
      expect(text.length + ariaLabel.length).toBeGreaterThan(0);
    });
  });

  test('nav uses semantic <nav> element', () => {
    expect(document.querySelector('nav')).not.toBeNull();
  });

  test('page uses semantic <footer> element', () => {
    expect(document.querySelector('footer')).not.toBeNull();
  });

  test('page uses <section> elements for content areas', () => {
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});

// ─────────────────────────────────────────────
// Internal Anchor Links
// ─────────────────────────────────────────────
describe('Internal anchor links resolve to existing section IDs', () => {
  const internalAnchors = ['#about', '#curriculum', '#reel', '#enroll'];

  internalAnchors.forEach(href => {
    test(`anchor "${href}" has a matching section in the document`, () => {
      const id = href.slice(1);
      const target = document.getElementById(id);
      expect(target).not.toBeNull();
    });
  });
});

// ─────────────────────────────────────────────
// Section Ordering
// ─────────────────────────────────────────────
describe('Section ordering in the page', () => {
  let sections;

  beforeAll(() => {
    sections = Array.from(document.querySelectorAll('section'));
  });

  test('hero section appears first', () => {
    expect(sections[0].classList.contains('hero')).toBe(true);
  });

  test('#about section appears before #curriculum', () => {
    const aboutIdx = sections.findIndex(s => s.id === 'about');
    const currIdx = sections.findIndex(s => s.id === 'curriculum');
    expect(aboutIdx).toBeLessThan(currIdx);
  });

  test('#curriculum section appears before #reel', () => {
    const currIdx = sections.findIndex(s => s.id === 'curriculum');
    const reelIdx = sections.findIndex(s => s.id === 'reel');
    expect(currIdx).toBeLessThan(reelIdx);
  });

  test('#reel section appears before #enroll', () => {
    const reelIdx = sections.findIndex(s => s.id === 'reel');
    const enrollIdx = sections.findIndex(s => s.id === 'enroll');
    expect(reelIdx).toBeLessThan(enrollIdx);
  });
});
