-- =========================================================
-- E-ZONE — Phase 2 Test Data
-- Units, Companies, Goods (bilingual fa/en)
-- =========================================================

-- ---------- UNITS ----------
INSERT INTO units (code, name_fa, name_en) VALUES
('KG',      'کیلوگرم',        'Kilogram'),
('TON',     'تن',             'Ton'),
('M',       'متر',            'Meter'),
('M2',      'متر مربع',       'Square Meter'),
('M3',      'متر مکعب',       'Cubic Meter'),
('L',       'لیتر',           'Liter'),
('PCS',     'عدد',            'Piece'),
('BOX',     'جعبه',           'Box'),
('ROLL',    'رول',            'Roll'),
('SET',     'دست',            'Set'),
('PAIR',    'جفت',            'Pair'),
('BAG',     'کیسه',           'Bag'),
('CARTON',  'کارتن',          'Carton'),
('PACKAGE', 'بسته',           'Package'),
('SHEET',   'ورق',            'Sheet');

-- ---------- COMPANIES ----------
INSERT INTO companies (name_fa, name_en, registration_number, economic_code, address_fa, address_en, is_active) VALUES
('شرکت صنایع فولاد پارسیان', 'Persian Steel Industries Co.',
  '10102030405', '411111111111',
  'منطقه ویژه اقتصادی، شهرک صنعتی فولاد، جاده اهواز',
  'Steel Industrial Town, Special Economic Zone, Ahvaz Road', true),

('شرکت تولیدی نساجی البرز', 'Alborz Textile Manufacturing Co.',
  '10203040506', '411111111122',
  'منطقه ویژه اقتصادی، شهرک نساجی، جاده کاشان',
  'Textile Industrial Town, Special Economic Zone, Kashan Road', true),

('شرکت صنایع غذایی زاگرس', 'Zagros Food Industries Co.',
  '10304050607', '411111111133',
  'منطقه ویژه اقتصادی، شهرک صنایع غذایی، جاده شیراز',
  'Food Industrial Town, Special Economic Zone, Shiraz Road', true),

('شرکت محصولات پتروشیمی خزر', 'Caspian Petrochemical Products Co.',
  '10405060708', '411111111144',
  'منطقه ویژه اقتصادی، شهرک پتروشیمی، جاده بندر انزلی',
  'Petrochemical Industrial Town, Special Economic Zone, Bandar Anzali Road', true);

-- =========================================================
-- GOODS — Company 1: Persian Steel Industries (economic_code 411111111111)
-- =========================================================
INSERT INTO goods (company_id, item_code, name_fa, name_en, hs_code, unit_id, item_type)
SELECT c.id, g.item_code, g.name_fa, g.name_en, g.hs_code,
       (SELECT id FROM units WHERE code = g.unit_code), g.item_type
FROM (VALUES
  ('PS-001', 'سنگ آهن',              'Iron Ore',                  '260111', 'TON', 'raw_material'),
  ('PS-002', 'کک',                    'Coke',                      '270400', 'TON', 'raw_material'),
  ('PS-003', 'سنگ آهک',               'Limestone',                 '252100', 'TON', 'raw_material'),
  ('PS-004', 'قراضه فلزی',            'Scrap Metal',               '720449', 'TON', 'raw_material'),
  ('PS-005', 'فروسیلیس',              'Ferrosilicon',              '720221', 'KG',  'raw_material'),
  ('PS-006', 'بیلت فولادی',           'Steel Billet',              '721899', 'TON', 'part'),
  ('PS-007', 'بلوم فولادی',           'Steel Bloom',               '721810', 'TON', 'part'),
  ('PS-008', 'اسلب فولادی',           'Steel Slab',                '720712', 'TON', 'part'),
  ('PS-009', 'کلاف مفتول',            'Wire Rod Coil',             '721391', 'TON', 'part'),
  ('PS-010', 'میلگرد ۱۲ میلیمتر',     'Rebar 12mm',                '721420', 'TON', 'finished_product'),
  ('PS-011', 'میلگرد ۱۶ میلیمتر',     'Rebar 16mm',                '721420', 'TON', 'finished_product'),
  ('PS-012', 'لوله فولادی',           'Steel Pipe',                '730630', 'M',   'finished_product'),
  ('PS-013', 'نبشی فولادی',           'Angle Steel',               '721610', 'M',   'finished_product'),
  ('PS-014', 'ورق فولادی سرد نورد',   'Steel Sheet Cold Rolled',   '720917', 'M2',  'finished_product'),
  ('PS-015', 'ورق فولادی گرم نورد',   'Steel Sheet Hot Rolled',    '720827', 'M2',  'finished_product'),
  ('PS-016', 'کلاف فولادی',           'Steel Coil',                '722690', 'TON', 'finished_product'),
  ('PS-017', 'قطعه یدکی نورد',        'Rolling Mill Spare Part',   '847990', 'PCS', 'machinery'),
  ('PS-018', 'الکترود کوره',          'Furnace Electrode',         '854511', 'PCS', 'machinery'),
  ('PS-019', 'سرباره فولاد',          'Steel Slag',                '261900', 'TON', 'waste'),
  ('PS-020', 'براده فلزی',            'Metal Scrap Offcuts',       '720441', 'KG',  'waste')
) AS g(item_code, name_fa, name_en, hs_code, unit_code, item_type)
CROSS JOIN companies c
WHERE c.economic_code = '411111111111';

