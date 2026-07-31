export function stripShikiPreBackground(html: string): string {
  return html.replace(/<pre([^>]*)style="([^"]*)"([^>]*)>/, (_, before, styles, after) => {
    const nextStyles = styles
      .replace(/background-color:[^;"]*;?/gi, '')
      .replace(/(^|;)\s*;+/g, '$1')
      .trim()
      .replace(/^;|;$/g, '')

    if (!nextStyles) {
      return `<pre${before}${after}>`
    }

    return `<pre${before}style="${nextStyles}"${after}>`
  })
}
