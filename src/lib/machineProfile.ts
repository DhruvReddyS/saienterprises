import type { Product } from '@/data/products';

const postPressSubcategoryMap: Record<string, string> = {
  'hpm-programmable-paper-cutter-system': 'Cutting / Trimming / Handling',
  'hpm-heavy-duty-digital-programmable-paper-cutter': 'Cutting / Trimming / Handling',
  'pile-turner': 'Cutting / Trimming / Handling',
  'pile-lifter': 'Cutting / Trimming / Handling',
  'automatic-feeding-three-knife-trimmer': 'Cutting / Trimming / Handling',
  'semi-automatic-three-knife-trimmer': 'Cutting / Trimming / Handling',
  'knife-grinding-machine': 'Cutting / Trimming / Handling',
  'screen-printing-machine': 'Printing / Decorative / Specialty Finishing',
  'book-edge-gilding-machine': 'Printing / Decorative / Specialty Finishing',
  'cylindrical-round-box-making-machine': 'Printing / Decorative / Specialty Finishing',
  'automatic-rigid-box-making-machine': 'Rigid Box Machines',
  'automatic-notching-grooving-machine': 'Rigid Box Machines',
  'corner-pasting-machine': 'Rigid Box Machines',
  'box-forming-machine': 'Rigid Box Machines',
  'automatic-gluing-machine': 'Rigid Box Machines',
  'board-cutter': 'Rigid Box Machines',
  'spine-board-cutter': 'Rigid Box Machines',
  'board-to-board-pasting-machine': 'Rigid Box Machines',
  'twin-corner-cutting': 'Book Binding / Case Making / Finishing',
  'perfect-binder': 'Book Binding / Case Making / Finishing',
  'semi-automatic-case-maker': 'Book Binding / Case Making / Finishing',
  'paper-board-knurling-embossing-machine': 'Book Binding / Case Making / Finishing',
  'semi-automatic-case-maker-active-dual': 'Book Binding / Case Making / Finishing',
  'book-block-casing-in-plus': 'Book Binding / Case Making / Finishing',
  'joint-forming': 'Book Binding / Case Making / Finishing',
  'sewing-machine': 'Book Binding / Case Making / Finishing',
  'nipping-smashing-machine': 'Book Binding / Case Making / Finishing',
  'twin-book-press': 'Book Binding / Case Making / Finishing',
  'passport-sewing-machine': 'Book Binding / Case Making / Finishing',
  'passport-book-center-sewing-machine': 'Book Binding / Case Making / Finishing',
  stitching: 'Book Binding / Case Making / Finishing',
  'book-back-glueing-and-drying-machine': 'Book Binding / Case Making / Finishing',
  'book-back-rounding': 'Book Binding / Case Making / Finishing',
  'thermal-water-base-laminator-with-sheeter': 'Lamination / Coating',
  'automatic-reel-to-sheet-separator': 'Lamination / Coating',
  'strip-gumming-water-based-laminator': 'Lamination / Coating',
  'water-base-double-side-laminator': 'Lamination / Coating',
  'digital-heavy-duty-thermal-lamination-machine': 'Lamination / Coating',
  'uv-aqua-coater-with-drier': 'Lamination / Coating',
  'two-color-uv-conversion': 'Lamination / Coating',
  'power-punching-machine': 'Punching / Wire / Spiral',
  'automatic-wire-o-binding-machine': 'Punching / Wire / Spiral',
  'power-driven-wire-o-closing': 'Punching / Wire / Spiral',
  'automatic-paper-punching-machine': 'Punching / Wire / Spiral',
  'automatic-spiral-binding-machine': 'Punching / Wire / Spiral',
  'drilling-machine': 'Punching / Wire / Spiral',
  'paper-shredding-machine': 'Punching / Wire / Spiral',
  'cardboard-shredding-machine': 'Punching / Wire / Spiral',
  'paper-baling-machine': 'Punching / Wire / Spiral',
  'automatic-eyelet-punching-machine': 'Punching / Wire / Spiral',
  'envelope-punching-machine': 'Punching / Wire / Spiral',
  'roller-pressing-machine': 'Punching / Wire / Spiral',
  'label-punching-machine': 'Punching / Wire / Spiral',
  'slant-die-cutting-machine': 'Punching / Wire / Spiral',
  'sticky-memo-pad-gluing-machine': 'Punching / Wire / Spiral',
};

const getInferredBrand = (product: Product, categorySlug: string) => {
  if (product.brand) return product.brand;
  if (product.name.includes('HPM') || product.id.startsWith('hpm-')) return 'HPM';
  if (categorySlug === 'press' && product.id === 'web-offset-printing-machine') return 'Heidelberg / Komori';
  if (categorySlug === 'allied') return 'Sai Enterprises / Partner Consumables';
  return 'Sai Enterprises';
};

const getInferredSubcategory = (product: Product, categoryName: string, categorySlug: string) => {
  if (product.subcategory) return product.subcategory;
  if (categorySlug === 'post-press') return postPressSubcategoryMap[product.id] ?? 'Post-Press';
  if (categorySlug === 'pre-press') return 'Pre-Press';
  if (categorySlug === 'press') return 'Press';
  if (categorySlug === 'corrugation') return 'Corrugation';
  if (categorySlug === 'allied') return 'Allied / Consumables';
  return categoryName;
};

const getBrochureStatus = (product: Product) => {
  if (product.brochureStatus) return product.brochureStatus;
  const hasDetails =
    Boolean(product.sizes?.length) ||
    Boolean(product.features?.length) ||
    Boolean(product.applications?.length) ||
    Boolean(product.specifications && Object.keys(product.specifications).length);
  return hasDetails ? 'Brochure details available' : 'Name listed in brochure';
};

export const getMachineProfile = (product: Product, categoryName: string, categorySlug: string) => ({
  brand: getInferredBrand(product, categorySlug),
  subcategory: getInferredSubcategory(product, categoryName, categorySlug),
  brochureStatus: getBrochureStatus(product),
});
