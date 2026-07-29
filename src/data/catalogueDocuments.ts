export type CatalogueDocument = {
  file: string;
  summary?: string;
  highlights?: string[];
  specifications?: Record<string, string>;
};

const documents: Record<string, CatalogueDocument> = {
  'screen-plate-exposure-machine': { file: '08 Plate exposure machine Size 38 x 48 Inches.pdf' },
  'plate-backing-oven': { file: '09 Plate Baking oven Plate Size 28x40 technical details.pdf' },
  'large-format-film-separation': { file: '10 Wide format Inkjet printer.pdf' },
  'mini-offset-16x22': { file: '14 Single Colour Mini Offset Printing Machine 16.22.pdf' },
  'hpm-programmable-paper-cutter-system': {
    file: '01 HPM PAPER CUTTING LINE 115.pdf',
    summary:
      'A connected HPM 115 production line combining automatic pile loading, programmable cutting and automatic unloading. It is designed to move stacks through the cutting stage with less manual handling and better line continuity.',
    highlights: [
      'Loader, SQZK115S16 cutter and XZ1050S unloader work as one line',
      'Automatic loading and unloading can operate simultaneously',
      '16-inch programmable touch interface with 300-program capacity',
      'Servo-guided stack movement and protected handling zones',
    ],
    specifications: {
      'Cutting height': '165 mm',
      'Maximum cutting speed': '46 cuts/min',
      'Maximum clamp pressure': '40,000 N',
      'Unloader paper size': '300 × 400 to 900 × 1300 mm',
    },
  },
  'hpm-fully-automatic-paper-cutting-machine': {
    file: '02 HPM Fully Automatic Paper Cutting Machine (All Sizes).pdf',
    summary:
      'A heavy-duty HPM cutter family spanning compact commercial through large industrial sheet formats. The range combines rigid gantry construction, programmable backgauge positioning and touch-led production control.',
    highlights: [
      'Models 92, 115, 130, 137, 168 and 188',
      '16-inch full-touch computer with program setting',
      '300 programs with up to 200 cutting steps per program',
      'Air-cushion table and automatic paper-pushing workflow',
    ],
    specifications: {
      'Model Range': '92 / 115 / 130 / 137 / 168 / 188',
      'Display Precision': '0.01 mm',
      'Backgauge Speed': 'Up to 20 m/min',
      'Maximum Cutting Speed': '45-46 cuts/min',
    },
  },
  'hpm-heavy-duty-digital-programmable-paper-cutter': {
    file: '03 HPM 66Y S16 PROGRAM CONTROL PAPER CUTTER.pdf',
    summary:
      'The HPM 66Y S16 is a compact hydraulic programmable cutter for accurate everyday finishing. Its touch-led cutting programs, servo backgauge and energy-conscious drive system suit short-run and digital print environments.',
    highlights: [
      '200 programs with up to 500 cutting steps per program',
      '0.01 mm / 0.001 inch display precision',
      'Hydraulic cutting and clamping with servo backgauge',
      'Main motor runs only during cutting to reduce standby energy use',
    ],
    specifications: {
      Model: 'HPM 66Y S16',
      'Maximum Cutting Size': '670 × 670 mm',
      'Maximum Cutting Height': '86 mm',
      'Display Precision': '0.01 mm',
      'Maximum Cutting Speed': '20 cuts/min',
    },
  },
  'pile-turner': {
    file: '04 Pile Turner SFZ1300LA.pdf',
    summary:
      'The SFZ1300LA prepares paper piles before or after printing by turning, aerating, aligning and removing loose impurities. This supports cleaner feeding, faster drying and more consistent downstream handling.',
    highlights: [
      'Turning, blowing, drying, alignment and jogging in one station',
      'Siemens PLC control with dual operating consoles',
      'Strong radial blowers and continuously controlled air nozzles',
      'Stable steel frame with hydraulic lifting-frame release',
    ],
    specifications: {
      Model: 'SFZ1300LA',
      'Maximum Paper Size': '1200 × 900 mm',
      'Minimum Paper Size': '500 × 400 mm',
      'Maximum Pile Height': '1600 mm',
      'Minimum Pile Height': '700 mm',
      'Maximum Pile Weight': '2000 kg',
      'Gross Power': '12 kW',
    },
  },
  'pile-lifter': {
    file: '05 PILE LIFTER SJ1000.pdf',
    summary:
      'A supporting lift station that presents paper piles at a practical working height for cutting and printing operations, reducing repeated bending and manual lifting around the line.',
    highlights: [
      'Supports cutter and press feeding workflows',
      'Adjustable pallet presentation height',
      'Designed to reduce operator handling effort',
    ],
    specifications: {
      Model: 'SJ1000',
      'Max Pallet Length': '1355 mm',
      'Max Pallet Width': '997 mm',
      'Max Pallet Height': '900 mm',
      'Max Loading Capacity': '1500 kg',
      Power: '1.5 kW',
    },
  },
  'semi-automatic-three-knife-trimmer': {
    file: '07 Semi Automatic Three Knife Trimmer QS100C.pdf',
    summary:
      'A program-controlled three-knife trimmer for fast format changes and accurate three-edge trimming of book blocks, particularly useful for short and mixed production batches.',
    highlights: [
      'Touch-screen format setting with storage for up to 90 jobs',
      'Photo-sensor and light-curtain protection',
      'Servo delivery and drawer-style format change',
      'Blade-condition prompt and shutdown protection',
    ],
    specifications: {
      'Cutting size': '80 × 80 to 420 × 300 mm',
      'Maximum cutting height': '100 mm',
      'Cutting speed': '28 cycles/min',
      Power: '7 kW',
    },
  },
  'knife-grinding-machine': { file: '25 Knife Grinding Machine.pdf' },
  'screen-printing-machine': { file: '20 Screen Printing machine 20 x 30.pdf' },
  'book-edge-gilding-machine': { file: '21 Book Edge Polishing Gilding machine.pdf' },
  'cylindrical-round-box-making-machine': { file: '22 Cylindrical Box Making machine.pdf' },
  'automatic-notching-grooving-machine': { file: '24 Automatic V – Grooving Machine.pdf' },
  'corner-pasting-machine': { file: '26 Corner Pasting Machine.pdf' },
  'automatic-gluing-machine': { file: '28 Automatic Top Gluing Conveyer.pdf' },
  'board-cutter': { file: '29 Heavy Duty Rotary Board Cutter.pdf' },
  'board-to-board-pasting-machine': { file: '55 Board to Board Pasting Machine.pdf' },
  'twin-corner-cutting': { file: '31 Twin Corner Cutting Machine.pdf' },
  'perfect-binder': { file: '32 Perfect Binding Machine size 17 HB Binder R1 single clamp.pdf' },
  'semi-automatic-case-maker': { file: '33 Semi Automatic Case Maker CB-310 Size 25.pdf' },
  'paper-board-knurling-embossing-machine': { file: '34 Paper Board Knurling Embossing machine Size 30.pdf' },
  'semi-automatic-case-maker-active-dual': { file: '35 Automatic Case Make Active Dual.pdf' },
  'joint-forming': { file: '37 Joint Forming with Book Pressing.pdf' },
  'sewing-machine': { file: '38 Book Sewing Machine.pdf' },
  'nipping-smashing-machine': { file: '39 Nipping Press Machine.pdf' },
  'twin-book-press': { file: '40 Hydraulic Dual Book Press Machine.pdf' },
  'passport-sewing-machine': { file: '48 Passport Book Stitching.pdf' },
  'passport-book-center-sewing-machine': { file: '49 Passport & Book Centre Sewing Machine.pdf' },
  stitching: { file: '59 Book Stitching Machine 5 8.pdf' },
  'book-back-glueing-and-drying-machine': { file: '61 Book Back Gluing and Drying Machine.pdf' },
  'book-back-rounding': { file: '62 Book Block Rounding Machine.pdf' },
  'thermal-water-base-laminator-with-sheeter': {
    file: '41 Thermal Aqueous Laminator With Integrated Sheet Separator.pdf',
    summary:
      'A dual-process laminating line that supports both thermal film and water-based lamination, followed by integrated pneumatic sheet separation.',
    highlights: [
      'Thermal and aqueous lamination in one line',
      'Hydraulically regulated laminating nip',
      'Integrated pneumatic in-feed and synchronized sheeting',
      'Handles paper stock from 90 to 450 gsm',
    ],
    specifications: {
      'Aqueous speed': 'Up to 45 m/min',
      'Thermal speed': 'Up to 25 m/min',
      'Standard widths': '600 / 800 / 900 / 1200 mm',
      Feeding: 'Manual',
    },
  },
  'automatic-reel-to-sheet-separator': { file: '42 Automatic Reel To Sheet Separator.pdf' },
  'strip-gumming-water-based-laminator': { file: '43 Strip Gumming & Water Based Laminator.pdf' },
  'water-base-double-side-laminator': { file: '44 Water Base Double Side Laminator.pdf' },
  'digital-heavy-duty-thermal-lamination-machine': { file: '45 Heavy Duty Thermal lamination size 15.pdf' },
  'power-punching-machine': { file: '50 Power Punching Machine.pdf' },
  'automatic-wire-o-binding-machine': { file: '51 Automatic Wire O Closing Machine.pdf' },
  'power-driven-wire-o-closing': { file: '52 Power Driven Wire O Closing.pdf' },
  'automatic-paper-punching-machine': { file: '53 Automatic Punching Machine .pdf' },
  'automatic-spiral-binding-machine': { file: '54 Automatic Spiral Binding and forming Machine.pdf' },
  'paper-shredding-machine': { file: '57 Shredder Machine For Katran.pdf' },
  'cardboard-shredding-machine': { file: '58 HC 425 CARDBOARD SHREDDER.pdf' },
  'paper-baling-machine': { file: '68 Bailing Machine.pdf' },
  'automatic-eyelet-punching-machine': { file: '75 Automatic Eyelet Punching Machine.pdf' },
  'envelope-punching-machine': { file: '73 Hydraulic Envelope Die Cutting Press Machine.pdf' },
  'roller-pressing-machine': { file: '77 Roller pressing Machine.pdf' },
  'label-punching-machine': { file: '93 Label Punching Machine LPM.pdf' },
  'slant-die-cutting-machine': { file: '94 Auto Slant Die Cutting Machine.pdf' },
  'sticky-memo-pad-gluing-machine': { file: '95 Sticky note pad making mchine.pdf' },
  'die-punching': { file: '63 Die Cutting Machine size 28X40.pdf' },
  'foil-stamping-machine': { file: '64 Pneumatic (Hot Foil) Stamping Machine.pdf' },
  'hot-foil-stamping-machine': { file: '65 Hot foil stamping machine Hydraulic.pdf' },
  'carton-folding-and-gluing-machine': { file: '66 Carton Folding & Gluing Machine.pdf' },
  'paper-counter': { file: '67 Paper Counter.pdf' },
  'manual-gluing-machine': { file: '76 Table Top Gluing Machine Cold and Hot Glue size 28.pdf' },
  'dampener-roller-cleaner': { file: '79 Dampener Roller Cleaner.pdf' },
  'auto-feeder-half-cutting-machine': { file: '78 Automatic Half Cutting, Micro Perforation, Creasing Machine.pdf' },
  'edge-squaring-machine': { file: '60 Edge Squaring Press Machine.pdf' },
  'paper-folding-machine': { file: '71 Combi-Folding Machine with Electric control Knife.pdf' },
  'slitting-and-rewinding-machine': { file: '70 Centre Surface Slitting & Rewinding Machine.pdf' },
  'paper-bag-making-machine': { file: '72 Paper Bag Making Machine.pdf' },
  'reel-to-sheeting-machine': { file: '69 Reel to Sheeting Machine.pdf' },
  'sheet-pasting-machine': { file: '91 Sheet Pasting Machine.pdf' },
  'heavy-duty-power-box-stitching-machine-angular': { file: '90 Heavy Duty Power Box Stitching Machine Angular.pdf' },
};

export const getCatalogueDocument = (productId: string) => {
  const document = documents[productId];
  if (!document) return null;

  return {
    ...document,
    url: `/catalogues/${encodeURIComponent(document.file)}`,
    label: document.file.replace(/^\d+\s*/, '').replace(/\.pdf$/i, ''),
  };
};

export const catalogueDocumentCount = Object.keys(documents).length;