-- =========================================================
-- GOODS — Company 2: Alborz Textile Manufacturing (economic_code 411111111122)
-- =========================================================
INSERT INTO goods (company_id, item_code, name_fa, name_en, hs_code, unit_id, item_type)
SELECT c.id, g.item_code, g.name_fa, g.name_en, g.hs_code,
       (SELECT id FROM units WHERE code = g.unit_code), g.item_type
FROM (VALUES
  ('AT-001', 'پنبه خام',                     'Raw Cotton',                 '520100', 'KG',   'raw_material'),
  ('AT-002', 'الیاف پلی‌استر',                'Polyester Fiber',            '550320', 'KG',   'raw_material'),
  ('AT-003', 'الیاف ویسکوز',                  'Viscose Fiber',              '550410', 'KG',   'raw_material'),
  ('AT-004', 'پودر رنگ',                      'Dye Powder',                 '320490', 'KG',   'raw_material'),
  ('AT-005', 'مواد شیمیایی نساجی',            'Textile Chemicals',          '380991', 'KG',   'raw_material'),
  ('AT-006', 'نخ پنبه‌ای',                     'Cotton Yarn',                '520512', 'KG',   'part'),
  ('AT-007', 'نخ پلی‌استر',                    'Polyester Yarn',             '540233', 'KG',   'part'),
  ('AT-008', 'پارچه خام',                     'Grey Fabric',                '520911', 'M',    'part'),
  ('AT-009', 'رول پارچه بافته‌شده',           'Woven Fabric Roll',          '551219', 'ROLL', 'part'),
  ('AT-010', 'پارچه تی‌شرت پنبه‌ای',          'Cotton T-Shirt Fabric',      '600622', 'M',    'finished_product'),
  ('AT-011', 'پارچه چاپی',                    'Printed Fabric',             '521231', 'M',    'finished_product'),
  ('AT-012', 'پارچه جین',                     'Denim Fabric',               '520942', 'M',    'finished_product'),
  ('AT-013', 'سرویس ملحفه',                   'Bed Sheet Set',              '630221', 'SET',  'finished_product'),
  ('AT-014', 'پارچه پرده',                    'Curtain Fabric',             '630391', 'M',    'finished_product'),
  ('AT-015', 'حوله',                           'Towel',                      '630260', 'PCS',  'finished_product'),
  ('AT-016', 'پتو',                            'Blanket',                    '630140', 'PCS',  'finished_product'),
  ('AT-017', 'قطعه یدکی دستگاه بافندگی',      'Loom Spare Part',            '848490', 'PCS',  'machinery'),
  ('AT-018', 'سوزن چرخ خیاطی',                'Sewing Machine Needle',      '731900', 'BOX',  'machinery'),
  ('AT-019', 'ضایعات پارچه',                  'Fabric Scraps',              '630900', 'KG',   'waste'),
  ('AT-020', 'ضایعات نخ',                     'Yarn Waste',                 '520300', 'KG',   'waste')
) AS g(item_code, name_fa, name_en, hs_code, unit_code, item_type)
CROSS JOIN companies c
WHERE c.economic_code = '411111111122';

-- =========================================================
-- GOODS — Company 3: Zagros Food Industries (economic_code 411111111133)
-- =========================================================
INSERT INTO goods (company_id, item_code, name_fa, name_en, hs_code, unit_id, item_type)
SELECT c.id, g.item_code, g.name_fa, g.name_en, g.hs_code,
       (SELECT id FROM units WHERE code = g.unit_code), g.item_type
