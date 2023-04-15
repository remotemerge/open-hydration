// build environment
const isProd = process.env.NODE_ENV === 'production';

// plugins
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// cssnano preset
const nanoPreset = { preset: ['advanced', { discardComments: { removeAll: true } }] };

// set plugins for dev and prod
const plugins = [autoprefixer(), tailwindcss(), ...(isProd ? [cssnano(nanoPreset)] : [])];

export default { plugins };
