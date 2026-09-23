-- Phase 3: Home Content Management
-- Tables for dynamic, bilingual homepage content (stats, features, roadmap)

CREATE TABLE IF NOT EXISTS home_stats (
  id SERIAL PRIMARY KEY,
  icon_name VARCHAR(50) NOT NULL,
  value VARCHAR(50) NOT NULL,
  title_fa VARCHAR(200) NOT NULL,
  title_en VARCHAR(200) NOT NULL,
  description_fa TEXT NOT NULL,
  description_en TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS home_features (
  id SERIAL PRIMARY KEY,
  icon_name VARCHAR(50) NOT NULL,
  title_fa VARCHAR(200) NOT NULL,
  title_en VARCHAR(200) NOT NULL,
  description_fa TEXT NOT NULL,
  description_en TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS home_roadmap (
  id SERIAL PRIMARY KEY,
  phase_label VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('deployed', 'activeDev', 'upcoming')),
  title_fa VARCHAR(200) NOT NULL,
  title_en VARCHAR(200) NOT NULL,
  description_fa TEXT NOT NULL,
  description_en TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Seed: home_stats (matches current hardcoded STATS array)
INSERT INTO home_stats (icon_name, value, title_fa, title_en, description_fa, description_en, display_order) VALUES
('Building2', '۴+ / 4+', 'مناطق ویژه فعال', 'Active SEZs', 'مناطق ویژه اقتصادی یکپارچه‌شده در یک سامانه واحد.', 'Special Economic Zones integrated into our single platform.', 1),
('Puzzle', '۱۵+ / 15+', 'ماژول‌های سامانه', 'Platform Modules', 'ابزارهای ماژولار برای تولید، انبارداری و گمرک.', 'Modular tools covering production, warehousing, and customs.', 2),
('Globe', 'FA / EN', 'دوزبانه بومی', 'Native Bilingual', 'طراحی‌شده از پایه برای عملیات جهانی و بومی.', 'Designed from the ground up for global and localized operations.', 3),
('ShieldCheck', '۹۹.۹٪ / 99.9%', 'تضمین زمان کارکرد', 'Uptime Guarantee', 'عملکرد تضمین‌شده با زیرساخت ابری امن.', 'SLA-backed performance built on secure cloud infrastructure.', 4);

-- Seed: home_features (matches current hardcoded FEATURES array)
INSERT INTO home_features (icon_name, title_fa, title_en, description_fa, description_en, display_order) VALUES
('FileDown', 'اسناد ورود کالا', 'Import Docs', 'بارگذاری، اعتبارسنجی و پیگیری یکپارچه‌ی اسناد و بارنامه‌های تجارت بین‌المللی.', 'Seamlessly upload, validate, and track international trade and customs import manifests.', 1),
('Warehouse', 'ردیابی انبار', 'Warehouse Tracking', 'پایش لحظه‌ای انبارهای مناطق ویژه اقتصادی و ثبت ورود و خروج کالا.', 'Real-time monitoring of warehouses within Special Economic Zones, recording entry and exit logs.', 2),
('Share2', 'تولید و کیل مصرف', 'Production & BOM', 'تعریف کیل مصرف پیچیده و ردیابی مواد اولیه تا محصول نهایی به‌صورت آنی.', 'Define complex Bills of Materials (BOM), trace raw materials to finished products instantly.', 3),
('Award', 'گواهی تولید', 'Production Certificates', 'صدور خودکار گواهی تولید برای انطباق با ارزش افزوده تولید داخلی.', 'Generate authorized certificates for local production value-add compliance.', 4),
('ClipboardList', 'اظهارنامه گمرکی', 'Customs Declaration', 'ثبت خودکار اظهارنامه‌های گمرکی با اعتبارسنجی دقیق برای ترخیص کالا.', 'Automate declaration filings for custom clearance with strict validation.', 5),
('Truck', 'موجودی و سفارش', 'Inventory & Orders', 'هماهنگی موجودی تجاری با اظهارنامه‌ها و ممیزی‌های گمرکی زنده.', 'Keep commercial inventory synchronized with live customs statements and audits.', 6);

-- Seed: home_roadmap (matches current hardcoded ROADMAP array)
INSERT INTO home_roadmap (phase_label, status, title_fa, title_en, description_fa, description_en, display_order) VALUES
('Phase 01', 'deployed', 'هسته گمرکی', 'Core Customs Core', 'جریان اسناد واردات و صادرات، خط تایید تک‌پنجره‌ای.', 'Import and export documentation flow, single-window approval pipeline.', 1),
('Phase 02', 'deployed', 'ثبت انبار', 'Warehouse Log', 'ممیزی دیجیتال ورود و خروج انبار برای مناطق ویژه.', 'Digitized warehouse entry/exit audits for special zones.', 2),
('Phase 03', 'activeDev', 'تولید و کیل مصرف', 'Production & BOM', 'کیل مصرف پیچیده برای ردیابی مواد اولیه تا کالای نهایی.', 'Complex Bills of Materials tracing raw materials to finished items.', 3),
('Phase 04', 'upcoming', 'ارزش‌گذاری دیجیتال', 'Digital Valuation', 'برآورد هوشمند ارزش افزوده تولید داخلی برای کسر مالیاتی.', 'Smart estimation of local production value-add for tax deductions.', 4),
('Phase 05', 'upcoming', 'اکوسیستم API', 'API Ecosystem', 'یکپارچه‌سازی مستقیم سیستم‌به‌سیستم برای اپراتورهای بزرگ لجستیک.', 'Direct system-to-system integrations for large logistics operators.', 5);