FROM (VALUES
  ('ZF-001', 'آرد گندم',                    'Wheat Flour',              '110100', 'TON',     'raw_material'),
  ('ZF-002', 'شکر تصفیه‌شده',                'Refined Sugar',            '170199', 'TON',     'raw_material'),
  ('ZF-003', 'روغن نباتی',                   'Vegetable Oil',            '151590', 'L',       'raw_material'),
  ('ZF-004', 'پودر کاکائو',                  'Cocoa Powder',             '180500', 'KG',      'raw_material'),
  ('ZF-005', 'نمک',                          'Salt',                     '250100', 'TON',     'raw_material'),
  ('ZF-006', 'خمیر نیمه‌آماده',              'Dough Mix',                '190190', 'KG',      'part'),
  ('ZF-007', 'پایه بیسکویت',                 'Biscuit Base',             '190531', 'KG',      'part'),
  ('ZF-008', 'کنسانتره طعم‌دهنده',           'Flavor Concentrate',       '210690', 'L',       'part'),
  ('ZF-009', 'رنگ خوراکی',                   'Food Coloring',            '320300', 'KG',      'part'),
  ('ZF-010', 'بسته بیسکویت',                 'Biscuit Pack',             '190531', 'PACKAGE', 'finished_product'),
  ('ZF-011', 'شکلات تخته‌ای',                'Chocolate Bar',            '180632', 'PCS',     'finished_product'),
  ('ZF-012', 'کنسرو رب گوجه‌فرنگی',          'Tomato Paste Can',         '200290', 'CARTON',  'finished_product'),
  ('ZF-013', 'بطری روغن پخت‌وپز',            'Cooking Oil Bottle',       '151710', 'PCS',     'finished_product'),
  ('ZF-014', 'بسته ماکارونی',                'Pasta Pack',               '190219', 'PACKAGE', 'finished_product'),
  ('ZF-015', 'کنسرو لوبیا',                  'Canned Beans',             '200550', 'CARTON',  'finished_product'),
  ('ZF-016', 'پاکت آبمیوه',                  'Fruit Juice Carton',       '200990', 'PCS',     'finished_product'),
  ('ZF-017', 'قطعه دستگاه بسته‌بندی',        'Packaging Machine Part',   '842240', 'PCS',     'machinery'),
  ('ZF-018', 'تیغه میکسر',                    'Mixer Blade',              '847990', 'PCS',     'machinery'),
  ('ZF-019', 'ضایعات فرآوری غذایی',          'Food Processing Byproduct','230990', 'TON',     'waste'),
  ('ZF-020', 'ضایعات بسته‌بندی',              'Packaging Waste',          '391590', 'KG',      'waste')
) AS g(item_code, name_fa, name_en, hs_code, unit_code, item_type)
CROSS JOIN companies c
WHERE c.economic_code = '411111111133';

-- =========================================================
-- GOODS — Company 4: Caspian Petrochemical Products (economic_code 411111111144)
-- =========================================================
INSERT INTO goods (company_id, item_code, name_fa, name_en, hs_code, unit_id, item_type)
SELECT c.id, g.item_code, g.name_fa, g.name_en, g.hs_code,
       (SELECT id FROM units WHERE code = g.unit_code), g.item_type
FROM (VALUES
  ('CP-001', 'نفتا',                           'Naphtha',                    '271011', 'TON',  'raw_material'),
  ('CP-002', 'اتیلن',                          'Ethylene',                   '290121', 'TON',  'raw_material'),
  ('CP-003', 'پروپیلن',                        'Propylene',                  '290122', 'TON',  'raw_material'),
  ('CP-004', 'متانول',                         'Methanol',                   '290511', 'TON',  'raw_material'),
  ('CP-005', 'گوگرد',                          'Sulfur',                     '250300', 'TON',  'raw_material'),
  ('CP-006', 'گرانول پلی‌اتیلن',               'Polyethylene Pellet',        '390110', 'KG',   'part'),
  ('CP-007', 'گرانول پلی‌پروپیلن',             'Polypropylene Pellet',       '390210', 'KG',   'part'),
  ('CP-008', 'رزین پی‌وی‌سی',                   'PVC Resin',                  '390421', 'KG',   'part'),
  ('CP-009', 'بچ کاتالیست',                    'Catalyst Batch',             '381900', 'KG',   'part'),
  ('CP-010', 'رزین پت درجه بطری',              'PET Bottle Grade Resin',     '390760', 'KG',   'finished_product'),
  ('CP-011', 'لوله پی‌وی‌سی',                   'PVC Pipe',                   '391721', 'M',    'finished_product'),
  ('CP-012', 'رول فیلم پلاستیکی',              'Plastic Film Roll',          '392020', 'ROLL', 'finished_product'),
  ('CP-013', 'روان‌کننده صنعتی',               'Industrial Lubricant',       '271019', 'L',    'finished_product'),
  ('CP-014', 'ضدیخ',                            'Antifreeze',                 '382000', 'L',    'finished_product'),
  ('CP-015', 'پایه مواد شوینده',               'Detergent Base',             '340211', 'KG',   'finished_product'),
  ('CP-016', 'فوم عایق',                        'Insulation Foam',            '392110', 'M3',   'finished_product'),
  ('CP-017', 'شیر راکتور',                     'Reactor Valve',              '848180', 'PCS',  'machinery'),
  ('CP-018', 'کیت آب‌بندی پمپ',                'Pump Seal Kit',              '848410', 'SET',  'machinery'),
  ('CP-019', 'لجن شیمیایی',                     'Chemical Sludge',            '382500', 'TON',  'waste'),
  ('CP-020', 'پلیمر خارج از استاندارد',        'Off-spec Polymer',           '390590', 'KG',   'waste')
) AS g(item_code, name_fa, name_en, hs_code, unit_code, item_type)
CROSS JOIN companies c
WHERE c.economic_code = '411111111144';