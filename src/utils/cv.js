import { cvFile } from '../constants'

// BASE_URL keeps both URLs working when the site is served from a sub-path.
// ?v= changes on every build (see vite.config.js), so visitors never get an old cached PDF
export const cvPdfUrl = `${import.meta.env.BASE_URL}${cvFile.path}?v=${__CV_VERSION__}`

export const cvPageUrl = `${import.meta.env.BASE_URL}cv`
