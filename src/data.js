// Edit this file to change store details, categories and products.
export const site = {
  name: 'Billionaires Computers',
  phone: '+255 774458938',
  email: 'info@billionaires.co.tz',
  hours: ['Monday - Friday 9am to 5pm', 'Saturday 10am to 2pm'],
  address: 'Dar es Salaam, Tanzania',
}
export const cats = [
  ['laptops', 'Laptops'], ['desktops', 'Desktops'], ['macbooks', 'Macbooks'], ['printers', 'Printers'],
  ['external-hard-disks', 'External Hard Disks'], ['toners-cartridges', 'Toners & Cartridges'],
  ['projectors', 'Projectors'], ['ups', 'UPS'], ['flash-disks', 'Flash Disks'], ['monitors', 'Monitors'], ['accessories', 'Accessories'],
].map(([slug, name]) => ({ slug, name }))
export const moreCats = ['projectors', 'ups', 'flash-disks', 'monitors', 'accessories']

const p = (slug, title, category, brand, price, stock, specs, compare) => ({ slug, title, category, brand, price, stock, specs, compare })
export const products = [
  p('lenovo-v14iru-i7', 'LAPTOP LENOVO V14IRU CORE I7-13620H 8GB 512SSD DOS 14IN 1 YEAR WARRANTY', 'laptops', 'LENOVO', 1999000, 0,
    ['Intel Core i7-13620H (13th Gen)', '10 cores / 16 threads, up to 4.9GHz', '8GB DDR4-3200, one free SO-DIMM slot', '512GB SSD', '14" display, integrated Intel UHD Graphics'], 2399000),
  p('asus-b1503cva-i3', 'ASUS LAPTOP B1503CVA CORE I3-1315U 8GB 256SSD WIN11H 15.6IN 1 YR WARRANTY', 'laptops', 'ASUS', 1499000, 124, ['Intel Core i3-1315U', '8GB RAM', '256GB SSD', '15.6" display, Windows 11 Home']),
  p('hp-omnibook-x-flip-16', 'HP LAPTOP OMNIBOOK X FLIP 16 AS0043 CORE ULTRA 9 228V 32GB 2TB 16IN 3K OLED WIN11H', 'laptops', 'HP', 5250000, 2, ['Intel Core Ultra 9 228V', '32GB RAM', '2TB SSD', '16" 3K OLED touchscreen, 2-in-1']),
  p('hp-pro-tower-290-i7-cpu', 'HP PRO TOWER 290 G9 CORE I7 - CPU ONLY', 'desktops', 'HP', 2150000, null, ['Intel Core i7', 'Tower case, CPU only (no monitor)']),
  p('lenovo-neo-50a-aio', 'AIO LENOVO NEO 50A-24 G6 23.8IN U5-226V 16GB 512SSD DOS 1 YEAR WARRANTY', 'desktops', 'LENOVO', 2999000, 35, ['Intel Core Ultra 5 226V', '16GB RAM, 512GB SSD', '23.8" all-in-one with keyboard and mouse']),
  p('thinkcentre-neo-50a-24', 'THINKCENTRE NEO 50A-24" G5 CORE 7 8GB 512GB SSD 1 YEAR WARRANTY', 'desktops', 'LENOVO', 2999000, null, ['Intel Core 7', '8GB RAM, 512GB SSD', '24" all-in-one']),
  p('hpe-proliant-ml30', 'HPE PROLIANT SERVER ML30 GEN11 E2414 4CORE 32GB 2 X HPE 1TB SATA 6G 3 YR WARRANTY', 'desktops', 'HP', 5390000, null, ['Intel Xeon E-2414, 4 cores', '32GB RAM', '2 x 1TB SATA', '3 year warranty']),
  p('hp-pro-tower-290-i5-monitor', 'DESKTOP HP PRO TOWER 290 G9 I5-14500 8GB 512SSD 21.45IN FHD MONITOR 1 YEAR WARRANTY', 'desktops', 'HP', 2450000, null, ['Intel Core i5-14500', '8GB RAM, 512GB SSD', '21.45" FHD monitor included']),
  p('hp-pro-tower-290-i7-monitor', 'HP PRO TOWER 290 G9 I7-13700 8GB 512SSD 21.45IN MONITOR 1 YEAR WARRANTY', 'desktops', 'HP', 3450000, 2, ['Intel Core i7-13700', '8GB RAM, 512GB SSD', '21.45" monitor included']),
  p('dell-ect1250-i7', 'DESKTOP DELL TOWER ECT1250 CORE I7-14700 16GB 512SSD DOS NO-MONITOR 1 YEAR WARRANTY', 'desktops', 'DELL', 3400000, 0, ['Intel Core i7-14700', '16GB RAM, 512GB SSD', 'No monitor']),
  p('dell-ect1250-i5', 'DESKTOP DELL TOWER ECT1250 CORE I5-14400 8GB 512SSD DOS NO-MONITOR 1 YEAR WARRANTY', 'desktops', 'DELL', 1999000, 0, ['Intel Core i5-14400', '8GB RAM, 512GB SSD', 'No monitor']),
  p('macbook-air-13-m5', 'MACBOOK AIR 13IN MDHA4B M5 2026 MODEL', 'macbooks', 'APPLE', 4399000, 0, ['Apple M5 chip', '13" Liquid Retina display', 'Midnight']),
  p('macbook-air-15-m5', 'MACBOOK AIR 15IN MDVH4B M5 2026 MODEL', 'macbooks', 'APPLE', 4699000, 0, ['Apple M5 chip', '15" Liquid Retina display']),
  p('macbook-pro-m5', 'APPLE MACBOOK PRO MDE04 M5 CHIP 10 core CPU AND GPU 16GB 512GB SSD', 'macbooks', 'APPLE', 5320000, 0, ['Apple M5, 10-core CPU and GPU', '16GB unified memory', '512GB SSD']),
  p('hp-216a-yellow', 'HP 216A YELLOW ORIGINAL LASERJET TONER CARTRIDGE (W2412A)', 'toners-cartridges', 'HP', 245000, 9, ['Original HP toner', 'Yellow, W2412A']),
  p('apple-wireless-keyboard', 'APPLE WIRELESS KEYBOARD MQ052', 'accessories', 'APPLE', 499000, 1, ['Bluetooth wireless keyboard']),
  p('epson-l3250', 'EPSON ECOTANK L3250 WIFI ALL-IN-ONE INK TANK PRINTER', 'printers', 'EPSON', 650000, 12, ['Print, scan, copy', 'Wi-Fi', 'Refillable ink tank']),
  p('canon-photocopier', 'CANON IMAGERUNNER PHOTOCOPIER MULTIFUNCTION A3', 'printers', 'CANON', 8500000, 3, ['Copy, print, scan', 'A3 colour', 'Call for configuration']),
  p('ext-hdd-1tb', 'EXTERNAL HARD DISK 1TB USB 3.0 PORTABLE', 'external-hard-disks', 'SEAGATE', 190000, 20, ['1TB', 'USB 3.0', 'Portable 2.5"']),
]
