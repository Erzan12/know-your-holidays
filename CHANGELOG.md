# Changelog

All notable changes to the **Know Your Holiday** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
*(Add upcoming features, fixes, or breaking changes here before releasing v1.1.0)*

---

## [1.0.0] - 2026-09-22

### Added
* Initial production release of **Know Your Holiday**.
* Native multi-region country selection supporting 70+ countries with search filtering and continent tabs (`Asia`, `Europe`, `Americas`, `Africa`, `Oceania`).
* Dual-mode holiday view supporting statutory public holidays (via Nager.Date) and regional school break schedules (via OpenHolidays API).
* Getaway finder component to dynamically discover and count down to upcoming long weekends.
* NestJS backend proxy with Prisma ORM caching layer for holiday datasets.
* Active holiday detection state for displaying a celebratory hero banner on the home screen.
* Comprehensive UI design system with custom typography, status badges, modal flows, and color tokens.